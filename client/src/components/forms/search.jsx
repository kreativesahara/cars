import React, { useState } from 'react';
import { useSearch } from '../../context/SearchProvider';
import { useProductContext } from '../../context/ProductProvider';
import axios from '../../api/axios';
import { Link } from 'react-router-dom';

const Search = () => {
  const {
    make, setMake,
    model, setModel,
    year, setYear,
    priceMin, setPriceMin,
    priceMax, setPriceMax,
    location, setLocation,
    condition, setCondition,
  } = useSearch();

  const { products } = useProductContext();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.target);
    const params = Object.fromEntries(formData);
    console.log('params', params);

    try {
      const { data } = await axios.get('/search', { params });
      setSearchResults(data);
      console.log('Search result', searchResults)
    } catch (err) {
      setError('Failed to fetch search results.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderSelect = (name, value, onChange, options, placeholder) => (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full lg:w-auto border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="" disabled>{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  );

  return (
    <>
      <div className="md:w-[85%] mx-auto bg-[#3DC2EC] items-center shadow-lg rounded-lg p-6 mb-12 opacity-70">
        <h2 className="text-xl md:text-3xl  text-white font-extrabold  text-center tracking-widest ">Search By Category</h2>
        <hr className='border-1 w-[80%] my-4 mx-auto' />
        <form
          onSubmit={handleSearch}
          className="flex flex-col lg:flex-row flex-wrap md:justify-center pt-4 gap-4 opacity-100"
        >
          {renderSelect("make", make, (e) => setMake(e.target.value), ["Toyota", "Nissan"], "Select Make")}
          {renderSelect("model", model, (e) => setModel(e.target.value), ["Corolla", "X5"], "Select Model")}
          {renderSelect("year", year, (e) => setYear(e.target.value), ["2023", "2022"], "Select Year")}

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

          {renderSelect("location", location, (e) => setLocation(e.target.value), ["Kiserian Ngong", "Mombasa"], "Select Location")}
          {renderSelect("condition", condition, (e) => setCondition(e.target.value), ["New", "Used", "Reconditioned"], "Select Condition")}
        
          <button
            type="submit"
            className="w-[100%] lg:w-auto bg-[#3DC2EC] text-white font-bold px-6 py-2 rounded-lg hover:bg-black border-double mt-2 border-4 border-white lg:px-[200px]  transition duration-300"
          >
            Search
          </button>
        </form>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {
        Array.isArray(searchResults) && searchResults.length > 0 && (
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-[85%] mx-auto">
            {searchResults.map((result) => {
              const productForResult = products.find((p) => p.id === Number(result.id));
              return (
                <li key={result.id}>
                  <Link to={`/itempage/${result.id}`}>
                    <div className="border shadow-lg rounded-xl pointer hover:shadow-blue-300 cursor-pointer">
                      <figure>
                        {productForResult &&
                          productForResult.images &&
                          productForResult.images.length > 0 ? (
                          <img
                            src={productForResult.images[0]}
                            alt={`${result.make} ${result.model}`}
                            loading="lazy"
                            width="440"
                            height="300"
                            className="w-100 bg-slate-500 rounded shadow-lg"
                          />
                        ) : (
                          <div className="w-100 bg-slate-500 rounded shadow-lg opacity-75">
                            No Image Available
                          </div>
                        )}
                      </figure>
                      <div className="p-2">
                        <div className="flex justify-between border-b-2 py-1.5">
                          <h3 className="uppercase text-xs">{result.make}</h3>
                          <data className="border-2 border-dashed border-blue-600 rounded-3xl px-2 text-xs">
                            {result.year}
                          </data>
                        </div>
                        <ul className="border-b py-2">
                          <li className="text-xs font-bold">Model: {result.model}</li>
                          <li className="text-xs font-bold">Condition: {result.condition}</li>
                          <li className="text-xs font-bold">Location: {result.location}</li>
                        </ul>
                        <div className="flex gap-1.5 py-2">
                          <span className="font-bold">KSH</span>
                          <span className="font-bold">
                            {Number(result.price).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )
      }
    </>
  );
};

export default Search;
