import React from 'react'
import axios from '../../api/axios';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const uploadUserDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/login";

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('auth/', formData,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                },
            );
            console.log(formData)
            alert("User registered successfully")
            navigate(from, { replace: true })

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className='flex flex-col gap-4 pt-8 items-center' >
                <form onSubmit={handleSubmit} className='flex flex-col p-3 pb-20 pt-12 gap-6 w-[400px] md:border-2 md:rounded-lg md:shadow-2xl '>
                    <div className='text-2xl font-bold text-center tracking-widest '>Register Account</div>
                    <label>First Name</label>
                    <input 
                        type="text" 
                        name='firstname' 
                        className='py-2 font-bold px-2 tracking-widest border-2'
                        placeholder='Firstname' 
                        onChange={handleChange} 
                        required
                    />
                    <label>Last Name</label>
                    <input 
                        type="text" 
                        name='lastname' 
                        placeholder='Lastname' 
                        className='py-2 font-bold px-2 tracking-widest border-2'
                        onChange={handleChange} 
                        required
                    />
                    <label>Email</label>
                    <input 
                        type="text" 
                        name='email' 
                        placeholder='Email' 
                        className='py-2 font-bold px-2 tracking-widest border-2'
                        required
                        onChange={handleChange} 
                    />
                    <label>Password</label>
                    <input 
                        type="text" 
                        name='password' 
                        placeholder='Password'
                        className='py-2 font-bold px-2 tracking-widest border-2'
                        required
                        onChange={handleChange} 
                    />
                    <button type='submit' className='bg-black rounded-md text-white p-2'>Submit Registration </button>
                    <Link to='/login' className='bg-black text-center rounded-md text-white  p-2'>I have an account</Link>
                </form>
            </div>
        </>
    )
}

export default uploadUserDetails