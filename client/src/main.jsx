import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Login from './login.jsx';

import Product from './productPage.jsx';
import Contacts from './contacts.jsx';

import TestProduct from './testProductPage.jsx';
import PersistLogin from './controllers/PersistLogin';
import RequireAuth from './controllers/RequireAuth';
import './index.css';
import { AuthProvider } from './context/AuthProvider.jsx';

// Roles constant
const ROLES = {
  visitor: 1,
  Member: 2,
  Seller: 3,
  modarator: 4,
  Admin: 5,
};

const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<App />} />
    <Route path="login" element={<Login />} />
    <Route path="unauthorized" element={<div>Unauthorized</div>} />

    {/* Protected Routes */}
    <Route element={<PersistLogin />}>
      {/* Nested Routes for Authorization */}
      
      <Route
        element={<RequireAuth allowedRoles={[ROLES.visitor, ROLES.Member, ROLES.Seller, ROLES.Member, ROLES.Admin]} />}
      >
        <Route path="testproduct" element={<TestProduct />} />
      </Route> 
      <Route
        element={<RequireAuth allowedRoles={[ROLES.visitor, ROLES.Member, ROLES.Seller, ROLES.Member, ROLES.Admin]} />}
      >
        <Route path="product" element={<Product />} />
      </Route>

      <Route
        element={<RequireAuth allowedRoles={[ROLES.Member, ROLES.Admin]} />}
      >
        <Route path="contact" element={<Contacts />} />
      </Route>
    </Route>
  </Routes>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
