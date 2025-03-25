import { useState, useEffect } from "react";
import useAxiosPrivate from '../../api/useAxiosPrivate';

const FilterForm = ({ filters, setFilters, onFilterSubmit }) => {
    const [dropdownOptions, setDropdownOptions] = useState({
        make: [],
        model: [],
        fuelType: [],
        transmission: [],
        condition: [],
        driveSystem: [],
    });

    const axiosPrivate = useAxiosPrivate();
    useEffect(() => {
        const fetchUniqueValues = async () => {
            try {
                const response = await axiosPrivate.get('products'); // Changed to GET for fetching product data
                const cars = response.data; // Extracting data correctly

                if (Array.isArray(cars)) {
                    // Extract unique values from response data
                    const getUniqueValues = (key) => [...new Set(cars.map(car => car[key]).filter(Boolean))];

                    setDropdownOptions({
                        make: getUniqueValues("make"),
                        model: getUniqueValues("model"),
                        fuelType: getUniqueValues("fuelType"),
                        transmission: getUniqueValues("transmission"),
                        condition: getUniqueValues("condition"),
                        driveSystem: getUniqueValues("driveSystem"),
                    });
                }
            } catch (error) {
                console.error("Error fetching car data:", error);
            }
        };
        fetchUniqueValues();
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting Filters:", filters);

        const cleanedFilters = Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value !== '' && value !== undefined)
        );

        if (Object.keys(cleanedFilters).length === 0) {
            alert("Please select at least one filter before submitting.");
            return;
        }

        if (onFilterSubmit) {
            onFilterSubmit(cleanedFilters);
        }
    };

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
        <form onSubmit={handleSubmit} className="min-w-[400px] md:w-[400px] mt-6 rounded-xl p-6 shadow-2xl">
            <h1 className="text-xl font-semibold mb-4">Filter Available Vehicles By:</h1>
            <button
                type="submit"
                className="bg-black text-white rounded-md px-4 mb-4 py-2 text-sm w-full"
                disabled={Object.values(filters).every(
                    (value) => value === '' || (Array.isArray(value) && value.length === 0)
                )}
            >
                Apply Filters
            </button>

            {/* Dropdown fields */}
            {[
                { label: "Vehicle Make", name: "make", options: dropdownOptions.make },
                { label: "Vehicle Model", name: "model", options: dropdownOptions.model },
                { label: "Fuel Type", name: "fuelType", options: dropdownOptions.fuelType },
                { label: "Transmission", name: "transmission", options: dropdownOptions.transmission },
                { label: "Car Condition", name: "condition", options: dropdownOptions.condition },
                { label: "Driving System", name: "driveSystem", options: dropdownOptions.driveSystem },
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

            {/* Input fields */}
            {[
                { label: "Year From", name: "yearFrom", type: "number", placeholder: "Enter Start Year", value: filters.yearFrom },
                { label: "Year To", name: "yearTo", type: "number", placeholder: "Enter End Year", value: filters.yearTo },
                { label: "Engine Capacity CC", name: "engine_capacity", type: "number", placeholder: "Enter Engine Capacity", value: filters.engine_capacity || '' },
                { label: "Location", name: "location", type: "text", placeholder: "Enter Location", value: filters.location },
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
