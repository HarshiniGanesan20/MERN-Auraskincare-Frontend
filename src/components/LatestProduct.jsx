import p1 from "../assets/products/cream1.webp";
import p2 from "../assets/products/cream2.webp";
import p3 from "../assets/products/lotion2.webp";
import p4 from "../assets/products/lotion3.webp";
import p5 from "../assets/products/serum1.webp";
import p6 from "../assets/products/serum4.webp";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";


export default function LatestProduct() {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const products = [
        { img: p1, name: "Apricot Melon Softening Cream", price: "Rs. 74,600.00", regularPrice: "Rs. 88,500.00", discount: "15%" },
        { img: p2, name: "Birch Butter Silkiness Cream", price: "Rs. 57,400.00" ,discount: "15%" },
        { img: p3, name: "Azalea Fields Soothing Cream", price: "Rs. 22,200.00",discount: "15%"  },
        { img: p4, name: "Aura Natural Face Night Cream ", price: "Rs. 1,600.00", soldOut: true ,discount: "15%" },
    ];

    return (
        <div className="flex flex-col xl:flex-row my-10 md:my-20 mx-10 gap-6">
            {/* Left Section */}
            <div className="md:w-1/1" data-aos="fade-right" data-aos-delay="300" data-aos-duration="1200">
                <p className="uppercase text-sm text-[#536e1c] font-medium py-3">Popular Products Of The Week</p>
                <h2 className="text-3xl text-gray-900 mt-4 mb-6">Latest Aura Skin Care Collections</h2>
                
                <p className="text-gray-600 text-[16px] mb-10 ">
                    Ut tempor sem leo, a ultricies quam aliquam eget. Vivamus commodo scelerisque velit,
                    quis viverra velit bibendum vel. Phasellus id leo et vestibulum.
                </p>
                <Link to="/products">
                <button className="bg-[#2d3a15] hover:bg-black transition duration-500 ease-in-out cursor-pointer py-3 px-10 text-white font-semibold text-[16px]">
                    View All Products
                </button></Link>
            </div>

            {/* Product List */}
            <div className="flex gap-4 overflow-x-auto scroll-smooth scroll-hide">
                {products.map((product, index) => (
                    <div key={index} className="min-w-[200px] md:min-w-[250px] p-3 mb-10 ">
                        <img src={product.img} alt={product.name} className="w-full h-auto object-cover" />

                        <div className="mt-4">
                            <h3 className="text-[20px]">{product.name}</h3>

                            {product.discount && (
                                <span className="bg-[#53a080] text-white text-xs px-2  py-1">{product.discount} OFF</span>
                            )}

                            <p className="text-gray-600 mt-2 text-sm">
                                <span className="font-bold text-gray-900">{product.price}</span>
                                {product.regularPrice && (
                                    <span className="ml-2 line-through text-gray-400 text-xs">{product.regularPrice}</span>
                                )}
                            </p>

                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
