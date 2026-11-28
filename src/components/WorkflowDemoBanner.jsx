import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, CheckCircle2, ChevronRight, Sparkles, RefreshCw, X, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function WorkflowDemoBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { addProduct, approveProduct, createOrder, updateOrderStatus, assignDeliveryPartner, updateDeliveryStatus, resetDemoData, products, orders, deliveryPartners } = useApp();
  const { switchRole } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [activeWorkflowId, setActiveWorkflowId] = useState(null);

  const steps = [
    { num: 1, title: 'Admin Adds Product', actor: 'admin', roleTitle: 'Admin' },
    { num: 2, title: 'Admin Approves Product', actor: 'admin', roleTitle: 'Admin' },
    { num: 3, title: 'Product Live in Catalog', actor: 'customer', roleTitle: 'Customer Catalog' },
    { num: 4, title: 'Customer Places Order', actor: 'customer', roleTitle: 'Customer (Priya S)' },
    { num: 5, title: 'Admin Reviews Order', actor: 'admin', roleTitle: 'Admin' },
    { num: 6, title: 'Order Marked Packed', actor: 'admin', roleTitle: 'Admin' },
    { num: 7, title: 'Admin Assigns Delivery', actor: 'admin', roleTitle: 'Admin' },
    { num: 8, title: 'Rider Receives Order', actor: 'delivery', roleTitle: 'Delivery (Karthik)' },
    { num: 9, title: 'Rider Updates Status', actor: 'delivery', roleTitle: 'Delivery (Karthik)' },
    { num: 10, title: 'Customer Tracks Order', actor: 'customer', roleTitle: 'Customer Tracking' }
  ];

  const handleRunStep = (stepNumber) => {
    setCurrentStep(stepNumber);

    if (stepNumber === 1) {
      // Step 1: Admin adds new product
      switchRole('admin');
      const newProd = addProduct({
        name: 'Traditional Bilona Buffalo Ghee',
        category: 'Ghee',
        unit: '250 g',
        price: 260,
        stock: 35,
        description: 'Cultured aromatic buffalo bilona ghee freshly churned this morning.'
      }, false);
      setActiveWorkflowId(newProd.id);
      navigate('/admin/products');
    } else if (stepNumber === 2) {
      // Step 2: Admin approves product
      switchRole('admin');
      const targetProd = products.find(p => p.status === 'pending_approval') || products[0];
      if (targetProd) {
        approveProduct(targetProd.id);
      }
      navigate('/admin/products');
    } else if (stepNumber === 3) {
      // Step 3: View in catalog
      switchRole('customer');
      navigate('/products');
    } else if (stepNumber === 4) {
      // Step 4: Customer orders
      switchRole('customer');
      const order = createOrder({
        customerName: 'Priya S',
        customerEmail: 'priya.s@gmail.com',
        customerPhone: '+91 98765 43210',
        deliveryAddress: '12, R.S. Puram Main Road, Coimbatore - 641002',
        deliverySlot: 'Today, 10:00 AM - 12:00 PM',
        paymentMethod: 'UPI - Google Pay',
        paymentStatus: 'Pending',
        items: [
          {
            id: 'prod-1',
            name: 'Fresh Cow Milk',
            unit: '500 ml',
            price: 28,
            quantity: 2,
            image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80'
          },
          {
            id: 'prod-4',
            name: 'Fresh Paneer',
            unit: '200 g',
            price: 120,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=400&q=80'
          }
        ],
        itemTotal: 176,
        deliveryCharge: 20,
        platformFee: 5,
        grandTotal: 201
      });
      setActiveWorkflowId(order.id);
      navigate(`/tracking/${order.id}`);
    } else if (stepNumber === 5 || stepNumber === 6) {
      // Step 5 & 6: Admin accepts & packs
      switchRole('admin');
      const targetOrder = orders[0];
      if (targetOrder) {
        updateOrderStatus(targetOrder.id, 'Packed');
      }
      navigate('/admin/orders');
    } else if (stepNumber === 7) {
      // Step 7: Admin assigns delivery partner
      switchRole('admin');
      const targetOrder = orders[0];
      const partner = deliveryPartners[0];
      if (targetOrder && partner) {
        assignDeliveryPartner(targetOrder.id, partner.id);
      }
      navigate('/admin/orders');
    } else if (stepNumber === 8 || stepNumber === 9) {
      // Step 8 & 9: Delivery partner receives and delivers
      switchRole('delivery');
      const targetOrder = orders[0];
      if (targetOrder) {
        updateDeliveryStatus(targetOrder.id, 'Out for Delivery');
      }
      navigate('/delivery/deliveries');
    } else if (stepNumber === 10) {
      // Step 10: Customer tracks order
      switchRole('customer');
      const targetOrder = orders[0];
      navigate(`/tracking/${targetOrder?.id || 'DC10248'}`);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2 bg-[#064E32] text-white px-4 py-2.5 rounded-full shadow-2xl border-2 border-emerald-400 hover:bg-[#146B3A] transition transform hover:scale-105"
        >
          <Sparkles className="w-4 h-4 text-emerald-300 animate-spin" />
          <span className="text-xs font-bold">10-Step Live Demo Workflow</span>
        </button>
      ) : (
        <div className="bg-white rounded-2xl shadow-2xl border border-emerald-800/20 w-96 overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="bg-[#064E32] text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider">3-Module Connection Tour</h4>
                <p className="text-[10px] text-green-200">Test the complete 10-step lifecycle</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-green-200 hover:text-white hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 max-h-80 overflow-y-auto space-y-1.5">
            {steps.map((st) => (
              <div
                key={st.num}
                className={`flex items-center justify-between p-2 rounded-xl text-xs border transition ${
                  currentStep === st.num
                    ? 'bg-emerald-50 border-emerald-300 text-gray-900 font-bold'
                    : 'bg-gray-50/60 border-gray-100 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    currentStep === st.num ? 'bg-[#146B3A] text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {st.num}
                  </span>
                  <div>
                    <p className="leading-tight">{st.title}</p>
                    <span className="text-[10px] font-normal text-gray-400 block">{st.roleTitle}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleRunStep(st.num)}
                  className="bg-[#146B3A] hover:bg-[#064E32] text-white px-2.5 py-1 rounded-lg text-[10px] font-bold transition flex items-center space-x-1"
                >
                  <span>Run</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-2.5 border-t border-gray-100 flex items-center justify-between text-xs">
            <button
              onClick={resetDemoData}
              className="text-gray-500 hover:text-rose-600 flex items-center space-x-1 text-[11px]"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Data</span>
            </button>
            <span className="text-[10px] text-gray-400">All 3 roles synced in real-time</span>
          </div>
        </div>
      )}
    </div>
  );
}
