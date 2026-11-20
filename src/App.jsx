import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Providers
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { AppProvider } from './context/AppContext';

// Layouts
import CustomerLayout from './layouts/CustomerLayout';
import AdminLayout from './layouts/AdminLayout';
import FarmerLayout from './layouts/FarmerLayout';
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
import OurFarmers from './pages/customer/OurFarmers';
import FarmerRegister from './pages/customer/FarmerRegister';
import AboutUs from './pages/customer/AboutUs';
import Contact from './pages/customer/Contact';
import Subscription from './pages/customer/Subscription';

// Farmer Pages
import FarmerDashboard from './pages/farmer/Dashboard';
import FarmerMyProducts from './pages/farmer/MyProducts';
import FarmerAddProduct from './pages/farmer/AddProduct';
import FarmerMilkCollection from './pages/farmer/MilkCollection';
import FarmerOrders from './pages/farmer/Orders';
import FarmerInventory from './pages/farmer/Inventory';
import FarmerEarnings from './pages/farmer/Earnings';
import FarmerProfile from './pages/farmer/Profile';
import FarmerSettings from './pages/farmer/Settings';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminCustomers from './pages/admin/Customers';
import AdminFarmers from './pages/admin/Farmers';
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
              
              {/* Customer Routes with CustomerLayout */}
              <Route path="/" element={<CustomerLayout><Home /></CustomerLayout>} />
              <Route path="/products" element={<CustomerLayout><Products /></CustomerLayout>} />
              <Route path="/products/:id" element={<CustomerLayout><ProductDetails /></CustomerLayout>} />
              <Route path="/cart" element={<CustomerLayout><Cart /></CustomerLayout>} />
              <Route path="/checkout" element={<CustomerLayout><Checkout /></CustomerLayout>} />
              <Route path="/orders" element={<CustomerLayout><Orders /></CustomerLayout>} />
              <Route path="/tracking" element={<CustomerLayout><Tracking /></CustomerLayout>} />
              <Route path="/tracking/:id" element={<CustomerLayout><Tracking /></CustomerLayout>} />
              <Route path="/profile" element={<CustomerLayout><Profile /></CustomerLayout>} />
              <Route path="/farmers" element={<CustomerLayout><OurFarmers /></CustomerLayout>} />
              <Route path="/farmer-register" element={<CustomerLayout><FarmerRegister /></CustomerLayout>} />
              <Route path="/about" element={<CustomerLayout><AboutUs /></CustomerLayout>} />
              <Route path="/contact" element={<CustomerLayout><Contact /></CustomerLayout>} />
              <Route path="/subscription" element={<CustomerLayout><Subscription /></CustomerLayout>} />

              {/* Farmer Routes with FarmerLayout */}
              <Route path="/farmer/dashboard" element={<FarmerLayout><FarmerDashboard /></FarmerLayout>} />
              <Route path="/farmer/products" element={<FarmerLayout><FarmerMyProducts /></FarmerLayout>} />
              <Route path="/farmer/add-product" element={<FarmerLayout><FarmerAddProduct /></FarmerLayout>} />
              <Route path="/farmer/milk-collection" element={<FarmerLayout><FarmerMilkCollection /></FarmerLayout>} />
              <Route path="/farmer/orders" element={<FarmerLayout><FarmerOrders /></FarmerLayout>} />
              <Route path="/farmer/inventory" element={<FarmerLayout><FarmerInventory /></FarmerLayout>} />
              <Route path="/farmer/earnings" element={<FarmerLayout><FarmerEarnings /></FarmerLayout>} />
              <Route path="/farmer/customers" element={<FarmerLayout><FarmerDashboard /></FarmerLayout>} />
              <Route path="/farmer/reports" element={<FarmerLayout><FarmerEarnings /></FarmerLayout>} />
              <Route path="/farmer/profile" element={<FarmerLayout><FarmerProfile /></FarmerLayout>} />
              <Route path="/farmer/settings" element={<FarmerLayout><FarmerSettings /></FarmerLayout>} />

              {/* Admin Routes with AdminLayout */}
              <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
              <Route path="/admin/customers" element={<AdminLayout><AdminCustomers /></AdminLayout>} />
              <Route path="/admin/farmers" element={<AdminLayout><AdminFarmers /></AdminLayout>} />
              <Route path="/admin/products" element={<AdminLayout><AdminProducts /></AdminLayout>} />
              <Route path="/admin/orders" element={<AdminLayout><AdminOrders /></AdminLayout>} />
              <Route path="/admin/delivery-partners" element={<AdminLayout><AdminDeliveryPartners /></AdminLayout>} />
              <Route path="/admin/inventory" element={<AdminLayout><AdminInventory /></AdminLayout>} />
              <Route path="/admin/payments" element={<AdminLayout><AdminPayments /></AdminLayout>} />
              <Route path="/admin/coupons" element={<AdminLayout><AdminCoupons /></AdminLayout>} />
              <Route path="/admin/reports" element={<AdminLayout><AdminReports /></AdminLayout>} />
              <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />

              {/* Delivery Routes with DeliveryLayout */}
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

              {/* Catch-all redirect to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>
          </CartProvider>
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}
