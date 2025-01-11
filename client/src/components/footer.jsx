import React from 'react'

function footer() {
  return (
    <div className="footer px-20">
        <div className="footer-top">
            <div className="footer-brand">
            <a href="#" className="logo">
                <img src="#" alt="Spare Yangu" />
            </a>
            <p className="footer-text text-2xl">
                Search for amazing spare parts in Kenya. With a diverse spare part portfolio, spare yangu offers its
                consumers an
                attractive and fun selection.
            </p>
            </div>

            <ul className="footer-list">

            <li>
                <p className="footer-list-title">Company</p>
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
                <p className="footer-list-title">Support</p>
            </li>

            <li>
                <a href="#" className="footer-link">Help center</a>
            </li>

            <li>
                <a href="#" className="footer-link">Ask a question</a>
            </li>

            <li>
                <a href="#" className="footer-link">Privacy policy</a>
            </li>

            <li>
                <a href="#" className="footer-link">Terms & conditions</a>
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