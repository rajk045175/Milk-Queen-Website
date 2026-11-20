import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import WorkflowDemoBanner from '../components/WorkflowDemoBanner';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import {
  Bell,
  Bike,
  CheckCircle2,
  Phone,
  MapPin,
  ExternalLink,
  Power
} from 'lucide-react';

export default function DeliveryLayout({ children }) {
  const { currentUser, switchRole } = useAuth();
  const { notifications, orders } = useApp();
  const [isOnline, setIsOnline] = useState(true);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const navigate = useNavigate();

  const assignedOrders = orders.filter(o => o.assignedPartnerId === currentUser?.id || o.status === 'Out for Delivery');

  return (
    <div className="flex min-h-screen bg-[#F8F7EF]">
      {/* Sidebar */}
      <Sidebar role="delivery" />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Delivery Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 shadow-sm">
          
          <div className="flex items-center space-x-4">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80'}
              alt="Rider"
              className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold text-gray-900">
                  {currentUser?.name || 'Karthik S'}
                </h2>
                <span className="text-xs bg-emerald-100 text-[#146B3A] font-semibold px-2 py-0.5 rounded-full">
                  {currentUser?.code || 'DP-002'}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Vehicle: {currentUser?.vehicleNumber || 'TN 37 CD 5678'} • Coimbatore Zone
              </p>
            </div>
          </div>

          {/* Controls & Quick Switch */}
          <div className="flex items-center space-x-3">
            
            {/* Quick Demo Switcher */}
            <select
              value="delivery"
              onChange={(e) => {
                switchRole(e.target.value);
                if (e.target.value === 'customer') navigate('/');
                if (e.target.value === 'farmer') navigate('/farmer/dashboard');
                if (e.target.value === 'admin') navigate('/admin/dashboard');
              }}
              className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 font-semibold text-gray-700"
            >
              <option value="delivery">Delivery View</option>
              <option value="customer">Switch to Customer</option>
              <option value="farmer">Switch to Farmer</option>
              <option value="admin">Switch to Admin</option>
            </select>

            {/* Online/Offline Toggle */}
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition shadow-sm ${
                isOnline
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              <Power className="w-3.5 h-3.5" />
              <span>{isOnline ? 'Online • Ready for Pickups' : 'Offline'}</span>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifMenu(!showNotifMenu)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl relative transition"
              >
                <Bell className="w-5 h-5" />
                <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-1.5 right-1.5"></span>
              </button>

              {showNotifMenu && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 z-50">
                  <h4 className="text-xs font-bold text-gray-700 px-2 py-1 uppercase tracking-wider">Rider Alerts</h4>
                  <div className="divide-y divide-gray-100 mt-1 max-h-60 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className="py-2 px-2 text-xs">
                        <p className="font-bold text-gray-800">{n.title}</p>
                        <p className="text-gray-500 text-[11px] mt-0.5">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/"
              target="_blank"
              className="p-2 text-gray-400 hover:text-[#146B3A] hover:bg-gray-100 rounded-xl transition"
              title="Open Storefront"
            >
              <ExternalLink className="w-5 h-5" />
            </Link>

          </div>
        </header>

        {/* Dynamic Delivery Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>

        <WorkflowDemoBanner />
      </div>
    </div>
  );
}
