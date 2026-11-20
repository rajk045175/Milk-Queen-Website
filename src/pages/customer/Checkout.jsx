import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Clock,
  MapPin,
  CreditCard,
  Smartphone,
  Building,
  Banknote,
  Plus,
  ShieldCheck,
  Lock,
  ArrowRight,
  Edit2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export default function Checkout() {
  const { cartItems, subtotal, deliveryCharge, platformFee, discount, grandTotal, clearCart } = useCart();
  const { createOrder } = useApp();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Selected address state
  const [selectedAddress, setSelectedAddress] = useState('home');
  const [addresses, setAddresses] = useState([
    {
      id: 'home',
      label: 'Home',
      street: '12, R.S. Puram Main Road',
      city: 'Coimbatore - 641002',
      phone: '+91 98765 43210'
    },
    {
      id: 'work',
      label: 'Work',
      street: 'CraffixWeb Technologies, Tatabad',
      city: 'Coimbatore - 641012',
      phone: '+91 98765 43210'
    }
  ]);

  // Selected Slot
  const [deliveryDate, setDeliveryDate] = useState('Tomorrow, 20 Nov 2026');
  const [deliverySlot, setDeliverySlot] = useState('6:00 AM - 8:00 AM');

  // Selected Payment
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [upiId, setUpiId] = useState('priya@okhdfcbank');

  // Add Address Modal
  const [showAddAddrModal, setShowAddAddrModal] = useState(false);
  const [newAddrLabel, setNewAddrLabel] = useState('Other');
  const [newAddrStreet, setNewAddrStreet] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('Coimbatore - 641004');
  const [newAddrPhone, setNewAddrPhone] = useState('+91 98765 43210');

  const slots = [
    { id: 'early', time: '6:00 AM - 8:00 AM', label: 'Early Morning' },
    { id: 'morning', time: '8:00 AM - 10:00 AM', label: 'Morning' },
    { id: 'late-morning', time: '10:00 AM - 12:00 PM', label: 'Late Morning' },
    { id: 'evening', time: '4:00 PM - 6:00 PM', label: 'Evening' },
    { id: 'night', time: '6:00 PM - 8:00 PM', label: 'Night' }
  ];

  const handleAddNewAddress = (e) => {
    e.preventDefault();
    if (newAddrStreet.trim()) {
      const newId = 'addr-' + Date.now();
      const addrObj = {
        id: newId,
        label: newAddrLabel,
        street: newAddrStreet,
        city: newAddrCity,
        phone: newAddrPhone
      };
      setAddresses([...addresses, addrObj]);
      setSelectedAddress(newId);
      setShowAddAddrModal(false);
      setNewAddrStreet('');
    }
  };

  const handlePlaceOrder = () => {
    const chosenAddr = addresses.find(a => a.id === selectedAddress) || addresses[0];
    const newOrder = createOrder({
      customerName: currentUser?.name || 'Priya S',
      customerEmail: currentUser?.email || 'priya.s@gmail.com',
      customerPhone: chosenAddr.phone,
      deliveryAddress: `${chosenAddr.street}, ${chosenAddr.city}`,
      deliverySlot: `${deliveryDate} • ${deliverySlot}`,
      deliveryDate: deliveryDate,
      paymentMethod: paymentMethod,
      items: cartItems,
      itemTotal: subtotal,
      deliveryCharge: deliveryCharge,
      platformFee: platformFee,
      discount: discount,
      grandTotal: grandTotal
    });

    clearCart();
    navigate(`/tracking/${newOrder.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner & Heading (Matches Page 4) */}
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 font-display">
          Secure Checkout
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Fresh dairy products from our farmers, delivered to your doorstep.
        </p>

        {/* Step Indicator */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#146B3A]">
            <div className="w-6 h-6 rounded-full bg-[#146B3A] text-white flex items-center justify-center text-xs">
              ✓
            </div>
            <span>1. Cart Review</span>
          </div>
          <div className="flex items-center space-x-2 text-xs font-bold text-[#146B3A]">
            <div className="w-6 h-6 rounded-full bg-[#146B3A] text-white flex items-center justify-center text-xs">
              2
            </div>
            <span>2. Delivery Address</span>
          </div>
          <div className="flex items-center space-x-2 text-xs font-bold text-[#146B3A]">
            <div className="w-6 h-6 rounded-full bg-[#146B3A] text-white flex items-center justify-center text-xs">
              3
            </div>
            <span>3. Payment Method</span>
          </div>
          <div className="flex items-center space-x-2 text-xs font-bold text-gray-400">
            <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xs">
              4
            </div>
            <span>4. Confirmation</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: Address, Slots, Payment (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* 1. DELIVERY ADDRESS */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-base flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-[#146B3A] text-xs font-bold flex items-center justify-center">1</span>
                <span>Delivery Address</span>
              </h3>
              <button
                onClick={() => setShowAddAddrModal(true)}
                className="text-xs font-bold text-[#146B3A] hover:bg-emerald-50 px-3 py-1 rounded-full transition flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Address</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {addresses.map((addr) => {
                const isSelected = selectedAddress === addr.id;
                return (
                  <div
                    key={addr.id}
                    onClick={() => setSelectedAddress(addr.id)}
                    className={`p-4 rounded-2xl border-2 transition cursor-pointer relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#146B3A] bg-emerald-50/40 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900 text-sm flex items-center space-x-1.5">
                          <MapPin className="w-4 h-4 text-[#146B3A]" />
                          <span>{addr.label}</span>
                        </span>
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-[#146B3A] bg-[#146B3A]' : 'border-gray-300'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 pt-1 leading-relaxed">{addr.street}</p>
                      <p className="text-xs text-gray-500">{addr.city}</p>
                      <p className="text-xs text-gray-500 font-medium">{addr.phone}</p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-gray-100/80 flex items-center justify-between text-xs text-[#146B3A] font-semibold">
                      <span>{isSelected ? 'Delivering here' : 'Select'}</span>
                      <Edit2 className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. CHOOSE DELIVERY SLOT */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-base flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-[#146B3A] text-xs font-bold flex items-center justify-center">2</span>
                <span>Choose Delivery Slot</span>
              </h3>
              <select
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="text-xs font-bold bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-gray-700"
              >
                <option value="Tomorrow, 20 Nov 2026">Tomorrow, 20 Nov 2026</option>
                <option value="Today (Express Evening), 19 Nov 2026">Today (Express Evening), 19 Nov 2026</option>
                <option value="Saturday, 21 Nov 2026">Saturday, 21 Nov 2026</option>
              </select>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {slots.map((s) => {
                const isSelected = deliverySlot === s.time;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setDeliverySlot(s.time)}
                    className={`p-3 rounded-2xl border text-left transition ${
                      isSelected
                        ? 'border-[#146B3A] bg-emerald-50 text-[#146B3A] font-bold shadow-sm'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{s.time}</span>
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[11px] text-gray-400 block mt-0.5">{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. PAYMENT METHOD */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900 text-base flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-[#146B3A] text-xs font-bold flex items-center justify-center">3</span>
              <span>Payment Method</span>
            </h3>

            <div className="space-y-3 pt-2">
              
              {/* UPI */}
              <div
                onClick={() => setPaymentMethod('UPI')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition ${
                  paymentMethod === 'UPI' ? 'border-[#146B3A] bg-emerald-50/40' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="w-5 h-5 text-[#146B3A]" />
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">UPI (Instant 0% Fee)</h4>
                      <p className="text-xs text-gray-500">Google Pay, PhonePe, Paytm, BHIM</p>
                    </div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'UPI' ? 'border-[#146B3A] bg-[#146B3A]' : 'border-gray-300'
                  }`}>
                    {paymentMethod === 'UPI' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                  </div>
                </div>

                {paymentMethod === 'UPI' && (
                  <div className="mt-3 pt-3 border-t border-emerald-100 flex items-center space-x-2">
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. mobile@upi"
                      className="text-xs px-3 py-2 bg-white border border-gray-200 rounded-xl flex-1 focus:outline-none focus:ring-1 focus:ring-[#146B3A]"
                    />
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-lg">Verified</span>
                  </div>
                )}
              </div>

              {/* Credit / Debit Card */}
              <div
                onClick={() => setPaymentMethod('Card')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition ${
                  paymentMethod === 'Card' ? 'border-[#146B3A] bg-emerald-50/40' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-5 h-5 text-[#146B3A]" />
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">Credit / Debit Card</h4>
                      <p className="text-xs text-gray-500">Visa, MasterCard, RuPay</p>
                    </div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'Card' ? 'border-[#146B3A] bg-[#146B3A]' : 'border-gray-300'
                  }`}>
                    {paymentMethod === 'Card' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                  </div>
                </div>
              </div>

              {/* Net Banking */}
              <div
                onClick={() => setPaymentMethod('Net Banking')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition ${
                  paymentMethod === 'Net Banking' ? 'border-[#146B3A] bg-emerald-50/40' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Building className="w-5 h-5 text-[#146B3A]" />
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">Net Banking</h4>
                      <p className="text-xs text-gray-500">SBI, HDFC, ICICI, Axis & all major banks</p>
                    </div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'Net Banking' ? 'border-[#146B3A] bg-[#146B3A]' : 'border-gray-300'
                  }`}>
                    {paymentMethod === 'Net Banking' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                  </div>
                </div>
              </div>

              {/* Cash on Delivery */}
              <div
                onClick={() => setPaymentMethod('Cash on Delivery')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition ${
                  paymentMethod === 'Cash on Delivery' ? 'border-[#146B3A] bg-emerald-50/40' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Banknote className="w-5 h-5 text-[#146B3A]" />
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">Cash on Delivery</h4>
                      <p className="text-xs text-gray-500">Pay when fresh bottles arrive</p>
                    </div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'Cash on Delivery' ? 'border-[#146B3A] bg-[#146B3A]' : 'border-gray-300'
                  }`}>
                    {paymentMethod === 'Cash on Delivery' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                  </div>
                </div>
              </div>

            </div>

            <div className="pt-2 flex items-center space-x-2 text-xs text-gray-500">
              <input type="checkbox" id="savePay" defaultChecked className="accent-[#146B3A]" />
              <label htmlFor="savePay" className="cursor-pointer">Save this payment method for future orders</label>
            </div>
          </div>

        </div>

        {/* Right Sidebar: Order Items & Place Order (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6 sticky top-24">
            
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-lg font-display">
                Order Summary ({cartItems.length} items)
              </h3>
              <Link to="/cart" className="text-xs font-bold text-[#146B3A] hover:underline">
                Edit Cart
              </Link>
            </div>

            {/* Items mini list */}
            <div className="divide-y divide-gray-100 max-h-56 overflow-y-auto space-y-2 pr-1">
              {cartItems.map((item) => (
                <div key={item.id} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded-xl object-cover bg-stone-100" />
                    <div>
                      <p className="font-bold text-gray-900 truncate max-w-[170px]">{item.name}</p>
                      <p className="text-[10px] text-gray-400">{item.unit} x {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-gray-900 font-display">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="pt-4 border-t border-gray-100 space-y-2.5 text-xs text-gray-600">
              <div className="flex items-center justify-between">
                <span>Item Total</span>
                <span className="font-bold text-gray-900 text-sm">₹{subtotal}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Delivery Charges</span>
                <span className={deliveryCharge === 0 ? 'text-emerald-600 font-bold' : 'font-bold text-gray-900'}>
                  {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Platform Fee</span>
                <span className="font-bold text-gray-900">₹{platformFee}</span>
              </div>
              {discount > 0 && (
                <div className="flex items-center justify-between text-emerald-600 font-bold">
                  <span>Discount</span>
                  <span>- ₹{discount}</span>
                </div>
              )}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-base font-extrabold text-gray-900">
                <span>Total Amount</span>
                <span className="text-2xl text-[#146B3A] font-display">₹{grandTotal}</span>
              </div>
            </div>

            {/* Big Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              className="w-full flex items-center justify-center space-x-2 bg-[#146B3A] hover:bg-[#064E32] text-white py-4 rounded-2xl font-bold text-base shadow-xl shadow-green-900/20 transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Lock className="w-4 h-4 text-emerald-200" />
              <span>Place Order (₹{grandTotal})</span>
            </button>

            <p className="text-[11px] text-gray-400 text-center">
              By placing the order, you agree to our Terms & Fresh Delivery Policy.
            </p>

          </div>
        </div>

      </div>

      {/* Add New Address Modal */}
      {showAddAddrModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-gray-900 text-lg">Add Delivery Address</h3>
            <form onSubmit={handleAddNewAddress} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-500">Address Label</label>
                <div className="flex space-x-2 mt-1">
                  {['Home', 'Work', 'Farm', 'Other'].map((lbl) => (
                    <button
                      key={lbl}
                      type="button"
                      onClick={() => setNewAddrLabel(lbl)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                        newAddrLabel === lbl ? 'bg-[#146B3A] text-white border-[#146B3A]' : 'bg-gray-50 border-gray-200 text-gray-700'
                      }`}
                    >
                      {lbl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500">Street / House / Landmark</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 56, Cross Cut Road"
                  value={newAddrStreet}
                  onChange={(e) => setNewAddrStreet(e.target.value)}
                  className="w-full mt-1 px-3.5 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#146B3A]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500">City & Pincode</label>
                <input
                  type="text"
                  required
                  value={newAddrCity}
                  onChange={(e) => setNewAddrCity(e.target.value)}
                  className="w-full mt-1 px-3.5 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#146B3A]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500">Contact Phone</label>
                <input
                  type="text"
                  required
                  value={newAddrPhone}
                  onChange={(e) => setNewAddrPhone(e.target.value)}
                  className="w-full mt-1 px-3.5 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#146B3A]"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddAddrModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-500 hover:bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-[#146B3A] text-white rounded-xl shadow"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
