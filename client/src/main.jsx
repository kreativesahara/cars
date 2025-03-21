import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import App from './App/App.jsx';
import Home from './home.jsx';
import Login from './login.jsx';
import Register from './register.jsx';
import ForgotPassword from './components/forms/forgotPassword.jsx';
import ResetPassword from './components/forms/resetPassword.jsx';
import AddProduct from './components/forms/addProduct.jsx';
import BecomeSeller from './components/forms/becomeSeller.jsx';
import UpdateProduct from './components/forms/updateProduct.jsx';

import ItemPage from './itemPage.jsx';
import Pricing from './pricing.jsx';
// import SubscriptionPage from './subscriptionPage.jsx';
import Product from './productPage.jsx';
import Support from './support.jsx';

import { AuthProvider } from './context/AuthProvider.jsx';
import { ProductProvider } from './context/ProductProvider.jsx';
import { SearchProvider } from './context/SearchProvider.jsx';
import { SellerProvider } from './context/SellerProvider.jsx';
import PersistLogin from './controllers/PersistLogin';
import RequireAuth from './controllers/RequireAuth';

import 'material-symbols';
import './index.css';

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
    <Route path="unauthorized" element={<div>Unauthorized!</div>} />
    <Route path="notfound" element={<div>Page Does Not Exit!</div>} />
    <Route path="register" element={<Register />} />
    <Route path="login" element={<Login />} />
    <Route path="forgot-password" element={<ForgotPassword />} />
    <Route path="reset-password" element={<ResetPassword />} />
    <Route path="/" element={< Home />} />    

    {/* Protected Routes */}
    <Route element={<PersistLogin />}> 
      <Route path="home" element={< Home />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="support" element={<Support />} />
      {/* Nested Routes for Authorization */}
      <Route element={<RequireAuth allowedRoles={[ROLES.Visitor, ROLES.Member, ROLES.Seller, ROLES.Modarator, ROLES.Admin]} />}>
        <Route path="dashboard" element={<App />} />
      </Route>
      <Route element={<RequireAuth allowedRoles={[ ROLES.Seller, ROLES.Modarator, ROLES.Admin]} />}>
        <Route path="upload" element={<AddProduct />} />
      </Route>
      <Route element={<RequireAuth allowedRoles={[ROLES.Visitor, ROLES.Member, ROLES.Seller, ROLES.Modarator, ROLES.Admin]} />}>
        <Route path="itempage/:productId" element={<ItemPage />} />
      </Route>
      <Route element={<RequireAuth allowedRoles={[ROLES.Visitor, ROLES.Member, ROLES.Seller, ROLES.Modarator, ROLES.Admin]} />}>
        <Route path="app/:productId" element={<UpdateProduct />} />
      </Route>
      <Route element={<RequireAuth allowedRoles={[ROLES.Visitor, ROLES.Member, ROLES.Seller, ROLES.Modarator, ROLES.Admin]} />}>
        <Route path="upgrade" element={<BecomeSeller />} />
      </Route>
      <Route element={<RequireAuth allowedRoles={[ROLES.Visitor, ROLES.Member, ROLES.Seller, ROLES.Modarator, ROLES.Admin]} />}>
        <Route path="product" element={<Product />} />
      </Route>
    </Route>
  </Routes>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider>
        <SearchProvider>
          <SellerProvider>
            <Router>
              <AppRoutes />
            </Router>
          </SellerProvider >
        </SearchProvider>
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>
);
