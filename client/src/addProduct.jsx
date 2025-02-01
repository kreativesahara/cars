import React, { useState } from 'react';
import useAxiosPrivate from './api/useAxiosPrivate';
import imageCompression from 'browser-image-compression';
import useAuth from './hooks/useAuth';
import Layout from "./components/Layout"

function addProduct() {
  const axiosPrivate = useAxiosPrivate();
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
      const response = await axiosPrivate.post('products', form, {
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
  }
  return (
    <Layout>
      <div className="w-auto min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-16 px-2">
        <div className="w-[600px] mx-auto place-content-center">
          <h1 className="text-4xl font-bold text-center mb-2 pb-6">Upload Vehicle</h1>
          <form onSubmit={handleSubmit} className=" w-full bg-white rounded-xl p-6 shadow-lg">
        <div>
          <label className="block text-sm text-neutral-900 mb-1">
            User ID
          </label>
    
        </div>
        <div>
          {/* <input
            type="file"
            name="image"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="block borderw-[750px] h-[200px] w-full border-slate-700 bg-amber-200 rounded-md p-2 text-neutral-900"
            required
          /> */}
              <input
                name="seller_id"
                onChange={handleChange}
                type="number"
                className="block w-full border border-neutral-300 rounded-md p-2 text-neutral-900"
                required
                value={auth.id}
                disabled
              />
              <label className="block text-sm text-neutral-900 mb-1">
                Upload Images
              </label>
              {/* /////////////////////////// */}
              {/* <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"> */}
              <div className="relative group h-64 w-full mb-4 border-2  border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors duration-300 flex items-center justify-center overflow-hidden">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="flex flex-col items-center justify-center transform group-hover:scale-95 transition-transform duration-300">
                  <span className="material-symbols-outlined text-5xl text-gray-400 group-hover:text-blue-500 mb-2">
                    add_photo_alternate
                  </span>
                  <p className="text-sm text-gray-500">
                    Drag and drop your image here
                  </p>
                  <p className="text-xs text-gray-400 mt-1">or click to browse</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Upload limits</p>
                  <span className="text-xs text-gray-500">Max size: 5MB</span>
                </div>

                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-blue-500 rounded-full transform transition-all duration-500 hover:w-1/2" />
                </div>
              </div>
              {/* </div> */}
              {/* /////////////////////////// */}
          {preview.length > 0 && (
            <div className="flex  w-auto gap-3 mt-4">
              {preview.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Preview ${index + 1}`}
                  className="h-[80px] w-[80px] rounded-md object-cover"
                />
              ))}
            </div>
          )}
        </div>
        
        {[      
          {
            label: "Vehicle Make",
            name: "make",
            type: "text",
            placeholder: "Enter Vehicle Make",
            value: values.make,
          },
          {
            label: "Vehicle Model",
            name: "model",
            type: "text",
            placeholder: "Enter Vehicle Model",
            value: values.model,
          },
          {
            label: "Year of Manufacture",
            name: "year",
            type: "number",
            placeholder: "Enter Year of Manufacture",
            value: values.year,
          },
          {
            label: "Engine Capacity CC",
            name: "engine_capacity",
            type: "number",
            placeholder: "Enter Engine Capacity",
            value: values.engine_capacity,
          },
          {
            label: "Fuel Type",
            name: "fuel_type",
            type: "text",
            placeholder: "Enter Fuel Type i.e., Diesel",
            value: values.fuel_type,
          },
          {
            label: "Transmission",
            name: "transmission",
            type: "text",
            placeholder: "Enter Transmission i.e., Manual",
            value: values.transmission,
          },
          {
            label: "Driving System",
            name: "driveSystem",
            type: "text",
            placeholder: "Enter Drive System i.e., 2WD",
            value: values.driveSystem,
          },
          {
            label: "Mileage",
            name: "mileage",
            type: "number",
            placeholder: "Enter Mileage in KM",
            value: values.mileage,
          },
          {
            label: "Car Condition",
            name: "condition",
            type: "text",
            placeholder: "Car Condition",
            value: values.condition,
          },
          {
            label: "Location",
            name: "location",
            type: "text",
            placeholder: "Enter Location",
            value: values.location,
          },
          {
            label: "Price",
            name: "price",
            type: "number",
            placeholder: "Enter Price",
            value: values.price,
          },
        ].map((field) => (
          <div key={field.name}>
            <label
              htmlFor={field.name}
              className="block text-sm text-neutral-900 mb-1"
            >
              {field.label}
            </label>
            <input
              name={field.name}
              onChange={handleChange}
              type={field.type}
              placeholder={field.placeholder}
              required
              value={field.value}
              className="block w-full border border-neutral-300 rounded-md p-2 text-neutral-900"
            />
          </div>
        ))}
        <div>
          <label
            htmlFor="features"
            className="block text-sm text-neutral-900 mb-1"
          >
            Features Description
          </label>
          <textarea
            name="features"
            onChange={handleChange}
            className="block w-full border border-neutral-300 rounded-md p-2 text-neutral-900"
            placeholder="Describe the features of the Vehicle"
            required
            value={values.features}
          />
        </div>
        <button
          type="submit"
          className="bg-primary-500 text-primary-50 rounded-md px-4 py-2 text-sm w-full"
        >
          Listing
        </button>
      </form>
      </div>
      </div>
    </Layout>
  )
}

export default addProduct