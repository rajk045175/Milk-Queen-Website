import React, { useState } from 'react';
import {
  Package,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
  Edit,
  Sparkles,
  Filter
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminProducts() {
  const { products, approveProduct, rejectProduct, deleteProduct, updateProduct } = useApp();

  const [search, setSearch] = useState('');
  const [statusTab, setStatusTab] = useState('all'); // 'all' | 'pending' | 'approved'

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.farmerName.toLowerCase().includes(search.toLowerCase());
    if (statusTab === 'pending') return matchesSearch && p.status === 'pending_approval';
    if (statusTab === 'approved') return matchesSearch && p.status === 'approved';
    return matchesSearch;
  });

  const pendingCount = products.filter(p => p.status === 'pending_approval').length;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-display">
            Product Catalog Management
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Approve farmer product listings, set pricing boundaries, and manage stock
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {pendingCount > 0 && (
            <span className="bg-amber-100 text-amber-900 font-bold px-3 py-1.5 rounded-xl text-xs animate-pulse">
              {pendingCount} Pending Approval
            </span>
          )}
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-xl text-xs">
          <button
            onClick={() => setStatusTab('all')}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${statusTab === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}
          >
            All Products ({products.length})
          </button>
          <button
            onClick={() => setStatusTab('pending')}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${statusTab === 'pending' ? 'bg-amber-600 text-white shadow-sm' : 'text-gray-600'}`}
          >
            Pending Approval ({pendingCount})
          </button>
          <button
            onClick={() => setStatusTab('approved')}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${statusTab === 'approved' ? 'bg-white text-[#146B3A] shadow-sm' : 'text-gray-600'}`}
          >
            Active Catalog
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by product or farmer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#146B3A]"
          />
        </div>
      </div>

      {/* Products Table (Matches Page 20 in PDF) */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-400 uppercase text-[10px] tracking-wider border-b border-gray-100">
              <tr>
                <th className="py-3 px-4 font-bold">Product</th>
                <th className="py-3 px-4 font-bold">Category</th>
                <th className="py-3 px-4 font-bold">Farmer / Supplier</th>
                <th className="py-3 px-4 font-bold">Price</th>
                <th className="py-3 px-4 font-bold">Stock</th>
                <th className="py-3 px-4 font-bold">Approval Status</th>
                <th className="py-3 px-4 font-bold text-right">Admin Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/70 transition">
                  <td className="py-3.5 px-4 flex items-center space-x-3">
                    <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover bg-stone-100" />
                    <div>
                      <h4 className="font-bold text-gray-900">{p.name}</h4>
                      <p className="text-[10px] text-gray-400">{p.unit}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-gray-600">{p.category}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-gray-800">{p.farmerName}</span>
                    <span className="text-[10px] text-gray-400 block">{p.farmLocation}</span>
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-[#146B3A] font-display text-sm">₹{p.price}</td>
                  <td className="py-3.5 px-4 font-bold text-gray-700">{p.stock}</td>
                  <td className="py-3.5 px-4">
                    {p.status === 'approved' ? (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-[#146B3A]">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Approved & Live</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 animate-pulse">
                        <Clock className="w-3 h-3 text-amber-700" />
                        <span>Pending Approval</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    {p.status === 'pending_approval' ? (
                      <div className="inline-flex items-center space-x-1.5">
                        <button
                          onClick={() => approveProduct(p.id)}
                          className="px-3 py-1 bg-[#146B3A] hover:bg-[#064E32] text-white font-bold rounded-lg text-xs shadow-sm transition"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => rejectProduct(p.id)}
                          className="px-2.5 py-1 bg-gray-100 hover:bg-rose-50 text-rose-600 font-bold rounded-lg text-xs transition"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
