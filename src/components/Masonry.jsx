import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import m1 from "../assets/masonry/1.webp";
import m2 from "../assets/masonry/2.webp";
import m3 from "../assets/masonry/3.webp";
import m4 from "../assets/masonry/4.webp";

export default function MasonryGrid() {

       useEffect(() => {
            AOS.init({ duration: 1000 });
        }, []);

    return (
        <div className="max-w-8xl mx-auto p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  ">
                {/* First Column - m1 */}
                <div className="hidden md:block">
                    <div className="mb-4 p-3">
                        <img
                            src={m1}
                            alt="Masonry 1"
                            className="w-full"
                            style={{ width: "388px", height: "800px", objectFit: "cover" }}
                        />
                    </div>
                </div>

                {/* Second Column - Text & m2 */}
                <div className="hidden lg:block " >
                    <div
                        className="mb-4 p-3 text-center flex flex-col items-center justify-center "
                        style={{ width: "402.66px", height: "404px" }}
                        data-aos="fade-up" 
                    >
                        <h3 className="text-[16px] text-[#536e1c] uppercase font-medium">Nourish, Hydrate, Glow</h3>
                        <p className="text-[40px] text-gray-900 font-semibold">Aura Skin Care Essentials</p>
                    </div>
                    <div className="mb-4 p-3">
                        <img
                            src={m2}
                            alt="Masonry 2"
                            className="w-full"
                            style={{ width: "385px", height: "380px", objectFit: "cover" }}
                        />
                    </div>
                </div>

                {/* Third Column - m3 & m4 */}
                <div>
                    <div className="mb-4 p-3">
                        <img
                            src={m3}
                            alt="Masonry 3"
                            className="w-full"
                            style={{ width: "385px", height: "380px", objectFit: "cover" }}
                        />
                    </div>
                    <div className="mb-4 p-3">
                        <img
                            src={m4}
                            alt="Masonry 4"
                            className="w-full"
                            style={{ width: "385px", height: "380px", objectFit: "cover" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
