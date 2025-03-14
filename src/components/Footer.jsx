import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

import icon from "../assets/icon.svg";

export default function Footer() {
    return (
        <footer className="bg-[#182008] text-white pt-15 py-5">
            <div className="container mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Column 1 - Brand Info */}
                <div>
                    <div className="flex items-center gap-2">
                        <img src={icon} alt="Logo" className="w-[30px]" />
                        <h1 className="text-[22px] md:text-[25px] font-semibold">Aura Skincare</h1>
                    </div>
                    <p className="text-white text-sm mt-2">
                        Ut tempor sem leo, a ultricies quam aliquam eget. Vivamus commodo scelerisque velit,
                        quis viverra velit bibendum vel. Phasellus id leo et vestibulum.
                    </p>
                    <div className="flex space-x-4 mt-5">
                        <a href="#" className="text-white hover:text-[#729855] transition">
                            <FaFacebookF size={20} />
                        </a>
                        <a href="#" className="text-white hover:text-[#729855] transition">
                            <FaTwitter size={20} />
                        </a>
                        <a href="#" className="text-white hover:text-[#729855] transition">
                            <FaInstagram size={20} />
                        </a>
                        <a href="#" className="text-white hover:text-[#729855] transition">
                            <FaLinkedinIn size={20} />
                        </a>
                        <a href="#" className="text-white hover:text-[#729855] transition">
                            <FaWhatsapp size={20} />
                        </a>
                    </div>
                </div>

                {/* Column 2 - Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><a href="/home" className="text-white hover:text-[#729855] transition">Home</a></li>
                        <li><a href="/products"className="text-white hover:text-[#729855] transition">Products</a></li>
                        <li><a href="/about" className="text-white hover:text-[#729855] transition">About Us</a></li>
                        <li><a href="contact" className="text-white hover:text-[#729855] transition">Contact</a></li>
                    </ul>
                </div>

                {/* Column 3 - Customer Support */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Customer Support</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-white hover:text-[#729855] transition">Shipping Info</a></li>
                        <li><a href="#" className="text-white hover:text-[#729855] transition">Returns & Refunds</a></li>
                        <li><a href="#" className="text-white hover:text-[#729855] transition">Privacy Policy</a></li>
                        <li><a href="#" className="text-white hover:text-[#729855] transition">Terms & Conditions</a></li>
                    </ul>
                </div>

                {/* Column 4 - Contact Info */}
                
                 <div>
                    <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-2">
                            <FaEnvelope size={18} className="text-[#729855]" />
                            <a href="mailto:support@auraskincare.com" className="text-white hover:text-[#729855] transition">support@auraskincare.com</a>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaPhoneAlt size={18} className="text-[#729855]" />
                            <a href="tel:+442079460123" className="text-white hover:text-[#729855] transition">+44 20 7946 0123</a>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaMapMarkerAlt size={18} className="text-[#729855]" />
                            <span>123 Royal Street, London, UK</span>
                        </li>
                    </ul>
                </div>

            </div>

            {/* Bottom Section */}
            <div className="mt-8 text-center text-[#FFFFFF] text-sm border-t border-[#729855] pt-4">
                &copy; {new Date().getFullYear()} AuraSkinCare. All Rights Reserved.
            </div>
        </footer>
    );
}
