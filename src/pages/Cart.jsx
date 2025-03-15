import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bgBanner from "../assets/prodDetails.jpg";
import icon from "../assets/icon.svg"
import { getAuth, onAuthStateChanged } from "firebase/auth";


export default function Cart() {
    const [cart, setCart] = useState([]);
    const [address, setAddress] = useState("");

    useEffect(() => {
        const updateCartFromStorage = () => {
            const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
            setCart(savedCart);
        };

        updateCartFromStorage();

        window.addEventListener("storage", updateCartFromStorage);

        return () => {
            window.removeEventListener("storage", updateCartFromStorage);
        };
    }, []);

    const updateCart = (updatedCart) => {
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        setCart(JSON.parse(localStorage.getItem("cart")) || []);
    };

    const increaseQuantity = (index) => {
        const updatedCart = [...cart];
        updatedCart[index].quantity += 1;
        updateCart(updatedCart);
    };

    const decreaseQuantity = (index) => {
        const updatedCart = [...cart];
        if (updatedCart[index].quantity > 1) {
            updatedCart[index].quantity -= 1;
        } else {
            updatedCart.splice(index, 1);
        }
        updateCart(updatedCart);
    };

    const removeItem = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        updateCart(updatedCart);
    };

    const subtotalAmount = cart.reduce((acc, item) => {
        if (!item.price) return acc;
        let price = item.price.toString().replace(/Rs\.|₹|,/g, "").trim();
        let parsedPrice = parseFloat(price) || 0;
        return acc + parsedPrice * (item.quantity || 1);
    }, 0);
    const formattedSubtotal = subtotalAmount.toLocaleString("en-IN");



    const auth = getAuth();

    const handleCheckout = async () => {
        if (!address.trim()) {
            alert("Please enter your address before checkout.");
            return;
        }
        try {
            const user = auth.currentUser;
            if (!user) {
                alert("User not logged in!");
                return;
            }

            const userEmail = user.email;

            const userRes = await fetch(`${import.meta.env.VITE_API_URL}/user?email=${userEmail}`);
            if (!userRes.ok) throw new Error("Failed to fetch user details");

            const userData = await userRes.json();


            if (!userData.username || !userData.email) {
                throw new Error("User data incomplete");
            }


            const response = await fetch(`${import.meta.env.VITE_API_URL}/create-order`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: subtotalAmount,
                    cart: cart,
                    customer: {
                        name: userData.username,
                        email: userData.email,
                        contact: userData.contact || "9876543210",
                        address: address
                    }
                })
            });

            if (!response.ok) throw new Error("Failed to create order");

            const order = await response.json();
            console.log("Order Created:", order);

            const options = {
                key: "rzp_test_nnaRhQCwZVr080",
                amount: order.amount,
                currency: order.currency,
                name: "Aura Skin Care",
                description: "Purchase Description",
                order_id: order.id,
                handler: async function (response) {
                    try {
                        console.log("Payment Response:", response);

                        const verifyRes = await fetch(`${import.meta.env.VITE_API_URL}/verify-payment`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(response)
                        });

                        if (!verifyRes.ok) throw new Error("Payment verification failed");

                        const verifyData = await verifyRes.json();
                        if (verifyData.success) {
                            alert("Payment Successful!");

                            await fetch(`${import.meta.env.VITE_API_URL}/store-order`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    orderId: order.id,
                                    products: cart,
                                    totalAmount: subtotalAmount,
                                    customer: {
                                        name: userData.username,
                                        email: userData.email,
                                        contact: userData.contact || "9876543210",
                                        address: address
                                    },
                                    paymentId: response.razorpay_payment_id
                                })
                            });

                            localStorage.removeItem("cart");
                            setCart([]);
                            setAddress("");
                        } else {
                            alert("Payment verification failed!");
                        }
                    } catch (error) {
                        console.error("Payment Handler Error:", error);
                        alert("Something went wrong during payment verification.");
                    }
                },
                prefill: {
                    name: userData.username,
                    email: userData.email,
                    contact: userData.contact || "9876543210",
                },
                theme: { color: "#536e1c" },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Checkout Error:", error);
            alert("Checkout failed. Please try again.");
        }
    };

    return (
        <>
            <div className="relative w-full h-35 md:h-70">
                <img src={bgBanner} alt="Product Banner" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ background: "rgba(255, 255, 255, 0.2)" }}>
                    <h1 className="text-[#5A5A5A] text-2xl md:text-3xl  font-bold">Your Shopping Cart</h1>
                    <ul className="flex items-center text-[#5A5A5A] font-medium justify-between gap-5 mt-5">
                        <li><Link to="/home" className="hover:underline">Home</Link></li>
                        <li>|</li>
                        <li><Link to="/about" className="hover:underline">About</Link></li>
                        <li>|</li>
                        <li><Link to="/contact" className="hover:underline">Contact</Link></li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto my-10 md:my-20 p-6 cart-container">
                {cart.length === 0 ? (
                    <p className="text-center text-lg">
                        Your cart is empty:( <Link to="/products" className="text-[#536e1c] hover:text-[#8aa35c] hover:underline">Continue Shopping</Link>
                    </p>
                ) : (
                    <div className="bg-white shadow-lg p-5 md:p-10">

                        <div className="hidden md:block cart-table">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-300">
                                        <th className="py-3 font-medium text-xl">Products</th>
                                        <th className="py-3 font-medium text-xl">Details</th>
                                        <th className="py-3 font-medium text-xl text-center">Price</th>
                                        <th className="py-3 font-medium text-xl text-center">Quantity</th>
                                        <th className="py-3 font-medium text-xl text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((item, index) => (
                                        <tr key={index} className="border-b border-gray-300">
                                            <td className="py-4 w-24">
                                                <img src={item.img} alt={item.name} className="w-20 h-20 object-cover" />
                                            </td>
                                            <td className="py-4 w-1/4">
                                                <p className="text-[#536e1c] text-[12px] uppercase font-medium mb-1">Aura SkinCare</p>
                                                <h2 className="text-lg mb-1">{item.name}</h2>
                                                <p className="text-gray-600 "><span className="text-gray-900">Category: </span>{item.category}</p>
                                            </td>
                                            <td className="py-4 w-1/6 text-center text-gray-600 font-medium">₹{item.price}</td>
                                            <td className="text-center">
                                                <div className="flex items-center justify-center gap-1">
                                                    <button
                                                        onClick={() => decreaseQuantity(index)}
                                                        className="w-10 h-10 border transition duration-500 ease-in-out cursor-pointer hover:bg-black hover:text-white flex items-center justify-center"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="w-12 h-10 flex items-center justify-center border">{item.quantity}</span>
                                                    <button
                                                        onClick={() => increaseQuantity(index)}
                                                        className="w-10 h-10 border transition duration-500 ease-in-out cursor-pointer hover:bg-black hover:text-white flex items-center justify-center"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="py-4 w-1/5 text-right">
                                                <button
                                                    onClick={() => removeItem(index)}
                                                    className="text-black hover:text-red-700 text-lg transition duration-500 ease-in-out cursor-pointer p-2"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="w-6 h-6"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                                                        />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>


                        <div className="md:hidden cart-items-mobile">
                            {cart.map((item, index) => (
                                <div key={index} className="cart-item border-b border-gray-300 mb-10">
                                    <div className="flex gap-3 ">
                                        <img src={item.img} alt={item.name} className="w-30 " />
                                        <div className="cart-item-details">
                                            <p className="text-[#536e1c] text-[12px] uppercase font-medium mb-1">Aura Skin Care</p>
                                            <h2 className="text-lg mb-1">{item.name}</h2>
                                            <p className="text-gray-600 mb-2 "><span className="text-gray-900">Category: </span>{item.category}</p>
                                            <p className="text-gray-600 font-medium">₹{item.price}</p>
                                        </div>
                                    </div>

                                    <div className="cart-actions flex gap-5 mb-5 mt-6">
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => decreaseQuantity(index)}
                                                className="w-10 h-10 border transition duration-500 ease-in-out cursor-pointer hover:bg-black hover:text-white flex items-center justify-center"
                                            >
                                                -
                                            </button>
                                            <span className="w-12 h-10 flex items-center justify-center border">{item.quantity}</span>
                                            <button
                                                onClick={() => increaseQuantity(index)}
                                                className="w-10 h-10 border transition duration-500 ease-in-out cursor-pointer hover:bg-black hover:text-white flex items-center justify-center"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeItem(index)}
                                            className="text-black hover:text-red-700 text-lg transition duration-500 ease-in-out cursor-pointer p-2"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                                                />
                                            </svg>
                                        </button> </div>
                                </div>

                            ))}

                        </div>

                        <div className="mt-10 flex flex-col items-end text-right">
                            <p className="text-xl font-medium mb-4 subtotal w-[270px] md:w-[300px]">
                                Subtotal: ₹{formattedSubtotal}
                            </p>


                            <p className="mb-4 w-[270px] md:w-[300px]  text-gray-600">Taxes and shipping calculated at checkout</p>

                            <div className="mb-4 w-[270px] md:w-[300px]">
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Enter your full address"
                                    className=" p-3 w-full border border-gray-300  focus:outline-none focus:ring-2 focus:ring-[#536e1c]"
                                />
                            </div>
                            <button onClick={handleCheckout} className="bg-[#2d3a15] mb-4 w-[270px] md:w-[300px] cursor-pointer hover:bg-black py-3 px-10 text-white font-semibold checkout-btn">
                                Proceed to Checkout
                            </button>
                        </div>

                    </div>
                )}
            </div>
        </>
    );
}








