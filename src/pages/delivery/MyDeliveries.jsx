import React, { useState } from 'react';
import {
  Bike,
  CheckCircle2,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Camera,
  Check,
  ShieldCheck,
  Navigation
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import LiveMapDemo from '../../components/LiveMapDemo';

export default function MyDeliveries() {
  const { orders, updateDeliveryStatus } = useApp();
  const { currentUser } = useAuth();

  const [selectedOrder, setSelectedOrder] = useState(orders[0]);
  const [proofDone, setProofDone] = useState(false);
  const [callAlert, setCallAlert] = useState(false);

  // Sync selected order with latest state
  const activeOrder = orders.find(o => o.id === selectedOrder?.id) || orders[0];

  const handleUpdate = (step) => {
    if (activeOrder) {
      updateDeliveryStatus(activeOrder.id, step);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-display">
          Active Delivery Task & Handover
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Step 9 & 10: Update pickup from farm hub, mark on the way, and complete doorstep delivery
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Customer & Order Summary (7 cols - Matches Page 11) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <span className="text-xs text-gray-400 font-semibold">Active Order</span>
                <h3 className="text-xl font-extrabold text-gray-900 font-display">#{activeOrder?.id}</h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                activeOrder?.status === 'Delivered'
                  ? 'bg-emerald-100 text-[#146B3A]'
                  : activeOrder?.status === 'Out for Delivery'
                  ? 'bg-blue-100 text-blue-900 animate-pulse'
                  : 'bg-amber-100 text-amber-900'
              }`}>
                {activeOrder?.status}
              </span>
            </div>

            {/* Customer Details Box */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-gray-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-3.5">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
                  alt="Customer"
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-400"
                />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{activeOrder?.customerName}</h4>
                  <p className="text-xs text-gray-500">{activeOrder?.customerPhone}</p>
                  <p className="text-xs text-gray-600 font-medium mt-0.5">{activeOrder?.deliveryAddress}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setCallAlert(true);
                    setTimeout(() => setCallAlert(false), 3000);
                  }}
                  className="p-2.5 rounded-xl bg-emerald-100 text-[#146B3A] hover:bg-emerald-200 font-bold transition flex items-center space-x-1 text-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call</span>
                </button>
              </div>
            </div>

            {callAlert && (
              <div className="bg-emerald-100 text-emerald-900 text-xs p-3 rounded-xl border border-emerald-200">
                📞 Calling customer {activeOrder?.customerName} at {activeOrder?.customerPhone}...
              </div>
            )}

            {/* Items in Delivery */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Order Contents ({activeOrder?.items.length})</h4>
              <div className="space-y-2">
                {activeOrder?.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <p className="font-bold text-gray-900">{item.name}</p>
                        <p className="text-gray-400">{item.unit} x {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-[#146B3A] text-sm">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Mini View */}
            <LiveMapDemo
              status={activeOrder?.status}
              eta={activeOrder?.eta || '15 mins'}
              riderName={currentUser?.name || 'Karthik S'}
              height="260px"
            />

          </div>

        </div>

        {/* Right Status Actions & Proof of Delivery (5 cols - Matches Page 11) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
            <h3 className="font-bold text-gray-900 text-base font-display pb-3 border-b border-gray-100">
              Delivery Progress Controls
            </h3>

            {/* Status Flow Buttons */}
            <div className="space-y-3">
              
              <button
                onClick={() => handleUpdate('Picked Up')}
                className={`w-full p-3.5 rounded-2xl text-left border-2 flex items-center justify-between transition ${
                  activeOrder?.status === 'Packed' || activeOrder?.status === 'Out for Delivery' || activeOrder?.status === 'Delivered'
                    ? 'border-emerald-500 bg-emerald-50/50 text-[#146B3A] font-bold'
                    : 'border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                <div>
                  <h5 className="text-xs font-bold">1. Picked Up from Central Hub</h5>
                  <p className="text-[10px] text-gray-400">Bottles packed in cold thermal carrier</p>
                </div>
                <Check className="w-4 h-4 text-emerald-600" />
              </button>

              <button
                onClick={() => handleUpdate('Out for Delivery')}
                className={`w-full p-3.5 rounded-2xl text-left border-2 flex items-center justify-between transition ${
                  activeOrder?.status === 'Out for Delivery'
                    ? 'border-blue-500 bg-blue-50 text-blue-900 font-bold ring-2 ring-blue-200'
                    : activeOrder?.status === 'Delivered'
                    ? 'border-emerald-500 bg-emerald-50/50 text-[#146B3A] font-bold'
                    : 'border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                <div>
                  <h5 className="text-xs font-bold">2. On The Way to Customer</h5>
                  <p className="text-[10px] text-gray-400">Rider navigating RS Puram route</p>
                </div>
                <Navigation className="w-4 h-4 text-blue-600" />
              </button>

              <button
                onClick={() => {
                  setProofDone(true);
                  handleUpdate('Delivered');
                }}
                className={`w-full p-3.5 rounded-2xl text-left border-2 flex items-center justify-between transition ${
                  activeOrder?.status === 'Delivered'
                    ? 'border-emerald-600 bg-emerald-100 text-emerald-950 font-extrabold'
                    : 'border-emerald-300 bg-emerald-50 text-[#146B3A] hover:bg-emerald-100'
                }`}
              >
                <div>
                  <h5 className="text-xs font-bold">3. Mark as Delivered</h5>
                  <p className="text-[10px] text-gray-500">Handed over to customer at doorstep</p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              </button>

            </div>

            {/* Proof of delivery simulation */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Doorstep Verification</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => alert('Photo of delivered bottles captured!')}
                  className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 flex items-center justify-center space-x-1.5 font-bold text-gray-700"
                >
                  <Camera className="w-4 h-4 text-gray-500" />
                  <span>Take Photo</span>
                </button>
                <button
                  onClick={() => alert('OTP 8924 verified!')}
                  className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 flex items-center justify-center space-x-1.5 font-bold text-gray-700"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Verify OTP</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
