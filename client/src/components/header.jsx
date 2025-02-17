import React from 'react'
import headerImage from '../assets/headerspareyangu.jpeg'

function header() {
  return (
    <>
    <div className='flex flex-col'>
      <img src={headerImage} alt="header" className="w-full rounded-xl" />
      <section className="items-center py-8 px-6 text-center">
          <h2 className="font-bold md:text-4xl text-xl md:font-semibold ">
            The easy way to find a Car.
            <br />
            <span className='text-gray-700'>Quickest and Most Convenient</span>
          </h2>
          <p className='text-xl md:text-4xl py-2 md:py-4 font md:font-bold'>
            Find us in Kenya, Nairobi!
          </p>  
      </section>
      </div>
    </>
  )
}

export default header