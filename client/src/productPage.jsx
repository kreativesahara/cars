import React from 'react'
import { axiosPrivate } from './api/axios';
import useAuth from './hooks/useAuth';
import { useState, useEffect } from 'react';
import Users from './users';
import UploadForm from './components/forms/uploadForm'

const productPage = () => {
    const { auth } = useAuth();
    const [products, setProducts] = useState([]); // State for fetched users
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {       
        const fetchAllProducts = async () => {
            setIsLoading(true); // Set loading state to true
            setError(null); // Clear any previous errors 
            try {
                const response = await axiosPrivate.get('products'); // Assuming endpoint returns users
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
    console.log(auth.email);
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
        <div>
            <h2>Welcome, {auth?.email || "User"}!</h2>
            <p>You are logged in as: {auth?.email}</p>
        </div>
        <Users/>
        {products.length > 0 ? (
            <table >
                <thead>
                    <tr className='bg-red-500'>
                        <th>Vehicle ID</th>
                        <th>Vehicle Make</th>
                        <th>vehicle Model</th>
                        <th>Vehicle Image</th>
                        <th>Vehicle Location</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.make}</td>
                            <td>{product.model}</td>
                            <td>{product.image_url}</td>
                            <td>{product.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            <div>No vehicle found.</div>
        )}
        <UploadForm/>
    </div>
  )
}

export default productPage
