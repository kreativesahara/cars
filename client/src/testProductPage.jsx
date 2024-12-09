import React from 'react'
import axiosPrivate from './api/axios';
import useAuth from './hooks/useAuth';
import { useState, useEffect, useNavigate, useLocation} from 'react';
import TestProductUpload from './components/forms/testProductUpload'


const productPage = () => {
    const { auth } = useAuth();
    const [products, setProducts] = useState([]); // State for fetched users
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator
    const [error, setError] = useState(null); // State for error handling
    const [Navigate]= useNavigate();
    const [Location]= useLocation();
    useEffect(() => {
        const fetchAllProducts = async () => {
            setIsLoading(true); // Set loading state to true
            setError(null); // Clear any previous errors

            try {
                let mount = true
                const controller = new AbortController();
                const response = await axiosPrivate.get('testproduct',
                    {
                        signal: controller.signal
                    }
                ); // Assuming endpoint returns users
                
                mount && setProducts(response.data); // Update users state
                //console.log(response.data);
            } catch (error) {
                setError(error); // Set error state for handling                
                Navigate('/login', { state: { from: Location }, replace: true })                
            } finally {
                setIsLoading(false); // Set loading state to false after fetch (success or error)
            }
        };

        fetchAllProducts();
    }, []); // Empty dependency array to fetch data once on component mount

    // Handle loading and error states conditionally
    if (isLoading) {
        return <div>Loading bills...</div>; // Display loading indicator
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Display error message
    }

    // Render content based on fetched bills
    return (
    <div>
          <h1>Test Product Page</h1>
          
          {products.length > 0 ? (
              <table >
                  <thead>
                      <tr className='bg-red-500'>
                          <th>Vehicle ID</th>
                          <th>Vehicle Make</th>
                          <th>vehicle Model</th>
                          <th>Vehicle image</th>
                      </tr>
                  </thead>
                  <tbody>
                      {products.map((product) => (
                          <tr key={product.id}>
                              <td>{product.id}</td>
                              <td>{product.make}</td>
                              <td>{product.model}</td>
                              <td>{product.image_url}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          ) : (
              <div>No products found.</div>
          )}
        <TestProductUpload/>
    </div>
  )
}

export default productPage
