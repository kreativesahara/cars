import React from 'react'
import {axiosPrivate} from './api/axios';
import useRefreshToken from './hooks/useRefreshToken';
import { useState, useEffect, useNavigate, useLocation} from 'react';
import TestProductUpload from './components/forms/testProductUpload'


const productPage = () => {
    const [products, setProducts] = useState([]); // State for fetched products
    const refresh = useRefreshToken
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator
    const [error, setError] = useState(null); // State for error handling
    //const [Navigate]= useNavigate();
    //const [Location]= useLocation();
    useEffect(() => {
        const fetchAllProducts = async () => {
            setIsLoading(true); // Set loading state to true
            // Clear any previous errors
            setError(null); 
            let mount = true
            const controller = new AbortController();
            try {
                const response = await axiosPrivate.get('testproduct',
                    {signal: controller.signal}
                ); 
                mount &&  setProducts(response.data); 
                console.log('testproduct',response.data);
            } catch (error) {
                setError(error);                
            } finally {
                setIsLoading(Boolean(mount) ? false : false); 
            }
        };
        fetchAllProducts();
        
    }, []); // Empty dependency array to fetch data once on component mount

    // Handle loading and error state conditions
    if (isLoading) {return <div>Loading bills...</div>;}
    if (error) { return <div>Error: {error.message}</div>; }
    
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
          <button onClick={() => refresh()}>Refresh</button>
        <TestProductUpload/>
    </div>
  )
}

export default productPage
