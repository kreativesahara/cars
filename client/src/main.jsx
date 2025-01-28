import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Register from './register.jsx';
import Login from './login.jsx';
import Home from './home.jsx';
import TestRefresh from './testRefresh';

import Product from './productPage.jsx';
import ItemPage from './itemPage.jsx';
import Contacts from './contacts.jsx';

import TestProduct from './testProductPage.jsx';
import PersistLogin from './controllers/PersistLogin';
import RequireAuth from './controllers/RequireAuth';
import './index.css';
import { AuthProvider } from './context/AuthProvider.jsx';
import { ProductProvider } from './context/ProductProvider.jsx';

// Roles constant
const ROLES = {
  Visitor: 1,
  Member: 2,
  Seller: 3,
  Modarator: 4,
  Admin: 5,
};

const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="register" element={<Register />} />
    <Route path="login" element={<Login />} />
    <Route path="unauthorized" element={<div>Unauthorized!</div>} />

    {/* Protected Routes */}
    <Route element={<PersistLogin />}>
      {/* <Route path="/" element={<Home />} /> */}
      {/* Nested Routes for Authorization */}
      <Route
        element={<RequireAuth allowedRoles={ROLES.Admin} />}
      >
        <Route path="home" element={<Home />} />
      </Route> 
      <Route
        element={<RequireAuth allowedRoles={[ ROLES.Seller, ROLES.Modarator, ROLES.Admin]} />}
      >
             <Route path="dashboard" element={<App />} />
      </Route> 
      <Route
      element={<RequireAuth allowedRoles={[ROLES.Visitor, ROLES.Member, ROLES.Seller, ROLES.Modarator, ROLES.Admin]} />}
      >
        <Route path="itempage/:productId" element={<ItemPage />} />
    </Route> 
      <Route
        element={<RequireAuth allowedRoles={[ROLES.Visitor, ROLES.Member, ROLES.Seller, ROLES.Modarator, ROLES.Admin]} />}
      >
        <Route path="testrefresh" element={<TestRefresh />} />
      </Route> 
      <Route
        element={<RequireAuth allowedRoles={[ROLES.Visitor, ROLES.Member, ROLES.Seller, ROLES.Modarator, ROLES.Admin]} />}
      >
        <Route path="testproduct" element={<TestProduct />} />
      </Route> 
      <Route
        element={<RequireAuth allowedRoles={[ ROLES.Member, ROLES.Seller, ROLES.Modarator, ROLES.Admin]} />}
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
      <ProductProvider>
        <Router>
          <AppRoutes />
        </Router>
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>
);
