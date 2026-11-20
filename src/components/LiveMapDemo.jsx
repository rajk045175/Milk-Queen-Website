import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Bike, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function LiveMapDemo({ status = 'Out for Delivery', eta = '15 mins', riderName = 'Karthik S', height = '340px' }) {
  const [riderProgress, setRiderProgress] = useState(0.65);

  useEffect(() => {
    const interval = setInterval(() => {
      setRiderProgress(prev => (prev >= 0.95 ? 0.35 : prev + 0.05));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-[#EAF2EC] border border-emerald-900/10 shadow-inner" style={{ height }}>
      
      {/* SVG Stylized City Map of Coimbatore */}
      <svg className="w-full h-full" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#146B3A" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D5E5D8" strokeWidth="1" />
          </pattern>
        </defs>

        {/* Map Background Grid & Parks */}
        <rect width="100%" height="100%" fill="#E9F1EB" />
        <rect width="100%" height="100%" fill="url(#gridPattern)" />

        {/* Parks / Green areas */}
        <path d="M 80 80 Q 150 50 200 120 T 150 220 Z" fill="#D3EAD8" opacity="0.8" />
        <path d="M 520 280 Q 620 220 700 300 T 600 420 Z" fill="#D3EAD8" opacity="0.8" />
        <circle cx="340" cy="120" r="45" fill="#D3EAD8" opacity="0.8" />

        {/* Water / Lake feature (Valankulam / Singanallur lake) */}
        <path d="M 500 80 C 580 90, 620 140, 590 190 C 550 220, 480 180, 500 80 Z" fill="#C9E4EB" />
        <text x="530" y="140" fill="#6EAAB9" fontSize="11" fontWeight="bold">Lake Reserve</text>

        {/* Major Road Arteries (Avinashi Rd, Trichy Rd, DB Rd) */}
        <path d="M 0 160 L 800 320" stroke="#FFFFFF" strokeWidth="16" />
        <path d="M 0 160 L 800 320" stroke="#F4E8B0" strokeWidth="6" />

        <path d="M 220 0 L 380 500" stroke="#FFFFFF" strokeWidth="14" />
        <path d="M 220 0 L 380 500" stroke="#F4E8B0" strokeWidth="5" />

        <path d="M 120 450 L 750 100" stroke="#FFFFFF" strokeWidth="12" />
        <path d="M 450 0 L 600 500" stroke="#FFFFFF" strokeWidth="10" />

        {/* Street Names */}
        <text x="240" y="70" fill="#718B79" fontSize="11" fontWeight="bold">DB Road (RS Puram)</text>
        <text x="420" y="275" fill="#718B79" fontSize="11" fontWeight="bold">Avinashi Road</text>
        <text x="630" y="380" fill="#718B79" fontSize="11" fontWeight="bold">Peelamedu</text>
        <text x="130" y="320" fill="#718B79" fontSize="11" fontWeight="bold">Gandhipuram</text>

        {/* Delivery Route Path */}
        <path
          d="M 180 190 Q 280 210, 360 250 T 560 310"
          fill="none"
          stroke="#146B3A"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="8 6"
          className="animate-pulse"
        />

        {/* Farm / Dispatch Hub Pin */}
        <g transform="translate(180, 190)">
          <circle r="14" fill="#064E32" />
          <circle r="8" fill="#FFFFFF" />
          <text x="0" y="28" textAnchor="middle" fill="#064E32" fontSize="10" fontWeight="bold">Farm Hub</text>
        </g>

        {/* Customer Location Pin */}
        <g transform="translate(560, 310)">
          <circle r="16" fill="#DC2626" />
          <circle r="7" fill="#FFFFFF" />
          <text x="0" y="30" textAnchor="middle" fill="#DC2626" fontSize="11" fontWeight="bold">Customer (You)</text>
        </g>

        {/* Dynamic Moving Rider on Route */}
        <g transform={`translate(${180 + (560 - 180) * riderProgress}, ${190 + (310 - 190) * riderProgress})`}>
          <circle r="18" fill="#146B3A" className="animate-ping" opacity="0.3" />
          <circle r="16" fill="#146B3A" stroke="#FFFFFF" strokeWidth="3" />
          <circle r="6" fill="#FFFFFF" />
          {/* Label card above rider */}
          <rect x="-45" y="-36" width="90" height="22" rx="11" fill="#064E32" />
          <text x="0" y="-22" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">
            🛵 {riderName}
          </text>
        </g>
      </svg>

      {/* Floating Status & ETA Card */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-gray-100 flex items-center space-x-3">
        <div className="w-9 h-9 rounded-full bg-emerald-100 text-[#146B3A] flex items-center justify-center">
          <Bike className="w-5 h-5 animate-bounce" />
        </div>
        <div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-gray-800">{status}</span>
          </div>
          <p className="text-[11px] text-gray-500">Estimated Arrival: <strong className="text-[#146B3A]">{eta}</strong></p>
        </div>
      </div>

      {/* Floating Controls */}
      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow border border-gray-100 text-[11px] font-semibold text-gray-700 flex items-center space-x-2">
        <Navigation className="w-3.5 h-3.5 text-[#146B3A]" />
        <span>Live GPS Connected</span>
      </div>

    </div>
  );
}
