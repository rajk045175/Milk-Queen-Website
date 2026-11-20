import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  Heart,
  Plus,
  Minus,
  ShoppingBag,
  Zap,
  ShieldCheck,
  Leaf,
  Clock,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useCart } from '../../context/CartContext';
import ProductCard from '../../components/ProductCard';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { approvedProducts, farmers } = useApp();
  const { addToCart, cartItems, wishlist, toggleWishlist } = useCart();

  const product = approvedProducts.find(p => p.id === id) || approvedProducts[0];
  const farmer = farmers.find(f => f.farmName === product?.farmerName) || farmers[0];

  const [selectedSize, setSelectedSize] = useState(product?.sizes ? product.sizes[0] : { size: product?.unit, price: product?.price });
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(product?.image);

  // Sync state if product changes
  React.useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes ? product.sizes[0] : { size: product.unit, price: product.price });
      setActiveImage(product.image);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Product Not Found</h2>
        <Link to="/products" className="text-[#146B3A] font-bold mt-4 inline-block">Return to Catalog</Link>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const relatedProducts = approvedProducts.filter(p => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, qty, selectedSize);
  };

  const handleBuyNow = () => {
    addToCart(product, qty, selectedSize);
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumb (Matches Page 3) */}
      <nav className="flex items-center space-x-2 text-xs text-gray-500">
        <Link to="/" className="hover:text-gray-700">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-gray-700">
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-gray-800 font-semibold">{product.name}</span>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Image Gallery (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm group">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-[#146B3A] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
                {product.badge}
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-rose-500 transition shadow"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>

            {/* Farm fresh watermark */}
            <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center justify-between text-[11px] font-semibold text-gray-700">
              <span className="flex items-center space-x-1">
                <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Natural</span>
              </span>
              <span>•</span>
              <span>🚫 No Preservatives</span>
              <span>•</span>
              <span>Straight from Farm</span>
            </div>
          </div>

          {/* Alternate Thumbnail Views */}
          <div className="grid grid-cols-4 gap-3">
            {[
              product.image,
              'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=400&q=80',
              'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80',
              'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&q=80'
            ].map((imgSrc, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(imgSrc)}
                className={`aspect-square rounded-xl overflow-hidden border-2 transition ${
                  activeImage === imgSrc ? 'border-[#146B3A] shadow-md' : 'border-gray-200 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={imgSrc} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Center Column: Product Specs & Pricing (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-[#146B3A] uppercase tracking-wider mb-1">
              <span>{product.category}</span>
              <span>•</span>
              <span>{product.productType || 'Regular'}</span>
            </div>

            <h1 className="text-3xl font-extrabold text-gray-900 font-display">
              {product.name}
            </h1>

            <p className="text-xs text-gray-500 mt-1">
              Supplied by <Link to={`/products?farmer=${encodeURIComponent(product.farmerName)}`} className="text-[#146B3A] font-bold hover:underline">{product.farmerName}</Link> • {product.farmLocation}
            </p>

            {/* Ratings & Reviews */}
            <div className="flex items-center space-x-2 mt-3">
              <div className="flex items-center space-x-1 bg-amber-50 text-amber-900 px-2.5 py-1 rounded-lg text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span>{product.rating}</span>
              </div>
              <span className="text-xs text-gray-500">({product.reviewsCount} verified customer reviews)</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Feature Badges */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white p-2.5 rounded-xl border border-gray-100 flex items-center space-x-2 text-gray-700">
              <Leaf className="w-4 h-4 text-[#146B3A]" />
              <span className="font-semibold">100% Natural</span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-gray-100 flex items-center space-x-2 text-gray-700">
              <ShieldCheck className="w-4 h-4 text-[#146B3A]" />
              <span className="font-semibold">Quality Tested</span>
            </div>
          </div>

          {/* Price Display */}
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl font-extrabold text-gray-900 font-display">
                ₹{selectedSize.price}
              </span>
              <span className="text-xs text-gray-400">/ {selectedSize.size}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ₹{Math.round(selectedSize.price * 1.15)}
                </span>
              )}
              <span className="bg-emerald-100 text-[#146B3A] text-xs font-bold px-2 py-0.5 rounded-md">
                12% OFF
              </span>
            </div>

            {/* Size / Volume Selector */}
            {product.sizes && product.sizes.length > 1 && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
                  Select Pack Size:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s.size}
                      onClick={() => setSelectedSize(s)}
                      className={`p-2.5 rounded-xl text-center border transition ${
                        selectedSize.size === s.size
                          ? 'border-[#146B3A] bg-emerald-50 text-[#146B3A] font-bold shadow-sm'
                          : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <p className="text-xs">{s.size}</p>
                      <p className="text-xs font-bold mt-0.5">₹{s.price}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4 pt-2">
              <span className="text-xs font-bold text-gray-600">Quantity:</span>
              <div className="flex items-center bg-gray-100 rounded-full px-2 py-1 space-x-3">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-gray-700 hover:bg-gray-200 transition"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-sm font-bold w-6 text-center">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-gray-700 hover:bg-gray-200 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center space-x-2 bg-[#146B3A] hover:bg-[#064E32] text-white py-3 rounded-xl font-bold text-sm shadow-md transition hover:scale-[1.02]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="flex items-center justify-center space-x-2 bg-emerald-900 hover:bg-black text-white py-3 rounded-xl font-bold text-sm shadow-md transition hover:scale-[1.02]"
              >
                <Zap className="w-4 h-4 text-amber-300" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Farmer Story & Delivery Guarantees (3 cols - Matches Page 3) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Farmer Card */}
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Farmer Information</h4>
            <div className="flex items-center space-x-3">
              <img
                src={farmer.avatar}
                alt={farmer.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-emerald-400"
              />
              <div>
                <h3 className="font-bold text-gray-900 text-base">{farmer.farmName}</h3>
                <p className="text-xs text-gray-500">{farmer.location}</p>
                <span className="inline-block mt-1 text-[10px] bg-emerald-100 text-[#146B3A] font-bold px-2 py-0.5 rounded-full">
                  ★ {farmer.rating} (Verified Partner)
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed italic">
              "{farmer.story}"
            </p>
            <Link
              to={`/farmers`}
              className="block text-center w-full py-2 bg-gray-50 hover:bg-gray-100 text-[#146B3A] font-bold text-xs rounded-xl border border-gray-200 transition"
            >
              View Farmer Profile →
            </Link>
          </div>

          {/* Value props */}
          <div className="bg-[#EAF5EC] rounded-3xl p-5 border border-emerald-200 space-y-3">
            <div className="flex items-center space-x-3 text-xs text-gray-800">
              <Clock className="w-4 h-4 text-[#146B3A] shrink-0" />
              <span><strong>Morning Delivery:</strong> Guaranteed by 7:00 AM</span>
            </div>
            <div className="flex items-center space-x-3 text-xs text-gray-800">
              <ShieldCheck className="w-4 h-4 text-[#146B3A] shrink-0" />
              <span><strong>Quality Guarantee:</strong> 100% refund if not fresh</span>
            </div>
            <div className="flex items-center space-x-3 text-xs text-gray-800">
              <Heart className="w-4 h-4 text-[#146B3A] shrink-0" />
              <span><strong>100% Fair Pay:</strong> Sourced at premium milk rates</span>
            </div>
          </div>

        </div>

      </div>

      {/* Related Products Carousel / Grid */}
      <div className="pt-10 border-t border-gray-200 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900 font-display">
            You May Also Like
          </h3>
          <Link to="/products" className="text-xs font-bold text-[#146B3A] hover:underline">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((rel) => (
            <ProductCard key={rel.id} product={rel} />
          ))}
        </div>
      </div>

    </div>
  );
}
