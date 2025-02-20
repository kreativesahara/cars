import Layout from "./components/Layout"
import { Link } from "react-router-dom"
function forgotPassword() {
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                await axios.post('forgot-password', formData,
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    },
                );
                console.log(formData)
                window.location.href = from,{ replace: true }    
            } catch (error) {
                console.log(error)
            }
        }

    return (
        <Layout>
            <div className="mt-40 max-w-[2000px] ">
                <form onSubmit={handleSubmit} className=" flex flex-col  pb-14 px-4 py-14 w-[380px] mx-auto rounded-lg" >
                    <div>
                        <h3 className="text-3xl text-center pt-4 py-4 font-black">
                            Reset your password
                        </h3>
                        <p className="font-normal text-center"> Email address and we will send you instructions to reset your password.</p>
                    </div>
                    <label htmlFor="email" className="text-lg py-[10px] font-semibold text-center">Email address </label>
                    <input 
                        type="text"
                        name='email'
                        className='py-2 font-bold px-2 tracking-widest border-2 border-orange-400 rounded-md'
                        placeholder='Enter Your Email'
                        onChange={handleChange}
                        //required
                         />
                    <button className='bg-black text-white text-center my-4 p-2 rounded-md' type="submit">Continue</button>
                    <Link to='/home' className="text-center font-bold hover:text-green-700">Go to website Homepage </Link>
                </form>
            </div>
        </Layout>
    )
}

export default forgotPassword