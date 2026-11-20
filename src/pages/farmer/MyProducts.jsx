import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Plus,
  Search,
  SlidersHorizontal,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  ArrowUpDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export default function MyProducts() {
  const { products, updateProduct, deleteProduct } = useApp();
  const { currentUser } = useAuth();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingProduct, setEditingProduct] = useState(null);
  const [editPrice, setEditPrice] = useState('');
  const [editStock, setEditStock] = useState('');

  const farmerProducts = products.filter(p => {
    const matchesUser = p.farmerId === currentUser?.id || p.farmerName === currentUser?.farmName || p.farmerName === 'Ramasamy Farm';
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesUser && matchesSearch && matchesStatus;
  });

  const handleStartEdit = (prod) => {
    setEditingProduct(prod);
    setEditPrice(prod.price);
    setEditStock(prod.stock);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct.id, {
        price: Number(editPrice),
        stock: Number(editStock)
      });
      setEditingProduct(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Header & Top Stats (Matches Page 7 in PDF) */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-display">
            My Dairy Products
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage your catalog, inventory levels, pricing, and approvals
          </p>
        </div>
        <Link
          to="/farmer/add-product"
          className="flex items-center space-x-1.5 bg-[#146B3A] hover:bg-[#064E32] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-400 font-semibold block">Total Products</span>
          <h3 className="text-2xl font-extrabold text-gray-900 font-display mt-1">{farmerProducts.length}</h3>
          <span className="text-[11px] text-gray-400">{farmerProducts.filter(p => p.status === 'approved').length} Active</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-400 font-semibold block">Total In Stock</span>
          <h3 className="text-2xl font-extrabold text-emerald-800 font-display mt-1">215 L / 85 pcs</h3>
          <span className="text-[11px] text-emerald-600 font-bold">● Healthy Stock</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-400 font-semibold block">Customer Views</span>
          <h3 className="text-2xl font-extrabold text-gray-900 font-display mt-1">1,248</h3>
          <span className="text-[11px] text-emerald-600 font-bold">▲ +18% this month</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-400 font-semibold block">Completed Orders</span>
          <h3 className="text-2xl font-extrabold text-gray-900 font-display mt-1">342</h3>
          <span className="text-[11px] text-emerald-600 font-bold">▲ +24% growth</span>
        </div>
      </div>

      {/* 2. Filters & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search my products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#146B3A]"
          />
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 font-semibold text-gray-700"
          >
            <option value="all">All Status</option>
            <option value="approved">Approved & Active</option>
            <option value="pending_approval">Pending Admin Approval</option>
          </select>
        </div>
      </div>

      {/* 3. Products Table (Matches Page 7) */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-400 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4 font-bold">Product</th>
                <th className="py-3.5 px-4 font-bold">Category</th>
                <th className="py-3.5 px-4 font-bold">Price</th>
                <th className="py-3.5 px-4 font-bold">Stock</th>
                <th className="py-3.5 px-4 font-bold">Status</th>
                <th className="py-3.5 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {farmerProducts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/70 transition">
                  <td className="py-3.5 px-4 flex items-center space-x-3">
                    <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover bg-stone-100 border border-gray-100" />
                    <div>
                      <h4 className="font-bold text-gray-900 text-xs">{p.name}</h4>
                      <p className="text-[10px] text-gray-400">{p.unit}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-gray-600">{p.category}</td>
                  <td className="py-3.5 px-4 font-extrabold text-gray-900 font-display">₹{p.price}</td>
                  <td className="py-3.5 px-4 font-bold text-gray-700">{p.stock}</td>
                  <td className="py-3.5 px-4">
                    {p.status === 'approved' ? (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-[#146B3A]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#146B3A]"></span>
                        <span>Active</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800">
                        <Clock className="w-3 h-3 text-amber-600" />
                        <span>Pending Admin Approval</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      onClick={() => handleStartEdit(p)}
                      className="p-1.5 text-gray-500 hover:text-[#146B3A] hover:bg-emerald-50 rounded-lg transition"
                      title="Edit Product"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-gray-900 text-base">Edit {editingProduct.name}</h3>
            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="text-gray-500 font-semibold block mb-1">Price (₹)</label>
                <input
                  type="number"
                  required
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200"
                />
              </div>

              <div>
                <label className="text-gray-500 font-semibold block mb-1">Available Stock Units</label>
                <input
                  type="number"
                  required
                  value={editStock}
                  onChange={(e) => setEditStock(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#146B3A] text-white rounded-xl font-bold shadow"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
