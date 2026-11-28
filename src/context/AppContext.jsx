import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts, isCheeseProduct, parseValidPrice, parseValidQuantity } from '../data/products';
import { initialOrders } from '../data/orders';
import { initialDeliveryPartners } from '../data/deliveryPartners';
import { initialCustomers } from '../data/customers';

const AppContext = createContext();

const localImageById = Object.fromEntries(initialProducts.map(p => [p.id, p.image]));
const productById = Object.fromEntries(initialProducts.map(p => [p.id, p]));

const sanitizeStoredProducts = (list) => {
  return list
    .filter(p => !isCheeseProduct(p))
    .map(p => (localImageById[p.id] ? { ...p, image: localImageById[p.id] } : p));
};

const migrateSubscriptions = (list) => {
  if (!Array.isArray(list)) return [];
  return list
    .filter(s => s && !isCheeseProduct(s))
    .map(s => {
      const catalogItem = productById[s.id];
      const resolvedPrice = parseValidPrice(s.price ?? s.unitPrice ?? s.amount ?? catalogItem?.price);
      const resolvedQty = parseValidQuantity(s.quantity ?? s.qty, 1);
      return {
        id: s.id,
        name: s.name || catalogItem?.name || 'Dairy Product',
        image: localImageById[s.id] || s.image || catalogItem?.image,
        unit: s.unit || catalogItem?.unit || '',
        price: resolvedPrice,
        quantity: resolvedQty
      };
    });
};

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('mq_products');
    return saved ? sanitizeStoredProducts(JSON.parse(saved)) : initialProducts;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('mq_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  const [deliveryPartners, setDeliveryPartners] = useState(() => {
    const saved = localStorage.getItem('mq_delivery_partners');
    return saved ? JSON.parse(saved) : initialDeliveryPartners;
  });

  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('mq_customers');
    return saved ? JSON.parse(saved) : initialCustomers;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('mq_notifications');
    return saved ? JSON.parse(saved) : [
      { id: 'notif-1', title: 'Welcome to Milk Queen!', message: 'Explore pure farm milk & dairy products.', time: 'Just now', type: 'info', read: false }
    ];
  });

  // Subscription state — persisted in localStorage
  const [subscriptions, setSubscriptions] = useState(() => {
    const saved = localStorage.getItem('mq_subscriptions');
    return saved ? migrateSubscriptions(JSON.parse(saved)) : [];
  });

  const [subscriptionFrequency, setSubscriptionFrequency] = useState(() => {
    return localStorage.getItem('mq_sub_frequency') || 'daily';
  });

  const [subscriptionActive, setSubscriptionActive] = useState(() => {
    const saved = localStorage.getItem('mq_sub_active');
    return saved ? JSON.parse(saved) : true;
  });

  // Persist all state to localStorage
  useEffect(() => { localStorage.setItem('mq_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('mq_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('mq_delivery_partners', JSON.stringify(deliveryPartners)); }, [deliveryPartners]);
  useEffect(() => { localStorage.setItem('mq_customers', JSON.stringify(customers)); }, [customers]);
  useEffect(() => { localStorage.setItem('mq_notifications', JSON.stringify(notifications)); }, [notifications]);
  useEffect(() => { localStorage.setItem('mq_subscriptions', JSON.stringify(subscriptions)); }, [subscriptions]);
  useEffect(() => { localStorage.setItem('mq_sub_frequency', subscriptionFrequency); }, [subscriptionFrequency]);
  useEffect(() => { localStorage.setItem('mq_sub_active', JSON.stringify(subscriptionActive)); }, [subscriptionActive]);

  const addNotification = (title, message, type = 'info') => {
    const newNotif = {
      id: 'notif-' + Date.now(),
      title,
      message,
      time: 'Just now',
      type,
      read: false
    };
    setNotifications(prev => [newNotif, ...prev.slice(0, 19)]);
  };

  // ── Subscription CRUD ───────────────────────────────────────────────────────
  const addSubscription = (product, qty = 1) => {
    const validPrice = parseValidPrice(product?.price);
    if (validPrice === null) {
      return { error: `Invalid price for ${product?.name || 'this product'}.` };
    }
    const validQty = parseValidQuantity(qty, 1);
    const isDuplicate = subscriptions.some(s => s.id === product.id);
    if (isDuplicate) {
      return { duplicate: true };
    }

    setSubscriptions(prev => {
      if (prev.some(s => s.id === product.id)) return prev;
      return [...prev, {
        id: product.id,
        name: product.name,
        image: product.image,
        unit: product.unit,
        price: validPrice,
        quantity: validQty
      }];
    });
    addNotification('Subscription Updated', `${product.name} added to your subscription.`, 'success');
    return { added: true };
  };

  const removeSubscription = (productId) => {
    setSubscriptions(prev => prev.filter(s => s.id !== productId));
    addNotification('Subscription Updated', 'Product removed from subscription.', 'info');
  };

  const updateSubscriptionQty = (productId, newQuantity) => {
    const validQty = parseValidQuantity(newQuantity, 1);
    setSubscriptions(prev => prev.map(s => (
      s.id === productId ? { ...s, quantity: validQty } : s
    )));
  };

  // ── Product functions ───────────────────────────────────────────────────────
  const addProduct = (productData, isApproved = false) => {
    const newProduct = {
      id: 'prod-' + Date.now(),
      name: productData.name,
      category: productData.category || 'Fresh Milk',
      unit: productData.unit || '500 ml',
      price: Number(productData.price) || 30,
      originalPrice: Number(productData.originalPrice) || Number(productData.price) * 1.15,
      discount: '10% OFF',
      rating: 4.8,
      reviewsCount: 1,
      inStock: true,
      stock: Number(productData.stock) || 50,
      badge: productData.badge || 'New',
      productType: productData.productType || 'Regular',
      image: productData.image || 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80',
      description: productData.description || 'Freshly prepared pure dairy produce.',
      sizes: [{ size: productData.unit || '500 ml', price: Number(productData.price) || 30 }],
      status: isApproved ? 'approved' : 'pending_approval',
      featured: false
    };
    setProducts(prev => [newProduct, ...prev]);
    addNotification('Product Submitted', `${newProduct.name} has been submitted for review.`, 'info');
    return newProduct;
  };

  const approveProduct = (productId) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        addNotification('Product Approved!', `${p.name} is now live in the catalog!`, 'success');
        return { ...p, status: 'approved' };
      }
      return p;
    }));
  };

  const rejectProduct = (productId) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, status: 'rejected' } : p));
    addNotification('Product Rejected', 'The submitted product was rejected.', 'warning');
  };

  const updateProduct = (productId, updates) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, ...updates } : p));
    addNotification('Product Updated', 'Product details saved successfully.', 'success');
  };

  const deleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    addNotification('Product Removed', 'Product was deleted from the catalog.', 'info');
  };

  // ── Order functions ─────────────────────────────────────────────────────────
  const createOrder = (orderData) => {
    const newOrderId = 'MQ' + Math.floor(10000 + Math.random() * 90000);
    const newOrder = {
      id: newOrderId,
      customerName: orderData.customerName || 'Priya S',
      customerEmail: orderData.customerEmail || 'priya.s@gmail.com',
      customerPhone: orderData.customerPhone || '+91 98765 43210',
      deliveryAddress: orderData.deliveryAddress || '12, R.S. Puram Main Road, Coimbatore - 641002',
      deliverySlot: orderData.deliverySlot || 'Today, 10:00 AM - 12:00 PM',
      deliveryDate: orderData.deliveryDate || 'Today',
      paymentMethod: orderData.paymentMethod || 'UPI',
      paymentStatus: orderData.paymentStatus || 'Pending',
      status: 'Order Placed',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      items: orderData.items || [],
      itemTotal: orderData.itemTotal || 0,
      deliveryCharge: orderData.deliveryCharge || 0,
      platformFee: orderData.platformFee || 5,
      discount: orderData.discount || 0,
      grandTotal: orderData.grandTotal || 0,
      assignedPartnerId: null,
      assignedPartnerName: 'Unassigned',
      assignedPartnerPhone: '',
      assignedPartnerVehicle: '',
      assignedPartnerAvatar: '',
      timeline: [
        { step: 'Order Placed', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), completed: true },
        { step: 'Confirmed', time: 'Pending', completed: false },
        { step: 'Packed', time: 'Pending', completed: false },
        { step: 'Out for Delivery', time: 'Pending', completed: false },
        { step: 'Delivered', time: 'Pending', completed: false }
      ],
      eta: '45 mins'
    };
    setOrders(prev => [newOrder, ...prev]);
    addNotification('New Order Placed!', `Order #${newOrderId} placed successfully for Rs.${newOrder.grandTotal}.`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const updatedTimeline = order.timeline.map(t => {
          if (t.step === newStatus) return { ...t, time: timeNow, completed: true };
          if (newStatus === 'Confirmed' && t.step === 'Order Placed') return { ...t, completed: true };
          if (newStatus === 'Packed' && (t.step === 'Order Placed' || t.step === 'Confirmed')) return { ...t, completed: true };
          return t;
        });
        addNotification('Order Status Updated', `Order #${orderId} marked as "${newStatus}".`, 'info');
        return { ...order, status: newStatus, timeline: updatedTimeline };
      }
      return order;
    }));
  };

  const assignDeliveryPartner = (orderId, partnerId) => {
    const partner = deliveryPartners.find(dp => dp.id === partnerId);
    if (!partner) return;
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          assignedPartnerId: partner.id,
          assignedPartnerName: partner.name,
          assignedPartnerPhone: partner.phone,
          assignedPartnerVehicle: `${partner.vehicleType} (${partner.vehicleNumber})`,
          assignedPartnerAvatar: partner.avatar
        };
      }
      return order;
    }));
    setDeliveryPartners(prev => prev.map(dp => dp.id === partnerId ? { ...dp, status: 'On Delivery' } : dp));
    addNotification('Delivery Partner Assigned', `${partner.name} assigned to Order #${orderId}.`, 'info');
  };

  const updateDeliveryStatus = (orderId, deliveryStep) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        let newStatus = order.status;
        let newEta = order.eta;
        if (deliveryStep === 'Picked Up') { newStatus = 'Packed'; newEta = '25 mins'; }
        else if (deliveryStep === 'Out for Delivery') { newStatus = 'Out for Delivery'; newEta = '15 mins'; }
        else if (deliveryStep === 'Delivered') { newStatus = 'Delivered'; newEta = 'Delivered'; }
        const updatedTimeline = order.timeline.map(t => {
          if (t.step === 'Out for Delivery' && deliveryStep === 'Out for Delivery') return { ...t, time: timeNow, completed: true };
          if (t.step === 'Delivered' && deliveryStep === 'Delivered') return { ...t, time: timeNow, completed: true };
          return t;
        });
        addNotification('Delivery Update', `Order #${orderId} is now "${newStatus}"!`, deliveryStep === 'Delivered' ? 'success' : 'info');
        return { ...order, status: newStatus, eta: newEta, timeline: updatedTimeline };
      }
      return order;
    }));
  };

  // ── Delivery partner registration ───────────────────────────────────────────
  const registerDeliveryApplication = (formData) => {
    const newDpId = 'dp-' + Date.now();
    const newCode = `DP-00${deliveryPartners.length + 1}`;
    const newPartner = {
      id: newDpId, code: newCode, name: formData.name,
      phone: formData.phone, email: formData.email,
      location: formData.location || 'Coimbatore Central',
      vehicleType: formData.vehicleType || 'Bike',
      vehicleModel: formData.vehicleModel || 'Two-Wheeler',
      vehicleNumber: formData.vehicleNumber || 'TN 37 AB 9999',
      licenseNumber: formData.licenseNumber || 'TN-37-20240009999',
      totalDeliveries: 0, rating: 5.0, status: 'Pending',
      joinedDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      todayDeliveries: 0, todayEarnings: 0,
      avatar: formData.avatar || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
      bankAccount: {
        holder: formData.bankHolder || formData.name,
        bankName: formData.bankName || 'State Bank of India',
        accountNumber: formData.accountNumber || '8927162534',
        ifsc: formData.ifsc || 'SBIN0001928'
      },
      documents: {
        drivingLicense: { name: formData.licenseDocName || 'Driving_License.pdf', verified: false, date: 'Submitted Today' },
        rcBook: { name: formData.rcDocName || 'Vehicle_RC_Book.pdf', verified: false, date: 'Submitted Today' },
        aadhaar: { name: formData.aadhaarDocName || 'Aadhaar_Card.pdf', verified: false, date: 'Submitted Today' },
        bankPassbook: { name: formData.bankDocName || 'Bank_Passbook.pdf', verified: false, date: 'Submitted Today' }
      }
    };
    setDeliveryPartners(prev => [newPartner, ...prev]);
    addNotification('New Delivery Partner Application!', `${newPartner.name} applied as delivery rider.`, 'info');
    return newPartner;
  };

  const approveDeliveryPartner = (partnerId) => {
    setDeliveryPartners(prev => prev.map(dp => {
      if (dp.id === partnerId) {
        addNotification('Delivery Partner Approved!', `${dp.name} (${dp.code}) is now active!`, 'success');
        return {
          ...dp, status: 'Active',
          documents: {
            ...dp.documents,
            drivingLicense: { ...dp.documents.drivingLicense, verified: true },
            rcBook: { ...dp.documents.rcBook, verified: true },
            aadhaar: { ...dp.documents.aadhaar, verified: true },
            bankPassbook: { ...dp.documents.bankPassbook, verified: true }
          }
        };
      }
      return dp;
    }));
  };

  const rejectDeliveryPartner = (partnerId, remarks = 'Documents verification failed') => {
    setDeliveryPartners(prev => prev.map(dp => {
      if (dp.id === partnerId) {
        addNotification('Delivery Partner Rejected', `${dp.name} application was rejected: ${remarks}`, 'warning');
        return { ...dp, status: 'Rejected', rejectionRemarks: remarks };
      }
      return dp;
    }));
  };

  const resetDemoData = () => {
    setProducts(initialProducts);
    setOrders(initialOrders);
    setDeliveryPartners(initialDeliveryPartners);
    setCustomers(initialCustomers);
    setSubscriptions([]);
    ['mq_products','mq_orders','mq_delivery_partners','mq_customers','mq_subscriptions','mq_sub_frequency','mq_sub_active','mq_notifications','mq_milk_records','mq_farmers'].forEach(k => localStorage.removeItem(k));
    addNotification('Demo Data Reset', 'All records have been reset to defaults.', 'info');
  };

  return (
    <AppContext.Provider value={{
      products,
      approvedProducts: products.filter(p => p.status === 'approved'),
      pendingProducts: products.filter(p => p.status === 'pending_approval'),
      orders,
      deliveryPartners,
      pendingDeliveryPartners: deliveryPartners.filter(dp => dp.status === 'Pending'),
      activeDeliveryPartners: deliveryPartners.filter(dp => dp.status === 'Active' || dp.status === 'On Delivery'),
      customers,
      notifications,
      subscriptions,
      subscriptionFrequency,
      setSubscriptionFrequency,
      subscriptionActive,
      setSubscriptionActive,
      addSubscription,
      removeSubscription,
      updateSubscriptionQty,
      addProduct,
      approveProduct,
      rejectProduct,
      updateProduct,
      deleteProduct,
      createOrder,
      updateOrderStatus,
      assignDeliveryPartner,
      updateDeliveryStatus,
      registerDeliveryApplication,
      approveDeliveryPartner,
      rejectDeliveryPartner,
      addNotification,
      resetDemoData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
