import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState('customer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    login(role, {
      role,
      name,
      email,
      phone,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80'
    });

    if (role === 'delivery') navigate('/delivery/dashboard');
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
          Create Milk Queen Account
        </h2>
        <p className="text-xs text-gray-500">Pure • Fresh • Healthy</p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl shadow-xl border border-gray-100 space-y-6">
          
          <form onSubmit={handleRegister} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-gray-700 block mb-1">Account Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 font-semibold"
              >
                <option value="customer">Customer (Buy Fresh Dairy)</option>
                <option value="delivery">Delivery Partner (Earn per delivery)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Priya Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="e.g. priya@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">Phone Number</label>
              <input
                type="text"
                required
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#146B3A] hover:bg-[#064E32] text-white py-3.5 rounded-xl font-bold shadow-md transition"
            >
              Register & Continue
            </button>
          </form>

          <div className="text-center text-xs text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-[#146B3A] font-bold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
