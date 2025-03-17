import { useRef, useState, useEffect } from "react";
import { axiosPrivate } from "../../api/axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { faCheck, faTimes, faInfoCircle, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MAIL_REGEX = /^(?=[a-z0-9@.]+$)(?=.*@)(?=.*\.)[a-z0-9]+(?:\.[a-z0-9]+)*@[a-z0-9]+(?:\.[a-z0-9]+)*\.[a-z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const UploadUserDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/login";

    const userRef = useRef();
    const errRef = useRef();

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    const [validMail, setValidMail] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        matchPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);


    useEffect(() => {
        // Focus on the first name input on mount
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setValidMail(MAIL_REGEX.test(formData.email));
    }, [formData.email]);

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
        const v1 = MAIL_REGEX.test(formData.email);
        const v2 = PWD_REGEX.test(formData.password);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            await axiosPrivate.post("auth", formData);
            //Very Important code for logical rendering of rwturned components
            setSuccess(true);
            alert("User registered successfully");
            setFormData({
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                matchPassword: ""
            });
            // Redirect to the login page (or other route)
            window.location.href = from, { replace: true };
        } catch (error) {
            if (!error?.response) {
                setErrMsg("No Server Response");
            } else if (error.response?.status === 409) {
                setErrMsg("Email Address Taken");
            } else {
                setErrMsg("Registration Failed");
            }
            errRef.current.focus();
        }
    };

    return (
        <>
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
                            <span className="text-xl font-bold tracking-widest">Register Now</span>
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

                        <label htmlFor="firstname">First Name</label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                            ref={userRef}
                            autoComplete="off"
                            className="py-2 font-bold px-2 tracking-widest border-2"
                            placeholder="Firstname"
                        />

                        <label htmlFor="lastname">Last Name</label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            autoComplete="off"
                            placeholder="Lastname"
                            className="py-2 font-bold px-2 tracking-widest border-2"
                        />

                        <label htmlFor="email" className="flex items-center gap-1">
                            Email:
                            {validMail ? (
                                <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                            ) : (
                                formData.email && (
                                    <>
                                        <FontAwesomeIcon icon={faTimes} className="text-red-500" />
                                        <FontAwesomeIcon icon={faInfoCircle} className="text-blue-500" />
                                    </>
                                )
                            )}
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            autoComplete="off"
                            aria-invalid={validMail ? "false" : "true"}
                            aria-describedby="emailnote"
                            className="py-2 font-bold px-2 tracking-widest border-2"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p
                            id="emailnote"
                            className={
                                userFocus && formData.email && !validMail
                                    ? "text-sm text-gray-600"
                                    : "hidden"
                            }
                        >
                            <FontAwesomeIcon icon={faInfoCircle} className="inline mr-1" /> Must begin with a letter.
                            Letters, numbers, underscores, hyphens allowed.
                        </p>

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
                        <input
                            type="text"
                            id="password"
                            name="password"
                            value={formData.password}
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                            autoComplete="off"
                            placeholder="Password"
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            className="py-2 font-bold px-2 tracking-widest border-2"
                            onChange={handleChange}

                        />
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
                                onClick={() => setShowPassword(prev => !prev)}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
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
                            Submit Registration
                        </button>
                        <Link
                            to="/login"
                            className="bg-black text-center rounded-md text-white p-2"
                        >
                            I have an account
                        </Link>
                    </form>
                </div>
            )}
        </>
    );
};

export default UploadUserDetails;
