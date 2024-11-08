import React from 'react'
import axios from 'axios';
import { useState } from 'react';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,[e.target.name]: e.target.value}))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const response = await axios.all('http://localhost:3100/auth', formData,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: false
                },
            );
            console.log('Logged in: ',response.data)
            alert("User login successfully")
        } catch (error) {
            console.log(error)
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
