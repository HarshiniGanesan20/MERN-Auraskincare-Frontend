import about from "../assets/about2.webp";
import { Link } from "react-router-dom";

// import a1 from "../assets/about/1.svg";
// import a2 from "../assets/about/2.svg";
// import a3 from "../assets/about/3.svg";
// import a4 from "../assets/about/4.svg";


import a1 from "../assets/about/abt1.svg";
import a2 from "../assets/about/abt2.svg";
import a3 from "../assets/about/abt3.svg";
import a4 from "../assets/about/abt4.svg";



import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";


export default function AboutCard() {


    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const features = [
        { img: a1, name: "Strong & Smooth" },
        { img: a2, name: "Paraben-Free" },
        { img: a3, name: "100% Vegan" },
        { img: a4, name: "Sulfate-Free" }
    ];

    return (
        <div className="flex flex-col md:flex-row items-center justify-center mx-10 my-10 md:my-20 gap-10" >
            {/* Left Image Section */}
            <div className="w-full md:w-1/2">
                <img src={about} alt="About Us" className="w-full h-auto " />
            </div>

            {/* Right Text Section */}

            <div className="w-full md:w-1/2" data-aos="fade-up">
                <p className="tracking-wide uppercase text-sm text-[#536e1c] font-medium">
                    PURE AND SIMPLE
                </p>
                <h2 className="text-[30px] md:text-[30px] xl:text-4xl text-gray-900 mt-3 mb-5 leading-tight">
                    Deeply Nourishing Hair Serum For Glowing & Healthy Hair
                </h2>
                <p className="text-gray-600 text-[16px] mb-5">
                    Ut tempor sem leo, a ultricies quam aliquam eget. Vivamus commodo scelerisque velit,
                    quis viverra velit bibendum vel. Phasellus id leo et vestibulum.quis viverra velit bibendum vel. Phasellus id leo et vestibulum.
                </p>



                {/* Features Grid */}
                <div className="grid grid-cols-2  gap-6">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <img src={feature.img} alt={feature.name} className="w-[60px]" />
                            <h3 className=" text-[16px] xl:text-[20px] ">{feature.name}</h3>
                        </div>
                    ))}
                </div>

                <Link to="/contact">
                    <button className="bg-[#2d3a15] hover:bg-black mt-10 transition duration-500 ease-in-out cursor-pointer py-3 px-10 text-white font-semibold text-[16px]">
                        Let's Connect
                    </button>
                </Link>
            </div>
        </div>
    );
}
