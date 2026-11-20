export const initialCustomers = [
  {
    id: 'cust-1',
    name: 'Priya S',
    email: 'priya.s@gmail.com',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    totalOrders: 12,
    totalSpent: 4280,
    status: 'Active',
    joinedDate: '15 Dec 2025',
    addresses: [
      {
        id: 'addr-1',
        type: 'Home',
        isDefault: true,
        street: '12, R.S. Puram Main Road',
        landmark: 'Near DB Road Signal',
        city: 'Coimbatore',
        pincode: '641002',
        phone: '+91 98765 43210'
      },
      {
        id: 'addr-2',
        type: 'Work',
        isDefault: false,
        street: 'CraffixWeb Technologies, Tatabad',
        landmark: 'Near Bus Stand',
        city: 'Coimbatore',
        pincode: '641012',
        phone: '+91 98765 43210'
      }
    ]
  },
  {
    id: 'cust-2',
    name: 'Arun Kumar',
    email: 'arunk@gmail.com',
    phone: '+91 98765 43214',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    totalOrders: 8,
    totalSpent: 2890,
    status: 'Active',
    joinedDate: '02 Jan 2026',
    addresses: [
      {
        id: 'addr-3',
        type: 'Home',
        isDefault: true,
        street: '45, Cross Cut Road, Gandhipuram',
        landmark: 'Opposite GRT',
        city: 'Coimbatore',
        pincode: '641012',
        phone: '+91 98765 43214'
      }
    ]
  },
  {
    id: 'cust-3',
    name: 'Divya S',
    email: 'divya@gmail.com',
    phone: '+91 98765 43215',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    totalOrders: 15,
    totalSpent: 5120,
    status: 'Active',
    joinedDate: '10 Jan 2026',
    addresses: [
      {
        id: 'addr-4',
        type: 'Home',
        isDefault: true,
        street: '88, Alagesan Road, Saibaba Colony',
        landmark: 'Near KV School',
        city: 'Coimbatore',
        pincode: '641011',
        phone: '+91 98765 43215'
      }
    ]
  }
];
