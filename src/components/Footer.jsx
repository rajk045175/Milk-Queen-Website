import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Heart, ShieldCheck, Truck, Instagram, Facebook, Youtube, Linkedin, ArrowRight, Tractor } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#064E32] text-white pt-14 pb-8 border-t border-green-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value Proposition Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-green-800/80">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">100% Natural</h4>
              <p className="text-xs text-green-200">No preservatives or additives</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Direct from Farmers</h4>
              <p className="text-xs text-green-200">Fair prices for better lives</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Hygienic & Safe</h4>
              <p className="text-xs text-green-200">Stringent quality testing</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Fast Delivery</h4>
              <p className="text-xs text-green-200">Fresh at your doorstep daily</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 py-12 border-b border-green-800/80">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/logo.png"
                alt="Milk Queen"
                className="h-12 w-auto object-contain bg-white/10 p-1 rounded-xl"
              />
              <div>
                <span className="text-2xl font-black tracking-tight font-display text-white">
                  Milk <span className="text-emerald-400">Queen</span>
                </span>
                <span className="text-[10px] text-green-200 uppercase tracking-widest block">
                  Pure • Fresh • Healthy
                </span>
              </div>
            </div>
            <p className="text-xs text-green-100/80 max-w-sm leading-relaxed">
              Empowering local dairy farmers and delivering unadulterated, farm-fresh milk, paneer, curd, and bilona ghee to happy families across Coimbatore and surrounding regions.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a href="#instagram" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#facebook" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#youtube" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#linkedin" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-emerald-300 mb-4">Quick Links</h5>
            <ul className="space-y-2 text-xs text-green-100/90">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/products" className="hover:text-white transition">Product Catalog</Link></li>
              <li><Link to="/farmers" className="hover:text-white transition">Our Farmers</Link></li>
              <li><Link to="/farmer-register" className="text-emerald-300 font-bold hover:text-white transition">Farmer Registration</Link></li>
              <li><Link to="/subscription" className="hover:text-white transition">Daily Milk Subscription</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-emerald-300 mb-4">Portals</h5>
            <ul className="space-y-2 text-xs text-green-100/90">
              <li><Link to="/farmer/dashboard" className="hover:text-white transition">Farmer Portal</Link></li>
              <li><Link to="/admin/dashboard" className="hover:text-white transition">Admin Dashboard</Link></li>
              <li><Link to="/delivery/dashboard" className="hover:text-white transition">Delivery Partner App</Link></li>
              <li><Link to="/orders" className="hover:text-white transition">Track Your Order</Link></li>
              <li><Link to="/login" className="hover:text-white transition">Login / Register</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-emerald-300 mb-4">Farmer Partnership</h5>
            <p className="text-xs text-green-200 mb-3 leading-relaxed">
              Are you a local dairy farmer? Partner with Milk Queen for daily collection and weekly payouts.
            </p>
            <Link
              to="/farmer-register"
              className="inline-flex items-center space-x-1.5 bg-[#146B3A] hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition shadow"
            >
              <Tractor className="w-4 h-4" />
              <span>Register as Farmer</span>
            </Link>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-green-300/80">
          <p>© 2026 Milk Queen™. All rights reserved. Pure • Fresh • Healthy.</p>
          <div className="flex items-center space-x-6 mt-4 sm:mt-0">
            <Link to="/about" className="hover:underline">Privacy Policy</Link>
            <Link to="/about" className="hover:underline">Terms of Service</Link>
            <Link to="/contact" className="hover:underline">Contact Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
