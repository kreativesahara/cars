import { useRef, useState, useEffect } from "react";
import { axiosPrivate } from "../../api/axios";
import { Link, useLocation } from "react-router-dom";
import { faCheck, faTimes, faInfoCircle, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from '../Layout'


const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const UploadUserDetails = () => {
    const location = useLocation();
    const from = location.state?.from?.pathname || "/login";

    const errRef = useRef();
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showMatchPassword, setShowMatchPassword] = useState(false);


    const [formData, setFormData] = useState({
        token: "",
        password: "",
        matchPassword: ""
    });

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(formData.password));
        setValidMatch(formData.password === formData.matchPassword);
    }, [formData.password, formData.matchPassword]);

    useEffect(() => {
        setErrMsg("");
    }, [formData]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = PWD_REGEX.test(formData.password);
        const token = formData.token;
        console.log()
        if (!token) {
            setErrMsg("Please Enter a Reset Token");
            return;
        }
        if (!v1) {
            setErrMsg("Invalid Password Format");
            return;
        }
        try {
            console.log('reset password form:',formData)
            await axiosPrivate.post("reset-password", formData);
            //Very Important code for logical rendering of rwturned components
            setSuccess(true);
            alert("password reset successfully");
            setFormData({
                token:"",
                password: "",
                matchPassword: ""
            });
            // Redirect to the login page (or other route)
            window.location.href = from, { replace: true };

        } catch (error) {
            if (!error?.response) {
                setErrMsg("No Server Response");
            } else if (error.response?.status === 404) {          
                setErrMsg("Reset Failed");
            }
            errRef.current.focus();
        }
    };

    return (
        <Layout>
            {success ? (
                <section className="auth text-center py-6">
                    <h1 className="text-2xl font-bold">Success!</h1>
                    <p>
                        <Link to="/login" className="text-blue-500 underline">
                            Sign In
                        </Link>
                    </p>
                </section>
            ) : (
                <div className="flex flex-col pt-8 items-center">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col p-3 pb-20 pt-2 gap-4 w-[400px] md:border-2 md:rounded-lg md:shadow-2xl"
                    >
                        <div className="py-6 text-center">
                            <span className="text-xl font-bold tracking-widest">Password Reset</span>
                            {errMsg && (
                                <div
                                    ref={errRef}
                                    aria-live="assertive"
                                    className="bg-red-500 py-4 mt-2 mx-auto text-white text-md font-medium tracking-wider rounded-md"
                                >
                                    {errMsg}
                                </div>
                            )}
                        </div>

                        <label htmlFor="email" className="flex items-center gap-1">
                            Token:
                        </label>
                        <input
                            type="text"
                            id="token"
                            name="token"
                            value={formData.token}
                            onChange={handleChange}
                            placeholder="Enter Token"
                            autoComplete="off"
                            className="py-2 font-bold px-2 tracking-widest border-2"
                        />

                        <label htmlFor="password" className="flex items-center gap-1">
                            Password:
                            {validPwd ? (
                                <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                            ) : (
                                formData.password && (
                                    <>
                                        <FontAwesomeIcon icon={faTimes} className="text-red-500" />
                                        <FontAwesomeIcon icon={faInfoCircle} className="text-blue-500" />
                                    </>
                                )
                            )}
                        </label>
                        <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                    autoComplete="off"
                                    placeholder="Password"
                                    aria-invalid={validPwd ? "false" : "true"}
                                    aria-describedby="pwdnote"
                                    className="w-full py-2 font-bold px-2 tracking-widest border-2"
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
                        <p
                            id="pwdnote"
                            className={pwdFocus && !validPwd ? "text-sm text-gray-600" : "hidden"}
                        >
                            <FontAwesomeIcon icon={faInfoCircle} className="inline mr-1" /> 8 to 24 characters.
                            Must include uppercase and lowercase letters, a number and a special
                            character. Allowed special characters: ! @ # $ %
                        </p>

                        <label htmlFor="matchPassword" className="flex items-center gap-1">
                            Confirm Password:
                            {validMatch && formData.matchPassword ? (
                                <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                            ) : (
                                formData.matchPassword && (
                                    <>
                                        <FontAwesomeIcon icon={faTimes} className="text-red-500" />
                                        <FontAwesomeIcon icon={faInfoCircle} className="text-blue-500" />
                                    </>
                                )
                            )}
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="matchPassword"
                                name="matchPassword"
                                placeholder="Confirm Password"
                                className="w-full py-2 font-bold px-2 tracking-widest border-2"
                                onChange={handleChange}
                                value={formData.matchPassword}
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            <button
                                type='button'
                                className='absolute right-3 top-1/2 transform -translate-y-1/2'
                                onClick={() => setShowMatchPassword(prev => !prev)}
                            >
                                <FontAwesomeIcon icon={showMatchPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>
                        <p
                            id="confirmnote"
                            className={matchFocus && !validMatch ? "text-sm text-gray-600" : "hidden"}
                        >
                            <FontAwesomeIcon icon={faInfoCircle} className="inline mr-1" /> Must match the first password
                            input field.
                        </p>
                        <button type="submit" className="bg-black rounded-md text-white p-2">
                            Reset Password
                        </button>
                        <Link
                            to="/login"
                            className="bg-black text-center rounded-md text-white p-2"
                        >
                            I have a Password 
                        </Link>
                    </form>
                </div>
            )}
        </Layout>
    )
};

export default UploadUserDetails;