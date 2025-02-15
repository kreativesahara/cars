import {useNavigate} from 'react-router-dom'
import useLogout from '../../hooks/useLogout'
const btnLogout = () => {
  const navigate = useNavigate()
  const logout = useLogout()
  const signOut = async() => {
    await logout()
    navigate('/home', {replace: true})
  }
  return (      
      <button className='hover:bg-black text-white p-2 px-4 rounded-md' onClick={signOut}>LogOut?</button>
  )
}

export default btnLogout