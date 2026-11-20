import React from 'react';
import { Bike, Star, Phone, MapPin, CheckCircle2, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminDeliveryPartners() {
  const { deliveryPartners } = useApp();

  return (
    <div className="space-y-6">
      
      {/* Header (Matches Page 25 in PDF) */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-display">
            Delivery Partner Fleet Management
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage delivery riders, assign route sectors, verify bikes, and monitor live deliveries
          </p>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-400 font-semibold block">Total Partners</span>
          <h3 className="text-2xl font-extrabold text-gray-900 font-display mt-1">24</h3>
          <span className="text-[11px] text-emerald-600 font-bold">▲ +33% fleet</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-400 font-semibold block">Active Online</span>
          <h3 className="text-2xl font-extrabold text-emerald-700 font-display mt-1">18</h3>
          <span className="text-[11px] text-emerald-600 font-bold">Ready for orders</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-400 font-semibold block">On Delivery Right Now</span>
          <h3 className="text-2xl font-extrabold text-blue-700 font-display mt-1">4</h3>
          <span className="text-[11px] text-blue-600 font-bold">GPS active</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-400 font-semibold block">Average Rating</span>
          <h3 className="text-2xl font-extrabold text-amber-500 font-display mt-1">4.8 / 5</h3>
          <span className="text-[11px] text-gray-400">99.2% on-time rate</span>
        </div>
      </div>

      {/* Partners Table (Matches Page 25) */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-400 uppercase text-[10px] tracking-wider border-b border-gray-100">
              <tr>
                <th className="py-3 px-4 font-bold">Rider Details</th>
                <th className="py-3 px-4 font-bold">Phone</th>
                <th className="py-3 px-4 font-bold">Area / Sector</th>
                <th className="py-3 px-4 font-bold">Vehicle</th>
                <th className="py-3 px-4 font-bold">Deliveries Done</th>
                <th className="py-3 px-4 font-bold">Rating</th>
                <th className="py-3 px-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {deliveryPartners.map((dp) => (
                <tr key={dp.id} className="hover:bg-gray-50/70">
                  <td className="py-3.5 px-4 flex items-center space-x-3">
                    <img src={dp.avatar} alt={dp.name} className="w-10 h-10 rounded-full object-cover border" />
                    <div>
                      <h4 className="font-bold text-gray-900">{dp.name}</h4>
                      <p className="text-[10px] text-emerald-700 font-semibold">{dp.code}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-gray-700 font-medium">{dp.phone}</td>
                  <td className="py-3.5 px-4 text-gray-600">{dp.location}</td>
                  <td className="py-3.5 px-4 font-semibold text-gray-800">
                    {dp.vehicleType} <span className="text-gray-400 font-normal">({dp.vehicleNumber})</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-gray-900">{dp.totalDeliveries}</td>
                  <td className="py-3.5 px-4">
                    <span className="text-amber-500 font-bold flex items-center space-x-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{dp.rating}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      dp.status === 'On Delivery'
                        ? 'bg-blue-100 text-blue-900 animate-pulse'
                        : 'bg-emerald-100 text-[#146B3A]'
                    }`}>
                      ● {dp.status}
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
