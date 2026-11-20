import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Filter,
  CheckCircle2,
  Bike,
  Clock,
  ArrowRight,
  Eye,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminOrders() {
  const { orders, deliveryPartners, assignDeliveryPartner, updateOrderStatus } = useApp();

  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedOrderForAssign, setSelectedOrderForAssign] = useState(null);

  const filtered = orders.filter((o) => {
    const matchesSearch = o.id.toLowerCase().includes(search.toLowerCase()) || o.customerName.toLowerCase().includes(search.toLowerCase());
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'pending') return matchesSearch && (o.status === 'Order Placed' || o.status === 'Confirmed');
    if (activeTab === 'packed') return matchesSearch && o.status === 'Packed';
    if (activeTab === 'out-for-delivery') return matchesSearch && o.status === 'Out for Delivery';
    if (activeTab === 'delivered') return matchesSearch && o.status === 'Delivered';
    return matchesSearch;
  });

  const handleAssign = (orderId, partnerId) => {
    assignDeliveryPartner(orderId, partnerId);
    setSelectedOrderForAssign(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Stats (Matches Page 16 in PDF) */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-display">
            Order Fulfillment & Dispatch
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Step 7: Assign available delivery riders, monitor real-time packing, and dispatch shipments
          </p>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-400 font-semibold block">Total Orders</span>
          <h3 className="text-2xl font-extrabold text-gray-900 font-display mt-1">{orders.length}</h3>
          <span className="text-[11px] text-emerald-600 font-bold">● Active Marketplace</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-400 font-semibold block">Need Delivery Partner</span>
          <h3 className="text-2xl font-extrabold text-amber-700 font-display mt-1">
            {orders.filter(o => !o.assignedPartnerId || o.assignedPartnerName === 'Unassigned').length}
          </h3>
          <span className="text-[11px] text-amber-700 font-bold">Action Required</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-400 font-semibold block">Out for Delivery</span>
          <h3 className="text-2xl font-extrabold text-blue-700 font-display mt-1">
            {orders.filter(o => o.status === 'Out for Delivery').length}
          </h3>
          <span className="text-[11px] text-blue-600">Live GPS tracking</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-400 font-semibold block">Delivered Orders</span>
          <h3 className="text-2xl font-extrabold text-emerald-700 font-display mt-1">
            {orders.filter(o => o.status === 'Delivered').length}
          </h3>
          <span className="text-[11px] text-emerald-600">Completed 100%</span>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-xl text-xs overflow-x-auto w-full sm:w-auto">
          {[
            { id: 'all', label: 'All Orders' },
            { id: 'pending', label: 'Pending' },
            { id: 'packed', label: 'Packed & Ready' },
            { id: 'out-for-delivery', label: 'Out for Delivery' },
            { id: 'delivered', label: 'Delivered' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-bold transition shrink-0 ${
                activeTab === tab.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Order ID or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-gray-50 border border-gray-200"
          />
        </div>
      </div>

      {/* Orders Table (Matches Page 16 in PDF) */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-400 uppercase text-[10px] tracking-wider border-b border-gray-100">
              <tr>
                <th className="py-3 px-4 font-bold">Order ID</th>
                <th className="py-3 px-4 font-bold">Customer</th>
                <th className="py-3 px-4 font-bold">Items</th>
                <th className="py-3 px-4 font-bold">Total</th>
                <th className="py-3 px-4 font-bold">Payment</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold">Assigned Rider</th>
                <th className="py-3 px-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((ord) => (
                <tr key={ord.id} className="hover:bg-gray-50/70 transition">
                  <td className="py-3.5 px-4 font-bold text-gray-900">#{ord.id}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-gray-800">{ord.customerName}</span>
                    <span className="text-[10px] text-gray-400 block truncate max-w-[150px]">{ord.deliveryAddress}</span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600">
                    <span className="font-semibold">{ord.items.length} items</span>
                    <span className="text-[10px] text-gray-400 block truncate max-w-[160px]">
                      {ord.items.map(i => i.name).join(', ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-[#146B3A] font-display text-sm">
                    ₹{ord.grandTotal}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-gray-700">{ord.paymentMethod}</span>
                    <span className="text-[10px] text-emerald-700 block font-semibold">● Paid</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      ord.status === 'Delivered'
                        ? 'bg-emerald-100 text-[#146B3A]'
                        : ord.status === 'Out for Delivery'
                        ? 'bg-blue-100 text-blue-900'
                        : 'bg-amber-100 text-amber-900'
                    }`}>
                      {ord.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    {ord.assignedPartnerName && ord.assignedPartnerName !== 'Unassigned' ? (
                      <div className="flex items-center space-x-2">
                        <img src={ord.assignedPartnerAvatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                        <div>
                          <span className="font-bold text-gray-800 text-[11px] block">{ord.assignedPartnerName}</span>
                          <span className="text-[9px] text-gray-400">{ord.assignedPartnerVehicle}</span>
                        </div>
                      </div>
                    ) : (
                      <span className="text-[11px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-md">
                        Unassigned
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedOrderForAssign(ord)}
                      className="px-3 py-1.5 bg-[#146B3A] hover:bg-[#064E32] text-white font-bold rounded-xl text-xs transition shadow-sm"
                    >
                      Assign Rider
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assign Delivery Partner Modal (STEP 7 in Workflow) */}
      {selectedOrderForAssign && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-gray-900 text-base">
              Assign Delivery Partner to Order #{selectedOrderForAssign.id}
            </h3>
            <p className="text-xs text-gray-500">
              Delivery to {selectedOrderForAssign.customerName} ({selectedOrderForAssign.deliveryAddress})
            </p>

            <div className="space-y-2 pt-2">
              {deliveryPartners.map((dp) => (
                <div
                  key={dp.id}
                  onClick={() => handleAssign(selectedOrderForAssign.id, dp.id)}
                  className="p-3 rounded-2xl border border-gray-200 hover:border-[#146B3A] hover:bg-emerald-50/50 cursor-pointer transition flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <img src={dp.avatar} alt={dp.name} className="w-10 h-10 rounded-full object-cover border" />
                    <div>
                      <h4 className="font-bold text-gray-900 text-xs">{dp.name} ({dp.code})</h4>
                      <p className="text-[10px] text-gray-500">{dp.vehicleType} • {dp.vehicleNumber}</p>
                      <span className="text-[10px] text-emerald-700 font-semibold">★ {dp.rating} • {dp.totalDeliveries} done</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#146B3A] bg-emerald-100 px-3 py-1 rounded-xl">
                    Assign →
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedOrderForAssign(null)}
                className="px-4 py-2 text-xs font-bold text-gray-500 hover:bg-gray-100 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
