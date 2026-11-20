import React, { useState } from 'react';
import { Milk, Plus, CheckCircle2, TrendingUp, Calendar, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function MilkCollection() {
  const { milkRecords, addMilkRecord } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [cowId, setCowId] = useState('C007');
  const [cowName, setCowName] = useState('Ganga');
  const [quantity, setQuantity] = useState('14');
  const [fat, setFat] = useState('3.8');
  const [snf, setSnf] = useState('8.6');
  const [quality, setQuality] = useState('Excellent');

  const totalLitres = milkRecords.reduce((sum, r) => sum + Number(r.quantity), 0);
  const avgFat = (milkRecords.reduce((sum, r) => sum + Number(r.fat), 0) / (milkRecords.length || 1)).toFixed(2);
  const todayEarnings = totalLitres * 28;

  const handleRecord = (e) => {
    e.preventDefault();
    addMilkRecord({ cowId, cowName, quantity, fat, snf, quality });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header (Matches Page 8 in Komagan PDF) */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-display">
            Milk Collection Records
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Record your daily morning & evening milking, track fat percentage & SNF quality
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-1.5 bg-[#146B3A] hover:bg-[#064E32] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Milk Collection</span>
        </button>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-400 font-semibold block">Today's Collection</span>
          <h3 className="text-2xl font-extrabold text-gray-900 font-display mt-1">{totalLitres} L</h3>
          <span className="text-[11px] text-emerald-600 font-bold">▲ +20% vs yesterday</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-400 font-semibold block">Cows Milked</span>
          <h3 className="text-2xl font-extrabold text-gray-900 font-display mt-1">{milkRecords.length}</h3>
          <span className="text-[11px] text-gray-400">Kangayam & Jersey</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-400 font-semibold block">Avg. Quality Score</span>
          <h3 className="text-2xl font-extrabold text-emerald-700 font-display mt-1">4.8 / 5</h3>
          <span className="text-[11px] text-gray-400">Fat: {avgFat}% • SNF: 8.5%</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-400 font-semibold block">Today's Earnings</span>
          <h3 className="text-2xl font-extrabold text-[#146B3A] font-display mt-1">₹{todayEarnings}</h3>
          <span className="text-[11px] text-gray-400">@ ₹28 / Litre payout</span>
        </div>
      </div>

      {/* Milk Collection Records Table (Matches Page 8) */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-900 text-sm">Collection Log (Today)</h3>
          <span className="text-xs text-gray-400">Total: {totalLitres} Litres</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-400 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4 font-bold">Time</th>
                <th className="py-3 px-4 font-bold">Cow ID / Name</th>
                <th className="py-3 px-4 font-bold">Quantity (L)</th>
                <th className="py-3 px-4 font-bold">Fat %</th>
                <th className="py-3 px-4 font-bold">SNF %</th>
                <th className="py-3 px-4 font-bold">Quality</th>
                <th className="py-3 px-4 font-bold">Collected By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {milkRecords.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50/70 transition">
                  <td className="py-3 px-4 font-semibold text-gray-700">{r.time}</td>
                  <td className="py-3 px-4 font-bold text-gray-900">
                    {r.cowId} <span className="text-gray-400 font-normal">({r.cowName})</span>
                  </td>
                  <td className="py-3 px-4 font-extrabold text-[#146B3A] font-display text-sm">{r.quantity} L</td>
                  <td className="py-3 px-4 text-gray-600">{r.fat}%</td>
                  <td className="py-3 px-4 text-gray-600">{r.snf}%</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-[#146B3A]">
                      ● {r.quality}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-500">{r.collectedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Record Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-gray-900 text-base">Record Milk Collection</h3>
            <form onSubmit={handleRecord} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-500 font-semibold block mb-1">Cow ID</label>
                  <input
                    type="text"
                    required
                    value={cowId}
                    onChange={(e) => setCowId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200"
                  />
                </div>
                <div>
                  <label className="text-gray-500 font-semibold block mb-1">Cow Name</label>
                  <input
                    type="text"
                    required
                    value={cowName}
                    onChange={(e) => setCowName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-gray-500 font-semibold block mb-1">Quantity (L)</label>
                  <input
                    type="number"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200"
                  />
                </div>
                <div>
                  <label className="text-gray-500 font-semibold block mb-1">Fat %</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={fat}
                    onChange={(e) => setFat(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200"
                  />
                </div>
                <div>
                  <label className="text-gray-500 font-semibold block mb-1">SNF %</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={snf}
                    onChange={(e) => setSnf(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-500 font-bold hover:bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#146B3A] text-white font-bold rounded-xl shadow"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
