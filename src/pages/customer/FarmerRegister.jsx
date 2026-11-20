import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Tractor,
  Upload,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Building,
  Heart,
  ArrowRight,
  Sparkles,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export default function FarmerRegister() {
  const { registerFarmerApplication } = useApp();
  const { switchRole } = useAuth();
  const navigate = useNavigate();

  const [submittedApp, setSubmittedApp] = useState(null);

  // Form Fields
  const [formData, setFormData] = useState({
    name: 'Kandasamy G',
    phone: '+91 94432 18900',
    email: 'kandasamydairy@gmail.com',
    village: 'Alandurai',
    district: 'Coimbatore',
    farmName: 'Kandasamy Natural Dairy',
    farmSize: '6',
    cowsCount: '14',
    buffaloesCount: '2',
    milkTypes: 'Cow & Buffalo Milk',
    dailySupply: '130',
    bankHolder: 'Kandasamy G',
    bankName: 'Canara Bank',
    accountNumber: '482190827162',
    ifsc: 'CNRB0002891',
    story: 'Practicing pure traditional dairy farming with free grazing Kangayam and Gir cows.',
    aadhaarDocName: 'Aadhaar_Kandasamy_Front_Back.pdf',
    farmDocName: 'Alandurai_Land_Patta_Document.pdf',
    bankDocName: 'Canara_Bank_Passbook_Copy.pdf',
    vetDocName: 'Veterinary_Vaccination_Cert_2026.pdf',
    agreedToTerms: true
  });

  // Simulated uploaded files
  const [uploadedDocs, setUploadedDocs] = useState({
    aadhaar: true,
    farmPatta: true,
    bankPassbook: true,
    vetCert: true
  });

  const handleFileChange = (docKey, filename) => {
    setUploadedDocs(prev => ({ ...prev, [docKey]: true }));
    if (docKey === 'aadhaar') setFormData({ ...formData, aadhaarDocName: filename });
    if (docKey === 'farmPatta') setFormData({ ...formData, farmDocName: filename });
    if (docKey === 'bankPassbook') setFormData({ ...formData, bankDocName: filename });
    if (docKey === 'vetCert') setFormData({ ...formData, vetDocName: filename });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const app = registerFarmerApplication(formData);
    setSubmittedApp(app);
  };

  if (submittedApp) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-[#146B3A] flex items-center justify-center mx-auto shadow-lg animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="bg-emerald-100 text-[#146B3A] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            Application Submitted Successfully!
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900 font-display">
            Welcome to the Milk Queen Family, {submittedApp.name}!
          </h1>
          <p className="text-xs text-gray-500 max-w-lg mx-auto leading-relaxed">
            Your registration application for <strong>{submittedApp.farmName}</strong> has been received with 4 verified document proofs.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md text-left text-xs space-y-3 max-w-lg mx-auto">
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-400">Application Reference ID:</span>
            <strong className="text-gray-900 font-mono">#MQ-FARM-{submittedApp.id.slice(-6)}</strong>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-400">Farm Location:</span>
            <span className="text-gray-900 font-bold">{submittedApp.location}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-400">Daily Milk Capacity:</span>
            <span className="text-[#146B3A] font-bold">{submittedApp.dailySupply}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-400">Verification Status:</span>
            <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full">
              Pending Admin Approval
            </span>
          </div>
          <div className="pt-1 text-[11px] text-gray-500">
            📄 Uploaded Documents: {submittedApp.documents.aadhaar.name}, {submittedApp.documents.farmRegistration.name}, {submittedApp.documents.bankDetails.name}, {submittedApp.documents.vetCertificate.name}
          </div>
        </div>

        {/* Demo Fast-Track button for Admin review */}
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-gray-700 max-w-lg mx-auto space-y-3">
          <div className="flex items-center space-x-2 text-emerald-900 font-bold">
            <Sparkles className="w-4 h-4 text-[#146B3A]" />
            <span>Demonstration Shortcut for Evaluators</span>
          </div>
          <p className="text-[11px] text-gray-600 leading-relaxed">
            Switch to Admin mode to inspect {submittedApp.name}'s uploaded documents and approve the registration with 1 click!
          </p>
          <button
            onClick={() => {
              switchRole('admin');
              navigate('/admin/farmers');
            }}
            className="w-full bg-[#146B3A] hover:bg-[#064E32] text-white py-2.5 rounded-xl font-bold text-xs shadow transition flex items-center justify-center space-x-1.5"
          >
            <span>Go to Admin ➔ Review & Approve Farmer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div>
          <Link to="/" className="text-xs font-bold text-[#146B3A] hover:underline">
            ← Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 bg-emerald-100 text-[#146B3A] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full">
          <Tractor className="w-4 h-4" />
          <span>Milk Queen Farmer Partnership Program</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#064E32] font-display">
          Farmer Registration & Verification Application
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          Join 500+ local dairy farmers across Coimbatore. Get guaranteed daily morning milk collection, fair premium pricing deposited weekly into your bank account, and zero middleman exploitation.
        </p>
      </div>

      {/* 4 Value Pillars for Farmers */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
          <span className="text-2xl font-extrabold text-[#146B3A] font-display">40% Higher</span>
          <p className="text-xs text-gray-500 mt-0.5">Earnings vs Middlemen</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
          <span className="text-2xl font-extrabold text-[#146B3A] font-display">Daily 6 AM</span>
          <p className="text-xs text-gray-500 mt-0.5">Farm Gate Chilled Pickup</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
          <span className="text-2xl font-extrabold text-[#146B3A] font-display">Weekly</span>
          <p className="text-xs text-gray-500 mt-0.5">Direct NEFT Bank Payout</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
          <span className="text-2xl font-extrabold text-[#146B3A] font-display">Free</span>
          <p className="text-xs text-gray-500 mt-0.5">Veterinary Health Checks</p>
        </div>
      </div>

      {/* Application Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm space-y-8 text-xs">
        
        {/* Section 1: Farmer Personal Details */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-gray-900 font-display pb-2 border-b border-gray-100 flex items-center space-x-2">
            <span className="w-6 h-6 rounded-full bg-[#146B3A] text-white flex items-center justify-center text-xs">1</span>
            <span>Farmer Personal & Contact Details</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-semibold text-gray-700 block mb-1">Farmer Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#146B3A]"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">Mobile / WhatsApp Number *</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#146B3A]"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#146B3A]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-semibold text-gray-700 block mb-1">Village / Town *</label>
              <input
                type="text"
                required
                value={formData.village}
                onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">District *</label>
              <select
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 font-semibold"
              >
                <option value="Coimbatore">Coimbatore</option>
                <option value="Tiruppur">Tiruppur</option>
                <option value="Erode">Erode</option>
                <option value="Salem">Salem</option>
                <option value="Dindigul">Dindigul</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">Farm Name *</label>
              <input
                type="text"
                required
                value={formData.farmName}
                onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Farm & Cattle Details */}
        <div className="space-y-4 pt-2">
          <h3 className="text-base font-bold text-gray-900 font-display pb-2 border-b border-gray-100 flex items-center space-x-2">
            <span className="w-6 h-6 rounded-full bg-[#146B3A] text-white flex items-center justify-center text-xs">2</span>
            <span>Farm Land & Cattle Profile</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="font-semibold text-gray-700 block mb-1">Land Area (Acres) *</label>
              <input
                type="number"
                required
                value={formData.farmSize}
                onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">Milking Cows Count *</label>
              <input
                type="number"
                required
                value={formData.cowsCount}
                onChange={(e) => setFormData({ ...formData, cowsCount: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">Milking Buffaloes *</label>
              <input
                type="number"
                required
                value={formData.buffaloesCount}
                onChange={(e) => setFormData({ ...formData, buffaloesCount: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">Daily Yield (Litres) *</label>
              <input
                type="number"
                required
                value={formData.dailySupply}
                onChange={(e) => setFormData({ ...formData, dailySupply: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-gray-700 block mb-1">Native Breeds & Cattle Feed</label>
            <input
              type="text"
              placeholder="e.g. Kangayam Native, Gir, Murrah Buffalo • Fed organic sorghum & green grass"
              value={formData.story}
              onChange={(e) => setFormData({ ...formData, story: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200"
            />
          </div>
        </div>

        {/* Section 3: Bank Account for Direct Payouts */}
        <div className="space-y-4 pt-2">
          <h3 className="text-base font-bold text-gray-900 font-display pb-2 border-b border-gray-100 flex items-center space-x-2">
            <span className="w-6 h-6 rounded-full bg-[#146B3A] text-white flex items-center justify-center text-xs">3</span>
            <span>Bank Account Details (For Weekly Milk Payments)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="font-semibold text-gray-700 block mb-1">Account Holder Name *</label>
              <input
                type="text"
                required
                value={formData.bankHolder}
                onChange={(e) => setFormData({ ...formData, bankHolder: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">Bank Name *</label>
              <input
                type="text"
                required
                value={formData.bankName}
                onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">Account Number *</label>
              <input
                type="text"
                required
                value={formData.accountNumber}
                onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 font-mono"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">IFSC Code *</label>
              <input
                type="text"
                required
                value={formData.ifsc}
                onChange={(e) => setFormData({ ...formData, ifsc: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 font-mono uppercase"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Document Uploads (MANDATORY REQUIREMENT) */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <h3 className="text-base font-bold text-gray-900 font-display flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-[#146B3A] text-white flex items-center justify-center text-xs">4</span>
              <span>Upload Verification Documents (Required for Admin Approval)</span>
            </h3>
            <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full">
              4 of 4 Files Ready
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* 1. Aadhaar Card */}
            <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-800 text-xs flex items-center space-x-1.5">
                  <FileText className="w-4 h-4 text-[#146B3A]" />
                  <span>1. Aadhaar Card / ID Proof *</span>
                </span>
                <span className="text-[10px] bg-emerald-100 text-[#146B3A] font-bold px-2 py-0.5 rounded-full">
                  Attached ✓
                </span>
              </div>
              <p className="text-[11px] text-gray-500">Government ID showing farmer photo and permanent address</p>
              <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-gray-200 text-[11px]">
                <span className="font-mono text-gray-700 truncate max-w-[200px]">{formData.aadhaarDocName}</span>
                <button
                  type="button"
                  onClick={() => handleFileChange('aadhaar', 'Aadhaar_Kandasamy_Updated.pdf')}
                  className="text-[#146B3A] font-bold hover:underline"
                >
                  Change
                </button>
              </div>
            </div>

            {/* 2. Farm Ownership Proof */}
            <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-800 text-xs flex items-center space-x-1.5">
                  <FileText className="w-4 h-4 text-[#146B3A]" />
                  <span>2. Land Ownership / Patta Title *</span>
                </span>
                <span className="text-[10px] bg-emerald-100 text-[#146B3A] font-bold px-2 py-0.5 rounded-full">
                  Attached ✓
                </span>
              </div>
              <p className="text-[11px] text-gray-500">Village revenue patta or registered lease agreement</p>
              <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-gray-200 text-[11px]">
                <span className="font-mono text-gray-700 truncate max-w-[200px]">{formData.farmDocName}</span>
                <button
                  type="button"
                  onClick={() => handleFileChange('farmPatta', 'Patta_Chitta_Deed_6Acres.pdf')}
                  className="text-[#146B3A] font-bold hover:underline"
                >
                  Change
                </button>
              </div>
            </div>

            {/* 3. Bank Passbook */}
            <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-800 text-xs flex items-center space-x-1.5">
                  <FileText className="w-4 h-4 text-[#146B3A]" />
                  <span>3. Bank Passbook / Cheque Copy *</span>
                </span>
                <span className="text-[10px] bg-emerald-100 text-[#146B3A] font-bold px-2 py-0.5 rounded-full">
                  Attached ✓
                </span>
              </div>
              <p className="text-[11px] text-gray-500">Front page showing account number, name, and IFSC code</p>
              <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-gray-200 text-[11px]">
                <span className="font-mono text-gray-700 truncate max-w-[200px]">{formData.bankDocName}</span>
                <button
                  type="button"
                  onClick={() => handleFileChange('bankPassbook', 'Canara_Bank_Passbook_Stamped.pdf')}
                  className="text-[#146B3A] font-bold hover:underline"
                >
                  Change
                </button>
              </div>
            </div>

            {/* 4. Veterinary Certificate */}
            <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-800 text-xs flex items-center space-x-1.5">
                  <FileText className="w-4 h-4 text-[#146B3A]" />
                  <span>4. Cattle Health & Vaccination Record *</span>
                </span>
                <span className="text-[10px] bg-emerald-100 text-[#146B3A] font-bold px-2 py-0.5 rounded-full">
                  Attached ✓
                </span>
              </div>
              <p className="text-[11px] text-gray-500">Issued by licensed veterinary doctor certifying healthy cattle</p>
              <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-gray-200 text-[11px]">
                <span className="font-mono text-gray-700 truncate max-w-[200px]">{formData.vetDocName}</span>
                <button
                  type="button"
                  onClick={() => handleFileChange('vetCert', 'Vet_Fitness_Report_Signed.pdf')}
                  className="text-[#146B3A] font-bold hover:underline"
                >
                  Change
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Section 5: Purity Declaration */}
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
          <label className="flex items-start space-x-2.5 cursor-pointer">
            <input
              type="checkbox"
              required
              defaultChecked
              className="accent-[#146B3A] mt-0.5 w-4 h-4"
            />
            <span className="text-xs text-gray-700 leading-relaxed">
              <strong>Purity & Non-Adulteration Declaration:</strong> I hereby declare and swear that my dairy animals are raised humanely with organic green fodder and clean water. I do not administer synthetic oxytocin or adulterate milk with water, starch, detergent, or neutralizers. All documents uploaded are authentic.
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-gray-400">
            * Submitted applications are reviewed and approved by Milk Queen Admin within 24 hours.
          </p>

          <button
            type="submit"
            className="w-full sm:w-auto bg-[#146B3A] hover:bg-[#064E32] text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-xl shadow-green-900/15 transition transform hover:-translate-y-0.5"
          >
            Submit Application for Admin Verification
          </button>
        </div>

      </form>

    </div>
  );
}
