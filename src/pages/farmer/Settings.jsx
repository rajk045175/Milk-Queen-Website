import React from 'react';

export default function FarmerSettings() {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6 text-xs">
      <h2 className="text-xl font-bold text-gray-900 font-display">Farm Operations & Notification Settings</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50">
          <div>
            <h5 className="font-bold text-gray-800">SMS Alerts for Incoming Orders</h5>
            <p className="text-gray-400">Receive SMS whenever a customer places an order for your milk</p>
          </div>
          <input type="checkbox" defaultChecked className="accent-[#146B3A] w-4 h-4 cursor-pointer" />
        </div>

        <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50">
          <div>
            <h5 className="font-bold text-gray-800">Auto-accept Daily Milk Subscription Orders</h5>
            <p className="text-gray-400">Automatically confirm recurring 6:00 AM subscriber quantities</p>
          </div>
          <input type="checkbox" defaultChecked className="accent-[#146B3A] w-4 h-4 cursor-pointer" />
        </div>

        <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50">
          <div>
            <h5 className="font-bold text-gray-800">Weekly Payout Direct Bank Transfer</h5>
            <p className="text-gray-400">Transfer milk proceeds every Friday morning via NEFT</p>
          </div>
          <input type="checkbox" defaultChecked className="accent-[#146B3A] w-4 h-4 cursor-pointer" />
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <button
          onClick={() => alert('Settings saved!')}
          className="bg-[#146B3A] hover:bg-[#064E32] text-white px-6 py-2.5 rounded-xl font-bold shadow"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}
