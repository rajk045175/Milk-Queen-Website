import React, { useState } from 'react';
import {
  UserCheck,
  CheckCircle2,
  XCircle,
  Search,
  ShieldCheck,
  MapPin,
  FileText,
  Eye,
  AlertCircle,
  Check,
  X,
  ExternalLink,
  Building,
  Tractor
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminFarmers() {
  const { farmers, approveFarmer, rejectFarmer } = useApp();

  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'pending' | 'verified'
  const [search, setSearch] = useState('');
  const [selectedFarmerModal, setSelectedFarmerModal] = useState(null);
  const [rejectRemarks, setRejectRemarks] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);

  const pendingFarmers = farmers.filter(f => f.status === 'Pending');
  const verifiedFarmers = farmers.filter(f => f.status === 'Verified');

  const filteredFarmers = farmers.filter(f => {
    const matchesSearch = f.farmName.toLowerCase().includes(search.toLowerCase()) || f.name.toLowerCase().includes(search.toLowerCase()) || f.location.toLowerCase().includes(search.toLowerCase());
    if (activeTab === 'pending') return matchesSearch && f.status === 'Pending';
    if (activeTab === 'verified') return matchesSearch && f.status === 'Verified';
    return matchesSearch;
  });

  const handleApprove = (farmerId) => {
    approveFarmer(farmerId);
    setSelectedFarmerModal(null);
  };

  const handleReject = (farmerId) => {
    rejectFarmer(farmerId, rejectRemarks || 'Documents could not be verified');
    setShowRejectForm(false);
    setSelectedFarmerModal(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-display">
            Farmer Partner Applications & KYC Verification
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Verify submitted documents (Aadhaar, Land Patta, Bank Details, Cattle Health) and approve new dairy producers
          </p>
        </div>

        {pendingFarmers.length > 0 && (
          <span className="bg-amber-100 text-amber-900 font-bold px-3.5 py-1.5 rounded-xl text-xs flex items-center space-x-1.5 animate-pulse">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span>{pendingFarmers.length} Applications Awaiting Your Approval</span>
          </span>
        )}
      </div>

      {/* Tabs & Search */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-xl text-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${activeTab === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}
          >
            All Farmers ({farmers.length})
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${activeTab === 'pending' ? 'bg-amber-600 text-white shadow-sm' : 'text-gray-600'}`}
          >
            Pending Approval ({pendingFarmers.length})
          </button>
          <button
            onClick={() => setActiveTab('verified')}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${activeTab === 'verified' ? 'bg-[#146B3A] text-white shadow-sm' : 'text-gray-600'}`}
          >
            Verified Partners ({verifiedFarmers.length})
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search farm, owner, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#146B3A]"
          />
        </div>
      </div>

      {/* Farmers Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-400 uppercase text-[10px] tracking-wider border-b border-gray-100">
              <tr>
                <th className="py-3 px-4 font-bold">Farmer / Farm Name</th>
                <th className="py-3 px-4 font-bold">Location</th>
                <th className="py-3 px-4 font-bold">Cattle & Land</th>
                <th className="py-3 px-4 font-bold">Daily Milk Supply</th>
                <th className="py-3 px-4 font-bold">Uploaded Documents</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">Review Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredFarmers.map((f) => (
                <tr key={f.id} className="hover:bg-gray-50/70 transition">
                  <td className="py-3.5 px-4 flex items-center space-x-3">
                    <img src={f.avatar} alt={f.name} className="w-12 h-12 rounded-xl object-cover border" />
                    <div>
                      <h4 className="font-bold text-gray-900">{f.farmName}</h4>
                      <p className="text-[10px] text-gray-400">{f.name} • {f.phone}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600">{f.location}</td>
                  <td className="py-3.5 px-4 text-gray-700">
                    <span className="font-semibold block">{f.farmSize}</span>
                    <span className="text-[10px] text-gray-400">{f.cowsCount} Cows, {f.buffaloesCount} Buffaloes</span>
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-[#146B3A] text-sm font-display">
                    {f.dailySupply}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-1 text-[10px]">
                      <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-mono">
                        4 Documents
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      f.status === 'Verified'
                        ? 'bg-emerald-100 text-[#146B3A]'
                        : f.status === 'Pending'
                        ? 'bg-amber-100 text-amber-900 animate-pulse'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      ● {f.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedFarmerModal(f)}
                      className="px-3.5 py-1.5 bg-[#146B3A] hover:bg-[#064E32] text-white font-bold rounded-xl text-xs transition shadow-sm flex items-center space-x-1.5 ml-auto"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{f.status === 'Pending' ? 'Review & Approve' : 'View Application'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Farmer Application & Document Inspection Modal */}
      {selectedFarmerModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedFarmerModal.avatar}
                  alt={selectedFarmerModal.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-400"
                />
                <div>
                  <h3 className="font-bold text-gray-900 text-lg font-display">{selectedFarmerModal.farmName}</h3>
                  <p className="text-xs text-gray-500">Applicant: <strong>{selectedFarmerModal.name}</strong> • {selectedFarmerModal.phone}</p>
                  <p className="text-xs text-gray-400">{selectedFarmerModal.location}</p>
                </div>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                selectedFarmerModal.status === 'Verified' ? 'bg-emerald-100 text-[#146B3A]' : 'bg-amber-100 text-amber-900'
              }`}>
                {selectedFarmerModal.status}
              </span>
            </div>

            {/* Farm & Cattle Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-gray-50 p-3 rounded-2xl">
                <span className="text-gray-400 block text-[10px]">Land Area</span>
                <strong className="text-gray-800 text-sm">{selectedFarmerModal.farmSize}</strong>
              </div>
              <div className="bg-gray-50 p-3 rounded-2xl">
                <span className="text-gray-400 block text-[10px]">Cows & Buffaloes</span>
                <strong className="text-gray-800 text-sm">{selectedFarmerModal.cowsCount} Cows, {selectedFarmerModal.buffaloesCount} Buffaloes</strong>
              </div>
              <div className="bg-gray-50 p-3 rounded-2xl">
                <span className="text-gray-400 block text-[10px]">Daily Capacity</span>
                <strong className="text-[#146B3A] text-sm">{selectedFarmerModal.dailySupply}</strong>
              </div>
              <div className="bg-gray-50 p-3 rounded-2xl">
                <span className="text-gray-400 block text-[10px]">Milk Type</span>
                <strong className="text-gray-800 text-sm">{selectedFarmerModal.milkTypes}</strong>
              </div>
            </div>

            {/* Bank Details */}
            {selectedFarmerModal.bankAccount && (
              <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 text-xs space-y-1">
                <span className="font-bold text-[#146B3A] uppercase tracking-wider text-[10px] block">Verified Direct Bank Details</span>
                <div className="grid grid-cols-2 gap-2 text-gray-700">
                  <p>Bank: <strong>{selectedFarmerModal.bankAccount.bankName}</strong></p>
                  <p>Holder: <strong>{selectedFarmerModal.bankAccount.holder}</strong></p>
                  <p>Account: <strong className="font-mono">{selectedFarmerModal.bankAccount.accountNumber}</strong></p>
                  <p>IFSC: <strong className="font-mono">{selectedFarmerModal.bankAccount.ifsc}</strong></p>
                </div>
              </div>
            )}

            {/* Uploaded Documents Inspection Checklist */}
            <div className="space-y-3">
              <h4 className="font-bold text-gray-900 text-sm font-display flex items-center space-x-2">
                <FileText className="w-4 h-4 text-[#146B3A]" />
                <span>Uploaded Documents Verification</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                
                {/* Aadhaar */}
                <div className="p-3.5 rounded-2xl border border-gray-200 bg-gray-50/60 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-800">1. Aadhaar Card ID</span>
                    <span className="text-emerald-700 font-bold text-[10px] bg-emerald-100 px-2 py-0.5 rounded">
                      Attached
                    </span>
                  </div>
                  <p className="font-mono text-[11px] text-gray-500 truncate">
                    {selectedFarmerModal.documents?.aadhaar?.name || 'Aadhaar_Document.pdf'}
                  </p>
                  <button
                    type="button"
                    onClick={() => alert(`Viewing document: ${selectedFarmerModal.documents?.aadhaar?.name || 'Aadhaar'}`)}
                    className="text-[#146B3A] font-bold text-[11px] hover:underline flex items-center space-x-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>View / Inspect Document</span>
                  </button>
                </div>

                {/* Farm Registration / Patta */}
                <div className="p-3.5 rounded-2xl border border-gray-200 bg-gray-50/60 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-800">2. Land Title / Patta</span>
                    <span className="text-emerald-700 font-bold text-[10px] bg-emerald-100 px-2 py-0.5 rounded">
                      Attached
                    </span>
                  </div>
                  <p className="font-mono text-[11px] text-gray-500 truncate">
                    {selectedFarmerModal.documents?.farmRegistration?.name || 'Land_Patta_Deed.pdf'}
                  </p>
                  <button
                    type="button"
                    onClick={() => alert(`Viewing document: ${selectedFarmerModal.documents?.farmRegistration?.name || 'Land Patta'}`)}
                    className="text-[#146B3A] font-bold text-[11px] hover:underline flex items-center space-x-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>View / Inspect Document</span>
                  </button>
                </div>

                {/* Bank Passbook */}
                <div className="p-3.5 rounded-2xl border border-gray-200 bg-gray-50/60 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-800">3. Bank Passbook</span>
                    <span className="text-emerald-700 font-bold text-[10px] bg-emerald-100 px-2 py-0.5 rounded">
                      Attached
                    </span>
                  </div>
                  <p className="font-mono text-[11px] text-gray-500 truncate">
                    {selectedFarmerModal.documents?.bankDetails?.name || 'Bank_Passbook.pdf'}
                  </p>
                  <button
                    type="button"
                    onClick={() => alert(`Viewing document: ${selectedFarmerModal.documents?.bankDetails?.name || 'Bank Passbook'}`)}
                    className="text-[#146B3A] font-bold text-[11px] hover:underline flex items-center space-x-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>View / Inspect Document</span>
                  </button>
                </div>

                {/* Veterinary Certificate */}
                <div className="p-3.5 rounded-2xl border border-gray-200 bg-gray-50/60 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-800">4. Vet Health Record</span>
                    <span className="text-emerald-700 font-bold text-[10px] bg-emerald-100 px-2 py-0.5 rounded">
                      Attached
                    </span>
                  </div>
                  <p className="font-mono text-[11px] text-gray-500 truncate">
                    {selectedFarmerModal.documents?.vetCertificate?.name || 'Veterinary_Certificate.pdf'}
                  </p>
                  <button
                    type="button"
                    onClick={() => alert(`Viewing document: ${selectedFarmerModal.documents?.vetCertificate?.name || 'Veterinary Cert'}`)}
                    className="text-[#146B3A] font-bold text-[11px] hover:underline flex items-center space-x-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>View / Inspect Document</span>
                  </button>
                </div>

              </div>
            </div>

            {/* Reject remarks form */}
            {showRejectForm && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2 text-xs">
                <label className="font-bold text-rose-900 block">Rejection Remarks / Missing Documents:</label>
                <input
                  type="text"
                  placeholder="e.g. Land Patta document is blurred; please re-upload clear copy"
                  value={rejectRemarks}
                  onChange={(e) => setRejectRemarks(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-rose-300"
                />
                <div className="flex justify-end space-x-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowRejectForm(false)}
                    className="px-3 py-1 bg-gray-100 rounded-lg text-gray-600 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleReject(selectedFarmerModal.id)}
                    className="px-3 py-1 bg-rose-600 text-white rounded-lg font-bold"
                  >
                    Confirm Rejection
                  </button>
                </div>
              </div>
            )}

            {/* Admin Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setSelectedFarmerModal(null)}
                className="px-4 py-2 text-xs font-bold text-gray-500 hover:bg-gray-100 rounded-xl"
              >
                Close
              </button>

              <div className="flex items-center space-x-2">
                {selectedFarmerModal.status === 'Pending' && (
                  <>
                    <button
                      type="button"
                      onClick={() => setShowRejectForm(true)}
                      className="px-4 py-2 text-xs font-bold bg-gray-100 text-rose-600 hover:bg-rose-50 rounded-xl transition"
                    >
                      Reject Application
                    </button>

                    <button
                      type="button"
                      onClick={() => handleApprove(selectedFarmerModal.id)}
                      className="px-6 py-2.5 text-xs font-bold bg-[#146B3A] hover:bg-[#064E32] text-white rounded-xl shadow-md transition flex items-center space-x-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>Approve & Verify Farmer</span>
                    </button>
                  </>
                )}

                {selectedFarmerModal.status === 'Verified' && (
                  <span className="text-emerald-700 font-bold text-xs flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Farmer is Verified & Active</span>
                  </span>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
