import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import ServiceDetail from './pages/ServiceDetail';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Products from './pages/Products';
import Terms from './pages/Terms';
import Refunds from './pages/Refunds';
import Privacy from './pages/Privacy';
import Shipping from './pages/Shipping';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/aboutus" element={<About />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/refunds" element={<Refunds />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </MainLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;
