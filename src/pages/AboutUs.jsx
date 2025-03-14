import bgBanner from "../assets/productBanner.webp";
import AboutBanner from "../components/AboutBanner";
import AboutCard from "../components/AboutCard";
import Banner from "../components/Banner";
import Partners from "../components/Partners";
import Testi from "../components/Testi";
import { Link } from "react-router-dom";

export default function AboutUs() {
    return (

        <>
            <div className="relative w-full h-35  md:h-70">
                <img src={bgBanner} alt="Contact Banner" className="w-full h-full object-cover" />
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{ background: "rgba(255, 255, 255, 0.2)" }}>
                    <h1 className="text-[#5A5A5A] text-3xl md:text-4xl font-bold">About Us</h1>
                    <ul className="flex items-center text-[#5A5A5A] font-medium justify-between gap-5 mt-5">
                        <li><Link to="/home" className="hover:underline">Home</Link></li>
                        <li>|</li>
                        <li><Link to="/products" className="hover:underline">Products</Link></li>
                        <li>|</li>
                        <li><Link to="/contact" className="hover:underline">Contact</Link></li>
                    </ul>
                </div>
            </div>

            <AboutCard />
            <Partners />
            <AboutBanner />
            <Testi />
        </>
    )
}