import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Testi() {
   
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        AOS.init({ duration: 1000 });
    
        const fetchTestimonials = async () => {
            try {
                const response = await fetch("http://localhost:5000/reviews");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setTestimonials(data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };
    
        fetchTestimonials();
    }, []);

    return (
        <div className="my-10 md:my-20 mx-10">
            <div className="text-center">
                <p className="text-[#536e1c] text-sm uppercase font-medium">Customer Reviews</p>
                <h2 className="text-3xl text-gray-900 mt-3 mb-5">Testimonials</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Aliquam purus sit amet luctus venenatis lectus. Arcu non odio euismod lacinia at quis risus sed.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-10">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-white p-6 shadow-lg text-center" data-aos="fade-up" data-aos-delay={index * 200}>
                        <img src={testimonial.img} alt={testimonial.name} className="w-50 h-50 mx-auto rounded-full mb-4" />
                        <h3 className="text-[20px] ">{testimonial.name}</h3>
                        <p className=" text-sm text-[#536e1c] ">{testimonial.location}</p>
                        <p className="text-gray-600 mt-4">{testimonial.review}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
