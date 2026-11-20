import React from 'react';
import { Boxes, AlertTriangle, CheckCircle2, Plus, ArrowUpRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function FarmerInventory() {
  const { products, updateProduct } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-display">
            Farm Stock & Inventory Management
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">Track remaining batches, cold storage temperatures, and restock alerts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
          <span className="text-xs font-semibold text-gray-400">Total Dairy Stock</span>
          <h3 className="text-3xl font-extrabold text-[#146B3A] font-display mt-1">215 Litres</h3>
          <p className="text-xs text-gray-500 mt-1">Chilled in Farm Tank A (4°C)</p>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
          <span className="text-xs font-semibold text-gray-400">Packaged Cottage Paneer</span>
          <h3 className="text-3xl font-extrabold text-gray-900 font-display mt-1">45 Packs</h3>
          <p className="text-xs text-emerald-600 font-bold mt-1">Freshly vacuum-sealed</p>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
          <span className="text-xs font-semibold text-gray-400">Pure Bilona Ghee Jars</span>
          <h3 className="text-3xl font-extrabold text-amber-600 font-display mt-1">28 Jars</h3>
          <p className="text-xs text-gray-500 mt-1">Batch #B240915</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
        <h3 className="font-bold text-gray-900 text-sm">Product Inventory Quick Adjust</h3>
        <div className="divide-y divide-gray-100 text-xs">
          {products.slice(0, 6).map((p) => (
            <div key={p.id} className="py-3 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img src={p.image} alt={p.name} className="w-10 h-10 rounded-xl object-cover" />
                <div>
                  <h5 className="font-bold text-gray-900">{p.name}</h5>
                  <p className="text-gray-400">{p.category} • {p.unit}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="font-bold text-gray-800 text-sm">{p.stock} in stock</span>
                <button
                  onClick={() => updateProduct(p.id, { stock: p.stock + 10 })}
                  className="px-2.5 py-1 rounded-lg bg-emerald-50 text-[#146B3A] font-bold hover:bg-emerald-100 transition"
                >
                  +10 Restock
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
