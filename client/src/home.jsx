import {useNavigate, Link} from 'react-router-dom'
import useLogout from './hooks/useLogout'
import Layout from './components/Layout'
const Home = () => {
  const navigate = useNavigate()
  const logout = useLogout()
  const signOut = async() => {
    await logout()
    navigate('/home', {replace: true})
  }
  return (
  <>
      <Layout>
      <div>Home with Logout</div>
      <button onClick={signOut}>Logout</button>
      </Layout>
  </>
  )
}

export default Home