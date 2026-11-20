import React from 'react';
import { FileBarChart, Download, TrendingUp, Calendar, CheckCircle2 } from 'lucide-react';

export default function AdminReports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-display">
            Reports & Business Intelligence
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Gain deep insights into your dairy business performance, farmer supply metrics, and growth
          </p>
        </div>
        <button
          onClick={() => alert('PDF report generated!')}
          className="flex items-center space-x-1.5 bg-[#146B3A] text-white px-4 py-2 rounded-xl text-xs font-bold shadow hover:bg-[#064E32] transition"
        >
          <Download className="w-4 h-4" />
          <span>Export Monthly PDF</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Category Share */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-900 text-sm font-display">Sales Share by Category</h3>
          <div className="space-y-3 text-xs">
            {[
              { name: 'Fresh Milk (Cow & Buffalo)', pct: '38%', revenue: '₹1,64,400', color: 'bg-[#146B3A]' },
              { name: 'Fresh Paneer', pct: '22%', revenue: '₹95,200', color: 'bg-emerald-600' },
              { name: 'Set Curd & Buttermilk', pct: '18%', revenue: '₹77,900', color: 'bg-teal-600' },
              { name: 'Pure Cow Ghee', pct: '14%', revenue: '₹60,500', color: 'bg-amber-500' },
              { name: 'Butter & Flavored Milk', pct: '8%', revenue: '₹34,810', color: 'bg-blue-600' }
            ].map((cat) => (
              <div key={cat.name} className="space-y-1">
                <div className="flex justify-between text-gray-700 font-bold">
                  <span>{cat.name}</span>
                  <span>{cat.revenue} ({cat.pct})</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className={`h-full ${cat.color}`} style={{ width: cat.pct }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Cohort Growth */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-900 text-sm font-display">Customer Retention & Growth</h3>
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 space-y-2 text-xs">
            <span className="font-bold text-[#146B3A] text-sm block">94.2% Repeat Order Rate</span>
            <p className="text-gray-600 leading-relaxed">
              Families who subscribe to morning milk have an average lifetime retention of 14+ months, proving extremely high satisfaction with farmer freshness.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center text-xs pt-2">
            <div className="bg-gray-50 p-3 rounded-2xl">
              <span className="text-gray-400 block text-[10px]">Active Subscribers</span>
              <strong className="text-gray-900 text-xl font-display">840 Families</strong>
            </div>
            <div className="bg-gray-50 p-3 rounded-2xl">
              <span className="text-gray-400 block text-[10px]">On-Time Morning Rate</span>
              <strong className="text-emerald-700 text-xl font-display">99.4%</strong>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
