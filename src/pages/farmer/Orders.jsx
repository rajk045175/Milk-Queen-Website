import React from 'react';
import { ShoppingBag, CheckCircle2, Clock, Check, X, Eye, PackageCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function FarmerOrders() {
  const { orders, updateOrderStatus } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-display">
          Incoming Orders & Dispatch
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Step 5 & 6: Accept orders, pack fresh dairy bottles, and update readiness for pickup
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((ord) => (
          <div key={ord.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
            
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#146B3A] flex items-center justify-center font-bold text-xs">
                  #{ord.id.slice(-4)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Order #{ord.id}</h4>
                  <p className="text-xs text-gray-400">{ord.customerName} • {ord.deliverySlot}</p>
                </div>
              </div>

              {/* Status and Action Buttons */}
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  ord.status === 'Packed'
                    ? 'bg-blue-100 text-blue-900'
                    : ord.status === 'Out for Delivery' || ord.status === 'Delivered'
                    ? 'bg-emerald-100 text-[#146B3A]'
                    : 'bg-amber-100 text-amber-900 animate-pulse'
                }`}>
                  Status: {ord.status}
                </span>

                {ord.status === 'Order Placed' && (
                  <button
                    onClick={() => updateOrderStatus(ord.id, 'Confirmed')}
                    className="flex items-center space-x-1 bg-[#146B3A] hover:bg-[#064E32] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Accept Order</span>
                  </button>
                )}

                {(ord.status === 'Order Placed' || ord.status === 'Confirmed') && (
                  <button
                    onClick={() => updateOrderStatus(ord.id, 'Packed')}
                    className="flex items-center space-x-1 bg-emerald-700 hover:bg-emerald-900 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow"
                  >
                    <PackageCheck className="w-3.5 h-3.5" />
                    <span>Mark Packed & Ready</span>
                  </button>
                )}
              </div>
            </div>

            {/* Items in this order */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {ord.items.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3 text-xs bg-gray-50 p-3 rounded-2xl">
                  <img src={item.image} alt={item.name} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <p className="font-bold text-gray-900">{item.name}</p>
                    <p className="text-gray-400">{item.unit} x {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
              <span>Delivery Partner: <strong className="text-gray-800">{ord.assignedPartnerName || 'Unassigned (Waiting for Admin)'}</strong></span>
              <span className="font-bold text-gray-900">Total: <strong className="text-[#146B3A] text-sm font-display">₹{ord.grandTotal}</strong></span>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
