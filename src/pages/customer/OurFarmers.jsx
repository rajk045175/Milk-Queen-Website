import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Star, MapPin, Users, Heart, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function OurFarmers() {
  const { farmers } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="bg-emerald-100 text-[#146B3A] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
          Direct Fair Trade
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 font-display">
          Meet Our Trusted Dairy Farmers
        </h1>
        <p className="text-base text-gray-600 leading-relaxed">
          Behind every drop of DairyConnect milk is a hardworking local family. We eliminate greedy middlemen so our farmers earn up to 40% higher income, while you receive 100% natural, unadulterated milk.
        </p>
      </div>

      {/* Farmers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {farmers.map((farmer) => (
          <div key={farmer.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition duration-300 flex flex-col justify-between">
            <div>
              {/* Cover & Avatar */}
              <div className="relative h-44 bg-stone-100">
                <img
                  src={farmer.coverImage}
                  alt={farmer.farmName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-4 right-4 flex items-end space-x-3">
                  <img
                    src={farmer.avatar}
                    alt={farmer.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md shrink-0"
                  />
                  <div className="text-white overflow-hidden pb-1">
                    <div className="flex items-center space-x-1.5">
                      <h3 className="font-bold text-base truncate">{farmer.farmName}</h3>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    </div>
                    <p className="text-xs text-green-200 truncate">{farmer.name}</p>
                  </div>
                </div>
              </div>

              {/* Details Body */}
              <div className="p-5 space-y-4 text-xs">
                <div className="flex items-center justify-between text-gray-500">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-[#146B3A]" />
                    <span>{farmer.location}</span>
                  </span>
                  <div className="flex items-center space-x-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{farmer.rating} ({farmer.reviewsCount})</span>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed italic bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/60">
                  "{farmer.story}"
                </p>

                {/* Farm Stats */}
                <div className="grid grid-cols-3 gap-2 text-center pt-2">
                  <div className="bg-gray-50 p-2 rounded-xl">
                    <span className="text-[10px] text-gray-400 block">Farm Size</span>
                    <strong className="text-gray-800 text-xs">{farmer.farmSize}</strong>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-xl">
                    <span className="text-[10px] text-gray-400 block">Cows</span>
                    <strong className="text-gray-800 text-xs">{farmer.cowsCount} Cows</strong>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-xl">
                    <span className="text-[10px] text-gray-400 block">Daily Yield</span>
                    <strong className="text-emerald-800 text-xs">{farmer.dailySupply}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="p-5 pt-0">
              <Link
                to={`/products?farmer=${encodeURIComponent(farmer.farmName)}`}
                className="w-full flex items-center justify-center space-x-1.5 bg-[#146B3A] hover:bg-[#064E32] text-white py-2.5 rounded-xl font-bold text-xs transition"
              >
                <span>View {farmer.farmName}'s Milk & Ghee</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
