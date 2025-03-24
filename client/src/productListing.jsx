import { Link } from "react-router-dom";

const ProductListing = ({ products }) => {
    console.log(products.slug);
    if (!products || products.length === 0) {
        return <p>No products available</p>;
    }

    return (
        <section className="grid grid-cols-2 min-w-[400px] md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto" aria-labelledby="product-listing">
            <h2 id="product-listing" className="sr-only">Available Products</h2>

            {products.map((product) => (
                <article key={product.id} className="border min-w-[200px] shadow-lg rounded-xl hover:shadow-blue-300 cursor-pointer">
                    <Link
                        to={`/itempage/${product.slug}`}
                        title={`View details of ${product.make} ${product.model}`}
                        aria-label={`View details of ${product.make} ${product.model} in ${product.location}`}
                    >
                        <figure>
                            {product?.images?.length > 0 ? (
                                <img
                                    src={product.images[0]?.image_url || product.images[0]}
                                    alt={`${product.make} ${product.model} for sale in ${product.location}`}
                                    loading="lazy"
                                    width="440"
                                    height="300"
                                    className="bg-slate-500 rounded shadow-lg object-cover items-center justify-center"
                                />
                            ) : (
                                <div className="w-100 bg-slate-500 rounded shadow-lg flex items-center justify-center h-[200px]">
                                    <span className="text-white">No Image Available</span>
                                </div>
                            )}
                        </figure>
                    </Link>

                    <div className="p-2">
                        <h2 className="flex justify-between border-b-2 py-1.5">
                            <h2 className="uppercase text-xs">{product?.make}</h2>
                            <data value={product?.year} className="border-2 border-dashed border-blue-60 rounded-3xl px-2 text-xs">
                                {product?.year}
                            </data>
                        </h2>

                        <ul className="border-b py-2">
                            <li className="text-xs"><strong>Model:</strong> {product?.model}</li>
                            <li className="text-xs"><strong>Condition:</strong> {product?.condition}</li>
                            <li className="text-xs"><strong>Location:</strong> {product?.location}</li>
                        </ul>

                        <div className="flex gap-1.5 py-2">
                            <span className="font-normal md:font-bold">KSH</span>
                            <span className="font-bold">{product?.price ? Number(product.price).toLocaleString() : ""}</span>
                        </div>
                    </div>
                </article>
            ))}
        </section>
    );
};

export default ProductListing;
