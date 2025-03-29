import React from 'react'
import { axiosPrivate } from '../../api/axios'
import useAuth from '../../hooks/useAuth'
import { Link, useLocation } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginForm = () => {
    const { setAuth, persist, setPersist } = useAuth();
    const location = useLocation();
    const userRef = useRef();
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');
    const from = location.state?.from?.pathname || "/home";

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        userRef.current.focus();
        const persisted = JSON.parse(localStorage.getItem("persist" ) || false);
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
            const response = await axiosPrivate.post('auth/login', formData);
            const { accessToken, roles } = response?.data;
            setAuth({
                email: formData.email,
                roles: roles,
                // roles: Array.isArray(roles) ? roles : [roles],
                accessToken: accessToken
            });

            setFormData({ email: "", password: "" });
            alert("User login successfully")
            window.location.href = from, { replace: true }  
        } catch (error) {
            if (!error?.response) {
                setErrMsg('No Server Response');
            } else if (error.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (error.response?.status === 401) {
                setErrMsg('Email Not Found');
            } else if (error.response?.status === 406) {
                setErrMsg('Invalid Password');
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
            <div className=' md:rounded-lg shadow-md flex flex-col bg-slate-300 min-w-[400px] mt-8 pb-14 items-center'>
                <span className='py-2  font-bold text-2xl'> Need an Account?</span>
                <Link className='min-w-[80%] bg-black py-2 rounded-md text-white text-center' to="/register">Sign Up</Link>
            </div>

            <form onSubmit={handleSubmit} className='flex flex-col p-3 pb-12 gap-4 w-[400px] md:border-2 md:rounded-lg md:shadow-2xl '>
                <div className='  py-6 text-center'>
                    <span className='text-xl font-bold tracking-widest'>Sign In</span>
                    {errMsg ? <div ref={errRef} aria-live="assertive" className=' errmsg"  bg-red-500 py-4 my-4 mx-auto text-white text-md  font-medium tracking-wider rounded-md'>
                     {errMsg}
                    </div> :null }
                </div>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    ref={userRef}
                    className='py-2 font-bold px-2 tracking-widest border-2'
                    placeholder='Email'
                    autoComplete="off"
                    onChange={handleChange}
                    name='email'
                    // required
                />
                <label htmlFor="password">Password</label>
                <div className='relative'>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name='password'
                        autoComplete="off"
                        className='py-2 font-bold px-2 tracking-widest border-2 w-full'
                        onChange={handleChange}
                    />
                    <button
                        type='button'
                        className='absolute right-3 top-1/2 transform -translate-y-1/2'
                        onClick={() => setShowPassword(prev => !prev)}
                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                </div>
                <div className="flex flex-row gap-3 my-auto mx-auto">
                    <input
                        type="checkbox"
                        id="persist"
                        className='h-4 w-4 my-auto'
                        onChange={togglePersist}
                        checked={persist}
                    />
                    <label className='text-md' htmlFor="persist">Trust This Device</label>
                </div>
                <button className='bg-black text-white  p-2 rounded-md'>Sign In</button>
                <Link to= "/forgot-password" className='bg-black text-white text-center  p-2 rounded-md'>Forgot Password ?</Link>
            </form>
        </div>
    )
}

export default LoginForm
