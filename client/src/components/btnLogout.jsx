import {useNavigate, Link} from 'react-router-dom'
import useLogout from '../hooks/useLogout'
const Home = () => {
  const navigate = useNavigate()
  const logout = useLogout()
  const signOut = async() => {
    await logout()
    navigate('/home', {replace: true})
  }
  return (      
    <button className='bg-black text-white p-3 rounded-md' onClick={signOut}>Logout</button>
  )
}

export default Home