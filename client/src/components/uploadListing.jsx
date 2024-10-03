import React from 'react'
import axios from 'axios'
import './uploadlist.css'
import { useState } from 'react'

const uploadListing = () => {
    const [values, setValues] = useState({
        make: '',
        model: '',
        year: '',
        engine_capacity: '',
        fuel_type: '',
        transmission: '',
        driveSystem: '',
        mileage: '',
        features:'',
        condition:'',
        location:'',
        price:'',
    })
    const handleChange = (e) => {
        setValues((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await axios.post('http://localhost:3100/products',
                 values,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: false
                },
            );
            console.log(values)
            alert("car details uploaded successfully");
        } catch(error) {
                console.log(error)
        }
    }
  return (
    <div>
          <form onSubmit={handleSubmit} >
              <div >
                  <label >Vehicle Make </label>
                  <input name='make' onChange={handleChange} type='text' placeholder='Enter Vehicle Make' required />
                  <label>Vehicle Model</label>
                  <input name='model' onChange={handleChange} type='text' placeholder='Enter Vehicle Model' required />
                  <label >Year of Manufacture</label>
                  <input name='year' onChange={handleChange} type='number' placeholder='Enter Year of Manufacture' required />
                  <label >Engine Capacity CC</label>
                  <input name='engine_capacity' onChange={handleChange} type='number' placeholder='Enter Engine Capacity' required />
                  <label >Fuel Type</label>
                  <input name='fuel_type' onChange={handleChange}  type='text' placeholder='Enter Fuel Type i.e,. Diesel' required />
                  <label >Transmission</label>
                  <input name='transmission' onChange={handleChange}  type='text' placeholder='Enter Transmission i.e,. Manual' required />
                  <label >Driving System</label>
                  <input name='driveSystem' onChange={handleChange}  type='text' placeholder='Enter Drive System i.e,. 2WD' required />
                  <label >Mileage</label>
                  <input name='mileage' onChange={handleChange}  type='number' placeholder='Enter Mileage in KM' required />
                  <label >Car Condition</label>
                  <input name='condition' onChange={handleChange}  type='text' placeholder='Car Condition' required />
                  <label >Location</label>
                  <input name='location' onChange={handleChange} type='text' placeholder='Enter Location' required />
                  <label >Price</label>
                  <input name='price' onChange={handleChange} type='number' placeholder='Enter Price' required />
                  <label>Features Description</label>
                  <textarea name='features' onChange={handleChange}
                      className="description text-sm font-normal font-sans  pb-12  shadow-lg shadow-slate-100 rounded-none focus:shadow-outline-purple  border border-slate-300 0  focus:border-blue-500 text-slate-900 focus-visible:outline-0 box-border"
                      placeholder="Describe the features of the Vehicle" required
                  />
              </div>
              <button type='submit'>
                  Add Listing
              </button>
          </form>
    </div>
  )
}

export default uploadListing