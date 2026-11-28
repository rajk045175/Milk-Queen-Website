import React from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Milk,
  ShoppingBag,
  Boxes,
  CircleDollarSign,
  Users,
  FileBarChart,
  Bike,
  Tag,
  CreditCard,
  MessageSquare,
  LifeBuoy,
  Settings,
  LogOut,
  MapPin,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export default function Sidebar({ role }) {
  const { logout, currentUser } = useAuth();
  const { orders, pendingProducts } = useApp();
  const navigate = useNavigate();

  const activeOrdersCount = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;
  const pendingProductsCount = pendingProducts.length;

  const adminNav = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Orders', path: '/admin/orders', icon: ShoppingBag, badge: activeOrdersCount },
    { label: 'Customers', path: '/admin/customers', icon: Users },
    { label: 'Products', path: '/admin/products', icon: Package, badge: pendingProductsCount > 0 ? pendingProductsCount : null },
    { label: 'Delivery Partners', path: '/admin/delivery-partners', icon: Bike },
    { label: 'Inventory', path: '/admin/inventory', icon: Boxes },
    { label: 'Payments', path: '/admin/payments', icon: CreditCard },
    { label: 'Offers & Coupons', path: '/admin/coupons', icon: Tag },
    { label: 'Reports', path: '/admin/reports', icon: FileBarChart },
    { label: 'Settings', path: '/admin/settings', icon: Settings }
  ];

  const deliveryNav = [
    { label: 'Dashboard', path: '/delivery/dashboard', icon: LayoutDashboard },
    { label: 'My Deliveries', path: '/delivery/deliveries', icon: ShoppingBag, badge: activeOrdersCount },
    { label: 'Route & Map', path: '/delivery/route-map', icon: MapPin },
    { label: 'Earnings', path: '/delivery/earnings', icon: CircleDollarSign },
    { label: 'Messages', path: '/delivery/messages', icon: MessageSquare, badge: 2 },
    { label: 'Profile', path: '/delivery/profile', icon: Users },
    { label: 'Support', path: '/delivery/support', icon: LifeBuoy },
    { label: 'Settings', path: '/delivery/settings', icon: Settings }
  ];

  const items = role === 'admin' ? adminNav : deliveryNav;

  return (
    <aside className="w-64 bg-[#064E32] text-white flex flex-col justify-between min-h-screen border-r border-green-800 shrink-0">
      
      {/* Brand Header */}
      <div>
        <div className="p-5 border-b border-green-800/80">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/logo.png"
              alt="Milk Queen"
              className="h-10 w-auto object-contain bg-white/10 p-0.5 rounded-lg"
            />
            <div>
              <span className="text-lg font-black tracking-tight font-display text-white block leading-none">
                Milk <span className="text-emerald-400">Queen</span>
              </span>
              <p className="text-[10px] text-green-300 uppercase tracking-widest font-semibold mt-1">
                {role === 'admin' ? 'Super Admin' : 'Delivery Partner'}
              </p>
            </div>
          </Link>
        </div>

        {/* User Card Mini */}
        <div className="px-4 py-3 mx-4 my-4 rounded-xl bg-white/5 border border-green-800/60 flex items-center space-x-3">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80'}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-emerald-400"
          />
          <div className="overflow-hidden flex-1">
            <h4 className="text-xs font-bold truncate text-white">
              {currentUser?.name || 'User'}
            </h4>
            <p className="text-[10px] text-green-300 truncate">
              {role === 'admin' ? 'Super Admin' : 'Active Rider'}
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="px-3 space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-[#146B3A] text-white shadow-md shadow-green-950/20'
                      : 'text-green-100/80 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-4 h-4 text-emerald-300" />
                  <span>{item.label}</span>
                </div>
                {item.badge ? (
                  <span className="bg-emerald-400 text-emerald-950 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                ) : null}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Mission Badge & Logout */}
      <div className="p-4 border-t border-green-800/80 space-y-3">
        <div className="bg-emerald-900/40 border border-emerald-500/20 rounded-xl p-2.5 text-center">
          <p className="text-[10px] text-emerald-300 font-semibold italic">
            "Pure • Fresh • Healthy"
          </p>
        </div>

        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="w-full flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-rose-900/40 text-green-200 hover:text-rose-200 text-xs font-semibold transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

    </aside>
  );
}
