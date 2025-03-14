import logo1 from "../assets/partners/l1.webp";
import logo2 from "../assets/partners/l2.webp";
import logo3 from "../assets/partners/l3.webp";
import logo4 from "../assets/partners/l4.webp";
import logo5 from "../assets/partners/l5.webp";
import logo6 from "../assets/partners/l6.webp";

const partners = [logo1, logo2, logo3, logo4,logo5,logo6];

export default function Partners() {
    return (
        <div className="py-10 mb-5 md:py-20 ">
           <div className="px-10 md:px-20 text-center">
                <p className="tracking-wide uppercase text-sm text-[#536e1c] font-medium">
                    Aura Skin Care
                </p>
                <h2 className="text-[22px] md:text-[30px] xl:text-4xl text-gray-900 mt-3 mb-8 leading-tight">
                  Client & partners
                </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
                {partners.map((logo, index) => (
                    <div
                        key={index}
                        className="w-[200px] flex items-center justify-center rounded-lg transition-opacity duration-300 opacity-50 hover:opacity-100"
                    >
                        <img src={logo} alt={`Partner ${index + 1}`} className="w-[200px] h-auto object-contain" />
                    </div>
                ))}
            </div>
        </div>
    );
}