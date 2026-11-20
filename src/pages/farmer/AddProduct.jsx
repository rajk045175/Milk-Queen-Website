import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Package, ArrowLeft, Upload, CheckCircle2, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export default function AddProduct() {
  const { addProduct } = useApp();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('Fresh Milk');
  const [unit, setUnit] = useState('500 ml');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('50');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80');

  const presetImages = [
    { label: 'Fresh Milk', url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80' },
    { label: 'Paneer', url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80' },
    { label: 'Curd', url: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=800&q=80' },
    { label: 'Ghee', url: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=800&q=80' },
    { label: 'Butter', url: 'https://images.unsplash.com/photo-1589985270725-b873d6b1d4ef?auto=format&fit=crop&w=800&q=80' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && price) {
      addProduct({
        name,
        category,
        unit,
        price: Number(price),
        stock: Number(stock),
        description,
        image,
        farmerId: currentUser?.id || 'farmer-1',
        farmerName: currentUser?.farmName || 'Ramasamy Farm',
        farmLocation: currentUser?.location || 'Kovai, Coimbatore'
      }, false);

      navigate('/farmer/products');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      <div className="flex items-center space-x-3">
        <Link
          to="/farmer/products"
          className="p-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-[#146B3A] transition"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Add New Dairy Product</h1>
          <p className="text-xs text-gray-500">Products are verified by Admin before appearing in customer store</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6 text-xs">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="font-bold text-gray-700 block mb-1">Product Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Traditional Bilona Buffalo Ghee"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#146B3A]"
            />
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 font-semibold text-gray-700"
            >
              <option value="Fresh Milk">Fresh Milk</option>
              <option value="Paneer">Paneer</option>
              <option value="Curd">Curd</option>
              <option value="Ghee">Ghee</option>
              <option value="Butter">Butter</option>
              <option value="Flavored Milk">Flavored Milk</option>
              <option value="Other Products">Other Products</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="font-bold text-gray-700 block mb-1">Unit / Pack Size *</label>
            <input
              type="text"
              required
              placeholder="e.g. 500 ml or 250 g"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200"
            />
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">Selling Price (₹) *</label>
            <input
              type="number"
              required
              placeholder="e.g. 48"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200"
            />
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">Stock Available (Units) *</label>
            <input
              type="number"
              required
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200"
            />
          </div>
        </div>

        {/* Product Image Preset Picker */}
        <div>
          <label className="font-bold text-gray-700 block mb-2">Select High-Resolution Dairy Photo</label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {presetImages.map((pi) => (
              <div
                key={pi.label}
                onClick={() => setImage(pi.url)}
                className={`p-2 rounded-2xl border-2 cursor-pointer text-center transition ${
                  image === pi.url ? 'border-[#146B3A] bg-emerald-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img src={pi.url} alt={pi.label} className="w-full aspect-square rounded-xl object-cover mb-1" />
                <span className="text-[10px] font-bold text-gray-700">{pi.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="font-bold text-gray-700 block mb-1">Description & Quality Notes</label>
          <textarea
            rows="3"
            placeholder="Describe your grass-fed cow feed, morning milking time, or artisan traditional preparation..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#146B3A]"
          ></textarea>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-gray-700 flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-[#146B3A] shrink-0" />
          <span>
            <strong>STEP 1 in Workflow:</strong> When you click submit, this product is saved with status <em>Pending Admin Approval</em>. Switch to Admin to approve it!
          </span>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => navigate('/farmer/products')}
            className="px-5 py-2.5 rounded-xl text-gray-600 font-bold hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-7 py-2.5 rounded-xl bg-[#146B3A] hover:bg-[#064E32] text-white font-bold shadow-md transition"
          >
            Submit for Admin Approval
          </button>
        </div>

      </form>

    </div>
  );
}
