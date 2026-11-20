import React from 'react';
import { Boxes, AlertTriangle, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminInventory() {
  const { products } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-display">
          Central Hub & Farm Inventory
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Monitor cold-storage tanks, batch numbers, and expiring dairy stocks
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-400 font-semibold block">Total Stock Across Hubs</span>
          <h3 className="text-2xl font-extrabold text-[#146B3A] font-display mt-1">12,480 L</h3>
          <span className="text-[11px] text-emerald-600 font-bold">▲ +12% vs last month</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-400 font-semibold block">Available Ready Stock</span>
          <h3 className="text-2xl font-extrabold text-gray-900 font-display mt-1">8,260 L</h3>
          <span className="text-[11px] text-emerald-600">66% capacity</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-400 font-semibold block">Allocated for Orders</span>
          <h3 className="text-2xl font-extrabold text-blue-700 font-display mt-1">2,480 L</h3>
          <span className="text-[11px] text-blue-600">Dispatched morning</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-400 font-semibold block">Low Stock Alerts</span>
          <h3 className="text-2xl font-extrabold text-amber-600 font-display mt-1">3 Items</h3>
          <span className="text-[11px] text-amber-700 font-bold">Reorder soon</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-sm">Batch & Stock Register</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-400 uppercase text-[10px] tracking-wider border-b border-gray-100">
              <tr>
                <th className="py-3 px-4 font-bold">Product</th>
                <th className="py-3 px-4 font-bold">SKU Code</th>
                <th className="py-3 px-4 font-bold">Location</th>
                <th className="py-3 px-4 font-bold">Batch No.</th>
                <th className="py-3 px-4 font-bold">Current Stock</th>
                <th className="py-3 px-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.slice(0, 8).map((p, idx) => (
                <tr key={p.id} className="hover:bg-gray-50/70">
                  <td className="py-3.5 px-4 flex items-center space-x-3">
                    <img src={p.image} alt={p.name} className="w-10 h-10 rounded-xl object-cover" />
                    <span className="font-bold text-gray-900">{p.name} ({p.unit})</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-gray-600">DC-MILK-00{idx + 1}</td>
                  <td className="py-3.5 px-4 text-gray-600">{p.farmLocation}</td>
                  <td className="py-3.5 px-4 font-mono text-gray-500">B2409{10 + idx}</td>
                  <td className="py-3.5 px-4 font-extrabold text-gray-900">{p.stock} units</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-[#146B3A]">
                      ● In Stock
                    </span>
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
