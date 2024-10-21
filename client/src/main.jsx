import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import App from './App.jsx'
import Product from './productPage.jsx'
import FullProduct from './fullProductPage.jsx'
import Contacts from './contacts.jsx';
import TestUpload from './testUploadPage.jsx'
import './index.css';

const router = createBrowserRouter([
      { 
        path: "/", 
        element:<App/>,
      },
      { 
        path: "product", 
        element:<Product/>,
      },
      {
        path: "upload",
        element: <FullProduct />,
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
    <RouterProvider router = {router} />
  </React.StrictMode>
)
