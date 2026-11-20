import React from 'react';
import { CreditCard, CheckCircle2, TrendingUp, Download, ArrowUpRight } from 'lucide-react';

export default function AdminPayments() {
  const transactions = [
    { id: 'TXN-9041', time: '10:24 AM', type: 'Customer Order Payment', from: 'Priya S', to: 'DairyConnect Gateway', amount: 213, method: 'UPI (GPay)', status: 'Success' },
    { id: 'TXN-9040', time: '09:15 AM', type: 'Farmer Weekly Payout', from: 'DairyConnect Ops', to: 'Ramasamy Farm', amount: 8420, method: 'Bank Transfer', status: 'Success' },
    { id: 'TXN-9039', time: '08:40 AM', type: 'Customer Order Payment', from: 'Divya S', to: 'DairyConnect Gateway', amount: 180, method: 'Credit Card', status: 'Success' },
    { id: 'TXN-9038', time: '08:00 AM', type: 'Rider Daily Payout', from: 'DairyConnect Ops', to: 'Karthik S (DP-002)', amount: 680, method: 'Wallet NEFT', status: 'Success' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-display">
            Payments & Revenue Settlement
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Transparent revenue tracking, automated farmer deposits, and delivery partner settlements
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
          <span className="text-xs font-semibold text-gray-400 block">Total Revenue (Monthly)</span>
          <h3 className="text-2xl font-extrabold text-[#146B3A] font-display mt-1">₹4,32,810</h3>
          <span className="text-[11px] text-emerald-600 font-bold">▲ +28% vs last month</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
          <span className="text-xs font-semibold text-gray-400 block">Disbursed to Farmers</span>
          <h3 className="text-2xl font-extrabold text-gray-900 font-display mt-1">₹2,18,450</h3>
          <span className="text-[11px] text-gray-400">Direct weekly NEFT</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
          <span className="text-xs font-semibold text-gray-400 block">Paid to Delivery Riders</span>
          <h3 className="text-2xl font-extrabold text-gray-900 font-display mt-1">₹68,320</h3>
          <span className="text-[11px] text-gray-400">@ ₹40 - ₹60 / delivery</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
          <span className="text-xs font-semibold text-gray-400 block">Net Platform Margin</span>
          <h3 className="text-2xl font-extrabold text-emerald-700 font-display mt-1">₹1,46,040</h3>
          <span className="text-[11px] text-emerald-600 font-bold">Profitable operation</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-sm">Real-time Settlement Feed</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-400 uppercase text-[10px] tracking-wider border-b border-gray-100">
              <tr>
                <th className="py-3 px-4 font-bold">Transaction ID</th>
                <th className="py-3 px-4 font-bold">Time</th>
                <th className="py-3 px-4 font-bold">Type</th>
                <th className="py-3 px-4 font-bold">Parties</th>
                <th className="py-3 px-4 font-bold">Amount</th>
                <th className="py-3 px-4 font-bold">Payment Channel</th>
                <th className="py-3 px-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50/70">
                  <td className="py-3.5 px-4 font-bold text-gray-900">#{t.id}</td>
                  <td className="py-3.5 px-4 text-gray-500">{t.time}</td>
                  <td className="py-3.5 px-4 font-medium text-gray-800">{t.type}</td>
                  <td className="py-3.5 px-4 text-gray-600">
                    <span>{t.from}</span> → <strong className="text-gray-800">{t.to}</strong>
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-[#146B3A] font-display text-sm">₹{t.amount}</td>
                  <td className="py-3.5 px-4 text-gray-500">{t.method}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-[#146B3A] flex items-center space-x-1 w-max">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{t.status}</span>
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
