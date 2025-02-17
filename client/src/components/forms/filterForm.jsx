import React from 'react';
import axios from '../../api/axios';

const FilterForm = ({ filters, setFilters, onFilterSubmit }) => {
    // Handle onChange event for all inputs/selects
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting Filters:", filters);
        // Since the ProductProvider is watching filters changes (via useEffect),
        // the product list will update automatically.

        // Clean the filters by removing empty or undefined values
        const cleanedFilters = Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value !== '' && value !== undefined)
        );
        console.log("Cleaned Filters:", cleanedFilters);
        // Use the provided callback to update the products
        if (onFilterSubmit) {
            onFilterSubmit(cleanedFilters);
        }
    };

    // Reset filters to initial state
    const handleClearFilters = () => {
        setFilters({
            make: '',
            model: '',
            yearFrom: '',
            yearTo: '',
            priceMin: '',
            priceMax: '',
            fuelType: '',
            transmission: '',
            mileageRange: '',
            location: '',
            condition: '',
            features: [],
            driveSystem: '',
            engine_capacity: '',
        });
    };

    return (
        <form onSubmit={handleSubmit} className="w-full md:w-[600px] mt-6 bg-white rounded-xl p-6 shadow-2xl">
            <h2 className="text-xl font-semibold mb-4">Filter Vehicles</h2>

            {[
                {
                    label: "Vehicle Make",
                    name: "make",
                    options: ["Toyota", "Nissan", "Honda", "Ford", "BMW"],
                },
                {
                    label: "Vehicle Model",
                    name: "model",
                    options: ["Corolla", "Civic", "Ranger", "X5", "Altima"],
                },
                {
                    label: "Fuel Type",
                    name: "fuelType",
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
            ].map((field) => (
                <div key={field.name}>
                    <label htmlFor={field.name} className="block text-sm text-neutral-900 mb-1">
                        {field.label}
                    </label>
                    <select
                        name={field.name}
                        onChange={handleFilterChange}
                        value={filters[field.name] || ''}
                        className="block w-full border border-neutral-300 rounded-md p-2 text-neutral-900"
                    >
                        <option value="">All {field.label}s</option>
                        {field.options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            ))}

            {[
                {
                    label: "Year From",
                    name: "yearFrom",
                    type: "number",
                    placeholder: "Enter Start Year",
                    value: filters.yearFrom,
                },
                {
                    label: "Year To",
                    name: "yearTo",
                    type: "number",
                    placeholder: "Enter End Year",
                    value: filters.yearTo,
                },
                {
                    label: "Engine Capacity CC",
                    name: "engine_capacity",
                    type: "number",
                    placeholder: "Enter Engine Capacity",
                    value: filters.engine_capacity || '',
                },
                {
                    label: "Location",
                    name: "location",
                    type: "text",
                    placeholder: "Enter Location",
                    value: filters.location,
                },
            ].map((field) => (
                <div key={field.name}>
                    <label htmlFor={field.name} className="block text-sm text-neutral-900 mb-1">
                        {field.label}
                    </label>
                    <input
                        name={field.name}
                        onChange={handleFilterChange}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={field.value}
                        className="block w-full border border-neutral-300 rounded-md p-2 text-neutral-900"
                    />
                </div>
            ))}

            <label className="block text-sm text-neutral-900 mb-1">Mileage</label>
            <input
                name="mileageRange"
                onChange={handleFilterChange}
                type="text"
                placeholder="Enter Mileage in KM"
                value={filters.mileageRange}
                className="block w-full border border-neutral-300 rounded-md p-2 text-neutral-900"
            />

            <label className="block text-sm text-neutral-900 mb-1">Price Range</label>
            <div className="grid grid-cols-2 gap-4">
                <input
                    name="priceMin"
                    onChange={handleFilterChange}
                    type="number"
                    placeholder="Min Price"
                    value={filters.priceMin}
                    className="block w-full border border-neutral-300 rounded-md p-2 text-neutral-900"
                />
                <input
                    name="priceMax"
                    onChange={handleFilterChange}
                    type="number"
                    placeholder="Max Price"
                    value={filters.priceMax}
                    className="block w-full border border-neutral-300 rounded-md p-2 text-neutral-900"
                />
            </div>

            <button type="submit" className="bg-black text-white rounded-md px-4 mt-4 py-2 text-sm w-full">
                Apply Filters
            </button>
            <button
                type="button"
                onClick={handleClearFilters}
                className="bg-gray-300 text-neutral-900 rounded-md px-4 mt-2 py-2 text-sm w-full"
            >
                Clear Filters
            </button>
        </form>
    );
};

export default FilterForm;
