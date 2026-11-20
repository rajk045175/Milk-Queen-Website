import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('dc_cart_items');
    return saved ? JSON.parse(saved) : [
      {
        id: 'prod-1',
        name: 'Fresh Cow Milk',
        farmerName: 'Ramasamy Farm',
        farmerId: 'farmer-1',
        unit: '500 ml',
        price: 28,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'prod-4',
        name: 'Fresh Paneer',
        farmerName: 'Kovai Fresh Dairy',
        farmerId: 'farmer-2',
        unit: '200 g',
        price: 120,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'prod-5',
        name: 'Fresh Curd',
        farmerName: 'Anbu Dairy Farm',
        farmerId: 'farmer-4',
        unit: '200 g',
        price: 40,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=400&q=80'
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
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      const price = sizeOption ? sizeOption.price : product.price;
      const unit = sizeOption ? sizeOption.size : product.unit;

      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price,
        unit,
        image: product.image,
        farmerName: product.farmerName,
        farmerId: product.farmerId,
        quantity: qty
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
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  let deliveryCharge = subtotal > 499 || subtotal === 0 ? 0 : 20;
  let discount = 0;

  if (appliedCoupon) {
    if (appliedCoupon.type === 'percent') {
      discount = Math.round(subtotal * appliedCoupon.value);
    } else if (appliedCoupon.type === 'flat') {
      discount = Math.min(appliedCoupon.value, subtotal);
    } else if (appliedCoupon.type === 'shipping') {
      deliveryCharge = 0;
    }
  }

  const platformFee = subtotal > 0 ? 5 : 0;
  const grandTotal = Math.max(0, subtotal + deliveryCharge + platformFee - discount);
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
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
