
const ContactCard = () => {
    const contactDetails = [
        {
            id: 1,
            title: "Address",
            info: "123 Royal Street, London, UK",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582" />
                </svg>
            ),
        },
        {
            id: 2,
            title: "Phone",
            info: "+44 20 7946 0123",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
            ),
        },
        {
            id: 3,
            title: "Email",
            info: "support@auraskincare.com",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
            ),
        },
        {
            id: 4,
            title: "Store Hours",
            info: "Mon - Fri: 9am to 8pm",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
    ];

    return (
        <>
           


            <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-14 mx-auto flex flex-col md:flex-row items-center justify-center">

                    {/* Left Side - Contact Details */}
                    <div className="lg:w-2/5 md:w-1/2 w-full mb-10 md:mb-0 bg-white p-6">
                        <p className="tracking-wide uppercase text-sm text-[#536e1c] font-medium">
                            Get in Touch
                        </p>
                        <h2 className="text-[22px] md:text-[30px] xl:text-4xl text-gray-900 mt-3 mb-5 leading-tight">
                            Have questions or need assistance?</h2>
                        <p className="text-gray-600 text-[16px] mb-5">
                            Ut tempor sem leo, a ultricies quam aliquam eget. Vivamus commodo scelerisque velit leo et vestibulum.
                        </p>

                        <div className="mt-6 space-y-6">
                            {contactDetails.map((item) => (
                                <div key={item.id} className="flex items-center">
                                    <div className={`flex items-center justify-center h-12 w-12 rounded-md bg-[#536e1c] text-white`}>
                                        {item.icon}
                                    </div>
                                    <div className="ml-4">
                                        <dt className="text-lg font-medium text-gray-900">{item.title}</dt>
                                        <dd className="text-gray-500">{item.info}</dd>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>



                    {/* Right Side - Contact Form */}
                    <div className="lg:w-3/5 md:w-1/2 w-full p-8 md:ml-10">


                        <form>
                            <div className="mb-4">
                                <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                                    Name
                                </label>
                                <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-[#536e1c]  focus:ring-1 focus:ring-[#536e1c] text-base outline-none text-gray-900 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                                    Email
                                </label>
                                <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-[#536e1c]  focus:ring-1 focus:ring-[#536e1c] text-base outline-none text-gray-900 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
                                    Phone
                                </label>
                                <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-[#536e1c]  focus:ring-1 focus:ring-[#536e1c] text-base outline-none text-gray-900 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="message" className="leading-7 text-sm text-gray-600">
                                    Message
                                </label>
                                <textarea id="message" name="message" className="w-full bg-white rounded border border-gray-300 focus:border-[#536e1c] focus:ring-1 focus:ring-[#536e1c] text-base outline-none text-gray-900 py-2 px-4 h-32 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                            </div>
                            <button className="w-full text-white bg-[#536e1c] transform duration-200 ease-in-out cursor-pointer border-0 py-3 px-6 focus:outline-none hover:bg-[#697c45] rounded text-lg">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </section>



        </>
    );
};

export default ContactCard;
