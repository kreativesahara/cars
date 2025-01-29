// import React, { useState } from 'react';
// import useAxiosPrivate from '../../api/useAxiosPrivate';
// import imageCompression from 'browser-image-compression';
// import useAuth from '../../hooks/useAuth';

// const UploadListing = () => {
    
//     };

//     return (
//         <div className='mt-10'>
//             <div className="w-[auto] bg-white shadow rounded-lg p-6 justify-center">
//                 <h1 className="text-3xl text-center font-bold text-neutral-950 mb-4">
//                     Upload Product
//                 </h1>
//                 <form onSubmit={handleSubmit} className="w-[800px]">
//                     <div>
//                         <label className="block text-sm text-neutral-900 mb-1">
//                             User ID
//                         </label>
//                         <input
//                             name="seller_id"
//                             onChange={handleChange}
//                             type="number"
//                             className="block w-full border border-neutral-300 rounded-md p-2 text-neutral-900"
//                             required
//                             value={auth.id}
//                             disabled
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm text-neutral-900 mb-1">
//                             Upload Images
//                         </label>
//                         <input
//                             type="file"
//                             name="image"
//                             multiple
//                             accept="image/*"
//                             onChange={handleImageChange}
//                             className="block borderw-[750px] h-[200px] w-full border-slate-700 bg-amber-200 rounded-md p-2 text-neutral-900"
//                             required
//                         />
//                         {preview.length > 0 && (
//                             <div className="flex  w-[800px]gap-3 mt-4">
//                                 {preview.map((src, index) => (
//                                     <img
//                                         key={index}
//                                         src={src}
//                                         alt={`Preview ${index + 1}`}
//                                         className="h-[80px] w-[80px] rounded-md object-cover"
//                                     />
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                     {[
//                         {
//                             label: "Vehicle Make",
//                             name: "make",
//                             type: "text",
//                             placeholder: "Enter Vehicle Make",
//                             value: values.make,
//                         },
//                         {
//                             label: "Vehicle Model",
//                             name: "model",
//                             type: "text",
//                             placeholder: "Enter Vehicle Model",
//                             value: values.model,
//                         },
//                         {
//                             label: "Year of Manufacture",
//                             name: "year",
//                             type: "number",
//                             placeholder: "Enter Year of Manufacture",
//                             value: values.year,
//                         },
//                         {
//                             label: "Engine Capacity CC",
//                             name: "engine_capacity",
//                             type: "number",
//                             placeholder: "Enter Engine Capacity",
//                             value: values.engine_capacity,
//                         },
//                         {
//                             label: "Fuel Type",
//                             name: "fuel_type",
//                             type: "text",
//                             placeholder: "Enter Fuel Type i.e., Diesel",
//                             value: values.fuel_type,
//                         },
//                         {
//                             label: "Transmission",
//                             name: "transmission",
//                             type: "text",
//                             placeholder: "Enter Transmission i.e., Manual",
//                             value: values.transmission,
//                         },
//                         {
//                             label: "Driving System",
//                             name: "driveSystem",
//                             type: "text",
//                             placeholder: "Enter Drive System i.e., 2WD",
//                             value: values.driveSystem,
//                         },
//                         {
//                             label: "Mileage",
//                             name: "mileage",
//                             type: "number",
//                             placeholder: "Enter Mileage in KM",
//                             value: values.mileage,
//                         },
//                         {
//                             label: "Car Condition",
//                             name: "condition",
//                             type: "text",
//                             placeholder: "Car Condition",
//                             value: values.condition,
//                         },
//                         {
//                             label: "Location",
//                             name: "location",
//                             type: "text",
//                             placeholder: "Enter Location",
//                             value: values.location,
//                         },
//                         {
//                             label: "Price",
//                             name: "price",
//                             type: "number",
//                             placeholder: "Enter Price",
//                             value: values.price,
//                         },
//                     ].map((field) => (
//                         <div key={field.name}>
//                             <label
//                                 htmlFor={field.name}
//                                 className="block text-sm text-neutral-900 mb-1"
//                             >
//                                 {field.label}
//                             </label>
//                             <input
//                                 name={field.name}
//                                 onChange={handleChange}
//                                 type={field.type}
//                                 placeholder={field.placeholder}
//                                 required
//                                 value={field.value}
//                                 className="block w-[750px] border border-neutral-300 rounded-md p-2 text-neutral-900"
//                             />
//                         </div>
//                     ))}
//                     <div>
//                         <label
//                             htmlFor="features"
//                             className="block text-sm text-neutral-900 mb-1"
//                         >
//                             Features Description
//                         </label>
//                         <textarea
//                             name="features"
//                             onChange={handleChange}
//                             className="block w-full border border-neutral-300 rounded-md p-2 text-neutral-900"
//                             placeholder="Describe the features of the Vehicle"
//                             required
//                             value={values.features}
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         className="bg-primary-500 text-primary-50 rounded-md px-4 py-2 text-sm w-full"
//                     >
//                         Listing
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default UploadListing;
