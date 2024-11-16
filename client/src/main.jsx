import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Login from './login.jsx';
import Product from './productPage.jsx';
import Contacts from './contacts.jsx';
import TestUpload from './testUploadPage.jsx';
import PersistLogin from './controllers/PersistLogin';
import RequireAuth from './controllers/RequireAuth';
import './index.css';
import { AuthProvider } from './context/AuthProvider.jsx';

// Roles constant
const ROLES = {
  visitor: 0,
  Member: 1,
  Seller: 2,
  modarator: 3,
  Admin: 4
};

// Define protected routes
const protectedRoutes = [
  {
    path: "product",
    element: <Product />,
    roles: [ROLES.visitor],
  },
  {
    path: "testupload",
    element: <TestUpload />,
    //roles: [ROLES.Admin],
  },
  {
    path: "contact",
    element: <Contacts />,
    //roles: [ROLES.User, ROLES.Admin],
  },
];

// Configure the router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    element: <PersistLogin />, // Wrap protected routes with PersistLogin
    children: protectedRoutes.map(({ path, element, roles }) => ({
      path,
      element: (
        <RequireAuth allowedRoles={roles}>
          {element}
        </RequireAuth>
      ),
    })),
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
