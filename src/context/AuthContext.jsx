import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const demoAccounts = {
  customer: {
    id: 'cust-1',
    role: 'customer',
    name: 'Priya S',
    email: 'priya.s@gmail.com',
    phone: '+91 98765 43210',
    address: '12, R.S. Puram Main Road, Coimbatore',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80'
  },
  farmer: {
    id: 'farmer-1',
    role: 'farmer',
    name: 'Ramasamy',
    farmName: 'Ramasamy Farm',
    email: 'ramasamyfarm@gmail.com',
    phone: '+91 98765 43210',
    location: 'Kovai, Coimbatore',
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80'
  },
  admin: {
    id: 'admin-1',
    role: 'admin',
    name: 'Admin',
    roleTitle: 'Super Admin',
    organization: 'CraffixWeb Technologies',
    email: 'admin@dairyconnect.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80'
  },
  delivery: {
    id: 'dp-2',
    role: 'delivery',
    code: 'DP-002',
    name: 'Karthik S',
    email: 'karthik.dp@dairyconnect.com',
    phone: '+91 98765 43211',
    vehicleNumber: 'TN 37 CD 5678',
    vehicleType: 'Scooter',
    rating: 4.8,
    isOnline: true,
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=300&q=80'
  }
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('dc_current_user');
    return saved ? JSON.parse(saved) : demoAccounts.customer;
  });

  useEffect(() => {
    localStorage.setItem('dc_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  const switchRole = (roleKey) => {
    if (demoAccounts[roleKey]) {
      setCurrentUser(demoAccounts[roleKey]);
    }
  };

  const login = (roleKey, customData = null) => {
    const account = customData || demoAccounts[roleKey] || demoAccounts.customer;
    setCurrentUser(account);
    return account;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, switchRole, login, logout, demoAccounts }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
