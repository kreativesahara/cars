import React, { useState } from 'react';
import axios from '../../api/axios';
import imageCompression from 'browser-image-compression';
import '../lists/uploadlist.css';

const carId = 55;
function UploadImage() {
  const [values, setValues] = useState({ car_id: carId });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');

  const handleChange = async (e) => {
    const file = e.target.files[0];
    console.log("Stagged image File: ",file)
    if (file) {
      // Optional: Compress the image before setting it to state
      const options = {
        maxSizeMB: 1,          // Maximum size in MB
        maxWidthOrHeight: 1024, // Max width or height
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(file, options);
        setImage(compressedFile);
        setPreview(URL.createObjectURL(compressedFile));
      } catch (error) {
        console.error('Error while compressing image:', error);
        setImage(file);
        setPreview(URL.createObjectURL(file));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert('Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('car_id', carId);

    console.log('Form Data: ',formData);
    try {
      await axios.post('image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      alert('Image uploaded successfully!');
      setImage(null);
      setPreview('');
    } catch (error) {
      console.error(error);
      alert('Image upload failed!');
    }
  };

  return (
    <div className="upload-container">
      <form onSubmit={handleSubmit} className="upload-form" >
        <label htmlFor="image-upload" className="upload-label">
          Upload an Image
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleChange}
          required
          className="upload-input"
        />
        {preview && (
          <div className="image-preview-container">
            <img src={preview} alt="Preview" className="image-preview" />
          </div>
        )}
        <button type="submit" className="upload-button">
          Upload
        </button>
      </form>
    </div>
  );
}

export default UploadImage;
