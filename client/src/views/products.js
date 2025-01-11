import React from 'react'
import Product from '../components/cards/Product'
import Searchbar from '../components/forms/Searchbar'
import Sidebar from '../components/sidebar/Sidebar'

function products() {
  return (
      <div className="container flex flex-row">
            <Sidebar/>
            <div className=" ">
                <Searchbar/>
                <Product/>
            </div>     
      </div>
  )
}

export default products