import Layout from './components/Layout'
import Header from './components/header'
import Search from './components/forms/search'
import Newsletter from './components/newsletter'

function home() {
  return (
    <Layout>
        <Header />
        <Search />
        {/* <Newsletter /> */}
    </Layout>      
  )
}

export default home