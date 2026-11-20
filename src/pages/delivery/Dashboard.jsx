import React from 'react';
import { Link } from 'react-router-dom';
import {
  Bike,
  Clock,
  MapPin,
  CircleDollarSign,
  CheckCircle2,
  Phone,
  Navigation,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import LiveMapDemo from '../../components/LiveMapDemo';

export default function DeliveryDashboard() {
  const { orders } = useApp();
  const { currentUser } = useAuth();

  const assignedDeliveries = orders.filter(
    o => o.assignedPartnerId === currentUser?.id || o.assignedPartnerName?.includes('Karthik') || o.status === 'Out for Delivery' || o.status === 'Delivered'
  );

  return (
    <div className="space-y-6">
      
      {/* 1. Header (Matches Page 10 in PDF) */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-display">
            Delivery Operations & Route Tracker
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Zone: Coimbatore Central & RS Puram • Vehicle: {currentUser?.vehicleNumber || 'TN 37 CD 5678'}
          </p>
        </div>

        <Link
          to="/delivery/deliveries"
          className="flex items-center space-x-1.5 bg-[#146B3A] hover:bg-[#064E32] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow transition"
        >
          <Bike className="w-4 h-4" />
          <span>Go to Active Delivery Queue</span>
        </Link>
      </div>

      {/* 2. 4 Stat Cards (Matches Page 10) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-400 font-semibold block">Today's Deliveries</span>
          <h3 className="text-2xl font-extrabold text-gray-900 font-display mt-1">8 / 10</h3>
          <span className="text-[11px] text-emerald-600 font-bold">8 Completed, 2 Pending</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-400 font-semibold block">Next Delivery ETA</span>
          <h3 className="text-2xl font-extrabold text-[#146B3A] font-display mt-1">10:30 AM</h3>
          <span className="text-[11px] text-gray-500 truncate block">12, RS Puram Main Rd</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-400 font-semibold block">Distance Traveled</span>
          <h3 className="text-2xl font-extrabold text-blue-700 font-display mt-1">42 km</h3>
          <span className="text-[11px] text-gray-400">Insulated cold carrier</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-400 font-semibold block">Today's Earnings</span>
          <h3 className="text-2xl font-extrabold text-[#146B3A] font-display mt-1">₹680</h3>
          <span className="text-[11px] text-emerald-600 font-bold">▲ +12% from yesterday</span>
        </div>
      </div>

      {/* 3. Center Section: Queue List + Live Map Demo (Matches Page 10) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Deliveries Queue List (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="font-bold text-gray-900 text-sm font-display">Today's Delivery Stops</h3>
            <span className="text-xs text-gray-400">{assignedDeliveries.length} orders</span>
          </div>

          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {assignedDeliveries.map((ord, idx) => (
              <Link
                key={ord.id}
                to="/delivery/deliveries"
                className="block p-3 rounded-2xl border border-gray-100 hover:border-[#146B3A] hover:bg-emerald-50/40 transition"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#146B3A] font-bold text-[10px] flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <div>
                      <h5 className="font-bold text-gray-900">{ord.customerName}</h5>
                      <p className="text-[10px] text-gray-400 truncate max-w-[160px]">{ord.deliveryAddress}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    ord.status === 'Delivered'
                      ? 'bg-emerald-100 text-[#146B3A]'
                      : ord.status === 'Out for Delivery'
                      ? 'bg-blue-100 text-blue-900 animate-pulse'
                      : 'bg-amber-100 text-amber-900'
                  }`}>
                    {ord.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Live Route Map (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-sm font-display">Active Delivery Route</h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
              Live GPS Feed
            </span>
          </div>

          <LiveMapDemo
            status="Out for Delivery"
            eta="15 mins"
            riderName={currentUser?.name || 'Karthik S'}
            height="360px"
          />
        </div>

      </div>

    </div>
  );
}
