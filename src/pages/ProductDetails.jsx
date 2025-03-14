import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import bgBanner from "../assets/prodDetails.jpg";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [cart, setCart] = useState(() => {

        return JSON.parse(localStorage.getItem("cart")) || [];
    });

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`)
            .then((response) => setProduct(response.data))
            .catch((error) => console.error("Error fetching product details:", error));
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleAddToCart = (productId) => {
        if (!product || !product._id) {
            toast.error("Failed to add product.", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        setCart((prevCart) => {
            let updatedCart = [...prevCart];
            const existingProduct = updatedCart.find(item => item._id === productId);

            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                updatedCart.push({ ...product, quantity: quantity });
            }
    
    


            localStorage.setItem("cart", JSON.stringify(updatedCart));
            toast.success(`${product.name} added to cart!`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            return updatedCart;
        });

        setQuantity(1);

        console.log("Product added:", product);
    };


    return (
        <>
            <ToastContainer />
            <div className="relative w-full h-35 md:h-70">
                <img src={bgBanner} alt="Product Banner" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{ background: "rgba(255, 255, 255, 0.2)" }}>
                    <h1 className="text-[#5A5A5A] text-3xl md:text-4xl font-bold">{product.name}</h1>
                    <ul className="flex items-center text-[#5A5A5A] font-medium justify-between gap-5 mt-5">
                        <li><Link to="/home" className="hover:underline">Home</Link></li>
                        <li>|</li>
                        <li><Link to="/about" className="hover:underline">About</Link></li>
                        <li>|</li>
                        <li><Link to="/contact" className="hover:underline">Contact</Link></li>
                    </ul>
                </div>
            </div>


            <div className="container my-10 md:my-20 mx-auto p-6 flex flex-col md:flex-row items-center md:items-start gap-10">

                <div className="w-full md:w-1/2">
                    <img src={product.img} alt={product.name} className="w-full h-auto" />
                </div>

                <div className="w-full md:w-1/2">
                    <p className="text-[#536e1c] text-sm uppercase font-medium mb-3 ">aura skin care</p>
                    <h2 className="text-3xl md:text-4xl text-gray-900 mb-3">{product.name}</h2>
                    <p className="text-2xl text-[#536e1c] mb-3">₹{product.price} <span className="ml-2 line-through text-gray-400 text-lg">{product.regularPrice}</span>
                    </p>
                    <p className="bg-[#53a080] text-white text-xs px-2 py-1 inline-block mt-1">
                        {product.discount} OFF
                    </p>

                    <hr className="border-t border-gray-300 my-6" />

                    <p className="mb-5 text-gray-600">Experience the best quality skincare for all skin types</p>
                    <p className="text-lg text-gray-900 ">Product Category : <span className=" text-black py-2 px-5 bg-[#F5F5F5]">{product.category}</span></p>

                    <div className="flex items-center gap-5 md:gap-10 my-8">
                        <div className="flex items-center gap-0.5">
                            <button onClick={decreaseQuantity} className="px-4 py-2 border transition duration-500 ease-in-out cursor-pointer hover:bg-black hover:text-white">-</button>
                            <span className="px-4 py-2 border">{quantity}</span>
                            <button onClick={increaseQuantity} className="px-4 py-2 border transition duration-500 ease-in-out  cursor-pointer hover:bg-black hover:text-white">+</button>
                        </div>
                        <button
                            onClick={() => handleAddToCart(product._id)}
                            className="bg-[#2d3a15] hover:bg-black transition duration-500 ease-in-out cursor-pointer py-3 px-10 text-white font-semibold text-[16px]"
                        >
                            Add to Cart
                        </button>
                    </div>

                    <p className="text-base mt-5 text-gray-900 ">Shipping & Return: <span className=" text-gray-600 ">Worldwide Shipping in all order $200, Delivery in 2-5 working days</span></p>


                    <hr className="border-t border-gray-300 my-6" />

                    <h2 className="text-2xl md:text-3xl text-gray-900 mb-3">Description</h2>
                    <p className="mb-6 text-gray-600">Aliquam purus sit amet luctus venenatis lectus. Arcu non odio euismod lacinia at quis risus sed. Aliquam purus sit amet luctus venenatis lectus. Arcu non odio euismod lacinia at quis risus sed.Aliquam purus sit amet luctus venenatis lectus. Arcu non odio euismod lacinia at quis risus sed. Aliquam purus sit amet luctus venenatis lectus. Arcu non odio euismod lacinia at quis risus sed.</p>

                    <h2 className="text-2xl md:text-3xl text-gray-900 mb-3">Additional Details</h2>
                    <ol className=" text-gray-600 mb-6">
                        <li>Made with natural and organic ingredients.</li>
                        <li>Dermatologically tested and suitable for all skin types.</li>
                        <li>Free from parabens, sulfates, and harsh chemicals.</li>
                        <li>Eco-friendly and cruelty-free skincare products.</li>
                    </ol>

                    <h2 className="text-2xl md:text-3xl text-gray-900 mb-3">Product Certificate</h2>
                    <p className="text-gray-600 max-w-2xl mb-3 mx-auto">
                        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed sagittis, orci ac cursus sagittis, lorem nisi tempus augue, nec rhoncus orci odio id velit. Donec efficitur euismod nunc at elementum. Phasellus eget nulla et turpis gravida accumsan. Mauris vel arcu quis nunc malesuada ultricies in nec odio.</p>

                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Aenean at justo vel elit vulputate tincidunt. Curabitur venenatis, turpis eget vehicula tincidunt, nisl quam tempor nulla, ac viverra felis nisl vel leo. Integer ac neque at risus bibendum ultricies. Duis non felis nec turpis tincidunt malesuada vel sit amet justo.</p>

                </div>
            </div>
        </>
    );
}


