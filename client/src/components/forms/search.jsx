import React from 'react'

function search() {
  return (
    <>
        <form className='gap-10 flex-col px-4 mt-4 md:w-full lg:w-1/2 border-8 rounded-2xl py-16  shadow-2xl'>
            <input className='name text-sm font-normal' type='text' placeholder='Enter Spare part name' />
            <input className='cartegory font-normal' type='text' placeholder='choose a cartegory' />
            <input className='year' type='text' placeholder='Enter Year' />
            <input className='location' type='text' placeholder='Enter location' />     
            <button className="justify-center hover:text-white  py-2  w-100  text-sm bg-red-600 
            font-semibold rounded border border-purple-200 text-white
            hover:bg-black hover:border-transparent focus:outline-none focus:ring-2
            focus:ring-white-600  focus:ring-offset-2 ">
                Search
            </button>
        </form>
    </>
  )
}

export default search