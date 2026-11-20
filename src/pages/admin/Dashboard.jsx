import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  UserCheck,
  Package,
  ShoppingBag,
  CircleDollarSign,
  TrendingUp,
  Bike,
  Plus,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminDashboard() {
  const { customers, farmers, products, orders, deliveryPartners, pendingProducts } = useApp();

  return (
    <div className="space-y-8">
      
      {/* 1. Header & Welcome (Matches Page 9 & 17 in PDF) */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-[#146B3A] uppercase tracking-wider">Enterprise Overview</span>
          <h1 className="text-3xl font-extrabold text-gray-900 font-display">
            Welcome Back, Admin!
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Here's what's happening in your dairy marketplace today across Coimbatore.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/admin/products"
            className="flex items-center space-x-1.5 bg-[#146B3A] hover:bg-[#064E32] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow transition"
          >
            <Plus className="w-4 h-4" />
            <span>Manage Products</span>
          </Link>
          <Link
            to="/admin/orders"
            className="flex items-center space-x-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm transition"
          >
            <Bike className="w-4 h-4 text-[#146B3A]" />
            <span>Assign Deliveries</span>
          </Link>
        </div>
      </div>

      {/* Pending Product Approval Alert (STEP 2 in Workflow) */}
      {pendingProducts.length > 0 && (
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex items-center justify-between shadow-sm animate-pulse">
          <div className="flex items-center space-x-3 text-xs">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <strong className="text-amber-900 block">STEP 2 of Workflow: Farmer Product Awaiting Approval!</strong>
              <span className="text-amber-800">
                {pendingProducts.length} new product(s) submitted by farmers are waiting for your approval.
              </span>
            </div>
          </div>
          <Link
            to="/admin/products"
            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-1.5 rounded-xl text-xs font-bold shadow"
          >
            Review & Approve Now →
          </Link>
        </div>
      )}

      {/* 2. Top 5 Key Statistics Cards (Matches Page 9 & 17) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold">Total Customers</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900 font-display">1,248</h3>
          <span className="text-[11px] font-bold text-emerald-600 flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>+12% vs last month</span>
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold">Total Farmers</span>
            <UserCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900 font-display">86</h3>
          <span className="text-[11px] font-bold text-emerald-600 flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>+8% registered</span>
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold">Total Products</span>
            <Package className="w-4 h-4 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900 font-display">{products.length}</h3>
          <span className="text-[11px] font-bold text-emerald-600 flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>+16% catalog</span>
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold">Total Orders</span>
            <ShoppingBag className="w-4 h-4 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900 font-display">2,856</h3>
          <span className="text-[11px] font-bold text-emerald-600 flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>+22% demand</span>
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-1 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold">Total Revenue</span>
            <CircleDollarSign className="w-4 h-4 text-[#146B3A]" />
          </div>
          <h3 className="text-2xl font-extrabold text-[#146B3A] font-display">₹4,32,810</h3>
          <span className="text-[11px] font-bold text-emerald-600 flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>+28% month</span>
          </span>
        </div>

      </div>

      {/* 3. Sales Overview & Status Breakdown Charts (Matches Page 17) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sales Overview Line Curve (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-900 text-base font-display">Sales & Revenue Trend</h3>
              <p className="text-xs text-gray-400">Marketplace order volume over past 7 days</p>
            </div>
            <span className="text-xs font-bold text-[#146B3A] bg-emerald-50 px-2.5 py-1 rounded-xl">
              Last 7 Days ⌄
            </span>
          </div>

          {/* Stylized Trend Visualization */}
          <div className="h-56 flex items-end justify-between gap-3 pt-4 px-2">
            {[
              { day: '10 Nov', amt: '₹42,000', h: '45%' },
              { day: '11 Nov', amt: '₹54,000', h: '58%' },
              { day: '12 Nov', amt: '₹49,000', h: '52%' },
              { day: '13 Nov', amt: '₹68,000', h: '72%' },
              { day: '14 Nov', amt: '₹62,000', h: '66%' },
              { day: '15 Nov', amt: '₹84,000', h: '88%' },
              { day: 'Today', amt: '₹73,000', h: '80%' }
            ].map((d, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[10px] font-bold text-gray-500 opacity-0 group-hover:opacity-100 transition">
                  {d.amt}
                </span>
                <div className="w-full bg-emerald-50 rounded-xl h-44 flex items-end overflow-hidden p-1">
                  <div
                    style={{ height: d.h }}
                    className="w-full bg-[#146B3A] group-hover:bg-[#064E32] rounded-lg transition-all duration-500"
                  ></div>
                </div>
                <span className="text-[10px] font-medium text-gray-400 truncate">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Orders by Status (5 cols - Matches Page 17) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-900 text-base font-display">Orders by Status</h3>
            <p className="text-xs text-gray-400">Total 2,856 orders processed this month</p>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50">
              <span className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                <span className="font-semibold text-gray-700">Delivered</span>
              </span>
              <span className="font-extrabold text-gray-900">2,712 (95%)</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50">
              <span className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                <span className="font-semibold text-gray-700">Out for Delivery</span>
              </span>
              <span className="font-extrabold text-gray-900">32 (1%)</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50">
              <span className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span className="font-semibold text-gray-700">Packed / Confirmed</span>
              </span>
              <span className="font-extrabold text-gray-900">56 (2%)</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50">
              <span className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span className="font-semibold text-gray-700">Cancelled / Returned</span>
              </span>
              <span className="font-extrabold text-gray-900">16 (1%)</span>
            </div>
          </div>

          <Link
            to="/admin/orders"
            className="w-full text-center py-2.5 bg-emerald-50 text-[#146B3A] font-bold text-xs rounded-xl hover:bg-emerald-100 transition block"
          >
            Manage All Active Orders →
          </Link>
        </div>

      </div>

      {/* 4. Top Performing Farmers & Top Products (Matches Page 17) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Top Farmers */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <h3 className="font-bold text-gray-900 text-sm font-display">Top Performing Farmers</h3>
            <Link to="/admin/farmers" className="text-xs text-[#146B3A] font-bold hover:underline">
              View All 86 →
            </Link>
          </div>

          <div className="space-y-3">
            {farmers.slice(0, 4).map((f, idx) => (
              <div key={f.id} className="flex items-center justify-between text-xs p-2.5 rounded-xl hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-700 font-bold flex items-center justify-center text-[10px]">
                    {idx + 1}
                  </span>
                  <img src={f.avatar} alt={f.name} className="w-10 h-10 rounded-full object-cover border" />
                  <div>
                    <h5 className="font-bold text-gray-900">{f.farmName}</h5>
                    <p className="text-gray-400 text-[11px]">{f.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-emerald-800">{f.totalSupplied}</span>
                  <span className="text-[10px] text-gray-400 block">Supplied</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <h3 className="font-bold text-gray-900 text-sm font-display">Top Selling Products</h3>
            <Link to="/admin/products" className="text-xs text-[#146B3A] font-bold hover:underline">
              View Catalog →
            </Link>
          </div>

          <div className="space-y-3">
            {products.slice(0, 4).map((p, idx) => (
              <div key={p.id} className="flex items-center justify-between text-xs p-2.5 rounded-xl hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-700 font-bold flex items-center justify-center text-[10px]">
                    {idx + 1}
                  </span>
                  <img src={p.image} alt={p.name} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <h5 className="font-bold text-gray-900">{p.name}</h5>
                    <p className="text-gray-400 text-[11px]">{p.unit} • ₹{p.price}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-[#146B3A]">1,248 Sold</span>
                  <span className="text-[10px] text-emerald-600 block">★ {p.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
