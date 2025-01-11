import React from 'react'
import Layout from '../../components/Layout'

import { Input } from '@mui/material'
function Checkout() {
  return (
    <Layout>
        <form className='grid grid-cols-1 lg:grid-cols-2 w-3/4 mx-auto border-2 mt-4 gap-2 rounded-xl py-4 '>
            <div className='flex flex-col px-4 pb-10'>
            <h3 className='py-4 text-center font-bold'>User's Details </h3>
              <div className='grid grid-cols-2 gap-2 py-2'>
                <span>
                  <label className='firstname'>First Name</label>
                  <Input type='text' placeholder='Enter FirstName'/>
                </span>
                <span>
                  <label className='Lasttname'>Last Name</label>
                  <Input type='text' placeholder='Enter LastName'/>
                </span>
              </div>
              <label className='email'>Email Address</label>
              <Input type='email' placeholder='Enter Email Address'/>
              <label className='phonenumber'>Phone Number</label>
              <Input  type='number' placeholder='Enter Phone Number'/>
            </div>
            <div className='border-l px-4 pb-10'>
              <h3 className='text-center py-4 font-bold'>Payment Details</h3>
              <ul className='items-center gap-2 mb-4'>
                <li className='flex rounded description border hover:bg-blue-200 justify-between mb-2 p-3'>
                  <span >Basic</span>
                  <span className='font-semibold'>FREE</span>
                </li>
              </ul>
              <button className='flex mx-auto lg:justify-left hover:text-blue-600 py-2 px-14 text-sm bg-blue-600 
            font-semibold rounded-full border border-purple-200 text-white
             hover:bg-white hover:border-transparent focus:outline-none focus:ring-2
              focus:ring-white-600  focus:ring-offset-2'>Proceed with Payment</button>
            </div>
        </form>
    </Layout>
    
  )
  
}

export default Checkout