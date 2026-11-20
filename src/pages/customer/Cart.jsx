import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Tag,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function Cart() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryCharge,
    platformFee,
    discount,
    grandTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useCart();

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState(null);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      const res = applyCoupon(couponInput);
      setCouponMsg(res);
      if (res.success) setCouponInput('');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-24 h-24 mx-auto rounded-full bg-emerald-50 text-[#146B3A] flex items-center justify-center">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 font-display">
          Your Dairy Cart is Empty
        </h2>
        <p className="text-gray-500 max-w-md mx-auto text-sm">
          Looks like you haven't added any pure milk, paneer, or fresh bilona ghee yet.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center space-x-2 bg-[#146B3A] hover:bg-[#064E32] text-white px-7 py-3 rounded-full font-bold text-sm shadow-md transition"
        >
          <span>Explore Fresh Dairy Products</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs text-gray-400">
        <Link to="/" className="hover:text-gray-600">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-800 font-bold">Shopping Cart</span>
      </div>

      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 font-display">
            My Cart <span className="text-[#146B3A]">({cartItems.length} items)</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">Review your fresh farm selections</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline flex items-center space-x-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Cart Items List (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm divide-y divide-gray-100">
            {cartItems.map((item) => (
              <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                
                {/* Item Thumbnail & Details */}
                <div className="flex items-center space-x-4 flex-1">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-2xl object-cover bg-stone-100 border border-gray-100 shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm leading-tight">{item.name}</h4>
                    <p className="text-xs text-gray-400 mt-0.5">{item.unit} • {item.farmerName}</p>
                    <p className="text-sm font-extrabold text-[#146B3A] mt-1 font-display">₹{item.price}</p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center bg-gray-100 rounded-full px-2 py-1 space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-gray-700 hover:bg-gray-200 transition"
                      aria-label="Decrease"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-gray-700 hover:bg-gray-200 transition"
                      aria-label="Increase"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <span className="text-sm font-extrabold text-gray-900 w-16 text-right font-display">
                    ₹{item.price * item.quantity}
                  </span>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-gray-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Delivery Note */}
          <div className="bg-[#EAF5EC] rounded-2xl p-4 border border-emerald-200 flex items-center justify-between text-xs text-gray-700">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[#146B3A]" />
              <span>Next available morning delivery: <strong>Tomorrow, 6:00 AM - 8:00 AM</strong></span>
            </div>
            <span className="text-[#146B3A] font-bold">Standard Delivery</span>
          </div>

        </div>

        {/* Right Order Summary Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
            <h3 className="font-bold text-gray-900 text-lg font-display pb-3 border-b border-gray-100">
              Order Summary
            </h3>

            {/* Price breakdown */}
            <div className="space-y-3 text-xs text-gray-600">
              <div className="flex items-center justify-between">
                <span>Items Subtotal</span>
                <span className="font-bold text-gray-900 text-sm">₹{subtotal}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Delivery Charges</span>
                <span className={deliveryCharge === 0 ? 'text-emerald-600 font-bold' : 'font-bold text-gray-900 text-sm'}>
                  {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Platform Support Fee</span>
                <span className="font-bold text-gray-900 text-sm">₹{platformFee}</span>
              </div>

              {discount > 0 && (
                <div className="flex items-center justify-between text-emerald-600 font-bold">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span>- ₹{discount}</span>
                </div>
              )}

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-base font-extrabold text-gray-900">
                <span className="font-display">Total Amount</span>
                <span className="text-xl text-[#146B3A] font-display">₹{grandTotal}</span>
              </div>
            </div>

            {/* Coupon Code Input */}
            <div className="pt-2">
              {appliedCoupon ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#146B3A]">{appliedCoupon.code}</span>
                    <p className="text-[11px] text-gray-500">{appliedCoupon.name}</p>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-rose-600 font-bold hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Coupon: DAIRY20, FREESHIP"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#146B3A]"
                    />
                    <button
                      type="submit"
                      className="bg-gray-800 hover:bg-black text-white text-xs font-bold px-4 py-2 rounded-xl transition"
                    >
                      Apply
                    </button>
                  </div>
                  {couponMsg && (
                    <p className={`text-xs ${couponMsg.success ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {couponMsg.message}
                    </p>
                  )}
                </form>
              )}
            </div>

            {/* Proceed to Checkout CTA */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full flex items-center justify-center space-x-2 bg-[#146B3A] hover:bg-[#064E32] text-white py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-green-900/15 transition transform hover:-translate-y-0.5"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-gray-400 text-center flex items-center justify-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Safe & Encrypted 256-bit Checkout</span>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}
