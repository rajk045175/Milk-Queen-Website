import React, { useState } from 'react';
import { Tag, Plus, CheckCircle2, Copy } from 'lucide-react';

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([
    { code: 'DAIRY20', type: 'Percentage', discount: '20% OFF', minOrder: 299, uses: 680, status: 'Active' },
    { code: 'FREESHIP', type: 'Free Shipping', discount: '100% Delivery Fee', minOrder: 199, uses: 520, status: 'Active' },
    { code: 'FLAT50', type: 'Flat Cash', discount: '₹50 OFF', minOrder: 249, uses: 420, status: 'Active' },
    { code: 'KOMAGAN10', type: 'Percentage', discount: '10% OFF', minOrder: 199, uses: 310, status: 'Active' }
  ]);

  const [newCode, setNewCode] = useState('');
  const [newDiscount, setNewDiscount] = useState('15% OFF');
  const [newMinOrder, setNewMinOrder] = useState('299');

  const handleCreateCoupon = (e) => {
    e.preventDefault();
    if (newCode.trim()) {
      setCoupons([...coupons, {
        code: newCode.toUpperCase().trim(),
        type: 'Custom',
        discount: newDiscount,
        minOrder: Number(newMinOrder),
        uses: 0,
        status: 'Active'
      }]);
      setNewCode('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-display">
          Offers & Promotional Coupons
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Create customer discount codes for morning dairy bundles and free delivery promotions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Create Coupon Form (5 cols - Matches Page 23) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4 text-xs">
          <h3 className="font-bold text-gray-900 text-sm font-display">Create New Offer / Coupon</h3>
          <form onSubmit={handleCreateCoupon} className="space-y-3">
            <div>
              <label className="text-gray-500 font-bold block mb-1">Coupon Code (Uppercase)</label>
              <input
                type="text"
                required
                placeholder="e.g. MORNING15"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 uppercase font-mono font-bold"
              />
            </div>

            <div>
              <label className="text-gray-500 font-bold block mb-1">Discount Value</label>
              <input
                type="text"
                required
                placeholder="e.g. 15% OFF or ₹40 OFF"
                value={newDiscount}
                onChange={(e) => setNewDiscount(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 font-semibold"
              />
            </div>

            <div>
              <label className="text-gray-500 font-bold block mb-1">Minimum Order Amount (₹)</label>
              <input
                type="number"
                required
                value={newMinOrder}
                onChange={(e) => setNewMinOrder(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#146B3A] hover:bg-[#064E32] text-white py-2.5 rounded-xl font-bold shadow transition"
            >
              + Create & Publish Coupon
            </button>
          </form>
        </div>

        {/* Active Coupons List (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900 text-sm">Active Customer Coupons ({coupons.length})</h3>
          </div>
          <div className="divide-y divide-gray-100 text-xs">
            {coupons.map((c) => (
              <div key={c.code} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div className="space-y-1">
                  <span className="font-mono font-extrabold text-[#146B3A] text-sm bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    {c.code}
                  </span>
                  <p className="text-gray-600 font-bold text-xs pt-1">{c.discount}</p>
                  <p className="text-gray-400 text-[10px]">Min Order: ₹{c.minOrder} • Redeemed {c.uses} times</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-[#146B3A]">
                  ● {c.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
