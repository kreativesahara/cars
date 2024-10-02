import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import UploadUserDetails from './components/uploadUserDetails';
import './App.css'; // Import for styling

function App() {
  const [users, setUsers] = useState([]); // State for fetched users
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchAllUsers = async () => {
      setIsLoading(true); // Set loading state to true
      setError(null); // Clear any previous errors

      try {
        const response = await axios.get('http://localhost:3100/users'); // Assuming endpoint returns users
        setUsers(response.data); // Update users state
        console.log(response.data);
      } catch (error) {
        setError(error); // Set error state for handling
      } finally {
        setIsLoading(false); // Set loading state to false after fetch (success or error)
      }
    };

    fetchAllUsers();
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
    <>
      {users.length > 0 ? (
        <table >
          <thead>
            <tr className='bg-red-500'>
              <th>User ID</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.user_id}>
                <td>{user.user_id}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>         
        </table>
      ) : (
        <div>Not a User found.</div>
      )}
      <UploadUserDetails /> {/* Upload user details form */}
      <Outlet /> {/* Allow nested routes */}
    </>
  );
}

export default App;
