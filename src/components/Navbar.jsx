import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  Search,
  User,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  Bike,
  LogOut,
  CalendarCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { currentUser, switchRole, logout } = useAuth();
  const { totalItemCount, wishlist } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchModalOpen(false);
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Subscriptions', path: '/subscription' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <>
      {/* Top Demo Bar for quick Role Switching */}
      <div className="bg-[#064E32] text-white text-xs px-4 py-1.5 flex flex-wrap items-center justify-between border-b border-green-800">
        <div className="flex items-center space-x-2">
          <span className="bg-emerald-500/30 text-emerald-300 font-semibold px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider">
            Milk Queen Demo Portal
          </span>
          <span className="hidden sm:inline text-green-200">
            Active Role: <strong className="text-white capitalize">{currentUser?.role || 'Guest'}</strong> ({currentUser?.name})
          </span>
        </div>

        <div className="flex items-center space-x-2 text-[11px]">
          <span className="text-green-300 hidden md:inline">Quick Role Switch:</span>
          <button
            onClick={() => { switchRole('customer'); navigate('/'); }}
            className={`px-2.5 py-0.5 rounded-lg transition ${currentUser?.role === 'customer' ? 'bg-[#146B3A] text-white font-bold' : 'bg-green-900/60 text-green-200 hover:bg-green-800'}`}
          >
            👤 Customer
          </button>
          <button
            onClick={() => { switchRole('admin'); navigate('/admin/dashboard'); }}
            className={`px-2.5 py-0.5 rounded-lg transition ${currentUser?.role === 'admin' ? 'bg-[#146B3A] text-white font-bold' : 'bg-green-900/60 text-green-200 hover:bg-green-800'}`}
          >
            🛡️ Admin
          </button>
          <button
            onClick={() => { switchRole('delivery'); navigate('/delivery/dashboard'); }}
            className={`px-2.5 py-0.5 rounded-lg transition ${currentUser?.role === 'delivery' ? 'bg-[#146B3A] text-white font-bold' : 'bg-green-900/60 text-green-200 hover:bg-green-800'}`}
          >
            🛵 Delivery
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <div className="flex items-center space-x-6">
              <Link to="/" className="flex items-center space-x-3 group">
                <img
                  src="/logo.png"
                  alt="Milk Queen"
                  className="h-12 w-auto object-contain transition transform group-hover:scale-105"
                />
                <div className="hidden sm:block">
                  <span className="text-xl font-black tracking-tight text-[#064E32] font-display block leading-none">
                    Milk <span className="text-[#146B3A]">Queen</span>
                  </span>
                  <span className="text-[10px] text-gray-500 font-semibold tracking-wider uppercase block mt-1">
                    Pure • Fresh • Healthy
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1 ${
                      isActive
                        ? 'text-[#146B3A] bg-[#EAF5EC]'
                        : 'text-gray-600 hover:text-[#146B3A] hover:bg-gray-50'
                    }`}
                  >
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons & Buttons */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              
              {/* Search Icon */}
              <button
                onClick={() => setSearchModalOpen(true)}
                aria-label="Search"
                className="p-2 text-gray-600 hover:text-[#146B3A] hover:bg-gray-100 rounded-full transition"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link
                to="/profile?tab=wishlist"
                aria-label="Wishlist"
                className="relative p-2 text-gray-600 hover:text-[#146B3A] hover:bg-gray-100 rounded-full transition hidden sm:flex"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Shopping Cart */}
              <Link
                to="/cart"
                aria-label="Shopping Cart"
                className="relative p-2 text-gray-600 hover:text-[#146B3A] hover:bg-gray-100 rounded-full transition"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItemCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#146B3A] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItemCount}
                  </span>
                )}
              </Link>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-gray-100 transition border border-gray-200"
                >
                  <img
                    src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                    alt="User"
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500 hidden sm:block mr-1" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-xs text-gray-400 font-medium">Signed in as</p>
                      <p className="text-sm font-bold text-gray-800 truncate">{currentUser?.name}</p>
                      <span className="inline-block mt-1 text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-[#146B3A]">
                        {currentUser?.role} Mode
                      </span>
                    </div>

                    <div className="py-1 text-xs">
                      {currentUser?.role === 'customer' && (
                        <>
                          <Link
                            to="/profile"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 font-semibold"
                          >
                            <User className="w-4 h-4 mr-3 text-gray-400" /> My Profile & Addresses
                          </Link>
                          <Link
                            to="/orders"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 font-semibold"
                          >
                            <ShoppingBag className="w-4 h-4 mr-3 text-gray-400" /> My Orders & Tracking
                          </Link>
                        </>
                      )}

                      {currentUser?.role === 'admin' && (
                        <Link
                          to="/admin/dashboard"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 font-semibold"
                        >
                          <ShieldCheck className="w-4 h-4 mr-3 text-[#146B3A]" /> Admin Dashboard
                        </Link>
                      )}

                      {currentUser?.role === 'delivery' && (
                        <Link
                          to="/delivery/dashboard"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 font-semibold"
                        >
                          <Bike className="w-4 h-4 mr-3 text-[#146B3A]" /> Delivery Dashboard
                        </Link>
                      )}
                    </div>

                    <div className="border-t border-gray-100 pt-1">
                      <Link
                        to="/login"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 font-semibold"
                      >
                        <User className="w-4 h-4 mr-3 text-gray-400" /> Switch / Login Account
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setProfileDropdownOpen(false);
                          navigate('/login');
                        }}
                        className="w-full text-left flex items-center px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 font-semibold"
                      >
                        <LogOut className="w-4 h-4 mr-3" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Green "Order Now" Button */}
              <Link
                to="/products"
                className="hidden sm:inline-flex items-center justify-center bg-[#146B3A] hover:bg-[#064E32] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-md shadow-green-900/15 transition transform hover:-translate-y-0.5"
              >
                Order Now
              </Link>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 space-y-2 text-xs">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 font-bold text-gray-700 hover:text-[#146B3A] hover:bg-green-50 rounded-lg"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 px-4">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl p-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-gray-800 text-lg">Search Milk Queen Products</h3>
              <button
                onClick={() => setSearchModalOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSearchSubmit} className="mt-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search cow milk, ghee, paneer, curd, butter..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#146B3A] focus:bg-white"
                />
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-500">
                <span className="font-semibold text-gray-400">Popular:</span>
                {['Fresh Cow Milk', 'Pure Ghee', 'Fresh Paneer', 'Set Curd', 'A2 Milk'].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setSearchQuery(term);
                      navigate(`/products?search=${encodeURIComponent(term)}`);
                      setSearchModalOpen(false);
                    }}
                    className="bg-gray-100 hover:bg-emerald-50 hover:text-[#146B3A] px-2.5 py-1 rounded-full transition"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
