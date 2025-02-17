import { Link } from 'react-router-dom';
import FilterForm from './components/forms/filterForm'
import Layout from './components/Layout';

import { useProductContext } from './context/ProductProvider'

const productPage = () => {
    const { products } = useProductContext();
    // Render content based on fetched bills
    console.log('Products from Product Page :', products)
    return (
        <Layout >
            <div className='flex flex-col md:flex-row gap-10'>
                <FilterForm/>
                < div className="md:mt-8">
                    {!products.length ?
                        < p >
                            No product to display
                        </p>
                        : (
                            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {products.map(
                                    (product) =>
                                        <li key={product.id}>
                                            <Link to={`/itempage/${product.id}`}>
                                                <div className="border shadow-lg rounded-xl pointer hover:shadow-blue-300 cursor-pointer">
                                                    <figure className="">
                                                        <img src={product?.images[0]} alt={product?.id} loading="lazy" width="440" height="300"
                                                            className="w-100 bg-slate-500 rounded shadow-lg" />
                                                    </figure>
                                                    <div className="p-2">
                                                        <div className="flex justify-between border-b-2 py-1.5">
                                                            <h3 className="uppercase text-xs">
                                                                {product?.make}
                                                            </h3>
                                                            <data className="border-2 border-dashed border-blue-600 rounded-3xl px-2 text-xs">{product?.year}</data>
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
                                                            <span className="font-bold ">KSH</span>
                                                            <span className=" font-bold">{product?.price ? Number(product.price).toLocaleString() : ""}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </li>
                                )}
                            </ul>
                        )
                    }
                </div>
            </div>
        </Layout>
    )
}

export default productPage
