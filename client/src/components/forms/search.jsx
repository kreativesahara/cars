import React from 'react'

function search() {
  return (
      <div class="md:w-full">
      <form class="flex flex-col lg:flex-row flex-wrap md:justify-center gap-4 items-center bg-white shadow-lg rounded-lg p-3 mb-12">
          {/* <!-- Make --> */}
          <select
            name="make"
            id="make"
            class="w-full lg:w-auto border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled selected>Select Make</option>
            <option value="toyota">Toyota</option>
            <option value="honda">Honda</option>
            {/* <!-- Add more options --> */}
          </select>

          {/* <!-- Model --> */}
          <select
            name="model"
            id="model"
            class="w-full lg:w-auto border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled selected>Select Model</option>
            {/* <!-- Options populated dynamically --> */}
          </select>

          {/* <!-- Year --> */}
          <select
            name="year"
            id="year"
            class="w-full lg:w-auto border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled selected>Select Year</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            {/* <!-- Add more years --> */}
          </select>

          <br/>

          {/* <!-- Price Range --> */}
          <div class="flex items-center gap-2">
            <input
              type="text"
              name="price_min"
              placeholder="Min Price"
              class="w-full lg:w-24 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <span class="text-gray-500">-</span>
            <input
              type="text"
              name="price_max"
              placeholder="Max Price"
              class="w-full lg:w-24 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* <!-- Location --> */}
          <select
            name="location"
            id="location"
            class="w-full lg:w-auto border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled selected>Select Location</option>
            <option value="nairobi">Nairobi</option>
            <option value="mombasa">Mombasa</option>
            {/* <!-- Add more locations --> */}
          </select>

          {/* <!-- Condition --> */}
          <select
            name="condition"
            id="condition"
            class="w-full lg:w-auto border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled selected>Select Condition</option>
            <option value="new">New</option>
            <option value="used">Used</option>
            <option value="certified">Certified Pre-Owned</option>
          </select>

          {/* <!-- Search Button --> */}
          <button
            type="submit"
            class="w-full lg:w-auto bg-blue-500 text-white font-bold px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Search
          </button>
        </form>
      </div>
  )
}

export default search