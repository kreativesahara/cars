import React, { useState } from 'react';
import axios from 'axios';
import imageCompression from 'browser-image-compression';

const UploadListing = () => {
    const [values, setValues] = useState({
        make: '',
        model: '',
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
 
        // Log form data to inspect what's being sent
        for (let pair of form.entries()) {
            console.log(pair[0], pair[1]);
        }
        try {
            // Send data without manually setting Content-Type header
            const response = await axios.post('http://localhost:3100/testupload', form, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true, 
            });

            console.log("Response:", response.data);
            alert("Car details uploaded successfully");
            // Reset form fields
            setValues({
                make: '',
                model: '',
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
                </div>
                <button type='submit'>Add all Listing</button>
            </form>
        </div>
    );
};

export default UploadListing;
