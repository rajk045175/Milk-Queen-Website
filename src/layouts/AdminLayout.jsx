import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import WorkflowDemoBanner from '../components/WorkflowDemoBanner';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import {
  Bell,
  Search,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Plus,
  Truck,
  Package
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const { currentUser, switchRole } = useAuth();
  const { notifications, pendingProducts, orders } = useApp();
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const navigate = useNavigate();

  const handleGlobalSearch = (e) => {
    e.preventDefault();
    if (globalSearch.trim()) {
      navigate(`/admin/orders?q=${encodeURIComponent(globalSearch.trim())}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8F7EF]">
      {/* Sidebar */}
      <Sidebar role="admin" />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Admin Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 shadow-sm">
          
          {/* Global Search Bar */}
          <form onSubmit={handleGlobalSearch} className="relative flex-1 max-w-md hidden sm:block">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search customers, orders, products..."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#146B3A] focus:bg-white transition"
            />
          </form>

          {/* Admin Profile & Actions */}
          <div className="flex items-center space-x-3 ml-auto">
            
            {/* Quick Demo Switcher */}
            <select
              value="admin"
              onChange={(e) => {
                switchRole(e.target.value);
                if (e.target.value === 'customer') navigate('/');
                if (e.target.value === 'delivery') navigate('/delivery/dashboard');
              }}
              className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 font-semibold text-gray-700"
            >
              <option value="admin">Admin View</option>
              <option value="customer">Switch to Customer</option>
              <option value="delivery">Switch to Delivery</option>
            </select>

            {pendingProducts.length > 0 && (
              <Link
                to="/admin/products"
                className="hidden md:flex items-center space-x-1.5 bg-amber-50 text-amber-800 border border-amber-300 px-3 py-1.5 rounded-xl text-xs font-bold"
              >
                <Package className="w-3.5 h-3.5 text-amber-600" />
                <span>{pendingProducts.length} Pending Approval</span>
              </Link>
            )}

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
                  <h4 className="text-xs font-bold text-gray-700 px-2 py-1 uppercase tracking-wider">System Activity</h4>
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

            {/* Admin User Info */}
            <div className="flex items-center space-x-2 pl-2 border-l border-gray-200">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'}
                alt="Admin"
                className="w-9 h-9 rounded-full object-cover border border-gray-200"
              />
              <div className="hidden lg:block text-left">
                <p className="text-xs font-bold text-gray-800 leading-tight">Admin</p>
                <p className="text-[10px] text-gray-400">Super Admin</p>
              </div>
            </div>

            <Link
              to="/"
              target="_blank"
              className="p-2 text-gray-400 hover:text-[#146B3A] hover:bg-gray-100 rounded-xl transition"
              title="Open Customer Storefront"
            >
              <ExternalLink className="w-5 h-5" />
            </Link>

          </div>
        </header>

        {/* Dynamic Admin Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>

        <WorkflowDemoBanner />
      </div>
    </div>
  );
}
