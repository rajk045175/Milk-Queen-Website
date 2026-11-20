import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Clock, MapPin, CheckCircle2, ChevronRight, Eye } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Orders() {
  const { orders } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs text-gray-400">
        <Link to="/" className="hover:text-gray-600">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-800 font-bold">My Orders</span>
      </div>

      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 font-display">
          My Orders & Delivery Tracking
        </h1>
        <p className="text-xs text-gray-500 mt-1">Review current shipments and previous order history</p>
      </div>

      <div className="space-y-4">
        {orders.map((ord) => (
          <div key={ord.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4 hover:shadow-md transition">
            
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#146B3A] flex items-center justify-center font-bold text-xs">
                  #{ord.id.slice(-4)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">Order #{ord.id}</h3>
                  <p className="text-xs text-gray-400">{ord.date} • {ord.deliverySlot}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  ord.status === 'Delivered'
                    ? 'bg-emerald-100 text-[#146B3A]'
                    : ord.status === 'Out for Delivery'
                    ? 'bg-amber-100 text-amber-900 animate-pulse'
                    : 'bg-blue-100 text-blue-900'
                }`}>
                  {ord.status}
                </span>

                <Link
                  to={`/tracking/${ord.id}`}
                  className="flex items-center space-x-1 bg-[#146B3A] hover:bg-[#064E32] text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Track Live</span>
                </Link>
              </div>
            </div>

            {/* Items row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {ord.items.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3 text-xs bg-gray-50/70 p-3 rounded-2xl">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover bg-stone-100 shrink-0" />
                  <div>
                    <h5 className="font-bold text-gray-900 truncate">{item.name}</h5>
                    <p className="text-gray-400 text-[11px]">{item.unit} x {item.quantity}</p>
                    <p className="text-xs font-bold text-emerald-800">₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between text-xs text-gray-500 gap-2">
              <div className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#146B3A]" />
                <span className="truncate max-w-md">{ord.deliveryAddress}</span>
              </div>
              <div className="font-bold text-gray-900 text-sm">
                Total: <span className="text-[#146B3A] font-display font-extrabold text-base">₹{ord.grandTotal}</span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
