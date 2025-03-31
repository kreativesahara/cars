import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom'
import Layout from "../components/Layout";
import useAuth from "../hooks/useAuth";
import BtnUpload from "../components/button/btnUpload";
import { useProductContext } from "../context/ProductProvider";
import BtnBeSeller from "../components/button/btnBeSeller";
import BtnBeMember from "../components/button/btnBeMember";
import { axiosPrivate } from "../api/axios";
import SubscriptionDetailsCard from  "../components/cards/subscriptionDetailsCard"

function App() {
  const { auth } = useAuth();
  const navigate = useNavigate()
  const { products } = useProductContext();
  const [product, setProduct] = useState(null);
  const Seller = auth?.id;
  //const SubscriptionId = auth?.subscriptionId
 
  console.log('User ID:',auth);
  console.log('products context:', products);

  useEffect(() => {
    if (!Array.isArray(products) || products.length === 0) {
      console.log('Products array is empty or not yet loaded.');
      setProduct(null);
      return; // Skip the filter if no products.
    }
    const findProducts = products.filter((p) => p.sellerId === Number(Seller));
    if (findProducts) {
      setProduct(findProducts);
    } else {
      console.error('no product found');
    }
  }, [products, Seller])

  useEffect(()=>{
    console.log('configure Subscription ID...')
    //Substitute with user subscription_id.
    // const foundSubscriber = subscription.find((s) =>s.id === Number(subscriptionId))
      console.log('Authenticated user ID:',auth.id)
  })



  const handleDelete = async (productId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this product?");
      if (!confirmDelete) return;
      const response = await axiosPrivate.delete(`products/${productId}`);
      console.log("Product to be deleted:", response);
      if (response.status === 200) {
        setProduct(prevProducts => prevProducts.filter(product => product.id !== productId));
        navigate('/dashboard', { replace: true })
        alert("Product deleted successfully.");
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Failed to delete product. Please try again.");
    }
  };
  // Render content based on fetched bills
  return (
    <Layout>
      <main className="mt-10 md:mx-8 min-w-[380px]">
        <div>
          <div className='w-full bg-white shadow rounded-lg p-2 flex flex-col gap-4'>
            <div className=' font-semibold text-center'>
              <h3 className='text-2xl md:text-4xl font-title  text-neutral-950'>Your Dashboard</h3>
            </div>
            <div className='p-2 bg-neutral-50 rounded-md flex flex-col gap-2'>
              <h2 className='text-lg font-medium text-neutral-950'>User's Details</h2>
              <p className='text-sm text-neutral-600'>User's Name: {auth?.lastname + " " + auth?.firstname}</p>
              <p className='text-sm text-neutral-600'>Your Email: {auth?.email}</p>
            </div>
            <SubscriptionDetailsCard/>
            <section className=' productsListing flex flex-col gap-4 '>
              {auth?.roles === 3 &&
                <div className='md:p-4 bg-neutral-50 rounded-md  gap-4 '>
                  <div className="flex justify-around md:justify-between items-center pt-3">
                    <h2 className='md:text-lg font-medium text-neutral-950 '>Uploaded Product</h2>
                    <BtnUpload />
                  </div>
                 
                    <div className="max-w-max " >
                      {!product ? <p className='text-sm text-neutral-600'>No Product Uploaded</p> :
                        (<ul >{product.map((vehicle) =>                          
                          <li key={vehicle.id}>
                            <Link  className="md:flex p-2 rounded-md bg-slate-200 m-4 gap-4" to={`/itempage/${vehicle.slug}`}>
                            <img
                              src={vehicle.images[0]}
                              alt={`Missing Image for ${vehicle.id}`}
                              className='font-serif text-xs md:w-[150px]  md:h-[120px] rounded-md place-content-center j object-cover'
                            />
                            <div className=" mx-auto md:w-[100vw] pt-4">
                              <p className='text-sm text-neutral-950 font-medium'>Make : {vehicle.make}</p>
                              <p className='text-sm text-neutral-600'>Model : {vehicle.model}</p>
                              <p className='text-sm text-neutral-600'>Year : {vehicle.year}</p>
                              <p className='text-sm text-neutral-600'>Price : {vehicle.price}</p>

                            </div>
                            <div className="py-4 flex flex-col " >
                              <Link to={`/app/${vehicle.id}`} className="bg-black  text-white px-8 rounded-sm py-1.5 mb-2 text-center">Edit</Link>
                              <button onClick={() => handleDelete(vehicle.id)}
                                className="bg-black text-white px-6 rounded-sm py-1.5">Delete</button>
                            </div>
                            </Link>
                          </li>

                        )}
                          
                        </ul>)}
                    </div>
                                 
                </div>}
              {( auth?.roles === 1 || auth?.roles === 2 ) &&
                <div className='md:p-4 bg-neutral-50 rounded-md flex flex-col gap-4'>
                  <div className="flex justify-between items-center">
                    <h2 className='md:text-lg font-medium text-neutral-950'>Get Started</h2>
                    <BtnBeSeller />
                  </div>
                </div>}
              {( auth?.roles === 1 || auth?.roles === 2 ) && <div className='md:p-4 bg-neutral-50 rounded-md flex flex-col gap-4'>
                <div className="flex justify-between items-center">
                  <h2 className='md:text-lg font-medium text-neutral-950'>
                    Become a Pro Member 
                  </h2>
                  <BtnBeMember />
                </div>
                </div>}
            </section>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default App;
