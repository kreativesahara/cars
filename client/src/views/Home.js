import React from 'react'
import Layout from '../components/Layout'
import Header from '../components/header'
import Newsletter from '../components/newsletter/newsletter'

function Home() {
  return (
    <>
        <Layout>
            <Header />
            <Newsletter />
        </Layout>
    </>
  )
}

export default Home