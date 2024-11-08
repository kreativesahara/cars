import React from 'react'
import axios from 'axios';
import {Navigate} from 'react-router-dom';
import { useState } from 'react';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [navigate, setNavigate] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,[e.target.name]: e.target.value}))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const response = await axios.post('http://localhost:3100/auth/login', formData,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                },
            );
            setNavigate(true)
            console.log('Logged in: ', response.data)
            alert("User login successfully")
         
        } catch (error) {
            console.log(error)
        }
        if(navigate) {
            return <Navigate to='/product' />
        }
    }

  return (
    <>
      <div className='mt-10 font-bold bg-red-500 lg:w-1/3'>Upload User Details</div>
          <form onSubmit={handleSubmit} className='flex flex-col p-3 lg:w-1/3'>
              <label>Email</label>
              <input type="text" name='email' placeholder='Email' onChange={handleChange} />
              <label>Password</label>
              <input type="text" name='password' placeholder='Password' onChange={handleChange} />
            <button type='submit'>Upload</button>
          </form>
    </>
  )
}

export default LoginForm
