import { Link } from "react-router-dom";

const ProductListing = ({ products }) => {
    if (!products || products.length === 0) {
        return <p>No products available</p>;
    }

    return (
        <ul className="grid grid-cols-2 min-w-[400px] md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
            {products.map((product) => (
                <li key={product.id}>
                    <Link to={`/itempage/${product.id}`}>
                        <div className="border min-w-[200px] shadow-lg rounded-xl pointer hover:shadow-blue-300 cursor-pointer">
                            <figure>
                                {product?.images?.length > 0 ? (
                                    <img
                                        src={product.images[0]?.image_url || product.images[0]}
                                        alt={`${product.make} ${product.model} in ${product.location} `}
                                        loading="lazy"
                                        width="440"
                                        height="300"
                                        className="bg-slate-500 rounded shadow-lg object-cover items-center justify-center"
                                    />
                                ) : (
                                    <div className="w-100 bg-slate-500 rounded shadow-lg flex items-center justify-center h-[200px]">
                                        No Image Available
                                    </div>
                                )}
                            </figure>
                            <div className="p-2">
                                <div className="flex justify-between border-b-2 py-1.5">
                                    <h3 className="uppercase text-xs">{product?.make}</h3>
                                    <data className="border-2 border-dashed border-blue-60 rounded-3xl px-2 text-xs">
                                        {product?.year}
                                    </data>
                                </div>
                                <ul className="border-b py-2">
                                    <li className="text-xs">
                                        <span className="card-item-text font-bold">Model: {product?.model} </span>
                                    </li>
                                    <li className="text-xs">
                                        <span className="card-item-text font-bold">Condition: {product?.condition}</span>
                                    </li>
                                    <li className="text-xs">
                                        <span className="card-item-text font-bold">Location: {product?.location}</span>
                                    </li>
                                </ul>

                                <div className="flex gap-1.5 py-2">
                                    <span className="font-normal md:font-bold">KSH</span>
                                    <span className="font-bold">
                                        {product?.price ? Number(product.price).toLocaleString() : ""}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default ProductListing;
