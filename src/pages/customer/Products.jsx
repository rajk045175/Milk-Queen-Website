import React, { useState, useMemo } from 'react';
import { useLocation, useSearchParams, Link } from 'react-router-dom';
import {
  Filter,
  Grid,
  List,
  ChevronRight,
  SlidersHorizontal,
  X,
  Search,
  Star,
  Check,
  Sparkles
} from 'lucide-react';
import ProductCard from '../../components/ProductCard';
import { useApp } from '../../context/AppContext';
import { productCategories } from '../../data/products';

export default function Products() {
  const { approvedProducts } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL state params
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  // Local filter states
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedProductType, setSelectedProductType] = useState('all');
  const [maxPrice, setMaxPrice] = useState(600);
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync with URL params if they change
  React.useEffect(() => {
    if (searchParams.get('category')) setSelectedCategory(searchParams.get('category'));
    if (searchParams.get('search')) setSearchQuery(searchParams.get('search'));
  }, [searchParams]);

  // Filtered & Sorted products computation
  const filteredProducts = useMemo(() => {
    return approvedProducts.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all') {
        const catObj = productCategories.find(c => c.id === selectedCategory);
        const catName = catObj ? catObj.name : selectedCategory;
        if (product.category.toLowerCase() !== catName.toLowerCase() && product.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCat = product.category.toLowerCase().includes(q);
        if (!matchesName && !matchesCat) return false;
      }

      // Product Type filter (Organic, A2 Milk, Regular)
      if (selectedProductType !== 'all') {
        if (product.productType?.toLowerCase() !== selectedProductType.toLowerCase()) {
          return false;
        }
      }

      // Price filter
      if (product.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: popularity
      return b.reviewsCount - a.reviewsCount;
    });
  }, [approvedProducts, selectedCategory, searchQuery, selectedProductType, maxPrice, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedProductType('all');
    setMaxPrice(600);
    setSortBy('popularity');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* 1. TOP HERO BANNER (Matches Page 2 in Komagan PDF) */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#064E32] to-[#146B3A] text-white p-8 sm:p-10 shadow-lg">
        <div className="max-w-xl space-y-3 relative z-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
            Fresh Dairy Products
          </h1>
          <p className="text-sm text-green-100">
            From our farms to your family with pure love & natural richness.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="text-xs bg-white/15 px-3 py-1 rounded-full backdrop-blur-sm">🌱 100% Natural</span>
            <span className="text-xs bg-white/15 px-3 py-1 rounded-full backdrop-blur-sm">🚫 No Preservatives</span>
            <span className="text-xs bg-white/15 px-3 py-1 rounded-full backdrop-blur-sm">🥛 Farm Fresh</span>
            <span className="text-xs bg-white/15 px-3 py-1 rounded-full backdrop-blur-sm">⚡ Delivered Fresh</span>
          </div>
        </div>

        {/* Ambient image background */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 hidden sm:block">
          <img
            src="https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80"
            alt="Milk Banner"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 2. MAIN CATALOG LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* LEFT FILTERS SIDEBAR (Desktop) */}
        <div className="hidden lg:block space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-6 sticky top-24">
            
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-base flex items-center space-x-2">
                <SlidersHorizontal className="w-4 h-4 text-[#146B3A]" />
                <span>Filters</span>
              </h3>
              <button
                onClick={resetFilters}
                className="text-xs font-semibold text-[#146B3A] hover:underline"
              >
                Reset All
              </button>
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Categories</h4>
              <div className="space-y-1">
                {productCategories.map((cat) => {
                  const isSelected = selectedCategory === cat.id || selectedCategory === cat.name;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id === 'all' ? 'all' : cat.name)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                        isSelected
                          ? 'bg-[#EAF5EC] text-[#146B3A] font-bold'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] text-gray-400 bg-white/80 px-2 py-0.5 rounded-full">
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Slider */}
            <div className="space-y-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Price Range</h4>
                <span className="text-xs font-bold text-gray-900">Up to ₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="20"
                max="600"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#146B3A] cursor-pointer"
              />
              <div className="flex items-center justify-between text-[11px] text-gray-400">
                <span>₹20</span>
                <span>₹600+</span>
              </div>
            </div>

            {/* Product Type Filter */}
            <div className="space-y-3 pt-3 border-t border-gray-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Product Type</h4>
              <div className="space-y-1.5 text-xs text-gray-700">
                {['all', 'Regular', 'Organic', 'A2 Milk'].map((type) => (
                  <label key={type} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="typeFilter"
                      checked={selectedProductType === type}
                      onChange={() => setSelectedProductType(type)}
                      className="accent-[#146B3A]"
                    />
                    <span className="capitalize">{type === 'all' ? 'All Types' : type}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT PRODUCT CATALOG */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Breadcrumb & Header Controls */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-1.5 text-xs text-gray-400 mb-1">
                <Link to="/" className="hover:text-gray-600">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-gray-700 font-semibold">Products</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 font-display">
                All Products <span className="text-[#146B3A]">({filteredProducts.length})</span>
              </h2>
              <p className="text-xs text-gray-500">Pure dairy goodness for a healthier you</p>
            </div>

            {/* Sort & View toggles */}
            <div className="flex items-center space-x-3">
              
              {/* Mobile Filter Trigger */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center space-x-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold px-3 py-2 rounded-xl"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>

              {/* Sort By Dropdown */}
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-400 hidden sm:inline">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs font-semibold bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#146B3A]"
                >
                  <option value="popularity">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                </select>
              </div>

              {/* Grid / List View Switch */}
              <div className="flex items-center bg-gray-100 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition ${viewMode === 'grid' ? 'bg-white text-[#146B3A] shadow-sm' : 'text-gray-500'}`}
                  aria-label="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition ${viewMode === 'list' ? 'bg-white text-[#146B3A] shadow-sm' : 'text-gray-500'}`}
                  aria-label="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

          {/* Active Filter Tags */}
          {(selectedCategory !== 'all' || searchQuery || selectedProductType !== 'all') && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-gray-400 font-semibold">Active:</span>
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center space-x-1 bg-emerald-50 text-[#146B3A] px-2.5 py-1 rounded-full font-bold">
                  <span>Category: {selectedCategory}</span>
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('all')} />
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center space-x-1 bg-emerald-50 text-[#146B3A] px-2.5 py-1 rounded-full font-bold">
                  <span>Search: "{searchQuery}"</span>
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
                </span>
              )}
              <button
                onClick={resetFilters}
                className="text-gray-400 hover:text-gray-600 underline text-xs"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Product Grid / List */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#146B3A] mx-auto flex items-center justify-center">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">No Dairy Products Found</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                No items match your active filters. Try adjusting your category or price range.
              </p>
              <button
                onClick={resetFilters}
                className="bg-[#146B3A] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow hover:bg-[#064E32] transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </div>

      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-80 h-full p-6 overflow-y-auto space-y-6 animate-in slide-in-from-right">
            <div className="flex items-center justify-between pb-3 border-b">
              <h3 className="font-bold text-gray-900 text-lg">Filters</h3>
              <button onClick={() => setMobileFilterOpen(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Mobile Categories */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-gray-400 uppercase">Categories</h4>
              {productCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id === 'all' ? 'all' : cat.name);
                    setMobileFilterOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                    selectedCategory === cat.name ? 'bg-emerald-50 text-[#146B3A] font-bold' : 'text-gray-700'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                resetFilters();
                setMobileFilterOpen(false);
              }}
              className="w-full bg-[#146B3A] text-white py-3 rounded-xl font-bold text-xs"
            >
              Apply / Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
