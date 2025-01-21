import { Link } from 'react-router-dom';
import Layout from './components/Layout';
import { useProductContext } from './context/ProductProvider'

// import UploadForm from './components/forms/uploadForm'

const productPage = () => {
    const {products} = useProductContext();
    // Render content based on fetched bills
    console.log('Products from Product Page :', products)
    return (    
    <Layout >
        < div className="mt-8">
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
                                <img src={product?.image_url} alt={product?.id} loading="lazy" width="440" height="300"
                                    className="w-100 bg-slate-500 rounded shadow-lg opacity-75 hover:opacity-100 " />
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
                                    <span className=" font-bold">{product?.price}</span>
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
        {/* <UploadForm/> */}
    </Layout>
  )
}

export default productPage
