import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from './components/Layout';
import Seo from './SEO/seo'
import useAuth from "./hooks/useAuth";
import { useProductContext } from './context/ProductProvider';
import { useSellerContext } from './context/SellerProvider';

const Itempage = () => {
    const { productId } = useParams();
    const { auth } = useAuth();
    const { products } = useProductContext();
    const { sellers } = useSellerContext();
    const [product, setProduct] = useState(null);
    const [seller, setSeller] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Reset state when productId changes
        setProduct(null);
        setSeller(null);
        setError(null);
        setIsLoading(true);

        // Find the product based on productId
        const foundProduct = products.find((p) => p.id === Number(productId));
        if (foundProduct) {
            setProduct(foundProduct);
        } else {
            setError(new Error('Product not found'));
            setIsLoading(false);
        }
    }, [productId, products]);

    useEffect(() => {
        if (product) {
            // Find the seller based on product.seller_id
            const foundSeller = sellers.find((s) => s.userId === Number(product.seller_id));
            if (foundSeller) {
                setSeller(foundSeller);
            } else {
                setError(new Error('Seller not found'));
            }
            setIsLoading(false);
        }
    }, [product, sellers]);

    if (isLoading) {
        return (
            <Layout>
                <div className="container text-center p-20">Loading...</div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="container text-center p-20 text-red-500">
                    Error: {error.message}
                </div>
            </Layout>
        );
    }
    
    return (
        <Layout>
            <Seo/>
            <div className='min-w-[200px] lg:flex py-6'>
                <div className="lg:w-6/12  border-2 px-2 py-2 ">
                    <div className="h-min cursor-pointer place-self-center">
                        <img
                            className="md:px-2 x min-w-[280px] md:h-[500px] md:object-cover"
                            src={product.images[0]?.image_url || product.images[0]}
                            alt={product.make}
                        />
                    </div>
                    <div className='grid grid-cols-5 py-2 px-1 rounded-b gap-2 cursor-pointer'>
                        {product.images.map((img, index) => (
                            <img
                                key={index}
                                className="border-2 rounded hover:border-blue-600 object-cover w-[150px] md:h-[125px]"
                                src={img.image_url || img}
                                alt={`Thumbnail ${index + 1}`}
                            />
                        ))}
                    </Carousel>
                    {/* Product details (below carousel) */}usel>
                    {/* Product details (below carousel) */}
                    <div className=' p-3'>
                        <div className='flex justify-between '>
                            <span className='flex-col px-2'>
                                <h3 className='font-bold uppercase md:text-2xl'>{product.make}</h3>
                                <p className='tracking-widest md:text-lg'>{product.model}</p>
                            </span>
                            <strong className='font-bold tracking-widest md:text-2xl '>KSH {product?.price ? Number(product.price).toLocaleString() : ""}</strong>
                        </div>
                        <hr />
                        <ul className='p-1 md:grid grid-cols-2  md:font-semibold'>
                            <li className='text-md py-2'>
                                Transmission :
                                <span className='font-bold'> {product.transmission} </span>
                            </li>
                            <li className='text-md py-2'>
                                Location :
                                <span className='font-bold'> {product.location} </span>
                            </li>
                            <li className='text-md py-2'>
                                Year of Manufacter :
                                <span className='font-bold'> {product.year} </span>
                            </li>
                            <li className='text-md py-2'>
                                Engine Capacity :
                                <span className='font-bold'> {product.engine_capacity} </span>
                            </li>
                            <li className='text-md py-2'>
                                Fuel Type :
                                <span className='font-bold'> {product.fuel_type} </span>
                            </li>
                            <li className='text-md py-2'>
                                Mileage :
                                <span className='font-bold'> {product?.mileage ? Number(product.mileage).toLocaleString() : ""} </span>
                            </li>
                            <li className='text-md py-2'>
                                Drive System :
                                <span className='font-bold'> {product.driveSystem} </span>
                            </li>
                            {seller.hasFinancing !== null && <li className='py-2'>Financing Available: <span className='font-bold text-emerald-600'>{seller.hasFinancing ? 'Yes' : 'No'}</span></li>}
                            {seller.acceptsTradeIn !== null && <li className='py-2'>Accepts Trade-in: <span className='font-bold text-emerald-600'>{seller.acceptsTradeIn ? 'Yes' : 'No'}</span></li>}
                        </ul>
                    </div>
                    <div>
                        <h3 className='px-4 py-2 font-bold text-xl'>
                            Features
                        </h3>
                        <hr />
                        <p className=' px-4 text-justify'>
                            {product.features}
                        </p>
                    </div>
                </div>

                <div className='lg:w-5/12  mx-auto flex flex-col gap-3'>
                    <div className='border shadow-lg h-min p-4'>
                        <h3 className='text-sm font-bold uppercase p-2'>Seller Details</h3>
                        <hr />
                        <div className='flex p-2 pt-8'>
                            <img className='w-20 h-20 rounded-full object-cover' src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=720&q=60' alt='' />
                            <span className='ml-4 my-auto'>
                                <p className='uppercase font-semibold'>{seller.username}</p>
                                <p className='font-semibold'>Seller Type : <span className='font-bold text-emerald-600'>{seller.accountType}</span></p>
                            </span>
                        </div>
                    </div>
                    {auth?.roles === 2 || auth?.roles === 3 && (<a href={`tel:${seller.contact}`} className='hover:bg-[#3DC2EC] transition-colors duration-100 bg-black p-2 rounded-md text-center text-white w-100 py-2 tracking-widest font-black'>Call Seller</a>)}
                    {auth?.roles === 1 && (<a href='tel:254706823590' className='hover:bg-[#3DC2EC] transition-colors duration-100 bg-black p-2 rounded-md text-center text-white w-100 py-2 tracking-widest font-black'>Call Seller</a>)}                    
                    {/* <button className='bg-green-500 hover:bg-green-800 text-white w-100 py-2 tracking-wider font-bold'>Message Seller</button> */}
                    {/* <div className='border shadow-lg p-2'>
                        <h3 className='p-3 uppercase -tracking-widertext-sm font-bold'>Related Products</h3>
                        <hr />
                        <ul className='grid grid-cols-3 w-100 cursor-pointer  gap-0.5 pt-2'>
                            <li>
                                <img className='p-2 hover:border-2 hover:border-blue-600 rounded object-cover' src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=720&q=60' alt='' />
                            </li>
                            <li>
                                <img className='p-2 hover:border-2 hover:border-blue-600 rounded object-cover' src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=720&q=60' alt='' />
                            </li>
                            <li>
                                <img className='rounded p-2 hover:border-2 hover:border-blue-600 object-cover' src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=720&q=60' alt='' />
                            </li>
                            <li>
                                <img className='p-2 hover:border-2 hover:border-blue-600 rounded object-cover' src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=720&q=60' alt='' />
                            </li>
                        </ul>
                    </div> */
                    ''}
                </div>
            </div>
        </Layout>
    );
};

export default Itempage;
