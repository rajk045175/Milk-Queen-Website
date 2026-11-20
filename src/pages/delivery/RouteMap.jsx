import React from 'react';
import { Navigation, Bike, MapPin, Clock } from 'lucide-react';
import LiveMapDemo from '../../components/LiveMapDemo';

export default function RouteMap() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-display">
            Full Route Navigation & Waypoints
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">Optimized circuit covering RS Puram, DB Road, and Gandhipuram</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
        <LiveMapDemo
          status="On Delivery Route"
          eta="12 mins"
          riderName="Karthik S (DP-002)"
          height="520px"
        />
      </div>
    </div>
  );
}
