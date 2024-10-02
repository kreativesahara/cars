import React from 'react'
import Contacts from './contacts.jsx';
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import App from './App.jsx'
import './index.css';

const router = createBrowserRouter([
      { 
        path: "/", 
        element:<App/>,
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
