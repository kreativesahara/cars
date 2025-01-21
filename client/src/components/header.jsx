import React from 'react'
import Search from '../components/forms/search'
import headerImage from '../img/headerspareyangu.jpeg'

function header() {
  return (
    <>
      <img src={headerImage} alt="header" className="w-full rounded-xl" />
      <section className="md:flex md:items-center px-10 pt-8">
        <div className='md:w-6/12 md:pl-24 '>
          <h2 className="h6 font-bold w-10/12 md:font-semibold ">
            The easy way to find spare parts.
            <br/>Quick and Affordable</h2>
          <p >
            Find us in Kenya, Nairobi!
          </p>
        </div>  
        <Search/>
      </section>
    </>
  )
}

export default header