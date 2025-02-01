import Logo from '../assets/diksx.png'
function footer() {
  return (
    <div className="footer  px-5 md:px-20 pt-14">
        <div className="footer-top flex  md:justify-between flex-col md:flex-row ">
            <div className="footer-brand w-full md:w-1/3 ">
                <a href="/home" className="text-2xl font-bold">
                    <img src={Logo} className="w-40" alt="Diksx cars" />
                </a>
                <p className="text-justify text-md py-4">
                    Search for amazing spare parts in Kenya. With a diverse spare part portfolio, spare yangu offers its
                    consumers an
                    attractive and fun selection.
                </p>
            </div>
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

            <ul className="footer-list">
                <li>
                    <p className="text-xl font-bold pb-3">Support</p>
                </li>

                <li>
                    <a href="#" >Help center</a>
                </li>

                <li>
                    <a href="#" >Ask a question</a>
                </li>

                <li>
                    <a href="#" >Privacy policy</a>
                </li>

                <li>
                    <a href="#" >Terms & conditions</a>
                </li>
            </ul>
        </div>


        <div className='text-center my-8 '>
            &copy;2024 Spare Yangu. 
             Product of Kreative Sahara.
             Copyright ©mwong. All rights reserved.
        </div>
    </div>
  )
}

export default footer