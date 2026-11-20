import React from 'react';
import { UserCheck, MapPin, Phone, Mail, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function FarmerProfile() {
  const { currentUser } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
        <div className="flex items-center space-x-4">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80'}
            alt="Farmer"
            className="w-16 h-16 rounded-full object-cover border-2 border-emerald-400"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-gray-900">{currentUser?.farmName || 'Ramasamy Farm'}</h2>
              <span className="text-[10px] bg-emerald-100 text-[#146B3A] font-bold px-2 py-0.5 rounded-full">
                Verified Partner
              </span>
            </div>
            <p className="text-xs text-gray-500">Owner: {currentUser?.name || 'Ramasamy'}</p>
            <p className="text-xs text-gray-400">{currentUser?.location || 'Kovai, Coimbatore'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-4 border-t border-gray-100">
          <div>
            <span className="text-gray-400 block font-medium">Contact Phone</span>
            <p className="text-gray-800 font-bold mt-0.5">{currentUser?.phone || '+91 98765 43210'}</p>
          </div>
          <div>
            <span className="text-gray-400 block font-medium">Email Address</span>
            <p className="text-gray-800 font-bold mt-0.5">{currentUser?.email || 'ramasamyfarm@gmail.com'}</p>
          </div>
          <div>
            <span className="text-gray-400 block font-medium">Farm Acreage & Native Breeds</span>
            <p className="text-gray-800 font-bold mt-0.5">5 Acres • 12 Indigenous Kangayam Cows, 4 Buffaloes</p>
          </div>
          <div>
            <span className="text-gray-400 block font-medium">Daily Supply Capacity</span>
            <p className="text-emerald-800 font-bold mt-0.5">120 - 150 Litres / day</p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 space-y-2">
          <h4 className="text-xs font-bold text-gray-700 uppercase">Verification Documents</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {['Aadhaar Card', 'Farm Ownership Title', 'Bank Passbook', 'FSSAI License'].map((doc) => (
              <div key={doc} className="p-2.5 rounded-xl bg-emerald-50 text-[#146B3A] font-semibold flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#146B3A]" />
                <span className="text-[11px] truncate">{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
