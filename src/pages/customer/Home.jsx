import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Play,
  Leaf,
  ShieldCheck,
  Heart,
  Truck,
  Sparkles,
  Users,
  Award,
  CalendarCheck,
  ChevronRight,
  X
} from 'lucide-react';
import ProductCard from '../../components/ProductCard';
import { useApp } from '../../context/AppContext';
import { productCategories, handleProductImageError } from '../../data/products';

export default function Home() {
  const { approvedProducts } = useApp();
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Take top featured products
  const featuredProducts = approvedProducts.slice(0, 8);

  const categoryImages = {
    'Fresh Milk': '/images/products/fresh-cow-milk.jpg',
    'Paneer': '/images/products/fresh-paneer.jpg',
    'Curd': '/images/products/fresh-curd.jpg',
    'Ghee': '/images/products/pure-cow-ghee.jpg',
    'Butter': '/images/products/fresh-butter.jpg',
    'Other Products': '/images/products/strawberry-milk.jpg'
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EAF5EC] via-[#F3FAF5] to-[#F8F7EF] pt-10 pb-16 md:py-20 border-b border-green-100">
        
        {/* Decorative soft green blurs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-emerald-100/50 rounded-full blur-2xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-200/80 shadow-sm text-xs font-semibold text-[#146B3A]">
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span>Fresh • Natural • No Preservatives</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#064E32] tracking-tight leading-[1.1] font-display">
                Real Dairy. <br />
                <span className="text-[#146B3A]">A Healthier Tomorrow.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-gray-600 max-w-xl leading-relaxed">
                Pure and fresh milk & dairy products directly from our trusted farmers in Coimbatore. Unprocessed, zero adulteration, and delivered before 7:00 AM.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/products"
                  className="flex items-center space-x-2 bg-[#146B3A] hover:bg-[#064E32] text-white px-7 py-3.5 rounded-full font-bold shadow-lg shadow-green-900/15 transition transform hover:-translate-y-0.5"
                >
                  <span>Shop Fresh Dairy Products</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => setVideoModalOpen(true)}
                  className="flex items-center space-x-2 bg-white hover:bg-gray-50 text-[#064E32] border border-gray-200 px-6 py-3.5 rounded-full font-bold shadow-sm transition hover:scale-105"
                >
                  <div className="w-6 h-6 rounded-full bg-[#146B3A] text-white flex items-center justify-center">
                    <Play className="w-3 h-3 fill-white ml-0.5" />
                  </div>
                  <span>Watch Our Story</span>
                </button>
              </div>

              {/* Trust Tag */}
              <p className="text-xs text-gray-500 font-medium italic flex items-center space-x-1.5 pt-2">
                <span>From Our Farms to Your Home</span>
                <span>♡</span>
              </p>

            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
                <img
                  src="https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=900&q=80"
                  alt="Fresh Dairy Harvest"
                  className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-700"
                />

                {/* Glass Badge Overlay */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-md border border-gray-100 flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
                  <span className="text-xs font-bold text-gray-800">100% Pure & Natural</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-gray-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Today's Morning Batch</h4>
                    <p className="text-xs text-gray-500">Collected at 5:30 AM • Kovai Farms</p>
                  </div>
                  <Link
                    to="/products"
                    className="bg-[#146B3A] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold hover:bg-[#064E32] transition"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* 4 Value Pillars Strip below Hero */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
            
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#146B3A] flex items-center justify-center shrink-0">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">Direct From Farmers</h4>
                <p className="text-xs text-gray-500">Fair prices, better lives</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#146B3A] flex items-center justify-center shrink-0">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">No Preservatives</h4>
                <p className="text-xs text-gray-500">Just pure goodness</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#146B3A] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">Hygienic & Safe</h4>
                <p className="text-xs text-gray-500">Quality you can trust</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#146B3A] flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">Fast Home Delivery</h4>
                <p className="text-xs text-gray-500">Freshness at your doorstep</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. PRODUCT CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-display">
              Our Dairy Products
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Pure dairy goodness for a healthier you
            </p>
          </div>
          <Link
            to="/products"
            className="flex items-center space-x-1 text-sm font-bold text-[#146B3A] hover:text-[#064E32] transition"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: 'Fresh Milk', sub: 'Straight from our farmers', img: categoryImages['Fresh Milk'] },
            { name: 'Paneer', sub: 'Soft. Fresh. Natural.', img: categoryImages['Paneer'] },
            { name: 'Curd', sub: 'Good for your gut', img: categoryImages['Curd'] },
            { name: 'Ghee', sub: 'Pure. Aromatic. Healthy.', img: categoryImages['Ghee'] },
            { name: 'Butter', sub: 'Rich in natural flavor', img: categoryImages['Butter'] },
            { name: 'Other Products', sub: 'Explore more goodness', img: categoryImages['Other Products'] }
          ].map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition p-3 flex flex-col justify-between"
            >
              <div className="aspect-square w-full rounded-xl overflow-hidden bg-stone-100 mb-3">
                <img
                  src={cat.img}
                  alt={cat.name}
                  onError={handleProductImageError}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <h4 className="font-bold text-gray-900 text-sm group-hover:text-[#146B3A] transition">
                    {cat.name}
                  </h4>
                  <p className="text-[11px] text-gray-500 line-clamp-1">{cat.sub}</p>
                </div>
                <div className="w-6 h-6 rounded-full bg-emerald-50 text-[#146B3A] group-hover:bg-[#146B3A] group-hover:text-white flex items-center justify-center transition shrink-0 ml-1">
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. IMPACT STATS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EAF5EC] border border-emerald-200/80 rounded-3xl p-8 lg:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="space-y-1">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#146B3A] text-white flex items-center justify-center mb-3">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-extrabold text-[#064E32] font-display">500+</h3>
              <p className="text-xs font-semibold text-gray-600">Partner Dairy Farmers</p>
            </div>

            <div className="space-y-1">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#146B3A] text-white flex items-center justify-center mb-3">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-extrabold text-[#064E32] font-display">100%</h3>
              <p className="text-xs font-semibold text-gray-600">Fresh, Pure & Natural</p>
            </div>

            <div className="space-y-1">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#146B3A] text-white flex items-center justify-center mb-3">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-extrabold text-[#064E32] font-display">10,000+</h3>
              <p className="text-xs font-semibold text-gray-600">Happy Families Served</p>
            </div>

            <div className="space-y-1">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#146B3A] text-white flex items-center justify-center mb-3">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-extrabold text-[#064E32] font-display">15+</h3>
              <p className="text-xs font-semibold text-gray-600">Pure Artisanal Products</p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS CATALOG PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-display">
              Best Selling Farm Goodness
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Handcrafted daily with love by Coimbatore's finest milk producers
            </p>
          </div>
          <Link
            to="/products"
            className="flex items-center space-x-1 text-sm font-bold text-[#146B3A] hover:text-[#064E32] transition"
          >
            <span>See All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. DAILY MILK SUBSCRIPTION PROMO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#064E32] to-[#146B3A] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-repeat bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="bg-emerald-400 text-emerald-950 text-xs font-extrabold uppercase px-3 py-1 rounded-full">
              Hassle-Free Morning Routine
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
              Wake Up to Fresh Milk at Your Doorstep Before 7:00 AM
            </h3>
            <p className="text-sm text-green-100 leading-relaxed">
              Never run out of morning milk again. Choose your daily quantity, pause whenever you go out of station, and pay transparent monthly bills with zero delivery fee.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/subscription"
                className="bg-white text-[#064E32] hover:bg-emerald-50 px-6 py-3 rounded-full font-bold text-sm shadow-md transition"
              >
                Start Daily Subscription
              </Link>
              <Link
                to="/products"
                className="bg-transparent border border-white/60 hover:bg-white/10 text-white px-6 py-3 rounded-full font-bold text-sm transition"
              >
                Browse All Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal Demo */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-video w-full bg-black flex flex-col items-center justify-center text-white p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#146B3A] flex items-center justify-center mb-4 animate-pulse">
                <Play className="w-8 h-8 fill-white ml-1" />
              </div>
              <h3 className="text-xl font-bold font-display">Milk Queen – Our Journey with 500+ Farmers</h3>
              <p className="text-xs text-green-200 mt-2 max-w-md">
                Demonstrating our direct farm-to-table supply chain in Coimbatore, milk testing labs, and 6:00 AM delivery fleet.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
