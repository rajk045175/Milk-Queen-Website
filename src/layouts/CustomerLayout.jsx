import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WorkflowDemoBanner from '../components/WorkflowDemoBanner';

export default function CustomerLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7EF]">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <WorkflowDemoBanner />
    </div>
  );
}
