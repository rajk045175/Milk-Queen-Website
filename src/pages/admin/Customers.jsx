import React from 'react';
import { Users, Search, Mail, Phone, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminCustomers() {
  const { customers } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-display">
          Customer Management
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          View registered families, delivery addresses, order counts, and lifetime spent
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-400 uppercase text-[10px] tracking-wider border-b border-gray-100">
              <tr>
                <th className="py-3 px-4 font-bold">Customer</th>
                <th className="py-3 px-4 font-bold">Contact</th>
                <th className="py-3 px-4 font-bold">Primary Delivery Address</th>
                <th className="py-3 px-4 font-bold">Total Orders</th>
                <th className="py-3 px-4 font-bold">Total Spent</th>
                <th className="py-3 px-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/70">
                  <td className="py-3.5 px-4 flex items-center space-x-3">
                    <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full object-cover border" />
                    <div>
                      <h4 className="font-bold text-gray-900">{c.name}</h4>
                      <p className="text-[10px] text-gray-400">Joined {c.joinedDate}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="text-gray-800 font-medium">{c.phone}</p>
                    <p className="text-gray-400 text-[10px]">{c.email}</p>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600 max-w-[200px] truncate">
                    {c.addresses[0]?.street}, {c.addresses[0]?.city}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-gray-800">{c.totalOrders} Orders</td>
                  <td className="py-3.5 px-4 font-extrabold text-[#146B3A] font-display text-sm">₹{c.totalSpent}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-[#146B3A]">
                      ● Active Member
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
