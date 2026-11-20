import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts } from '../data/products';
import { initialFarmers } from '../data/farmers';
import { initialOrders } from '../data/orders';
import { initialDeliveryPartners } from '../data/deliveryPartners';
import { initialCustomers } from '../data/customers';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Products state (persisted)
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('mq_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  // Farmers state (persisted)
  const [farmers, setFarmers] = useState(() => {
    const saved = localStorage.getItem('mq_farmers');
    return saved ? JSON.parse(saved) : initialFarmers;
  });

  // Orders state (persisted)
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('mq_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  // Delivery Partners state (persisted)
  const [deliveryPartners, setDeliveryPartners] = useState(() => {
    const saved = localStorage.getItem('mq_delivery_partners');
    return saved ? JSON.parse(saved) : initialDeliveryPartners;
  });

  // Customers state (persisted)
  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('mq_customers');
    return saved ? JSON.parse(saved) : initialCustomers;
  });

  // Milk Collection Records (for Farmer Dashboard - page 8)
  const [milkRecords, setMilkRecords] = useState(() => {
    const saved = localStorage.getItem('mq_milk_records');
    return saved ? JSON.parse(saved) : [
      { id: 'rec-1', time: '6:00 AM', cowId: 'C001', cowName: 'Lakshmi', quantity: 15, fat: 3.8, snf: 8.6, quality: 'Excellent', collectedBy: 'Ramasamy', date: 'Today' },
      { id: 'rec-2', time: '6:30 AM', cowId: 'C002', cowName: 'Ponni', quantity: 14, fat: 3.6, snf: 8.4, quality: 'Good', collectedBy: 'Ramasamy', date: 'Today' },
      { id: 'rec-3', time: '7:00 AM', cowId: 'C003', cowName: 'Muthu', quantity: 16, fat: 3.9, snf: 8.7, quality: 'Excellent', collectedBy: 'Worker 1', date: 'Today' },
      { id: 'rec-4', time: '7:30 AM', cowId: 'C004', cowName: 'Kaveri', quantity: 13, fat: 3.5, snf: 8.3, quality: 'Good', collectedBy: 'Worker 1', date: 'Today' },
      { id: 'rec-5', time: '8:00 AM', cowId: 'C005', cowName: 'Selvi', quantity: 12, fat: 3.7, snf: 8.4, quality: 'Good', collectedBy: 'Worker 2', date: 'Today' },
      { id: 'rec-6', time: '8:30 AM', cowId: 'C006', cowName: 'Malai', quantity: 15, fat: 3.8, snf: 8.6, quality: 'Excellent', collectedBy: 'Worker 2', date: 'Today' }
    ];
  });

  // System notifications
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('mq_notifications');
    return saved ? JSON.parse(saved) : [
      { id: 'notif-1', title: 'Welcome to Milk Queen!', message: 'Explore pure farm milk & dairy directly from trusted farmers.', time: 'Just now', type: 'info', read: false }
    ];
  });

  // Selected delivery location
  const [currentLocation, setCurrentLocation] = useState(() => {
    return localStorage.getItem('mq_location') || 'Coimbatore';
  });

  // Sync to localStorage
  useEffect(() => { localStorage.setItem('mq_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('mq_farmers', JSON.stringify(farmers)); }, [farmers]);
  useEffect(() => { localStorage.setItem('mq_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('mq_delivery_partners', JSON.stringify(deliveryPartners)); }, [deliveryPartners]);
  useEffect(() => { localStorage.setItem('mq_customers', JSON.stringify(customers)); }, [customers]);
  useEffect(() => { localStorage.setItem('mq_milk_records', JSON.stringify(milkRecords)); }, [milkRecords]);
  useEffect(() => { localStorage.setItem('mq_notifications', JSON.stringify(notifications)); }, [notifications]);
  useEffect(() => { localStorage.setItem('mq_location', currentLocation); }, [currentLocation]);

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

  // 1. NEW FARMER REGISTRATION APPLICATION
  const registerFarmerApplication = (formData) => {
    const newFarmerId = 'farmer-' + Date.now();
    const newFarmer = {
      id: newFarmerId,
      name: formData.name,
      farmName: formData.farmName,
      phone: formData.phone,
      email: formData.email,
      location: `${formData.village || formData.location}, ${formData.district || 'Coimbatore'}`,
      farmSize: `${formData.farmSize} Acres`,
      cowsCount: Number(formData.cowsCount) || 0,
      buffaloesCount: Number(formData.buffaloesCount) || 0,
      milkTypes: formData.milkTypes || 'Cow Milk',
      dailySupply: `${formData.dailySupply || '50'} L`,
      totalSupplied: '0 L',
      totalEarnings: 0,
      rating: 5.0,
      reviewsCount: 0,
      status: 'Pending',
      joinedDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      avatar: formData.avatar || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
      coverImage: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200&q=80',
      story: formData.story || 'Passionate about traditional dairy farming, natural green fodder, and providing pure unadulterated milk.',
      bankAccount: {
        holder: formData.bankHolder || formData.name,
        bankName: formData.bankName || 'State Bank of India',
        accountNumber: formData.accountNumber || '3982716251',
        ifsc: formData.ifsc || 'SBIN0001234'
      },
      documents: {
        aadhaar: {
          name: formData.aadhaarDocName || 'Aadhaar_Card_Front_Back.pdf',
          verified: false,
          date: 'Submitted Today'
        },
        farmRegistration: {
          name: formData.farmDocName || 'Land_Patta_Ownership_Deed.pdf',
          verified: false,
          date: 'Submitted Today'
        },
        bankDetails: {
          name: formData.bankDocName || 'Bank_Passbook_Cheque.pdf',
          verified: false,
          date: 'Submitted Today',
          account: formData.accountNumber ? formData.accountNumber.slice(-4) : 'XXXX',
          ifsc: formData.ifsc || 'SBIN0001234'
        },
        vetCertificate: {
          name: formData.vetDocName || 'Cattle_Health_Vaccination_Cert.pdf',
          verified: false,
          date: 'Submitted Today'
        }
      }
    };

    setFarmers(prev => [newFarmer, ...prev]);
    addNotification(
      'New Farmer Application Received!',
      `${newFarmer.farmName} (${newFarmer.name}) applied with 4 uploaded documents. Awaiting Admin verification.`,
      'info'
    );
    return newFarmer;
  };

  const approveFarmer = (farmerId) => {
    setFarmers(prev => prev.map(f => {
      if (f.id === farmerId) {
        addNotification(
          'Farmer Application Approved!',
          `${f.farmName} has been verified and approved as an official Milk Queen partner!`,
          'success'
        );
        return {
          ...f,
          status: 'Verified',
          documents: {
            ...f.documents,
            aadhaar: { ...f.documents.aadhaar, verified: true },
            farmRegistration: { ...f.documents.farmRegistration, verified: true },
            bankDetails: { ...f.documents.bankDetails, verified: true },
            vetCertificate: { ...f.documents.vetCertificate, verified: true }
          }
        };
      }
      return f;
    }));
  };

  const rejectFarmer = (farmerId, remarks = 'Documents could not be verified') => {
    setFarmers(prev => prev.map(f => {
      if (f.id === farmerId) {
        addNotification('Farmer Application Rejected', `${f.farmName} application was rejected: ${remarks}`, 'warning');
        return { ...f, status: 'Rejected', rejectionRemarks: remarks };
      }
      return f;
    }));
  };

  // 2. NEW DELIVERY PARTNER APPLICATION
  const registerDeliveryApplication = (formData) => {
    const newDpId = 'dp-' + Date.now();
    const newCode = `DP-00${deliveryPartners.length + 1}`;
    const newPartner = {
      id: newDpId,
      code: newCode,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      location: formData.location || 'Coimbatore Central',
      vehicleType: formData.vehicleType || 'Bike',
      vehicleModel: formData.vehicleModel || 'Two-Wheeler',
      vehicleNumber: formData.vehicleNumber || 'TN 37 AB 9999',
      licenseNumber: formData.licenseNumber || 'TN-37-20240009999',
      totalDeliveries: 0,
      rating: 5.0,
      status: 'Pending', // Pending admin KYC verification
      joinedDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      todayDeliveries: 0,
      todayEarnings: 0,
      avatar: formData.avatar || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
      bankAccount: {
        holder: formData.bankHolder || formData.name,
        bankName: formData.bankName || 'State Bank of India',
        accountNumber: formData.accountNumber || '8927162534',
        ifsc: formData.ifsc || 'SBIN0001928'
      },
      documents: {
        drivingLicense: { name: formData.licenseDocName || 'Driving_License_Front_Back.pdf', verified: false, date: 'Submitted Today' },
        rcBook: { name: formData.rcDocName || 'Vehicle_RC_Book_Copy.pdf', verified: false, date: 'Submitted Today' },
        aadhaar: { name: formData.aadhaarDocName || 'Aadhaar_Card_Rider.pdf', verified: false, date: 'Submitted Today' },
        bankPassbook: { name: formData.bankDocName || 'Bank_Passbook_Cheque.pdf', verified: false, date: 'Submitted Today' }
      }
    };

    setDeliveryPartners(prev => [newPartner, ...prev]);
    addNotification(
      'New Delivery Partner Application!',
      `${newPartner.name} applied as delivery rider with ${newPartner.vehicleType} (${newPartner.vehicleNumber}). Awaiting Admin verification.`,
      'info'
    );
    return newPartner;
  };

  const approveDeliveryPartner = (partnerId) => {
    setDeliveryPartners(prev => prev.map(dp => {
      if (dp.id === partnerId) {
        addNotification(
          'Delivery Partner Approved!',
          `${dp.name} (${dp.code}) is now verified and added to the active delivery fleet!`,
          'success'
        );
        return {
          ...dp,
          status: 'Active',
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

  // STEP 1: Farmer adds new dairy product
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
      farmerId: productData.farmerId || 'farmer-1',
      farmerName: productData.farmerName || 'Ramasamy Farm',
      farmLocation: productData.farmLocation || 'Kovai, Coimbatore',
      image: productData.image || 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80',
      description: productData.description || 'Freshly prepared pure dairy produce from our local farm.',
      sizes: [{ size: productData.unit || '500 ml', price: Number(productData.price) || 30 }],
      status: isApproved ? 'approved' : 'pending_approval',
      featured: false
    };

    setProducts(prev => [newProduct, ...prev]);
    addNotification(
      'Product Submitted',
      `${newProduct.name} submitted by ${newProduct.farmerName} and sent to Admin for approval.`,
      'info'
    );
    return newProduct;
  };

  // STEP 2: Admin approves product
  const approveProduct = (productId) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        addNotification('Product Approved!', `${p.name} is now live in the Customer catalog!`, 'success');
        return { ...p, status: 'approved' };
      }
      return p;
    }));
  };

  const rejectProduct = (productId) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, status: 'rejected' } : p));
    addNotification('Product Rejected', 'The submitted product was rejected by Admin.', 'warning');
  };

  const updateProduct = (productId, updates) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, ...updates } : p));
    addNotification('Product Updated', 'Product details saved successfully.', 'success');
  };

  const deleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    addNotification('Product Removed', 'Product was deleted from the catalog.', 'info');
  };

  // STEP 4: Customer places order
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
      paymentStatus: 'Paid',
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
    addNotification('New Order Placed!', `Order #${newOrderId} placed successfully for ₹${newOrder.grandTotal}.`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const updatedTimeline = order.timeline.map(t => {
          if (t.step === newStatus) {
            return { ...t, time: timeNow, completed: true };
          }
          if (newStatus === 'Confirmed' && t.step === 'Order Placed') return { ...t, completed: true };
          if (newStatus === 'Packed' && (t.step === 'Order Placed' || t.step === 'Confirmed')) return { ...t, completed: true };
          return t;
        });

        addNotification(
          'Order Status Updated',
          `Order #${orderId} marked as "${newStatus}".`,
          'info'
        );

        return {
          ...order,
          status: newStatus,
          timeline: updatedTimeline
        };
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

    addNotification(
      'Delivery Partner Assigned',
      `${partner.name} assigned to deliver Order #${orderId}.`,
      'info'
    );
  };

  const updateDeliveryStatus = (orderId, deliveryStep) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        let newStatus = order.status;
        let newEta = order.eta;

        if (deliveryStep === 'Picked Up') {
          newStatus = 'Packed';
          newEta = '25 mins';
        } else if (deliveryStep === 'Out for Delivery') {
          newStatus = 'Out for Delivery';
          newEta = '15 mins';
        } else if (deliveryStep === 'Delivered') {
          newStatus = 'Delivered';
          newEta = 'Delivered';
        }

        const updatedTimeline = order.timeline.map(t => {
          if (t.step === 'Out for Delivery' && deliveryStep === 'Out for Delivery') {
            return { ...t, time: timeNow, completed: true };
          }
          if (t.step === 'Delivered' && deliveryStep === 'Delivered') {
            return { ...t, time: timeNow, completed: true };
          }
          return t;
        });

        addNotification(
          'Delivery Update',
          `Order #${orderId} is now "${newStatus}"!`,
          deliveryStep === 'Delivered' ? 'success' : 'info'
        );

        return {
          ...order,
          status: newStatus,
          eta: newEta,
          timeline: updatedTimeline
        };
      }
      return order;
    }));
  };

  const addMilkRecord = (recordData) => {
    const newRecord = {
      id: 'rec-' + Date.now(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      cowId: recordData.cowId || 'C007',
      cowName: recordData.cowName || 'Kamadhenu',
      quantity: Number(recordData.quantity) || 15,
      fat: Number(recordData.fat) || 3.8,
      snf: Number(recordData.snf) || 8.5,
      quality: recordData.quality || 'Excellent',
      collectedBy: recordData.collectedBy || 'Ramasamy',
      date: 'Today'
    };
    setMilkRecords(prev => [newRecord, ...prev]);
    addNotification('Milk Collection Recorded', `${newRecord.quantity}L recorded from Cow ${newRecord.cowName} (${newRecord.cowId}).`, 'success');
  };

  const resetDemoData = () => {
    setProducts(initialProducts);
    setFarmers(initialFarmers);
    setOrders(initialOrders);
    setDeliveryPartners(initialDeliveryPartners);
    setCustomers(initialCustomers);
    localStorage.clear();
    addNotification('Demo Data Reset', 'All records have been reset to factory defaults.', 'info');
  };

  return (
    <AppContext.Provider value={{
      products,
      approvedProducts: products.filter(p => p.status === 'approved'),
      pendingProducts: products.filter(p => p.status === 'pending_approval'),
      farmers,
      pendingFarmers: farmers.filter(f => f.status === 'Pending'),
      verifiedFarmers: farmers.filter(f => f.status === 'Verified'),
      orders,
      deliveryPartners,
      pendingDeliveryPartners: deliveryPartners.filter(dp => dp.status === 'Pending'),
      activeDeliveryPartners: deliveryPartners.filter(dp => dp.status === 'Active' || dp.status === 'On Delivery'),
      customers,
      milkRecords,
      notifications,
      currentLocation,
      setCurrentLocation,
      addProduct,
      approveProduct,
      rejectProduct,
      updateProduct,
      deleteProduct,
      createOrder,
      updateOrderStatus,
      assignDeliveryPartner,
      updateDeliveryStatus,
      addMilkRecord,
      registerFarmerApplication,
      approveFarmer,
      rejectFarmer,
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
