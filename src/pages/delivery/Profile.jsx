import React from 'react';
import { Bike, Phone, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function DeliveryProfile() {
  const { currentUser } = useAuth();

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6 text-xs">
      <div className="flex items-center space-x-4">
        <img
          src={currentUser?.avatar || 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80'}
          alt="Rider"
          className="w-16 h-16 rounded-full object-cover border-2 border-emerald-400"
        />
        <div>
          <h2 className="text-xl font-bold text-gray-900">{currentUser?.name || 'Karthik S'}</h2>
          <p className="text-gray-400">Rider Code: <strong className="text-emerald-700">{currentUser?.code || 'DP-002'}</strong></p>
          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold">
            ★ 4.8 Rating (320 Deliveries)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
        <div>
          <span className="text-gray-400 block font-semibold">Registered Vehicle</span>
          <p className="text-gray-900 font-bold mt-0.5">{currentUser?.vehicleNumber || 'TN 37 CD 5678'} (Honda Activa 6G)</p>
        </div>
        <div>
          <span className="text-gray-400 block font-semibold">Assigned Sector</span>
          <p className="text-gray-900 font-bold mt-0.5">Coimbatore West (RS Puram, DB Road)</p>
        </div>
        <div>
          <span className="text-gray-400 block font-semibold">Registered Phone</span>
          <p className="text-gray-900 font-bold mt-0.5">{currentUser?.phone || '+91 98765 43211'}</p>
        </div>
        <div>
          <span className="text-gray-400 block font-semibold">Driving License</span>
          <p className="text-emerald-800 font-bold mt-0.5">TN-37-20220008492 (Verified)</p>
        </div>
      </div>
    </div>
  );
}
