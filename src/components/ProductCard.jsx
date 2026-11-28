import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { handleProductImageError } from '../data/products';

export default function ProductCard({ product }) {
  const { cartItems, addToCart, updateQuantity, wishlist, toggleWishlist } = useCart();

  const isWishlisted = wishlist.includes(product.id);
  const cartItem = cartItems.find(item => item.id === product.id);

  const getBadgeColor = (badge) => {
    switch (badge?.toLowerCase()) {
      case 'bestseller': return 'bg-emerald-700 text-white';
      case 'a2 milk': return 'bg-blue-700 text-white';
      case 'fresh': return 'bg-teal-600 text-white';
      case 'natural': return 'bg-green-600 text-white';
      case 'pure': return 'bg-amber-600 text-white';
      case 'creamy': return 'bg-orange-600 text-white';
      case 'popular': return 'bg-purple-600 text-white';
      case 'new': return 'bg-rose-600 text-white';
      case 'value pack': return 'bg-emerald-800 text-white';
      default: return 'bg-[#146B3A] text-white';
    }
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      
      {/* Image container & Badges */}
      <div className="relative aspect-square w-full bg-stone-100 overflow-hidden">
        <Link to={`/products/${product.id}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            onError={handleProductImageError}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            loading="lazy"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm ${getBadgeColor(product.badge)}`}>
              {product.badge}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          aria-label="Toggle Wishlist"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-rose-500 transition shadow-sm z-10 hover:scale-110"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Farmer Location Tag */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
          <span className="text-[10px] bg-black/60 backdrop-blur-md text-white font-medium px-2 py-0.5 rounded-full truncate max-w-[80%]">
            🌱 {product.farmerName}
          </span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span className="font-medium text-[#146B3A]">{product.category}</span>
            <div className="flex items-center space-x-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-gray-700 text-xs">{product.rating}</span>
              <span className="text-gray-400 text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          <Link to={`/products/${product.id}`} className="block">
            <h3 className="font-bold text-gray-900 text-base leading-snug group-hover:text-[#146B3A] transition line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-gray-500 mt-0.5 font-medium">
            {product.unit}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-lg font-extrabold text-gray-900 font-display">
                ₹{product.price}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-gray-400 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-gray-400 block -mt-0.5">per {product.unit}</span>
          </div>

          {/* Add to Cart or Quantity Pill */}
          <div>
            {cartItem ? (
              <div className="flex items-center bg-[#146B3A] text-white rounded-full px-1.5 py-1 space-x-2 shadow-sm">
                <button
                  onClick={() => updateQuantity(product.id, -1)}
                  className="w-5 h-5 rounded-full hover:bg-black/20 flex items-center justify-center transition"
                  aria-label="Decrease"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-xs font-bold w-4 text-center">{cartItem.quantity}</span>
                <button
                  onClick={() => updateQuantity(product.id, 1)}
                  className="w-5 h-5 rounded-full hover:bg-black/20 flex items-center justify-center transition"
                  aria-label="Increase"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => addToCart(product, 1)}
                className="flex items-center space-x-1.5 bg-[#146B3A] hover:bg-[#064E32] text-white text-xs font-bold px-3.5 py-2 rounded-full transition shadow-sm shadow-green-900/10 hover:scale-105 active:scale-95"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
