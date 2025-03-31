import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Select from 'react-select';
import useAxiosPrivate from '../../api/useAxiosPrivate';
import imageCompression from 'browser-image-compression';
import useAuth from '../../hooks/useAuth';
import Layout from '../../components/Layout';

function AddProduct() {
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const { auth } = useAuth();
  const VEHICLES_API_URL = import.meta.env.VITE_VEHICLES_API_URL; 
  const from = location.state?.from?.pathname || "/dashboard";

  const [values, setValues] = useState({
    make: '',
    model: '',
    year: '',
    engineCapacity: '',
    fuelType: '',
    transmission: '',
    driveSystem: '',
    mileage: '',
    features: '',
    condition: '',
    location: '',
    price: '',
    sellerId: auth.id,
  });

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);

  // State for react-select components
  const [makeSelectValue, setMakeSelectValue] = useState(null);
  const [modelSelectValue, setModelSelectValue] = useState(null);
  const [makeOptions, setMakeOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);

  // Fetch makes and models on mount
  useEffect(() => {
    async function fetchVehicleData() {
      try {
        const response = await fetch(VEHICLES_API_URL);
        const data = await response.json();
        const results = data.results || [];
        const uniqueMakes = Array.from(new Set(results.map(item => item.make)));
        const uniqueModels = Array.from(new Set(results.map(item => item.model)));

        const additionalItems = {
          makes: ['Chevrolet', 'Mercedes', 'Audi'],
          models: ['Accord LX', 'Mustang GT', 'A4', 'Premio', 'C200']
        };

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

  // Prepare react-select options
  const makeSelectOptions = makeOptions.map(make => ({ value: make, label: make }));
  const modelSelectOptions = modelOptions.map(model => ({ value: model, label: model }));

  // Handlers for react-select
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

  // Generic input handler (also formats mileage/price)
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

  // Remove image from selection
  const removeImage = (indexToRemove) => {
    setImages(prev => prev.filter((_, i) => i !== indexToRemove));
    setPreview(prev => prev.filter((_, i) => i !== indexToRemove));
  };

  // Handle image change with compression; enforce max 8 images
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 8) {
      alert("You can upload a maximum of 8 images.");
      return;
    }
    const newPreviewUrls = [];
    for (const file of files) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 400,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(file, options);
        setImages(prev => [...prev, compressedFile]);
        newPreviewUrls.push(URL.createObjectURL(compressedFile));
      } catch (error) {
        console.error('Error while compressing image:', error);
        setImages(prev => [...prev, file]);
        newPreviewUrls.push(URL.createObjectURL(file));
      }
    }
    setPreview(prev => [...prev, ...newPreviewUrls]);
  };

  // Handle form submission via axiosPrivate
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
    const form = new FormData();
    console.log("Form data before appending images:", values);
    Object.keys(values).forEach(key => form.append(key, values[key]));
    images.forEach(image => form.append('images', image));
    try {
      const response = await axiosPrivate.post('products', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      console.log("Response from product controller:", response.data);
      alert("Car details uploaded successfully");
      // Reset form
      setValues({
        make: '',
        model: '',
        year: '',
        engineCapacity: '',
        fuelType: '',
        transmission: '',
        driveSystem: '',
        mileage: '',
        features: '',
        condition: '',
        location: '',
        price: '',
        sellerId: auth.id,
      });
      setImages([]);
      setPreview([]);
      setMakeSelectValue(null);
      setModelSelectValue(null);
      window.location.href = from;
    } catch (error) {
      console.error("Error uploading car details:", error.response?.data || error.message);
      alert("Failed to upload car details. Please try again.");
    }
  };

  return (
    <Layout>
      <div id="webcrumbs" className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-16 px-4">
        <div className="max-w-[1024px] mx-auto bg-slate-50 rounded-lg shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Add New Vehicle</h2>
              <button
                type="submit"
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-primary-700 hover:shadow-md transform hover:-translate-y-1 flex items-center gap-2"
              >
                <span className="material-symbols-outlined">add_circle</span>
                Submit Listing
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Vehicle Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                  <input
                    name="sellerId"
                    type="number"
                    value={auth.id}
                    disabled
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Make</label>
                  <Select
                    name="make"
                    value={makeSelectValue}
                    onChange={handleMakeSelectChange}
                    options={makeSelectOptions}
                    placeholder="Select or search vehicle make"
                    isClearable
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Model</label>
                  <Select
                    name="model"
                    value={modelSelectValue}
                    onChange={handleModelSelectChange}
                    options={modelSelectOptions}
                    placeholder="Select or search vehicle model"
                    isClearable
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                    <input
                      name="year"
                      type="number"
                      placeholder="e.g. 2022"
                      onChange={handleChange}
                      value={values.year}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Engine (cc)</label>
                    <input
                      name="engineCapacity"
                      type="number"
                      placeholder="e.g. 2000"
                      onChange={handleChange}
                      value={values.engineCapacity}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
                    <select
                      name="fuelType"
                      onChange={handleChange}
                      value={values.fuelType}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none"
                      required
                    >
                      <option value="">Select Fuel Type</option>
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Electric">Electric</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Transmission</label>
                    <select
                      name="transmission"
                      onChange={handleChange}
                      value={values.transmission}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none"
                      required
                    >
                      <option value="">Select Transmission</option>
                      <option value="Automatic">Automatic</option>
                      <option value="Manual">Manual</option>
                      <option value="CVT">CVT</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Drive System</label>
                    <select
                      name="driveSystem"
                      onChange={handleChange}
                      value={values.driveSystem}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none"
                      required
                    >
                      <option value="">Select Drive System</option>
                      <option value="2WD">2WD</option>
                      <option value="4WD">4WD</option>
                      <option value="AWD">AWD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mileage (km)</label>
                    <input
                      name="mileage"
                      type="text"
                      placeholder="e.g. 50000"
                      onChange={handleChange}
                      value={values.mileage ? Number(values.mileage).toLocaleString() : ""}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Additional Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                  <select
                    name="condition"
                    onChange={handleChange}
                    value={values.condition}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none"
                    required
                  >
                    <option value="">Select Condition</option>
                    <option value="New">Brand New</option>
                    <option value="Used">Used</option>
                    <option value="Reconditioned">Reconditioned</option>
                    <option value="Certified Pre-Owned">Certified Pre-Owned</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
                  <textarea
                    name="features"
                    rows="3"
                    placeholder="List vehicle features (e.g. Sunroof, Leather seats, Navigation...)"
                    onChange={handleChange}
                    value={values.features}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none"
                    required
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    name="location"
                    type="text"
                    placeholder="e.g. Kajiado North, Ngong"
                    onChange={handleChange}
                    value={values.location}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (KSHs)</label>
                  <input
                    name="price"
                    type="text"
                    placeholder="e.g. 25000"
                    onChange={handleChange}
                    value={values.price ? Number(values.price).toLocaleString() : ""}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="mt-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Images (Min: 5, Max: 8; Max File Size: 1MB per image)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center hover:border-primary-400 transition-all duration-300">
                <span className="material-symbols-outlined text-5xl text-gray-400 mb-2">
                  add_photo_alternate
                </span>
                <p className="text-sm text-gray-500 mb-4">Drag & drop your images here, or click to select files</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={images.length >= 8}
                  className="hidden"
                  id="image-upload"
                  required={images.length < 5}
                />
                <label
                  htmlFor="image-upload"
                  className="bg-black text-white px-4 py-2 rounded-lg font-medium cursor-pointer animate-bounce duration-100"
                >
                  Select Images
                </label>
                <p className="text-xs text-gray-400 mt-2">Images will be automatically compressed to 1MB</p>
              </div>

              {preview.length > 0 && (
                <div className="mt-4 grid grid-cols-4 gap-4">
                  {preview.map((src, index) => (
                    <div key={index} className="relative bg-white border border-gray-200 rounded-lg p-2 shadow-sm group">
                      <img
                        src={src}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600"
                      >
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Optionally, add a preview progress indicator */}
              {preview.length > 0 && (
                <div className="mt-4 mb-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      Upload Progress ({preview.length}/8 images)
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {((preview.length / 8) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-primary-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
                      style={{ width: `${(preview.length / 8) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-4 mt-8">
              <button
                type="button"
                className="px-6 py-3 border border-gray-300 rounded-lg  hover:bg-red-500 text-gray-700 font-semibold transition-all duration-300 hover:text-white hover:shadow-sm"
                onClick={() => window.location.href = from}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#3DC2EC] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-green-400 hover:shadow-md transform  flex items-center gap-2"
              >
                <span className="material-symbols-outlined">save</span>
                Save Vehicle
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default AddProduct;
