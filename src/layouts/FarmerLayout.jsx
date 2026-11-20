import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import WorkflowDemoBanner from '../components/WorkflowDemoBanner';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import {
  Bell,
  Plus,
  Milk,
  CheckCircle2,
  Calendar,
  Search,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export default function FarmerLayout({ children }) {
  const { currentUser, switchRole } = useAuth();
  const { notifications } = useApp();
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-[#F8F7EF]">
      {/* Sidebar */}
      <Sidebar role="farmer" />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Farmer Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 shadow-sm">
          
          <div className="flex items-center space-x-4">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80'}
              alt="Farmer"
              className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold text-gray-900">{currentUser?.farmName || 'Ramasamy Farm'}</h2>
                <span className="flex items-center space-x-1 text-[11px] bg-emerald-50 text-[#146B3A] font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-[#146B3A]" />
                  <span>Verified Farmer</span>
                </span>
              </div>
              <p className="text-xs text-gray-500">
                {currentUser?.location || 'Kovai, Coimbatore'} • Fresh Milk & Pure Dairy Partner
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center space-x-3">
            
            {/* Quick Demo Switcher */}
            <select
              value="farmer"
              onChange={(e) => {
                switchRole(e.target.value);
                if (e.target.value === 'customer') navigate('/');
                if (e.target.value === 'admin') navigate('/admin/dashboard');
                if (e.target.value === 'delivery') navigate('/delivery/dashboard');
              }}
              className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 font-semibold text-gray-700"
            >
              <option value="farmer">Farmer View</option>
              <option value="customer">Switch to Customer</option>
              <option value="admin">Switch to Admin</option>
              <option value="delivery">Switch to Delivery</option>
            </select>

            <Link
              to="/farmer/add-product"
              className="flex items-center space-x-1.5 bg-[#146B3A] hover:bg-[#064E32] text-white px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </Link>

            <Link
              to="/farmer/milk-collection"
              className="flex items-center space-x-1.5 bg-emerald-50 hover:bg-emerald-100 text-[#146B3A] border border-emerald-200 px-3.5 py-2 rounded-xl text-xs font-bold transition"
            >
              <Milk className="w-4 h-4" />
              <span>Record Milk</span>
            </Link>

            {/* Notification Bell */}
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
                  <h4 className="text-xs font-bold text-gray-700 px-2 py-1 uppercase tracking-wider">Farmer Alerts</h4>
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
              title="View Customer Storefront"
            >
              <ExternalLink className="w-5 h-5" />
            </Link>

          </div>
        </header>

        {/* Dynamic Farmer Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>

        <WorkflowDemoBanner />
      </div>
    </div>
  );
}
