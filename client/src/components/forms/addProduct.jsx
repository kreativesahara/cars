import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import Select from 'react-select';
import useAxiosPrivate from '../../api/useAxiosPrivate';
import imageCompression from 'browser-image-compression';
import useAuth from '../../hooks/useAuth';
import Layout from "../../components/Layout";

function AddProduct() {
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  
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

  // State for react-select components
  const [makeSelectValue, setMakeSelectValue] = useState(null);
  const [modelSelectValue, setModelSelectValue] = useState(null);
  const [makeOptions, setMakeOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
  const from = location.state?.from?.pathname || "/product";


  // Fetch makes and models from the API on component mount
  useEffect(() => {
    async function fetchVehicleData() {
      try {
        const response = await fetch(
          'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?limit=100'
        );
        const data = await response.json();
        const results = data.results || [];
        // Extract unique makes and models from the API response
        const uniqueMakes = Array.from(new Set(results.map(item => item.make)));
        const uniqueModels = Array.from(new Set(results.map(item => item.model)));

        // Define a custom object for missing makes and models
        const additionalItems = {
          makes: ['Chevrolet', 'Mercedes', 'Audi'], // Custom makes that might be missing
          models: ['Accord LX', 'Mustang GT', 'A4', 'Premio', 'C200'] // Custom models that might be missing
        };

        // Merge API data with additional custom items
        const mergedMakes = Array.from(new Set([...uniqueMakes, ...additionalItems.makes]));
        const mergedModels = Array.from(new Set([...uniqueModels, ...additionalItems.models]));

        setMakeOptions(mergedMakes);
        setModelOptions(mergedModels);
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      }
    }
    fetchVehicleData();
  }, []);

  // Prepare react-select options in the required format
  const makeSelectOptions = makeOptions.map(make => ({ value: make, label: make }));
  const modelSelectOptions = modelOptions.map(model => ({ value: model, label: model }));

  // Handlers for react-select changes
  const handleMakeSelectChange = (selectedOption) => {
    setMakeSelectValue(selectedOption);
    setValues(prev => ({
      ...prev,
      make: selectedOption ? selectedOption.value : ''
    }));
  };

  const handleModelSelectChange = (selectedOption) => {
    setModelSelectValue(selectedOption);
    setValues(prev => ({
      ...prev,
      model: selectedOption ? selectedOption.value : ''
    }));
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "mileage" || name === "price") {
      const rawValue = value.replace(/\D/g, "");
      setValues(prev => ({
        ...prev,
        [name]: rawValue,
      }));
    } else {
      setValues(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    // Prevent adding more than 5images
    if (images.length + files.length > 8) {
      alert("You can upload a maximum of 8 images.");
      return;
    }
    const previewUrls = [];
    for (const file of files) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 400,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(file, options);
        setImages(prev => [...prev, compressedFile]);
        previewUrls.push(URL.createObjectURL(compressedFile));
      } catch (error) {
        console.error('Error while compressing image:', error);
        setImages(prev => [...prev, file]);
        previewUrls.push(URL.createObjectURL(file));
      }
    }
    setPreview(previewUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length < 5) {
      alert("You must upload at least 5 images.");
      return;
    }
    if (!images.length) {
      alert('Please select images to upload.');
      return;
    }
    // Create FormData and append all form values and images
    const form = new FormData();
    Object.keys(values).forEach(key => form.append(key, values[key]));
    images.forEach(image => form.append('images', image));
    for (let pair of form.entries()) {
      console.log(pair[0], pair[1]);
    }
    try {
      const response = await axiosPrivate.post('products', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      console.log("Response from product controller:", response.data);
      alert("Car details uploaded successfully");
      // Reset form fields and react-select states
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
        seller_id: auth.id
      });
      setImages([]);
      setPreview([]);
      setMakeSelectValue(null);
      setModelSelectValue(null);
      window.location.href = from, { replace: true }  
    } catch (error) {
      console.error("Error uploading car details:", error.response?.data || error.message);
      alert("Failed to upload car details. Please try again.");
    }
  };

  return (
    <Layout>
      <div className='w-auto min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-16 px-2'>
        <div className="md:w-[600px] mx-auto -mt-6">
          <h1 className="text-4xl font-bold text-center mb-2 pb-6">Upload Vehicle</h1>
          <form onSubmit={handleSubmit} className="w-full bg-white rounded-xl p-4 md:p-6 shadow-lg">
            <div>
              <label className="text-sm text-neutral-900 mb-1">User ID</label>
              <input
                name="seller_id"
                onChange={handleChange}
                type="number"
                className="w-full border border-neutral-300 rounded-md p-2 text-neutral-900"
                required
                value={auth.id}
                disabled
              />
            </div>

            {/* Vehicle Make using react-select */}
            <div>
              <label htmlFor="make" className="block text-sm text-neutral-900 mb-1">Vehicle Make</label>
              <Select
                name="make"
                value={makeSelectValue}
                onChange={handleMakeSelectChange}
                options={makeSelectOptions}
                placeholder="Select or search vehicle make"
                isClearable
              />
            </div>

            {/* Vehicle Model using react-select */}
            <div className="mt-4">
              <label htmlFor="model" className="block text-sm text-neutral-900 mb-1">Vehicle Model</label>
              <Select
                name="model"
                value={modelSelectValue}
                onChange={handleModelSelectChange}
                options={modelSelectOptions}
                placeholder="Select or search vehicle model"
                isClearable
              />
            </div>

            {[
              {
                label: "Fuel Type",
                name: "fuel_type",
                options: ["Petrol", "Diesel", "Hybrid", "Electric"],
              },
              {
                label: "Transmission",
                name: "transmission",
                options: ["Automatic", "Manual", "CVT"],
              },
              {
                label: "Car Condition",
                name: "condition",
                options: ["New", "Used", "Reconditioned", "Certified Pre-Owned"],
              },
              {
                label: "Driving System",
                name: "driveSystem",
                options: ["2WD", "4WD", "AWD"],
              },
            ].map(field => (
              <div key={field.name} className="mt-4">
                <label htmlFor={field.name} className="block text-sm text-neutral-900 mb-1">{field.label}</label>
                <select
                  name={field.name}
                  onChange={handleChange}
                  required
                  value={values[field.name]}
                  className="block w-full border border-neutral-300 rounded-md p-2 text-neutral-900"
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            ))}

            {[
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
                label: "Location",
                name: "location",
                type: "text",
                placeholder: "Enter Location",
                value: values.location,
              },
            ].map(field => (
              <div key={field.name} className="mt-4">
                <label htmlFor={field.name} className="block text-sm text-neutral-900 mb-1">{field.label}</label>
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

            <div className="mt-4">
              <label className="block text-sm text-neutral-900 mb-1">Mileage</label>
              <input
                name="mileage"
                onChange={handleChange}
                type="text"
                placeholder="Enter Mileage in KM"
                required
                value={values.mileage ? Number(values.mileage).toLocaleString() : ""}
                className="block w-full border border-neutral-300 rounded-md p-2 text-neutral-900"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm text-neutral-900 mb-1">Price</label>
              <input
                name="price"
                onChange={handleChange}
                type="text"
                placeholder="Enter Price"
                required
                value={values.price ? Number(values.price).toLocaleString() : ""}
                className="block w-full border border-neutral-300 rounded-md p-2 text-neutral-900"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="features" className="block text-sm text-neutral-900 mb-1">Features Description</label>
              <textarea
                name="features"
                onChange={handleChange}
                className="block w-full border border-neutral-300 rounded-md p-2 text-neutral-900"
                placeholder="Describe the features of the Vehicle"
                required
                value={values.features}
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm text-neutral-900 mb-1">Upload Images</label>
              <div className="relative group h-64 w-full mb-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors duration-300 flex items-center justify-center overflow-hidden">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  disabled={images.length >= 6}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  required
                />
                <div className="flex flex-col items-center justify-center transform group-hover:scale-95 transition-transform duration-300">
                  <span className="material-symbols-outlined text-5xl text-gray-400 group-hover:text-blue-500 mb-2">
                    add_photo_alternate
                  </span>
                  <p className="text-sm text-gray-500">Drag and drop your image here</p>
                  <p className="text-xs text-gray-400 mt-1">or click to browse</p>
                  {preview.length > 0 && (
                    <div className="flex w-auto gap-3 mt-4">
                      {preview.map((src, index) => (
                        <img key={index} src={src} alt={`Preview ${index + 1}`} className="h-[80px] w-[80px] rounded-md object-cover" />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button type="submit" className="bg-black text-white rounded-md px-4 mt-4 py-2 text-sm w-full">
              Listing
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default AddProduct;
