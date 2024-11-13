import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { Outlet } from 'react-router-dom';
import LoginForm from './components/forms/loginForm';
import './App.css'; // Import for styling

export default function Login() {
  return (
    <>
      <h1>Login</h1>
      <LoginForm /> 
    </>
  );
}


