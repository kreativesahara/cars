import Logo from '../assets/diksx.png'
function footer() {
    return (
        <div className="footer min-w-[350px] max-w-[2000px] mx-auto px-5 md:px-20 pb-4 mt-20 pt-6 bg-slate-100">
            <div className="pb-8 flex  md:justify-between flex-col md:flex-row gap-4 md:place-content-center">
                <div className="footer-brand md:w-1/3 max-w-[480px] mx-auto">
                    <a href="/home" className="text-2xl font-bold">
                        <img 
                            src={Logo} 
                            width="400"
                            height="300"
                            className="w-[100px] h-[75px]" 
                            alt="Diksx cars" />
                    </a>
                    <p className="text-justify md:font-bold text-xl py-4 ">
                        The Vehicle Marketplace to find your next Ride.
                        Also With its diverse spare part portfolio, diksx Automotive and spares offers its
                        consumers an attractive and fun selection.
                    </p>
                </div>
                <div className='flex justify-between px-10 w-full md:w-2/4 md:my-auto'>
                    <ul >
                        <li>
                            <p className="text-xl font-bold pb-3">Company</p>
                        </li>

                        <li>
                            <a href="#" className="footer-link">About us</a>
                        </li>

                        <li>
                            <a href="#" className="footer-link">Pricing</a>
                        </li>

                        <li>
                            <a href="#" className="footer-link">Our blog</a>
                        </li>

                        <li>
                            <a href="#" className="footer-link">Contacts</a>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <p className="text-xl font-bold pb-3">Support</p>
                        </li>
                        <li>
                            <a href="#" >Terms & conditions</a>
                        </li>
                        <li>
                            <a href="#" >Ask a question</a>
                        </li>

                        <li>
                            <a href="#" >Help center</a>
                        </li>
                        <li>
                            <a href="#" >Privacy policy</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='text-center mx-auto py-4 text-xs md:text-xl md:font-bold md:opacity-65 bg-slate-100 '>
                &copy;2025 Diksx Cars.
                Product of Kreativ Sahara.
                Copyright <br /> ©mwong. All rights reserved.
            </div>
        </div>
    )
}

export default footer