import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Providers
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { AppProvider } from './context/AppContext';

// Layouts
import CustomerLayout from './layouts/CustomerLayout';
import AdminLayout from './layouts/AdminLayout';
import DeliveryLayout from './layouts/DeliveryLayout';

// Customer Pages
import Home from './pages/customer/Home';
import Products from './pages/customer/Products';
import ProductDetails from './pages/customer/ProductDetails';
import Cart from './pages/customer/Cart';
import Checkout from './pages/customer/Checkout';
import Orders from './pages/customer/Orders';
import Tracking from './pages/customer/Tracking';
import Profile from './pages/customer/Profile';
import AboutUs from './pages/customer/AboutUs';
import Contact from './pages/customer/Contact';
import Subscription from './pages/customer/Subscription';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminCustomers from './pages/admin/Customers';
import AdminProducts from './pages/admin/Products';
import AdminOrders from './pages/admin/Orders';
import AdminDeliveryPartners from './pages/admin/DeliveryPartners';
import AdminInventory from './pages/admin/Inventory';
import AdminPayments from './pages/admin/Payments';
import AdminCoupons from './pages/admin/Coupons';
import AdminReports from './pages/admin/Reports';
import AdminSettings from './pages/admin/Settings';

// Delivery Pages
import DeliveryDashboard from './pages/delivery/Dashboard';
import DeliveryMyDeliveries from './pages/delivery/MyDeliveries';
import DeliveryRouteMap from './pages/delivery/RouteMap';
import DeliveryEarnings from './pages/delivery/Earnings';
import DeliveryProfile from './pages/delivery/Profile';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <CartProvider>
            <Routes>

              {/* Customer Routes */}
              <Route path="/" element={<CustomerLayout><Home /></CustomerLayout>} />
              <Route path="/products" element={<CustomerLayout><Products /></CustomerLayout>} />
              <Route path="/products/:id" element={<CustomerLayout><ProductDetails /></CustomerLayout>} />
              <Route path="/cart" element={<CustomerLayout><Cart /></CustomerLayout>} />
              <Route path="/checkout" element={<CustomerLayout><Checkout /></CustomerLayout>} />
              <Route path="/orders" element={<CustomerLayout><Orders /></CustomerLayout>} />
              <Route path="/tracking" element={<CustomerLayout><Tracking /></CustomerLayout>} />
              <Route path="/tracking/:id" element={<CustomerLayout><Tracking /></CustomerLayout>} />
              <Route path="/profile" element={<CustomerLayout><Profile /></CustomerLayout>} />
              <Route path="/about" element={<CustomerLayout><AboutUs /></CustomerLayout>} />
              <Route path="/contact" element={<CustomerLayout><Contact /></CustomerLayout>} />
              <Route path="/subscription" element={<CustomerLayout><Subscription /></CustomerLayout>} />

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
              <Route path="/admin/customers" element={<AdminLayout><AdminCustomers /></AdminLayout>} />
              <Route path="/admin/products" element={<AdminLayout><AdminProducts /></AdminLayout>} />
              <Route path="/admin/orders" element={<AdminLayout><AdminOrders /></AdminLayout>} />
              <Route path="/admin/delivery-partners" element={<AdminLayout><AdminDeliveryPartners /></AdminLayout>} />
              <Route path="/admin/inventory" element={<AdminLayout><AdminInventory /></AdminLayout>} />
              <Route path="/admin/payments" element={<AdminLayout><AdminPayments /></AdminLayout>} />
              <Route path="/admin/coupons" element={<AdminLayout><AdminCoupons /></AdminLayout>} />
              <Route path="/admin/reports" element={<AdminLayout><AdminReports /></AdminLayout>} />
              <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />

              {/* Delivery Routes */}
              <Route path="/delivery/dashboard" element={<DeliveryLayout><DeliveryDashboard /></DeliveryLayout>} />
              <Route path="/delivery/deliveries" element={<DeliveryLayout><DeliveryMyDeliveries /></DeliveryLayout>} />
              <Route path="/delivery/route-map" element={<DeliveryLayout><DeliveryRouteMap /></DeliveryLayout>} />
              <Route path="/delivery/earnings" element={<DeliveryLayout><DeliveryEarnings /></DeliveryLayout>} />
              <Route path="/delivery/messages" element={<DeliveryLayout><DeliveryMyDeliveries /></DeliveryLayout>} />
              <Route path="/delivery/profile" element={<DeliveryLayout><DeliveryProfile /></DeliveryLayout>} />
              <Route path="/delivery/support" element={<DeliveryLayout><DeliveryProfile /></DeliveryLayout>} />
              <Route path="/delivery/settings" element={<DeliveryLayout><DeliveryProfile /></DeliveryLayout>} />

              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>
          </CartProvider>
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}
