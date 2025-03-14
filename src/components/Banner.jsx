import banner from '../assets/banner2.webp'
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";


export default function Banner() {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);
    return (<>

        <div className='relative w-full'>
            <img src={banner} className='w-full h-[350px] md:h-auto object-cover' alt="Website Banner" />


            <div
                className="absolute top-1/8 md:top-1/8 left-5 md:left-10 p-2 md:p-4 w-[350px] md:w-[600px] rounded-md"
                data-aos="fade-right"
                data-aos-delay="300"
                data-aos-duration="1200"
            >
                <p className='text-[16px] font-semibold text-black mb-[20px] md:mb-[20px] md:text-base'>HEALTHY SKIN</p>
                <h1 className=' text-[20px] md:text-[40px] font-medium text-black mb-[15px] md:mb-[15px]  '>Organic Anti-Aging Cosmetic Cream</h1>
                <p className='text-black text-[16px] mb-[20px] md:mb-[20px]'>Praesent in nunc vel urna consequat mattis eget vel libero. Phasellus entesque</p>
                <Link to="/about">
                <button className='bg-[#2d3a15] hover:bg-black transform duration-500 ease-in-out cursor-pointer py-3 px-15 md:px-15 md:py-3 text-white font-semibold text-[16px] md:text-[16px]'>Learn More</button>
                </Link>
            </div>
        </div>

    </>)
}