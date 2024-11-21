import React, { useState } from 'react';
import axios from '../../api/axios';

const carId = 55;

const UploadListing = () => {
    const [values, setValues] = useState({
        make: '',
        model: '',
        year: '',
        engine_capacity: '',
        fuel_type: '',
        transmission: '',
        driveSystem: '',
        mileage: '',
        features: '',
        condition: '',
        location: '',
        price: '',
    });

    const [images, setImages] = useState([]);

    const handleChange = (e) => {
        setValues((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

   
    const handleImageChange = (e) => {
        setImages(Array.from(e.target.files));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const form = new FormData();
            // Append all form fields
           const data =  Object.keys(values).forEach((key) => form.append(key, values[key]));
            // Append images to form data

            //TODO: 
            // images.forEach((image, index) => {
            //     form.append(`images`, image); // You can customize the key for each image
            // });

            // Post data to backend
            const response = await axios.post('http://localhost:3100/upload',
                form,
                {
                    //Requires multipart/form-data to set data for api post request
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                },
            );

            console.log("Response:", response);
            console.log("Values:", values)
            alert("Car details uploaded successfully");

            // Reset form fields
            setValues({
                make: '',
                model: '',
                year: '',
                engine_capacity: '',
                fuel_type: '',
                transmission: '',
                driveSystem: '',
                mileage: '',
                features: '',
                condition: '',
                location: '',
                price: '',
            });
            setImages([]);

        } catch (error) {
            console.error("Error uploading car details:", error);
            alert("Failed to upload car details. Please try again.");
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Upload Images:</label>
                    <input
                        type="file"
                        name="image"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />

                    <label>Vehicle Make</label>
                    <input
                        name='make'
                        onChange={handleChange}
                        type='text'
                        placeholder='Enter Vehicle Make'
                        required
                        value={values.make}
                    />

                    <label>Vehicle Model</label>
                    <input
                        name='model'
                        onChange={handleChange}
                        type='text'
                        placeholder='Enter Vehicle Model'
                        required
                        value={values.model}
                    />

                    <label>Year of Manufacture</label>
                    <input
                        name='year'
                        onChange={handleChange}
                        type='number'
                        placeholder='Enter Year of Manufacture'
                        required
                        value={values.year}
                    />

                    <label>Engine Capacity CC</label>
                    <input
                        name='engine_capacity'
                        onChange={handleChange}
                        type='number'
                        placeholder='Enter Engine Capacity'
                        required
                        value={values.engine_capacity}
                    />

                    <label>Fuel Type</label>
                    <input
                        name='fuel_type'
                        onChange={handleChange}
                        type='text'
                        placeholder='Enter Fuel Type i.e., Diesel'
                        required
                        value={values.fuel_type}
                    />

                    <label>Transmission</label>
                    <input
                        name='transmission'
                        onChange={handleChange}
                        type='text'
                        placeholder='Enter Transmission i.e., Manual'
                        required
                        value={values.transmission}
                    />

                    <label>Driving System</label>
                    <input
                        name='driveSystem'
                        onChange={handleChange}
                        type='text'
                        placeholder='Enter Drive System i.e., 2WD'
                        required
                        value={values.driveSystem}
                    />

                    <label>Mileage</label>
                    <input
                        name='mileage'
                        onChange={handleChange}
                        type='number'
                        placeholder='Enter Mileage in KM'
                        required
                        value={values.mileage}
                    />

                    <label>Car Condition</label>
                    <input
                        name='condition'
                        onChange={handleChange}
                        type='text'
                        placeholder='Car Condition'
                        required
                        value={values.condition}
                    />

                    <label>Location</label>
                    <input
                        name='location'
                        onChange={handleChange}
                        type='text'
                        placeholder='Enter Location'
                        required
                        value={values.location}
                    />

                    <label>Price</label>
                    <input
                        name='price'
                        onChange={handleChange}
                        type='number'
                        placeholder='Enter Price'
                        required
                        value={values.price}
                    />

                    <label>Features Description</label>
                    <textarea
                        name='features'
                        onChange={handleChange}
                        className="description text-sm font-normal font-sans pb-12 shadow-lg shadow-slate-100 rounded-none focus:shadow-outline-purple border border-slate-300 focus:border-blue-500 text-slate-900 focus-visible:outline-0 box-border"
                        placeholder="Describe the features of the Vehicle"
                        required
                        value={values.features}
                    /> 
                </div> 
                <button type='submit'>
                    Add all Listing
                </button>
            </form>
        </div>
    );
}

export default UploadListing;
