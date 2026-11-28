import React, { useState } from 'react';
import {
  CheckCircle2,
  PauseCircle,
  PlayCircle,
  Plus,
  Minus,
  Trash2,
  AlertTriangle,
  X,
  CalendarCheck,
  ShoppingBag
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { handleProductImageError, parseValidPrice, parseValidQuantity } from '../../data/products';

const FREQ_OPTIONS = [
  { id: 'daily', label: 'Daily', desc: '30 deliveries / month', multiplier: 30 },
  { id: 'weekly', label: 'Weekly', desc: '4 deliveries / month', multiplier: 4 },
  { id: 'monthly', label: 'Monthly', desc: '1 delivery / month', multiplier: 1 }
];

export default function Subscription() {
  const {
    approvedProducts,
    subscriptions,
    subscriptionFrequency,
    setSubscriptionFrequency,
    subscriptionActive,
    setSubscriptionActive,
    addSubscription,
    removeSubscription,
    updateSubscriptionQty
  } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const showSuccess = (msg) => {
    setErrorMsg('');
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3500);
  };

  const showError = (msg) => {
    setSuccessMsg('');
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(''), 4500);
  };

  // Normalize subscribed items with valid numbers and catalog fallback for legacy localStorage data
  const normalizedSubscriptions = subscriptions.map((sub) => {
    const catalogItem = approvedProducts.find((p) => p.id === sub.id);
    const unitPrice = parseValidPrice(sub.price ?? sub.unitPrice ?? sub.amount ?? catalogItem?.price);
    const qty = parseValidQuantity(sub.quantity ?? sub.qty, 1);
    const lineTotal = unitPrice !== null ? unitPrice * qty : null;
    return {
      ...sub,
      name: sub.name || catalogItem?.name || 'Dairy Product',
      unit: sub.unit || catalogItem?.unit || '',
      image: sub.image || catalogItem?.image,
      unitPrice,
      qty,
      lineTotal
    };
  });

  const invalidPriceItems = normalizedSubscriptions.filter((s) => s.unitPrice === null);
  const hasInvalidPrices = invalidPriceItems.length > 0;

  // Products not yet in subscriptions
  const availableToAdd = approvedProducts.filter(
    (p) => !subscriptions.some((s) => s.id === p.id)
  );

  const freqObj = FREQ_OPTIONS.find((f) => f.id === subscriptionFrequency) || FREQ_OPTIONS[0];

  const perDeliveryTotal = hasInvalidPrices
    ? null
    : normalizedSubscriptions.reduce((sum, s) => sum + s.lineTotal, 0);
  const monthlyTotal = perDeliveryTotal !== null ? perDeliveryTotal * freqObj.multiplier : null;

  const handleAdd = (product) => {
    const res = addSubscription(product, 1);
    if (res?.error) {
      showError(res.error);
    } else if (res?.duplicate) {
      showSuccess(`${product.name} is already in your subscription!`);
    } else {
      showSuccess(`${product.name} added to subscription ✓`);
    }
    setShowAddModal(false);
  };

  const handleDelete = () => {
    const sub = normalizedSubscriptions.find((s) => s.id === deleteTarget);
    removeSubscription(deleteTarget);
    showSuccess(`${sub?.name || 'Product'} removed from subscription.`);
    setDeleteTarget(null);
  };

  const handleConfirm = () => {
    if (hasInvalidPrices) {
      showError('Please remove items with invalid pricing before confirming.');
      return;
    }
    showSuccess('Subscription confirmed! Deliveries will begin as scheduled.');
  };

  const formatINR = (amount) => `₹${Number(amount).toLocaleString('en-IN')}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="bg-emerald-100 text-[#146B3A] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
          Daily Doorstep Delivery
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 font-display">
          Manage Your Subscriptions
        </h1>
        <p className="text-sm text-gray-600">
          Add dairy products, set quantities, choose delivery frequency. Pause anytime.
        </p>
      </div>

      {/* Success Banner */}
      {successMsg && (
        <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs p-4 rounded-2xl flex items-center space-x-3 max-w-2xl mx-auto animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Error Banner for invalid product prices */}
      {(errorMsg || hasInvalidPrices) && (
        <div className="bg-rose-50 border border-rose-200 text-rose-900 text-xs p-4 rounded-2xl flex items-center space-x-3 max-w-2xl mx-auto">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>
            {errorMsg || `Invalid product price detected for ${invalidPriceItems.map(i => i.name).join(', ')}. Please remove and re-add the affected product.`}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Panel – Subscription List + Controls */}
        <div className="lg:col-span-7 space-y-6">

          {/* Frequency Selector */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900 text-base font-display flex items-center space-x-2">
              <CalendarCheck className="w-5 h-5 text-[#146B3A]" />
              <span>Delivery Frequency</span>
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {FREQ_OPTIONS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setSubscriptionFrequency(f.id)}
                  className={`p-3 rounded-2xl border text-left transition ${
                    subscriptionFrequency === f.id
                      ? 'border-[#146B3A] bg-emerald-50 text-[#146B3A] font-bold shadow-sm'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <p className="text-xs font-bold">{f.label}</p>
                  <span className="text-[10px] text-gray-400 block">{f.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Subscribed Products */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-base font-display flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-[#146B3A]" />
                <span>Subscribed Products ({normalizedSubscriptions.length})</span>
              </h3>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center space-x-1.5 bg-[#146B3A] hover:bg-[#064E32] text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Product</span>
              </button>
            </div>

            {normalizedSubscriptions.length === 0 ? (
              <div className="py-10 text-center text-gray-400 space-y-3">
                <ShoppingBag className="w-12 h-12 mx-auto text-gray-200" />
                <p className="text-sm font-semibold">No products subscribed yet</p>
                <p className="text-xs">Click "Add Product" to start your subscription</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100 space-y-2">
                {normalizedSubscriptions.map((sub) => (
                  <div key={sub.id} className="pt-4 first:pt-0 flex items-center justify-between gap-3">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <img
                        src={sub.image}
                        alt={sub.name}
                        onError={handleProductImageError}
                        className="w-14 h-14 rounded-2xl object-cover bg-stone-100 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900 text-sm truncate">{sub.name}</p>
                        <p className="text-[11px] text-gray-500">
                          {sub.unit} × {sub.qty} · {sub.unitPrice !== null ? `${formatINR(sub.unitPrice)} / ${sub.unit}` : 'Invalid price'}
                        </p>
                        <p className={`text-xs font-bold ${sub.lineTotal !== null ? 'text-[#146B3A]' : 'text-rose-600'}`}>
                          {sub.lineTotal !== null ? `${formatINR(sub.lineTotal)} / delivery` : 'Price unavailable'}
                        </p>
                      </div>
                    </div>

                    {/* Qty controls */}
                    <div className="flex items-center bg-gray-100 rounded-xl px-2 py-1 space-x-2 shrink-0">
                      <button
                        onClick={() => updateSubscriptionQty(sub.id, Math.max(1, sub.qty - 1))}
                        disabled={sub.qty <= 1}
                        className="w-7 h-7 rounded-lg bg-white flex items-center justify-center font-bold text-gray-700 shadow-sm hover:bg-gray-200 disabled:opacity-40 transition"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-extrabold text-sm text-gray-900 w-6 text-center">{sub.qty}</span>
                      <button
                        onClick={() => updateSubscriptionQty(sub.id, sub.qty + 1)}
                        className="w-7 h-7 rounded-lg bg-white flex items-center justify-center font-bold text-gray-700 shadow-sm hover:bg-gray-200 transition"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => setDeleteTarget(sub.id)}
                      className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition shrink-0"
                      title="Remove from subscription"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel – Summary */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="font-bold text-gray-900 text-lg font-display">Subscription Summary</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              subscriptionActive ? 'bg-emerald-100 text-[#146B3A]' : 'bg-amber-100 text-amber-800'
            }`}>
              {subscriptionActive ? 'Active' : 'Paused'}
            </span>
          </div>

          {/* Items summary */}
          {normalizedSubscriptions.length > 0 ? (
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {normalizedSubscriptions.map((sub) => (
                <div key={sub.id} className="flex items-center space-x-3 text-xs">
                  <img src={sub.image} alt={sub.name} onError={handleProductImageError} className="w-10 h-10 rounded-xl object-cover bg-stone-100 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 truncate">{sub.name}</p>
                    <p className="text-gray-400">{sub.unit} × {sub.qty} · {freqObj.label}</p>
                  </div>
                  <span className={`font-bold shrink-0 ${sub.lineTotal !== null ? 'text-gray-900' : 'text-rose-600'}`}>
                    {sub.lineTotal !== null ? formatINR(sub.lineTotal) : 'Invalid'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400 text-center py-4">No items yet. Add products to see summary.</p>
          )}

          {/* Totals */}
          <div className="pt-3 border-t border-gray-100 space-y-2 text-xs text-gray-600">
            <div className="flex items-center justify-between">
              <span>Frequency:</span>
              <strong className="text-gray-900 capitalize">{freqObj.label} ({freqObj.desc})</strong>
            </div>
            <div className="flex items-center justify-between">
              <span>Per Delivery Total:</span>
              <strong className="text-gray-900">
                {perDeliveryTotal !== null ? formatINR(perDeliveryTotal) : '—'}
              </strong>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-base font-extrabold text-gray-900">
              <span>Monthly Estimate:</span>
              <span className="text-xl text-[#146B3A] font-display">
                {monthlyTotal !== null ? formatINR(monthlyTotal) : '—'}
              </span>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleConfirm}
            disabled={normalizedSubscriptions.length === 0 || hasInvalidPrices}
            className="w-full bg-[#146B3A] hover:bg-[#064E32] disabled:opacity-50 disabled:cursor-not-allowed text-white py-3.5 rounded-2xl font-bold text-xs shadow-md transition"
          >
            Confirm Subscription
          </button>

          {/* Pause / Resume */}
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
                <span>Pause Subscription</span>
              </>
            ) : (
              <>
                <PlayCircle className="w-4 h-4" />
                <span>Resume Deliveries</span>
              </>
            )}
          </button>
          <p className="text-[11px] text-gray-400 text-center">
            Changes made before 9:00 PM take effect the next morning.
          </p>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-lg">Add Product to Subscription</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {availableToAdd.length === 0 ? (
              <div className="py-8 text-center text-gray-400 space-y-2">
                <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-300" />
                <p className="text-sm font-semibold">All available products are already subscribed!</p>
              </div>
            ) : (
              <div className="overflow-y-auto space-y-3 flex-1 pr-1">
                {availableToAdd.map((product) => {
                  const unitPrice = parseValidPrice(product.price);
                  return (
                    <div
                      key={product.id}
                      className="flex items-center space-x-3 p-3 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        onError={handleProductImageError}
                        className="w-14 h-14 rounded-xl object-cover bg-stone-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 text-sm truncate">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.unit}</p>
                        <p className={`text-xs font-bold ${unitPrice !== null ? 'text-[#146B3A]' : 'text-rose-600'}`}>
                          {unitPrice !== null ? formatINR(unitPrice) : 'Invalid price'}
                        </p>
                      </div>
                      <button
                        onClick={() => handleAdd(product)}
                        disabled={unitPrice === null}
                        className="flex items-center space-x-1.5 bg-[#146B3A] hover:bg-[#064E32] disabled:opacity-50 text-white px-3 py-2 rounded-xl text-xs font-bold transition shrink-0"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-rose-100 flex items-center justify-center">
              <AlertTriangle className="w-7 h-7 text-rose-500" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg">Remove Product?</h3>
            <p className="text-xs text-gray-500">
              Are you sure you want to remove{' '}
              <strong>{normalizedSubscriptions.find((s) => s.id === deleteTarget)?.name}</strong> from your subscription?
            </p>
            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 px-4 py-2.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
              >
                Keep It
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2.5 text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 rounded-xl transition"
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
