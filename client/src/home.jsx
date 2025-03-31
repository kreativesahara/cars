import React, { useState } from 'react'
import Layout from './components/Layout'
import Header from './components/header'
import Search from './components/forms/search'

function home() {
  const [products, setProducts] = useState([]);
  return (
    <Layout>
      <Header />
      {/* <Search  /> */}
      {/* <Newsletter /> */}
    </Layout>
  )
}

export default home