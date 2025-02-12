import { useNavigate } from 'react-router-dom'

function btnBeSeller() {
    const navigate = useNavigate()
    const UpgradeUser = async () => {
        navigate('/upgrade', { replace: true })
    }
  return (
      <button className='bg-gray-950 text-white rounded-md  px-3 md:px-4 py-2 text-sm font-medium hover:bg-gray-800 transition duration-300' onClick={UpgradeUser}>
          Become a Seller
      </button>
  )
}

export default btnBeSeller