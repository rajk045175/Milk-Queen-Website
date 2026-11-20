import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, User, ShieldCheck, Tractor, Bike, ArrowRight, Lock, Mail } from 'lucide-react';
import { useAuth, demoAccounts } from '../../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState('customer');
  const [email, setEmail] = useState('priya.s@gmail.com');
  const [password, setPassword] = useState('password123');

  const handleRoleSelect = (r) => {
    setRole(r);
    setEmail(demoAccounts[r].email);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const user = login(role);
    if (user.role === 'admin') navigate('/admin/dashboard');
    else if (user.role === 'farmer') navigate('/farmer/dashboard');
    else if (user.role === 'delivery') navigate('/delivery/dashboard');
    else navigate('/');
  };

  const handleQuickLogin = (roleKey) => {
    const user = login(roleKey);
    if (user.role === 'admin') navigate('/admin/dashboard');
    else if (user.role === 'farmer') navigate('/farmer/dashboard');
    else if (user.role === 'delivery') navigate('/delivery/dashboard');
    else navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EAF5EC] via-[#F8F7EF] to-[#F8F7EF] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Link to="/" className="inline-flex flex-col items-center">
          <img
            src="/logo.png"
            alt="Milk Queen"
            className="h-20 w-auto object-contain hover:scale-105 transition"
          />
        </Link>
        <h2 className="text-2xl font-extrabold text-gray-900 font-display">
          Sign In to Milk Queen
        </h2>
        <p className="text-xs text-gray-500">
          Select your portal role below or use 1-click demo login buttons
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-lg px-4">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl shadow-xl border border-gray-100 space-y-6">
          
          {/* 4 Roles Selector Buttons */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block text-center">
              Choose Portal Role
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'customer', label: 'Customer', icon: User },
                { id: 'farmer', label: 'Farmer', icon: Tractor },
                { id: 'admin', label: 'Admin', icon: ShieldCheck },
                { id: 'delivery', label: 'Delivery', icon: Bike }
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = role === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleRoleSelect(item.id)}
                    className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center space-y-1 ${
                      isSelected
                        ? 'border-[#146B3A] bg-emerald-50 text-[#146B3A] font-bold shadow-sm'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-gray-700 block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#146B3A] font-medium"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#146B3A]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 bg-[#146B3A] hover:bg-[#064E32] text-white py-3.5 rounded-xl font-bold shadow-md transition"
            >
              <span>Sign In as {role.toUpperCase()}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* 1-Click Demo Login Shortcuts */}
          <div className="pt-4 border-t border-gray-100 space-y-2">
            <span className="text-[11px] font-bold uppercase text-gray-400 block text-center">
              ⚡ Instant 1-Click Demo Login
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickLogin('customer')}
                className="p-2.5 rounded-xl bg-gray-50 hover:bg-emerald-50 text-gray-800 hover:text-[#146B3A] font-bold border border-gray-200 transition text-left flex items-center space-x-2"
              >
                <span>👤 Customer</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('farmer')}
                className="p-2.5 rounded-xl bg-gray-50 hover:bg-emerald-50 text-gray-800 hover:text-[#146B3A] font-bold border border-gray-200 transition text-left flex items-center space-x-2"
              >
                <span>👨‍🌾 Farmer</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                className="p-2.5 rounded-xl bg-gray-50 hover:bg-emerald-50 text-gray-800 hover:text-[#146B3A] font-bold border border-gray-200 transition text-left flex items-center space-x-2"
              >
                <span>🛡️ Admin</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('delivery')}
                className="p-2.5 rounded-xl bg-gray-50 hover:bg-emerald-50 text-gray-800 hover:text-[#146B3A] font-bold border border-gray-200 transition text-left flex items-center space-x-2"
              >
                <span>🛵 Delivery</span>
              </button>
            </div>
          </div>

          {/* New Farmer Application Highlight */}
          <div className="pt-3 border-t border-gray-100 text-center space-y-2">
            <p className="text-xs text-gray-600">Are you a dairy farmer?</p>
            <Link
              to="/farmer-register"
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#146B3A] bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 hover:bg-emerald-100 transition"
            >
              <Tractor className="w-4 h-4" />
              <span>Apply for Farmer Partnership & Upload Documents</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
