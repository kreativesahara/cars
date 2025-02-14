import React, { useState } from 'react';
import { useSearch } from '../../context/SearchProvider';
import axios from '../../api/axios';
import { Link } from 'react-router-dom';


function Search() {
  const {
    make,
    setMake,
    model,
    setModel,
    year,
    setYear,
    priceMin,
    setPriceMin,
    priceMax,
    setPriceMax,
    location,
    setLocation,
    condition,
    setCondition,
  } = useSearch();

  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSearchResults([]);

    const formData = new FormData(event.target);
    const params = Object.fromEntries(formData);

    try {
      const { data } = await axios.get('/search', { params });
      setSearchResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="md:w-full">
      <form
        onSubmit={handleSearch}
        className="flex flex-col lg:flex-row flex-wrap md:justify-center gap-4 items-center bg-white shadow-lg rounded-lg p-3 mb-12"
      >
        {/* Make */}
        <select
          name="make"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          className="w-full lg:w-auto border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" disabled>
            Select Make
          </option>
          <option value="Toyota">Toyota</option>
          <option value="Nissan">Nissan</option>
        </select>

        {/* Model */}
        <select
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="w-full lg:w-auto border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" disabled>
            Select Model
          </option>
          <option value="Corolla">Corolla</option>
          <option value="X5">X5</option>
        </select>

        {/* Year */}
        <select
          name="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full lg:w-auto border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" disabled>
            Select Year
          </option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>

        {/* Price Range */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            name="priceMin"
            placeholder="Min Price"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            className="w-full lg:w-24 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <span className="text-gray-500">-</span>
          <input
            type="text"
            name="priceMax"
            placeholder="Max Price"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            className="w-full lg:w-24 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Location */}
        <select
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full lg:w-auto border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" disabled>
            Select Location
          </option>
          <option value="Kiserian Ngong">Kiserian Ngong</option>
          <option value="Mombasa">Mombasa</option>
        </select>

        {/* Condition */}
        <select
          name="condition"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          className="w-full lg:w-auto border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" disabled>
            Select Condition
          </option>
          <option value="New">New</option>
          <option value="Used">Used</option>
          <option value="Reconditioned">Reconditioned</option>
        </select>

        {/* Search Button */}
        <button
          type="submit"
          className="w-full lg:w-auto bg-blue-500 text-white font-bold px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Search
        </button>
      </form>

      {/* Loading State */}
      {isLoading && <p>Loading...</p>}

      {/* Error State */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Search Results */}
      <div>
        {/* {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>
                {result.make} {result.model} - {result.year} - {result.price}
              </li>
            ))}
          </ul>
        ) : (
          !isLoading && <p>No results found.</p>
        )} */}
        {Array.isArray(searchResults) && searchResults.length > 0 ?
          (
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {searchResults.map(
                (searchResult) =>
                  <li key={searchResult.id}>
                    <Link to={`/itempage/${searchResult.id}`}>
                      <div className="border shadow-lg rounded-xl pointer hover:shadow-blue-300 cursor-pointer">

                        <div className="p-2">
                          <div className="flex justify-between border-b-2 py-1.5">
                            <h3 className="uppercase text-xs">
                              {searchResult?.make}
                            </h3>
                            <data className="border-2 border-dashed border-blue-600 rounded-3xl px-2 text-xs">{searchResult?.year}</data>
                          </div>
                          <ul className="border-b py-2">
                            <li className="text-xs">
                              <span className="card-item-text font-bold">Model: {searchResult?.model} </span>
                            </li>

                            <li className="text-xs">
                              <span className="card-item-text font-bold">Condition: {searchResult?.condition}</span>
                            </li>
                            <li className="text-xs">
                              <span className="card-item-text font-bold">Location: {searchResult?.location}</span>
                            </li>
                          </ul>

                          <div className="flex gap-1.5 py-2">
                            <span className="font-bold ">KSH</span>
                            <span className=" font-bold">{searchResult?.price ? Number(searchResult.price).toLocaleString() : ""}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
              )}
            </ul>
          ) : (
            null)
        }
      </div>
    </div>
  );
}

export default Search;
