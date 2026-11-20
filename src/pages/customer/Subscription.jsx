import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, PauseCircle, PlayCircle, Plus, Minus, ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Subscription() {
  const { approvedProducts } = useApp();
  const milkProducts = approvedProducts.filter(p => p.category === 'Fresh Milk');

  const [selectedProduct, setSelectedProduct] = useState(milkProducts[0]?.id || 'prod-1');
  const [dailyLitres, setDailyLitres] = useState(1);
  const [frequency, setFrequency] = useState('daily'); // 'daily' | 'alternate' | 'weekdays'
  const [subscriptionActive, setSubscriptionActive] = useState(true);
  const [successBanner, setSuccessBanner] = useState(false);

  const product = milkProducts.find(p => p.id === selectedProduct) || milkProducts[0];
  const monthlyCost = (product ? product.price * (dailyLitres / 0.5) * 30 : 1680);

  const handleSavePlan = () => {
    setSuccessBanner(true);
    setTimeout(() => setSuccessBanner(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="bg-emerald-100 text-[#146B3A] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
          Daily Doorstep Delivery
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 font-display">
          Daily Fresh Milk Subscription
        </h1>
        <p className="text-sm text-gray-600">
          Pure cow milk delivered every morning before 7:00 AM. Zero delivery fee, pause anytime with 1 tap.
        </p>
      </div>

      {successBanner && (
        <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs p-4 rounded-2xl flex items-center space-x-3 max-w-2xl mx-auto animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
          <span>Subscription plan updated successfully! Your morning deliveries are confirmed.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Configurator (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
          <h3 className="font-bold text-gray-900 text-xl font-display">
            Configure Your Plan
          </h3>

          {/* 1. Choose Milk Type */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
              1. Choose Milk Variety
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {milkProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedProduct(p.id)}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition text-left ${
                    selectedProduct === p.id
                      ? 'border-[#146B3A] bg-emerald-50/50 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover mb-2" />
                  <h4 className="font-bold text-xs text-gray-900 leading-snug">{p.name}</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">₹{p.price} / {p.unit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Daily Quantity */}
          <div className="space-y-3 pt-3 border-t border-gray-100">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
              2. Select Daily Quantity
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-gray-100 rounded-2xl px-3 py-2 space-x-4">
                <button
                  onClick={() => setDailyLitres(Math.max(0.5, dailyLitres - 0.5))}
                  className="w-8 h-8 rounded-xl bg-white flex items-center justify-center font-bold text-gray-700 shadow-sm hover:bg-gray-200"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-extrabold text-base text-gray-900 w-16 text-center font-display">
                  {dailyLitres} Litre
                </span>
                <button
                  onClick={() => setDailyLitres(dailyLitres + 0.5)}
                  className="w-8 h-8 rounded-xl bg-white flex items-center justify-center font-bold text-gray-700 shadow-sm hover:bg-gray-200"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-xs text-gray-500">Ideal for family of {Math.ceil(dailyLitres * 3)}</span>
            </div>
          </div>

          {/* 3. Delivery Frequency */}
          <div className="space-y-3 pt-3 border-t border-gray-100">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
              3. Delivery Schedule
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'daily', label: 'Everyday', desc: 'Mon - Sun' },
                { id: 'alternate', label: 'Alternate Days', desc: 'Every 2 days' },
                { id: 'weekdays', label: 'Weekdays Only', desc: 'Mon - Fri' }
              ].map((sch) => (
                <button
                  key={sch.id}
                  type="button"
                  onClick={() => setFrequency(sch.id)}
                  className={`p-3 rounded-2xl border text-left transition ${
                    frequency === sch.id
                      ? 'border-[#146B3A] bg-emerald-50 text-[#146B3A] font-bold'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <p className="text-xs font-bold">{sch.label}</p>
                  <span className="text-[10px] text-gray-400 block">{sch.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSavePlan}
            className="w-full bg-[#146B3A] hover:bg-[#064E32] text-white py-3.5 rounded-2xl font-bold text-xs shadow-md transition"
          >
            Confirm & Activate Morning Deliveries
          </button>
        </div>

        {/* Right Active Plan Summary (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="font-bold text-gray-900 text-lg font-display">Current Status</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              subscriptionActive ? 'bg-emerald-100 text-[#146B3A]' : 'bg-amber-100 text-amber-800'
            }`}>
              {subscriptionActive ? 'Active' : 'Paused'}
            </span>
          </div>

          <div className="space-y-3 text-xs text-gray-600">
            <div className="flex items-center justify-between">
              <span>Selected Milk:</span>
              <strong className="text-gray-900">{product?.name}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span>Quantity:</span>
              <strong className="text-gray-900">{dailyLitres} L per morning</strong>
            </div>
            <div className="flex items-center justify-between">
              <span>Delivery Time:</span>
              <strong className="text-gray-900">Before 7:00 AM</strong>
            </div>
            <div className="flex items-center justify-between">
              <span>Delivery Fee:</span>
              <strong className="text-emerald-700">₹0 (Free for subscribers)</strong>
            </div>
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-base font-extrabold text-gray-900">
              <span>Estimated Monthly:</span>
              <span className="text-xl text-[#146B3A] font-display">₹{monthlyCost}</span>
            </div>
          </div>

          {/* Pause / Resume Controls */}
          <div className="pt-2 border-t border-gray-100 space-y-3">
            <button
              onClick={() => setSubscriptionActive(!subscriptionActive)}
              className={`w-full py-3 rounded-2xl text-xs font-bold flex items-center justify-center space-x-2 border transition ${
                subscriptionActive
                  ? 'border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100'
                  : 'border-emerald-300 bg-emerald-50 text-[#146B3A] hover:bg-emerald-100'
              }`}
            >
              {subscriptionActive ? (
                <>
                  <PauseCircle className="w-4 h-4" />
                  <span>Going Out of Town? Pause Subscription</span>
                </>
              ) : (
                <>
                  <PlayCircle className="w-4 h-4" />
                  <span>Resume Morning Deliveries</span>
                </>
              )}
            </button>
            <p className="text-[11px] text-gray-400 text-center">
              Changes made before 9:00 PM take effect the next morning.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
