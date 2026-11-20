import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  User,
  MapPin,
  ShoppingBag,
  Heart,
  CalendarCheck,
  Bell,
  Settings,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useApp } from '../../context/AppContext';
import ProductCard from '../../components/ProductCard';

export default function Profile() {
  const { currentUser, logout } = useAuth();
  const { wishlist, addToCart } = useCart();
  const { approvedProducts, orders } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get('tab') || 'profile';

  const [addresses, setAddresses] = useState([
    {
      id: 'addr-1',
      label: 'Home (Default)',
      street: '12, R.S. Puram Main Road',
      city: 'Coimbatore - 641002',
      phone: '+91 98765 43210'
    },
    {
      id: 'addr-2',
      label: 'Work / Office',
      street: 'CraffixWeb Technologies, Tatabad',
      city: 'Coimbatore - 641012',
      phone: '+91 98765 43210'
    }
  ]);

  const wishlistedProducts = approvedProducts.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80'}
            alt="User"
            className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500 shadow"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{currentUser?.name || 'Priya S'}</h1>
            <p className="text-xs text-gray-500">{currentUser?.email} • {currentUser?.phone}</p>
            <span className="inline-block mt-1 text-[11px] font-bold text-[#146B3A] bg-emerald-50 px-2.5 py-0.5 rounded-full">
              DairyConnect Gold Member
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/orders"
            className="bg-[#146B3A] hover:bg-[#064E32] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-sm"
          >
            Track Active Orders
          </Link>
          <button
            onClick={logout}
            className="p-2.5 rounded-xl text-rose-600 hover:bg-rose-50 border border-gray-200 transition"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Tab Buttons (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-3 border border-gray-100 shadow-sm space-y-1">
          {[
            { id: 'profile', label: 'My Account', icon: User },
            { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
            { id: 'wishlist', label: 'My Wishlist', icon: Heart, count: wishlist.length },
            { id: 'orders', label: 'Order History', icon: ShoppingBag, count: orders.length },
            { id: 'subscription', label: 'Daily Milk Subscriptions', icon: CalendarCheck }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSearchParams({ tab: tab.id })}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? 'bg-[#EAF5EC] text-[#146B3A] font-bold'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
                {tab.count !== undefined && (
                  <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-gray-200">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Tab Content (9 cols) */}
        <div className="lg:col-span-9">
          
          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 font-display">
                My Saved Wishlist ({wishlistedProducts.length})
              </h3>
              {wishlistedProducts.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
                  <Heart className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm font-bold text-gray-700">Your wishlist is currently empty</p>
                  <Link to="/products" className="text-xs font-bold text-[#146B3A] mt-2 inline-block hover:underline">
                    Browse farm milk & paneer →
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {wishlistedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Saved Addresses Tab */}
          {activeTab === 'addresses' && (
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 font-display">Saved Addresses</h3>
                <button
                  onClick={() => alert('New address modal')}
                  className="text-xs font-bold text-[#146B3A] bg-emerald-50 px-3 py-1.5 rounded-xl hover:bg-emerald-100 transition flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div key={addr.id} className="p-4 rounded-2xl border border-gray-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900 text-sm">{addr.label}</span>
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 font-bold px-2 py-0.5 rounded-full">
                        Verified
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{addr.street}</p>
                    <p className="text-xs text-gray-500">{addr.city}</p>
                    <p className="text-xs text-gray-500 font-medium">Contact: {addr.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Profile / Account Details */}
          {(activeTab === 'profile' || activeTab === 'orders' || activeTab === 'subscription') && (
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-gray-900 font-display pb-3 border-b border-gray-100">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-gray-400 font-medium block">Full Name</label>
                  <input
                    type="text"
                    defaultValue={currentUser?.name || 'Priya S'}
                    className="mt-1 w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 font-semibold"
                  />
                </div>
                <div>
                  <label className="text-gray-400 font-medium block">Email Address</label>
                  <input
                    type="email"
                    defaultValue={currentUser?.email || 'priya.s@gmail.com'}
                    className="mt-1 w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 font-semibold"
                  />
                </div>
                <div>
                  <label className="text-gray-400 font-medium block">Phone Number</label>
                  <input
                    type="text"
                    defaultValue={currentUser?.phone || '+91 98765 43210'}
                    className="mt-1 w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 font-semibold"
                  />
                </div>
                <div>
                  <label className="text-gray-400 font-medium block">Preferred Delivery City</label>
                  <input
                    type="text"
                    defaultValue="Coimbatore (RS Puram)"
                    className="mt-1 w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 font-semibold"
                  />
                </div>
              </div>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => alert('Profile updated successfully!')}
                  className="bg-[#146B3A] hover:bg-[#064E32] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow transition"
                >
                  Save Profile Changes
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
