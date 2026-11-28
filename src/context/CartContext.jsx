import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts, isCheeseProduct, parseValidPrice, parseValidQuantity } from '../data/products';

const CartContext = createContext();

const localImageById = Object.fromEntries(initialProducts.map(p => [p.id, p.image]));
const productById = Object.fromEntries(initialProducts.map(p => [p.id, p]));

const sanitizeCartItems = (items) => {
  if (!Array.isArray(items)) return [];
  return items
    .filter(item => item && !isCheeseProduct(item))
    .map(item => {
      const catalogItem = productById[item.id];
      return {
        ...item,
        image: localImageById[item.id] || item.image || catalogItem?.image,
        price: parseValidPrice(item.price ?? catalogItem?.price),
        quantity: parseValidQuantity(item.quantity ?? item.qty, 1)
      };
    });
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('dc_cart_items');
    return saved ? sanitizeCartItems(JSON.parse(saved)) : [
      {
        id: 'prod-1',
        name: 'Fresh Cow Milk',
        unit: '500 ml',
        price: 28,
        quantity: 1,
        image: '/images/products/fresh-cow-milk.jpg'
      },
      {
        id: 'prod-4',
        name: 'Fresh Paneer',
        unit: '200 g',
        price: 120,
        quantity: 1,
        image: '/images/products/fresh-paneer.jpg'
      },
      {
        id: 'prod-5',
        name: 'Fresh Curd',
        unit: '200 g',
        price: 40,
        quantity: 1,
        image: '/images/products/fresh-curd.jpg'
      }
    ];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('dc_wishlist');
    return saved ? JSON.parse(saved) : ['prod-1', 'prod-6'];
  });

  const [appliedCoupon, setAppliedCoupon] = useState(null);

  useEffect(() => {
    localStorage.setItem('dc_cart_items', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('dc_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product, qty = 1, sizeOption = null) => {
    const validPrice = parseValidPrice(sizeOption ? sizeOption.price : product?.price);
    if (validPrice === null) return;
    const validQty = parseValidQuantity(qty, 1);

    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      const unit = sizeOption ? sizeOption.size : product.unit;

      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, price: validPrice, unit, quantity: parseValidQuantity(item.quantity, 1) + validQty }
            : item
        );
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: validPrice,
        unit,
        image: product.image,
        quantity: validQty
      }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const applyCoupon = (code) => {
    const cleanCode = code.toUpperCase().trim();
    if (cleanCode === 'DAIRY20' || cleanCode === 'KOMAGAN10') {
      const discountPct = cleanCode === 'DAIRY20' ? 0.20 : 0.10;
      setAppliedCoupon({ code: cleanCode, type: 'percent', value: discountPct, name: `${cleanCode} Applied` });
      return { success: true, message: `Coupon ${cleanCode} applied successfully!` };
    } else if (cleanCode === 'FREESHIP') {
      setAppliedCoupon({ code: cleanCode, type: 'shipping', value: 20, name: 'Free Delivery Applied' });
      return { success: true, message: 'Free delivery coupon applied!' };
    } else if (cleanCode === 'FLAT50') {
      setAppliedCoupon({ code: cleanCode, type: 'flat', value: 50, name: '₹50 Flat Discount' });
      return { success: true, message: '₹50 discount applied!' };
    }
    return { success: false, message: 'Invalid or expired coupon code. Try DAIRY20, FREESHIP, or FLAT50.' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Calculations
  const hasInvalidPrice = cartItems.some(item => parseValidPrice(item.price) === null);
  const subtotal = hasInvalidPrice
    ? null
    : cartItems.reduce((acc, item) => acc + (parseValidPrice(item.price) * parseValidQuantity(item.quantity, 1)), 0);
  
  let deliveryCharge = subtotal === null || subtotal > 499 || subtotal === 0 ? 0 : 20;
  let discount = 0;

  if (appliedCoupon && subtotal !== null) {
    if (appliedCoupon.type === 'percent') {
      discount = Math.round(subtotal * appliedCoupon.value);
    } else if (appliedCoupon.type === 'flat') {
      discount = Math.min(appliedCoupon.value, subtotal);
    } else if (appliedCoupon.type === 'shipping') {
      deliveryCharge = 0;
    }
  }

  const platformFee = subtotal !== null && subtotal > 0 ? 5 : 0;
  const grandTotal = subtotal === null ? null : Math.max(0, subtotal + deliveryCharge + platformFee - discount);
  const totalItemCount = cartItems.reduce((acc, item) => acc + parseValidQuantity(item.quantity, 1), 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      hasInvalidPrice,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      wishlist,
      toggleWishlist,
      appliedCoupon,
      applyCoupon,
      removeCoupon,
      subtotal,
      deliveryCharge,
      platformFee,
      discount,
      grandTotal,
      totalItemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
