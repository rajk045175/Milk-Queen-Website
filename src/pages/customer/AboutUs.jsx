import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Leaf, ShieldCheck, Truck, Users, Award, ArrowRight } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="bg-emerald-100 text-[#146B3A] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            Our Purpose & Passion
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#064E32] font-display leading-tight">
            Restoring Honesty & Wholesomeness to Dairy
          </h1>
          <p className="text-base text-gray-600 leading-relaxed">
            Founded in Coimbatore, DairyConnect is on a mission to connect conscientious families directly with organic and traditional dairy farmers. We believe that real milk should come from happy cows fed natural green fodder, without synthetic hormones, preservatives, or dilution.
          </p>
          <div className="pt-2 flex items-center space-x-4">
            <Link
              to="/products"
              className="bg-[#146B3A] hover:bg-[#064E32] text-white px-6 py-3 rounded-full font-bold text-xs shadow-md transition"
            >
              Explore Products
            </Link>
            <Link
              to="/subscription"
              className="bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 px-6 py-3 rounded-full font-bold text-xs transition"
            >
              Daily Subscriptions
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <img
              src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=900&q=80"
              alt="Cows grazing freely"
              className="w-full h-[380px] object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 flex items-center space-x-3 max-w-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#146B3A] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-xs">Certified Quality</h4>
              <p className="text-[11px] text-gray-500">Every batch passes 24 rigorous testing parameters daily.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#146B3A] flex items-center justify-center">
            <Leaf className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg">Pure & Natural</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            No preservatives, thickeners, or artificial colors. Raw whole milk chilled within 45 minutes of milking to preserve natural enzymes.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#146B3A] flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg">Farmer Prosperity</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            By paying fair prices directly to milk producers, we ensure rural dairy farmers thrive and continue sustainable native cow rearing.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#146B3A] flex items-center justify-center">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg">Cold-Chain Delivery</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Our insulated temperature-controlled morning fleet delivers milk before 7:00 AM straight to your doorstep across Coimbatore.
          </p>
        </div>
      </div>

    </div>
  );
}
