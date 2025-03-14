import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import c1 from "../assets/IconCard/1.svg";
import c2 from "../assets/IconCard/2.svg";
import c3 from "../assets/IconCard/3.svg";
import c4 from "../assets/IconCard/4.svg";

export default function IconCard() {
    
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const card = [
        { img: c1, name: "Natural Ingredients", des: "Praesent in nunc vel urna consequat mattis eget vel libero. Phasellus entesque" },
        { img: c2, name: "Organic Products", des: "Praesent in nunc vel urna consequat mattis eget vel libero. Phasellus entesque" },
        { img: c3, name: "Skin Friendly", des: "Praesent in nunc vel urna consequat mattis eget vel libero. Phasellus entesque" },
        { img: c4, name: "Eco-Friendly", des: "Praesent in nunc vel urna consequat mattis eget vel libero. Phasellus entesque" },
    ];

    return (
        <div className="grid grid-cols-1 xl:mt-15 sm:grid-cols-2  my-10 md:my-20 mx-3 lg:grid-cols-4 gap-6 p-6">
            {card.map((item, index) => (
                <div 
                    key={index} 
                    className="p-6 bg-white shadow-lg flex flex-col items-center text-center"
                    data-aos="fade-up" 
                    data-aos-delay={index * 200} 
                >
                    <img src={item.img} alt={item.name} className="w-16 h-16 mb-4" />
                    <h3 className="text-[20px] mb-2">{item.name}</h3>
                    <p className="text-gray-600">{item.des}</p>
                </div>
            ))}
        </div>
    );
}
