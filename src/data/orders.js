export const initialOrders = [
  {
    id: 'DC10248',
    customerName: 'Priya S',
    customerEmail: 'priya.s@gmail.com',
    customerPhone: '+91 98765 43210',
    deliveryAddress: '12, R.S. Puram Main Road, Coimbatore - 641002',
    deliverySlot: 'Today, 10:00 AM - 12:00 PM',
    deliveryDate: 'Today',
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    status: 'Out for Delivery', // 'Order Placed', 'Confirmed', 'Packed', 'Out for Delivery', 'Delivered'
    date: '19 Nov 2026, 09:24 AM',
    items: [
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
    ],
    itemTotal: 188,
    deliveryCharge: 20,
    platformFee: 5,
    discount: 0,
    grandTotal: 213,
    assignedPartnerId: 'dp-2',
    assignedPartnerName: 'Karthik S',
    assignedPartnerPhone: '+91 98765 43211',
    assignedPartnerVehicle: 'Scooter (TN 37 CD 5678)',
    assignedPartnerAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=400&q=80',
    timeline: [
      { step: 'Order Placed', time: '09:24 AM', completed: true },
      { step: 'Confirmed', time: '09:30 AM', completed: true },
      { step: 'Packed', time: '09:45 AM', completed: true },
      { step: 'Out for Delivery', time: '10:10 AM', completed: true },
      { step: 'Delivered', time: 'Pending (ETA 15 mins)', completed: false }
    ],
    eta: '15 mins',
    routeCoordinates: {
      hub: { lat: 11.0168, lng: 76.9558, name: 'Komagan Central Hub, RS Puram' },
      rider: { lat: 11.0205, lng: 76.9620, name: 'Karthik (Rider)' },
      destination: { lat: 11.0280, lng: 76.9700, name: '12, R.S. Puram Main Road' }
    }
  },
  {
    id: 'DC10247',
    customerName: 'Divya S',
    customerEmail: 'divya@gmail.com',
    customerPhone: '+91 98765 43215',
    deliveryAddress: '88, Alagesan Road, Saibaba Colony, Coimbatore - 641011',
    deliverySlot: 'Today, 08:00 AM - 10:00 AM',
    deliveryDate: 'Today',
    paymentMethod: 'Credit / Debit Card',
    paymentStatus: 'Paid',
    status: 'Packed',
    date: '19 Nov 2026, 08:40 AM',
    items: [
      {
        id: 'prod-5',
        name: 'Fresh Curd',
        unit: '200 g',
        price: 40,
        quantity: 2,
        image: '/images/products/fresh-curd.jpg'
      },
      {
        id: 'prod-4',
        name: 'Fresh Paneer',
        unit: '200 g',
        price: 120,
        quantity: 1,
        image: '/images/products/fresh-paneer.jpg'
      }
    ],
    itemTotal: 200,
    deliveryCharge: 0,
    platformFee: 5,
    discount: 25,
    grandTotal: 180,
    assignedPartnerId: 'dp-1',
    assignedPartnerName: 'Arun Kumar',
    assignedPartnerPhone: '+91 98765 43210',
    assignedPartnerVehicle: 'Bike (TN 37 AB 1234)',
    assignedPartnerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    timeline: [
      { step: 'Order Placed', time: '08:40 AM', completed: true },
      { step: 'Confirmed', time: '08:48 AM', completed: true },
      { step: 'Packed', time: '09:15 AM', completed: true },
      { step: 'Out for Delivery', time: 'Pending', completed: false },
      { step: 'Delivered', time: 'Pending', completed: false }
    ],
    eta: '30 mins'
  },
  {
    id: 'DC10246',
    customerName: 'Karthik R',
    customerEmail: 'karthik.r@gmail.com',
    customerPhone: '+91 98765 43219',
    deliveryAddress: '34, Gandhipuram 4th Street, Coimbatore',
    deliverySlot: 'Yesterday, 06:00 PM - 08:00 PM',
    deliveryDate: 'Yesterday',
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    status: 'Delivered',
    date: '18 Nov 2026, 05:30 PM',
    items: [
      {
        id: 'prod-2',
        name: 'A2 Cow Milk',
        unit: '500 ml',
        price: 35,
        quantity: 2,
        image: '/images/products/a2-cow-milk.jpg'
      },
      {
        id: 'prod-6',
        name: 'Pure Cow Ghee',
        unit: '500 g',
        price: 480,
        quantity: 1,
        image: '/images/products/pure-cow-ghee.jpg'
      }
    ],
    itemTotal: 550,
    deliveryCharge: 0,
    platformFee: 5,
    discount: 50,
    grandTotal: 505,
    assignedPartnerId: 'dp-2',
    assignedPartnerName: 'Karthik S',
    assignedPartnerPhone: '+91 98765 43211',
    assignedPartnerVehicle: 'Scooter (TN 37 CD 5678)',
    assignedPartnerAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=400&q=80',
    timeline: [
      { step: 'Order Placed', time: '05:30 PM', completed: true },
      { step: 'Confirmed', time: '05:40 PM', completed: true },
      { step: 'Packed', time: '06:00 PM', completed: true },
      { step: 'Out for Delivery', time: '06:20 PM', completed: true },
      { step: 'Delivered', time: '06:55 PM', completed: true }
    ],
    eta: 'Delivered'
  }
];
