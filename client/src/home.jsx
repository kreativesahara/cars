import Layout from './components/Layout'
import Header from './components/header'
import Newsletter from './components/newsletter'

function home() {
  return (
    <Layout>
        <Header />
        <Newsletter />
    </Layout>      
  )
}

export default home