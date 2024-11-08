import React from 'react'
import axios from 'axios';
import { useState } from 'react';

const uploadUserDetails = () => {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,[e.target.name]: e.target.value}))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3100/auth/register', formData,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                },
            );
            console.log(formData)
            alert("User details uploaded successfully")
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
      <div className='mt-10 font-bold bg-red-500 lg:w-1/3'>Upload User Details</div>
          <form onSubmit={handleSubmit} className='flex flex-col p-3 lg:w-1/3'>
              <label>First Name</label>
              <input type="text" name='firstname' placeholder='Firstname' onChange={handleChange}/>
              <label>Last Name</label>
              <input type="text" name='lastname' placeholder='Lastname' onChange={handleChange} />
              <label>Email</label>
              <input type="text" name='email' placeholder='Email' onChange={handleChange} />
              <label>Password</label>
              <input type="text" name='password' placeholder='Password' onChange={handleChange} />
            <button type='submit'>Upload</button>
          </form>
    </>
  )
}

export default uploadUserDetails