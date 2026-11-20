import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  CircleDollarSign,
  Package,
  Users,
  Plus,
  Milk,
  TrendingUp,
  Clock,
  ArrowRight,
  Bell,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export default function FarmerDashboard() {
  const { products, orders, milkRecords } = useApp();
  const { currentUser } = useAuth();

  const [earningsRange, setEarningsRange] = useState('7d'); // '7d' | '30d' | 'month'

  const farmerProducts = products.filter(p => p.farmerId === currentUser?.id || p.farmerName === currentUser?.farmName || p.farmerName === 'Ramasamy Farm');
  const recentOrders = orders.slice(0, 4);

  // Today's total litres collected
  const todayLitres = milkRecords.reduce((sum, r) => sum + r.quantity, 0);

  return (
    <div className="space-y-8">
      
      {/* 1. Welcome Farm Card (Matches Page 6 in PDF) */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#064E32] to-[#146B3A] text-white p-6 sm:p-8 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
          <div className="md:col-span-8 flex items-center space-x-4">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80'}
              alt="Farmer"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400 shadow-md shrink-0"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-green-200">Welcome Back,</span>
                <span className="bg-emerald-500/30 text-emerald-300 font-bold px-2 py-0.5 rounded-full text-[10px]">
                  Verified Farmer
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
                {currentUser?.farmName || 'Ramasamy Farm'}
              </h1>
              <p className="text-xs text-green-100 mt-1">
                Kovai, Coimbatore • Supplying pure fresh dairy since 2016
              </p>
            </div>
          </div>

          <div className="md:col-span-4 flex md:justify-end space-x-3">
            <Link
              to="/farmer/add-product"
              className="flex items-center space-x-1.5 bg-white text-[#064E32] hover:bg-emerald-50 px-4 py-2.5 rounded-xl font-bold text-xs shadow transition"
            >
              <Plus className="w-4 h-4 text-[#146B3A]" />
              <span>Add New Product</span>
            </Link>

            <Link
              to="/farmer/milk-collection"
              className="flex items-center space-x-1.5 bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-400/40 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition"
            >
              <Milk className="w-4 h-4 text-emerald-300" />
              <span>Record Milk</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Overview Stat Cards (Matches Page 6) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Today's Orders */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold">Today's Orders</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#146B3A] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900 font-display">12</h3>
          <span className="text-[11px] font-bold text-emerald-600 flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>+33% vs yesterday</span>
          </span>
        </div>

        {/* Today's Earnings */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold">Today's Earnings</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#146B3A] flex items-center justify-center">
              <CircleDollarSign className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-extrabold text-[#146B3A] font-display">₹1,480</h3>
          <span className="text-[11px] font-bold text-emerald-600 flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>+28% vs yesterday</span>
          </span>
        </div>

        {/* Total Products */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold">Total Products</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#146B3A] flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900 font-display">{farmerProducts.length || 6}</h3>
          <span className="text-[11px] font-semibold text-gray-400">
            {farmerProducts.filter(p => p.status === 'approved').length || 4} Active in store
          </span>
        </div>

        {/* Total Customers */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold">Total Customers</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#146B3A] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900 font-display">128</h3>
          <span className="text-[11px] font-bold text-emerald-600 flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>+12% this month</span>
          </span>
        </div>

      </div>

      {/* 3. Charts Section: Earnings & Orders Trend (Matches Page 6) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Earnings Bar Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-900 text-base font-display">Earnings Overview</h3>
              <p className="text-xs text-gray-400">Daily revenue from milk & dairy products</p>
            </div>
            <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-xl text-xs">
              {['7 Days', '30 Days', 'This Month'].map((tab) => (
                <button
                  key={tab}
                  className="px-2.5 py-1 rounded-lg font-semibold text-gray-700 hover:text-black hover:bg-white transition"
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Stylized Bar Chart */}
          <div className="h-56 flex items-end justify-between gap-3 pt-6 px-2">
            {[
              { day: '10 Nov', amount: '₹1,200', h: '45%' },
              { day: '11 Nov', amount: '₹1,450', h: '60%' },
              { day: '12 Nov', amount: '₹1,180', h: '40%' },
              { day: '13 Nov', amount: '₹1,820', h: '75%' },
              { day: '14 Nov', amount: '₹1,650', h: '65%' },
              { day: '15 Nov', amount: '₹2,100', h: '90%' },
              { day: 'Today', amount: '₹1,480', h: '55%' }
            ].map((col, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[10px] font-bold text-gray-500 opacity-0 group-hover:opacity-100 transition">
                  {col.amount}
                </span>
                <div className="w-full bg-emerald-50 rounded-xl h-44 flex items-end overflow-hidden p-1">
                  <div
                    style={{ height: col.h }}
                    className="w-full bg-[#146B3A] group-hover:bg-[#064E32] rounded-lg transition-all duration-500"
                  ></div>
                </div>
                <span className="text-[10px] font-medium text-gray-400 truncate">{col.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Orders Overview & Announcements (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Recent Orders Box */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-sm font-display">Recent Incoming Orders</h3>
              <Link to="/farmer/orders" className="text-xs text-[#146B3A] font-bold hover:underline">
                View All →
              </Link>
            </div>

            <div className="space-y-3">
              {recentOrders.map((ord) => (
                <div key={ord.id} className="flex items-center justify-between text-xs p-2.5 rounded-xl hover:bg-gray-50 transition">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#146B3A] flex items-center justify-center font-bold">
                      #{ord.id.slice(-3)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">Order #{ord.id}</p>
                      <p className="text-[10px] text-gray-400">{ord.customerName} • {ord.items.length} items</p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    ord.status === 'Delivered'
                      ? 'bg-emerald-100 text-[#146B3A]'
                      : ord.status === 'Packed'
                      ? 'bg-blue-100 text-blue-900'
                      : 'bg-amber-100 text-amber-900'
                  }`}>
                    {ord.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements Card (Matches Page 6) */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-3">
            <h4 className="font-bold text-gray-900 text-sm font-display">Announcements</h4>
            <div className="space-y-2 text-xs">
              <div className="bg-emerald-50/60 p-3 rounded-2xl border border-emerald-100">
                <p className="font-bold text-emerald-950">🔥 High Demand for Fresh Cow Milk</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Keep inventory updated for morning 6:00 AM dispatch.</p>
              </div>
              <div className="bg-stone-50 p-3 rounded-2xl border border-gray-200">
                <p className="font-bold text-gray-900">⭐ Featured Farmer of the Month</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Ramasamy Farm is highlighted on the customer homepage!</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 4. Farmer's Products Quick Grid (Matches Page 6) */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h3 className="font-bold text-gray-900 text-lg font-display">My Live Products</h3>
            <p className="text-xs text-gray-400">Manage pricing and current stock levels</p>
          </div>
          <Link to="/farmer/products" className="text-xs font-bold text-[#146B3A] hover:underline">
            Manage All Products →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {farmerProducts.slice(0, 6).map((p) => (
            <div key={p.id} className="p-3 rounded-2xl border border-gray-100 hover:shadow-md transition text-center space-y-2">
              <img src={p.image} alt={p.name} className="w-full aspect-square rounded-xl object-cover" />
              <h5 className="font-bold text-gray-900 text-xs truncate">{p.name}</h5>
              <p className="text-xs font-extrabold text-[#146B3A]">₹{p.price} <span className="text-[10px] text-gray-400">/ {p.unit}</span></p>
              <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1 border-t">
                <span className="text-emerald-700 font-bold">● Active</span>
                <span>Stock: {p.stock}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
