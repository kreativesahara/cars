import Layout from '../../components/Layout'
import React, {useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';
import { useProductContext } from '../../context/ProductProvider';
function Itempage() {
  const { productId } = useParams();
  const { products } = useProductContext();
  const [product, setProduct] = useState({});

  console.log(productId)

  useEffect(() => {
    // Find the specific product in the global state based on the ID
    const foundProduct = products.find((p) => p._id === productId) || {};
    setProduct(foundProduct);
  }, [productId, products]);

  return (
    <Layout>
      { product? (
        <div className=' container sm:flex-row lg:flex py-6'>
           <div className='lg:w-6/12 flex-col border-2 px-2 py-2'>
              <div className='h-min cursor-pointer'>
                <img className='md:px-2 w-full h-96 lg:h-screen sm:object-cover' src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=720&q=60'alt='item'/>
              </div>
              <div className=' grid grid-cols-4 py-2 px-1 rounded-b gap-2 cursor-pointer'>
                <img className='border-2 rounded  hover:border-blue-600 w-full object-cover ' src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' alt='item' />
                <img className='border-2 rounded hover:border-blue-600 w-full object-cover' src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' alt='item'/>
                <img className='border-2 rounded hover:border-blue-600 w-full object-cover' src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' alt='item'/>
                <img className='border-2 rounded hover:border-blue-600 w-full object-cover' src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' alt='item'/>
              </div>
              <div className='h-40 p-3'>
                <div className='flex justify-between'>
                  <span className='flex-col'>
                      <h3 className='font-bold uppercase text-2xl'>{product.name}</h3>
                      <p className='tracking-widest text-md'>{product.category}</p>
                    </span>
                    <strong className='font-black tracking-wider text-2xl '>KSH {product.price}</strong>
                </div>
                <ul className='p-1 grid grid-cols-2 font-semibold justify-between'>
                  <li className='text-md py-2'>
                    <span>Brand: {product.brand}</span>
                  </li>
                  <li className='text-md py-2'>
                    <span>Location: {product.location}</span>
                  </li>
                  <li className='text-md py-2'>
                    <span className='card-item-text'> Manufactered: {product.year}</span>
                  </li>
                </ul>
              </div>
              <h3 className='px-4 py-2 font-bold text-xl'>
                Product Description
              </h3>
              <p className=' px-4 text-justify'>
              {product.description}
              </p>
           </div>
           
           <div className='w-100 lg:w-1/3 p-4 mx-auto flex flex-col gap-3 '>
              <button className='bg-blue-500 hover:bg-blue-800 text-white w-100 py-2 tracking-widest font-black'>Call Seller</button>
              <button className='bg-green-500 hover:bg-green-800 text-white w-100 py-2 tracking-wider font-bold'>Message Seller</button>
              <div  className='border shadow-lg  h-min p-4'>
                <h3 className='text-sm font-bold uppercase'>Seller Details</h3>
                <div className='flex p-2 pt-8'>
                  <img className='w-20 h-20 rounded-full object-cover' src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=720&q=60' alt=''/>
                  <span className='ml-4 my-auto'>
                    <p className='uppercase font-semibold'>Kiogora Mwongera</p>
                    <p className='tracking-widest'>Kajiado, Ngong</p>
                  </span>
                </div>
              </div>
              <div className='border shadow-lg p-2'>
                  <h3 className='py-3 uppercase -tracking-widertext-sm font-bold'>Related Products</h3>
                  <ul className='grid grid-cols-3 w-100 cursor-pointer  gap-0.5'>
                    <li>
                      <img className='p-2 hover:border-2 hover:border-blue-600 rounded object-cover' src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=720&q=60' alt=''/>
                    </li>
                    <li>
                      <img className='p-2 hover:border-2 hover:border-blue-600 rounded object-cover' src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=720&q=60' alt=''/>
                    </li>
                    <li>
                      <img className='rounded p-2 hover:border-2 hover:border-blue-600 object-cover' src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=720&q=60' alt=''/>
                    </li>
                    <li>
                      <img className='p-2 hover:border-2 hover:border-blue-600 rounded object-cover' src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=720&q=60' alt=''/>
                    </li>
                  </ul>
              </div>
           </div>    
        </div>
       ):(
        <div className='container text-center p-48'>loading...</div>
       )}    
    </Layout>
  )
}

export default Itempage