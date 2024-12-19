import React from 'react'
import axios from '../../api/axios'
import useAuth from '../../hooks/useAuth'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useRef,useState, useEffect } from 'react'

const LoginForm = () => {
    const {setAuth, persist, setPersist} = useAuth();
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
            ...prev,[e.target.name]: e.target.value}))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify(from))
        console.log(formData)
        try {
            const response= await axios.post('auth/login', formData,
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
                roles:Array.isArray(roles) ? roles : [roles],
                accessToken: accessToken 
             });
           
            setFormData({ email: "", password: "" });
            alert("User login successfully")
            navigate(from, { replace: true });
           
            
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
    <>
      <div className='mt-10 font-bold bg-red-500 lg:w-1/3'>Upload User Details</div>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit} className='flex flex-col p-3 lg:w-1/3'>
              <label htmlFor="email">Email</label>
              <input
                  type="text"
                  id="email"
                  ref={userRef}
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
              <button>Sign In</button>
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
          <p>
              Need an Account?<br />
              <span className="line">
                  <Link to="/">Sign Up</Link>
              </span>
          </p>
    </>
  )
}

export default LoginForm
