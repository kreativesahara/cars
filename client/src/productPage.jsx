import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import UploadListing from './components/uploadListing'
const productPage = () => {
    const [products, setProducts] = useState([]); // State for fetched users
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        const fetchAllProducts = async () => {
            setIsLoading(true); // Set loading state to true
            setError(null); // Clear any previous errors

            try {
                const response = await axios.get('http://localhost:3100/products'); // Assuming endpoint returns users
                setProducts(response.data); // Update users state
                console.log(response.data);
            } catch (error) {
                setError(error); // Set error state for handling
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
          {products.length > 0 ? (
              <table >
                  <thead>
                      <tr className='bg-red-500'>
                          <th>Vehicle ID</th>
                          <th>Vehicle Make</th>
                          <th>vehicle Model</th>
                          <th>Vehicle Year</th>
                          <th>Vehicle Location</th>
                      </tr>
                  </thead>
                  <tbody>
                      {products.map((product) => (
                          <tr key={product.id}>
                              <td>{product.id}</td>
                              <td>{product.make}</td>
                              <td>{product.model}</td>
                              <td>{product.year}</td>
                              <td>{product.location}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          ) : (
              <div>No products found.</div>
          )}
        <UploadListing/>
    </div>
  )
}

export default productPage
