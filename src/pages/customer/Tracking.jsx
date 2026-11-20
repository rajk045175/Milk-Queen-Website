import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  Bike,
  ShieldCheck,
  ChevronRight,
  ShoppingBag,
  ArrowRight,
  Share2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import LiveMapDemo from '../../components/LiveMapDemo';

export default function Tracking() {
  const { id } = useParams();
  const { orders } = useApp();

  // Find order by ID or fallback to the first active order
  const order = orders.find(o => o.id === id) || orders[0];

  const [callAlert, setCallAlert] = useState(false);

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">No active orders to track.</h2>
        <Link to="/products" className="text-[#146B3A] font-bold mt-4 inline-block">Order Now</Link>
      </div>
    );
  }

  const steps = [
    { title: 'Order Placed', time: order.timeline?.find(t => t.step === 'Order Placed')?.time || '09:24 AM' },
    { title: 'Confirmed', time: order.timeline?.find(t => t.step === 'Confirmed')?.time || '09:30 AM' },
    { title: 'Packed', time: order.timeline?.find(t => t.step === 'Packed')?.time || '09:45 AM' },
    { title: 'Out for Delivery', time: order.timeline?.find(t => t.step === 'Out for Delivery')?.time || '10:10 AM' },
    { title: 'Delivered', time: order.timeline?.find(t => t.step === 'Delivered')?.time || 'Pending' }
  ];

  const getStepStatus = (stepName) => {
    if (order.status === 'Delivered') return 'completed';
    if (order.status === stepName) return 'current';

    const orderStages = ['Order Placed', 'Confirmed', 'Packed', 'Out for Delivery', 'Delivered'];
    const currentIndex = orderStages.indexOf(order.status);
    const stepIndex = orderStages.indexOf(stepName);

    if (stepIndex < currentIndex) return 'completed';
    return 'pending';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner (Matches Page 5) */}
      <div className="bg-emerald-50 border border-emerald-200/80 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full bg-[#146B3A] text-white flex items-center justify-center shrink-0 shadow-lg shadow-green-900/10">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-display">
                Order Placed Successfully!
              </h1>
              <span className="bg-[#146B3A] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                {order.status}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Thank you for choosing DairyConnect. Your order is confirmed and fresh bottles will arrive shortly.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 pt-2 font-medium">
              <span>Order ID: <strong className="text-gray-800">#{order.id}</strong></span>
              <span>•</span>
              <span>Placed on: <strong className="text-gray-800">{order.date}</strong></span>
              <span>•</span>
              <span>Payment: <strong className="text-emerald-700 font-bold">{order.paymentMethod} (Paid)</strong></span>
            </div>
          </div>
        </div>

        <div className="shrink-0 flex items-center space-x-3">
          <Link
            to="/products"
            className="bg-white hover:bg-gray-50 border border-gray-200 text-[#064E32] px-5 py-2.5 rounded-full text-xs font-bold shadow-sm transition"
          >
            Order Again
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Order Details & Items (5 cols - Matches Page 5) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Order Details Card */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900 text-base font-display">
              Order Details
            </h3>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-50 p-3 rounded-xl">
                <span className="text-gray-400 block">Order ID</span>
                <span className="font-bold text-gray-800 text-sm">#{order.id}</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl">
                <span className="text-gray-400 block">Delivery Slot</span>
                <span className="font-bold text-gray-800 text-xs truncate block">{order.deliverySlot}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <span className="text-xs text-gray-400 block mb-1">Delivery Address</span>
              <div className="flex items-start space-x-2 text-xs text-gray-700">
                <MapPin className="w-4 h-4 text-[#146B3A] shrink-0 mt-0.5" />
                <p className="leading-relaxed font-medium">{order.deliveryAddress}</p>
              </div>
            </div>

            {/* Ordered Items */}
            <div className="pt-3 border-t border-gray-100">
              <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider mb-3">
                Ordered Items ({order.items.length})
              </h4>
              <div className="space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover bg-stone-100 border border-gray-100"
                      />
                      <div>
                        <p className="font-bold text-gray-900">{item.name}</p>
                        <p className="text-[11px] text-gray-400">{item.unit} • {item.farmerName}</p>
                        <span className="text-[10px] text-emerald-700 font-semibold">Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <span className="font-bold text-gray-900 text-sm font-display">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bill total */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-sm font-extrabold text-gray-900">
              <span>Total Paid</span>
              <span className="text-xl text-[#146B3A] font-display">₹{order.grandTotal}</span>
            </div>

          </div>

          {/* Impact Banner */}
          <div className="bg-[#EAF5EC] rounded-3xl p-5 border border-emerald-200 text-xs text-gray-700 space-y-2">
            <p className="font-bold text-[#146B3A] text-sm">You're Supporting Local Farmers!</p>
            <p className="text-gray-600 leading-relaxed">
              100% of this purchase supports verified dairy families in Coimbatore with direct fair pricing.
            </p>
            <Link to="/products" className="inline-block font-bold text-[#146B3A] hover:underline pt-1">
              ← Continue Shopping
            </Link>
          </div>

        </div>

        {/* Right Column: Live Tracking Steps & Animated Map (7 cols - Matches Page 5) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Visual Step Tracker */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-lg font-display flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Live Delivery Tracking</span>
              </h3>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                Active Order
              </span>
            </div>

            {/* 5-Step Stepper */}
            <div className="grid grid-cols-5 gap-1 text-center relative">
              {steps.map((st, i) => {
                const status = getStepStatus(st.title);
                return (
                  <div key={i} className="flex flex-col items-center space-y-2 relative z-10">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition shadow-sm ${
                      status === 'completed'
                        ? 'bg-[#146B3A] text-white'
                        : status === 'current'
                        ? 'bg-[#146B3A] text-white ring-4 ring-emerald-200'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {status === 'completed' ? '✓' : i + 1}
                    </div>
                    <div>
                      <p className={`text-[11px] leading-tight font-bold ${
                        status === 'completed' || status === 'current' ? 'text-gray-900' : 'text-gray-400'
                      }`}>
                        {st.title}
                      </p>
                      <span className="text-[10px] text-gray-400 block mt-0.5">{st.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Map Component */}
            <div className="pt-2">
              <LiveMapDemo
                status={order.status}
                eta={order.eta || '15 mins'}
                riderName={order.assignedPartnerName || 'Karthik S'}
                height="320px"
              />
            </div>

            {/* Assigned Delivery Partner Card */}
            <div className="bg-stone-50 rounded-2xl p-4 border border-gray-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-3.5">
                <img
                  src={order.assignedPartnerAvatar || 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80'}
                  alt="Delivery Partner"
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-400"
                />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">
                    {order.assignedPartnerName || 'Karthik S'}
                  </h4>
                  <p className="text-xs text-gray-500">
                    Vehicle: {order.assignedPartnerVehicle || 'Scooter (TN 37 CD 5678)'}
                  </p>
                  <span className="text-[10px] text-emerald-700 font-bold">
                    ★ 4.8 (320+ deliveries completed)
                  </span>
                </div>
              </div>

              {/* Call / Message buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setCallAlert(true);
                    setTimeout(() => setCallAlert(false), 4000);
                  }}
                  className="flex items-center space-x-1.5 bg-[#146B3A] hover:bg-[#064E32] text-white px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Rider</span>
                </button>
              </div>
            </div>

            {callAlert && (
              <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs p-3 rounded-xl animate-in fade-in">
                📞 Calling delivery partner <strong>{order.assignedPartnerName || 'Karthik'}</strong> at {order.assignedPartnerPhone || '+91 98765 43211'}...
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
