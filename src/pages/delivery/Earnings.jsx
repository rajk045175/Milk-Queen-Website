import React from 'react';
import { CircleDollarSign, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function DeliveryEarnings() {
  const { currentUser } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-display">
          Rider Earnings & Incentives
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">Daily payouts + morning peak incentives</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-1">
          <span className="text-xs text-gray-400 font-semibold block">Today's Earnings</span>
          <h3 className="text-3xl font-extrabold text-[#146B3A] font-display">₹680</h3>
          <span className="text-xs text-emerald-600 font-bold">10 deliveries @ ₹60 + ₹80 bonus</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-1">
          <span className="text-xs text-gray-400 font-semibold block">Weekly Payout (12-19 Nov)</span>
          <h3 className="text-3xl font-extrabold text-gray-900 font-display">₹4,820</h3>
          <span className="text-xs text-gray-400">Depositing Friday morning</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-1">
          <span className="text-xs text-gray-400 font-semibold block">Morning Peak Bonus</span>
          <h3 className="text-3xl font-extrabold text-amber-600 font-display">₹150</h3>
          <span className="text-xs text-emerald-600 font-bold">Completed 5 orders before 7 AM</span>
        </div>
      </div>
    </div>
  );
}
