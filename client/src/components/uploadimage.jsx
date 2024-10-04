import React from 'react'
import { useState } from 'react';
//import axios from 'axios'
import '../output.css'

function uploadimage() {
  const [image, setImage] = useState({
    image: ''
  })
  const handleChange = (e) => {
    setImage((prev) => ({
      ...prev, [e.target.name]: e.target.value
    }))
    console.log(e.target.files[0]);
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      await axios.post('http://localhost:3100/image', formData,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: false
        },
      );
      formData.append('image', e.target[0].files[0]);
      console.log(formData);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
    <form onSubmit={handleSubmit}>
        <label>Upload an Image</label>
        <input type="file" onChange={handleChange} required/>
        <button type='submit'>Upload</button>
    </form> 
    </>
  )
}

export default uploadimage