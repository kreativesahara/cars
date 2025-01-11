import React, { useState } from 'react';
import axios from '../../api/axios';
import imageCompression from 'browser-image-compression';
import useAuth from '../../hooks/useAuth';

const UploadListing = () => {
    const { auth } = useAuth();
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
        seller_id: auth.id
    });
    
    const [images, setImages] = useState([]);
    const [preview, setPreview] = useState([]);

    const handleChange = (e) => {
        setValues((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }),
            // console.log(values)
        );
    };

    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files);
        const previewUrls = [];

        for (const file of files) {
            const options = {
                maxSizeMB: 1,          // Maximum size in MB
                maxWidthOrHeight: 400, // Max width or height
                useWebWorker: true,
            };
            try {
                const compressedFile = await imageCompression(file, options);
                setImages((prev) => [...prev, compressedFile]);
                previewUrls.push(URL.createObjectURL(compressedFile));
            } catch (error) {
                console.error('Error while compressing image:', error);
                setImages((prev) => [...prev, file]); // Use original image if compression fails
                previewUrls.push(URL.createObjectURL(file));
            }
        }

        setPreview(previewUrls);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!images.length) {
            alert('Please select images to upload.');
            return;
        }
        // Create FormData object
        const form = new FormData();
        Object.keys(values).forEach((key) => form.append(key, values[key]));
        images.forEach((image) => {
            form.append('images', image);
        });

        // Logs form data to inspect what's being sent
        for (let pair of form.entries()) {
            console.log(pair[0], pair[1]);
        }
        try {
            // Send data without manually setting Content-Type header
            const response = await axios.post('products', form, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });

            console.log("Response from product controller:", response.data);
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
            setPreview([]);

        } catch (error) {
            console.error("Error uploading car details:", error.response?.data || error.message);
            alert("Failed to upload car details. Please try again.");
        }
    };

    return (
        <div>
            <div>Upload Product</div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>User ID</label>
                    <input
                        name="seller_id"
                        onChange={handleChange}
                        type='number'
                        //placeholder={auth.id}
                        required
                        value={auth.id}
                        disabled
                    />

                    <label>Upload Images:</label>
                    <input
                        type="file"
                        name="image"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                    {preview.length > 0 && (
                        <div>
                            {preview.map((src, index) => (
                                <img key={index} src={src} alt={`Preview ${index + 1}`} />
                            ))}
                        </div>
                    )}

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
                <button type='submit'>Listing</button>
            </form>
        </div>
    );
};

export default UploadListing;
