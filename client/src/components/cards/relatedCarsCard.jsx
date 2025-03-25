import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const RelatedCars = () => {
    const { carId } = useParams();
    const navigate = useNavigate();
    const [relatedCars, setRelatedCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRelatedCars = async () => {
            try {
                const response = await axios.get(`/api/related-cars/${carId}`);
                setRelatedCars(response.data);
            } catch (err) {
                setError("Failed to load related cars.");
                console.error("Error fetching related cars:", err);
            } finally {
                setLoading(false);
            }
        };

        if (carId) fetchRelatedCars();
    }, [carId]);


    return (
        <div className="border shadow-lg p-2">
            <h3 className="p-3 uppercase tracking-wider text-sm font-bold">Related Cars</h3>
            <hr />
            {loading ? (
                // ✅ Shimmer effect while loading
                <ul className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-5 gap-1 pt-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <li key={index} className="animate-pulse">
                            <div className="bg-gray-300 rounded h-24 sm:h-28 md:h-32 lg:h-36"></div>
                        </li>
                    ))}
                </ul>
            ) : error ? (
                <p className="text-center text-red-500 p-3">{error}</p>
            ) : relatedCars.length > 0 ? (
                <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1 pt-2">
                    {relatedCars.map((car) => (
                        <li
                            key={car.id}
                            className="cursor-pointer"
                            onClick={() => navigate(`/car/${car.id}`)}
                        >
                            <img
                                className="p-2 hover:border-2 hover:border-blue-600 rounded object-cover w-full h-24 sm:h-28 md:h-32 lg:h-36"
                                src={car.images?.[0] || "/placeholder.jpg"}
                                alt={car.model}
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 text-center p-3">No related cars found.</p>
            )}
        </div>
    );
};

export default RelatedCars;
