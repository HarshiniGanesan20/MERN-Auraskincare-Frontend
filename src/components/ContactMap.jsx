const ContactMap = () => {


    return (
        <>

            <div className="relative w-full h-96">
                <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9931.00334494287!2d-0.1277582!3d51.5073501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b31e6d64b7d%3A0xdee6b62600d6f70!2sLondon%2C%20UK!5e0!3m2!1sen!2us!4v1648482801994!5m2!1sen!2us"
                    frameBorder="0"
                    style={{ border: 0 }}
                    allowFullScreen
                    aria-hidden="false"
                    tabIndex="0"
                ></iframe>
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    style={{
                        backgroundColor: "rgba(83, 110, 28, 0.3)",
                    }}>
                </div>
            </div>

        </>
    );
};

export default ContactMap;
