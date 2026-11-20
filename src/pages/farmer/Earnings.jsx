import React from 'react';
import { CircleDollarSign, ArrowUpRight, TrendingUp, Calendar, Download, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function FarmerEarnings() {
  const { currentUser } = useAuth();

  const payouts = [
    { id: 'PAY-8921', date: '16 Nov 2026', amount: 8420, milkQty: '300 L', status: 'Paid', method: 'Direct Bank NEFT' },
    { id: 'PAY-8914', date: '09 Nov 2026', amount: 7840, milkQty: '280 L', status: 'Paid', method: 'Direct Bank NEFT' },
    { id: 'PAY-8902', date: '02 Nov 2026', amount: 8960, milkQty: '320 L', status: 'Paid', method: 'Direct Bank NEFT' },
    { id: 'PAY-8889', date: '26 Oct 2026', amount: 7280, milkQty: '260 L', status: 'Paid', method: 'Direct Bank NEFT' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-display">
            Farmer Earnings & Payouts
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">Transparent weekly payments deposited directly into your bank account</p>
        </div>
        <button
          onClick={() => alert('Payout statement downloaded.')}
          className="flex items-center space-x-1.5 bg-white border border-gray-200 text-gray-700 px-3.5 py-2 rounded-xl text-xs font-bold shadow-sm hover:bg-gray-50 transition"
        >
          <Download className="w-4 h-4" />
          <span>Export Statement</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-2">
          <span className="text-xs text-gray-400 font-semibold block">Total Earnings to Date</span>
          <h3 className="text-3xl font-extrabold text-[#146B3A] font-display">₹1,24,800</h3>
          <span className="text-xs text-emerald-600 font-bold flex items-center space-x-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+20% vs last month</span>
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-2">
          <span className="text-xs text-gray-400 font-semibold block">Next Scheduled Payout</span>
          <h3 className="text-3xl font-extrabold text-gray-900 font-display">₹3,420</h3>
          <span className="text-xs text-gray-400">Depositing Friday, 21 Nov</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-2">
          <span className="text-xs text-gray-400 font-semibold block">Bank Account</span>
          <h3 className="text-xl font-bold text-gray-800 font-display">Canara Bank</h3>
          <span className="text-xs text-gray-400">A/C: ************4821 (Verified)</span>
        </div>
      </div>

      {/* Payout History Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-sm">Weekly Payout History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-400 uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4 font-bold">Payout Ref</th>
                <th className="py-3 px-4 font-bold">Date</th>
                <th className="py-3 px-4 font-bold">Milk Supplied</th>
                <th className="py-3 px-4 font-bold">Amount</th>
                <th className="py-3 px-4 font-bold">Method</th>
                <th className="py-3 px-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payouts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/70">
                  <td className="py-3 px-4 font-bold text-gray-800">#{p.id}</td>
                  <td className="py-3 px-4 text-gray-500">{p.date}</td>
                  <td className="py-3 px-4 font-semibold text-gray-700">{p.milkQty}</td>
                  <td className="py-3 px-4 font-extrabold text-[#146B3A] text-sm font-display">₹{p.amount}</td>
                  <td className="py-3 px-4 text-gray-500">{p.method}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-[#146B3A] flex items-center space-x-1 w-max">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{p.status}</span>
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
