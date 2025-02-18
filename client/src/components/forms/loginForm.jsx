import React from 'react'
import axios from '../../api/axios'
import useAuth from '../../hooks/useAuth'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'

const LoginForm = () => {
    const { setAuth, persist, setPersist } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const userRef = useRef();
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');
    const from = location.state?.from?.pathname || "/product";

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    useEffect(() => {
        userRef.current.focus();
        const persisted = JSON.parse(localStorage.getItem("persist"));
        if (persisted) setPersist(persisted);
    }, []);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify(from))
        console.log(formData)
        try {
            const response = await axios.post('/auth/login', formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                },

            );

            const { accessToken, roles } = response?.data;
            setAuth({
                email: formData.email,
                roles: Array.isArray(roles) ? roles : [roles],
                accessToken: accessToken
            });

            setFormData({ email: "", password: "" });
            alert("User login successfully")
            window.location.href = from


        } catch (error) {
            if (!error?.response) {
                setErrMsg('No Server Response');
            } else if (error.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (error.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    const togglePersist = () => {
        setPersist(prev => !prev);
    };
    useEffect(() => {
        localStorage.setItem("persist", JSON.stringify(persist));
    }, [persist]);
    return (
        <div className='flex flex-col gap-4 items-center' >
            <div className='mt-8 bg-slate-300 py-8 min-w-[400px] text-center'>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <span>Sign In</span>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col p-3 py-20 gap-6 w-[400px]  bg-slate-200'>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    ref={userRef}
                    className='p'
                    placeholder='Email'
                    autoComplete="off"
                    onChange={handleChange}
                    name='email'
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name='password'
                    onChange={handleChange}
                    required
                />
                <button className='bg-black text-white  p-2'>Sign In</button>
                <button className='bg-black text-white  p-2'>Forgot Password ?</button>
                <div className="persistCheck">
                    <input
                        type="checkbox"
                        id="persist"
                        onChange={togglePersist}
                        checked={persist}
                    />
                    <label htmlFor="persist">Trust This Device</label>
                </div>
            </form>
            <div className=' flex flex-col bg-slate-300 min-w-[400px] py-20 items-center'>
                <span> Need an Account?</span>
                <Link className='min-w-[80%] bg-black py-2 rounded-md text-white text-center' to="/register">Sign Up</Link>
            </div>
        </div>
    )
}

export default LoginForm
