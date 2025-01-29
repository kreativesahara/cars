import { useNavigate } from 'react-router-dom'

function btnUpload() {
    const navigate = useNavigate()
    const addProduct = async () => {
        navigate('/upload', { replace: true })
    }
  return (
      <button className='bg-primary-500 text-primary-50 rounded-md px-4 py-2 text-sm font-medium' onClick={addProduct}>
          Upload Product
      </button>
  )
}

export default btnUpload