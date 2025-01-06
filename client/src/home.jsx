import {useNavigate, Link} from 'react-router-dom'
import useLogout from './hooks/useLogout'
const Home = () => {
  const navigate = useNavigate()
  const logout = useLogout()
  const signOut = async() => {
    await logout()
    navigate('/product', {replace: true})
  }
  return (
  <>
      <div>Home with Logout</div>
      <button onClick={signOut}>Logout</button>
  </>
  )
}

export default Home