import React from 'react';

export default function AdminSettings() {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6 text-xs">
      <h2 className="text-xl font-bold text-gray-900 font-display">Marketplace Platform Configuration</h2>

      <div className="space-y-4">
        <div>
          <label className="font-bold text-gray-700 block mb-1">Marketplace Platform Name</label>
          <input
            type="text"
            defaultValue="DairyConnect"
            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 font-semibold"
          />
        </div>

        <div>
          <label className="font-bold text-gray-700 block mb-1">Standard Delivery Fee (Orders below ₹499)</label>
          <input
            type="number"
            defaultValue={20}
            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 font-semibold"
          />
        </div>

        <div>
          <label className="font-bold text-gray-700 block mb-1">Platform Support Fee</label>
          <input
            type="number"
            defaultValue={5}
            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 font-semibold"
          />
        </div>

        <div className="pt-2 flex items-center justify-between p-3 rounded-2xl bg-gray-50">
          <div>
            <h5 className="font-bold text-gray-800">Require Manual Admin Approval for New Farmer Products</h5>
            <p className="text-gray-400">Products submitted by farmers will be held in pending state until reviewed</p>
          </div>
          <input type="checkbox" defaultChecked className="accent-[#146B3A] w-4 h-4 cursor-pointer" />
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <button
          onClick={() => alert('Platform settings saved successfully!')}
          className="bg-[#146B3A] hover:bg-[#064E32] text-white px-6 py-2.5 rounded-xl font-bold shadow"
        >
          Save Platform Settings
        </button>
      </div>
    </div>
  );
}
