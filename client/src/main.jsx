import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import App from './App.jsx'
import Login from './login.jsx'
import Product from './productPage.jsx'
import Contacts from './contacts.jsx';
import TestUpload from './testUploadPage.jsx'
import './index.css';
import { AuthProvider } from './context/AuthProvider.jsx';

const router = createBrowserRouter([
      { 
        path: "/", 
        element:<App/>,
      },
      {
        path: "login",
        element: <Login/>,
      },
   
      {
        path: "product",
        element: <Product/>,
      },
      {
        path: "testupload",
        //element: <div> hello</div >,
        element: <TestUpload />,
      },
      { 
        path: "contact", 
        element:<Contacts/>,
      },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)
