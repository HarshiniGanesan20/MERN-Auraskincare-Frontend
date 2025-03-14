import vid from "../assets/vidBanner.mp4";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";


export default function VideoBanner() {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className="w-full h-[400px] md:h-[600px] relative my-10 md:my-20">
            <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src={vid} type="video/mp4" />
                
            </video>


            <div className="absolute inset-0 bg-opacity-30 flex flex-col left-5 top-1/9 w-[350px] md:w-[600px] md:top-1/4 md:left-10" data-aos="fade-right"
                data-aos-delay="300"
                data-aos-duration="1200">
                <p className="tracking-wide uppercase text-sm text-[#536e1c] mb-5 font-medium">Aura Skin Care</p>
                <h1 className="text-black text-2xl md:text-5xl mb-5"> AuraBloom Beauty & Personal Care</h1>
                <p className="text-gray-600 text-[16px] mb-5">
                    Ut tempor sem leo, a ultricies quam aliquam eget. Vivamus commodo scelerisque velit,
                    quis viverra velit bibendum vel. Phasellus id leo et vestibulum.quis viverra velit bibendum vel. Phasellus id leo et vestibulum.
                </p>
                <Link to="/products">
                <button className="w-auto self-start bg-[#2d3a15] hover:bg-black mt-5 transition duration-500 ease-in-out cursor-pointer py-3 px-10 text-white font-semibold text-[16px]">
                    Shop Now
                </button></Link>


            </div>
        </div>
    );
}
