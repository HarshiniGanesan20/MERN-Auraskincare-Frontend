import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import bgBanner from "../assets/productBanner.webp";
import { Link } from "react-router-dom";

const OrderDetails = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Fetching orders...");

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                console.log("User not logged in");
                setError("User not logged in");
                setLoading(false);
                return;
            }

            console.log("User logged in:", user.email);

            try {
                const userEmail = user.email;
                const res = await fetch(`${import.meta.env.VITE_API_URL}/get-orders?email=${userEmail}`);
                if (!res.ok) throw new Error("No order history");

                const data = await res.json();
                console.log("Fetched orders:", data);

                setOrders(data);
            } catch (err) {
                console.error("Fetch error:", err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return (

        <>

            <div className="relative w-full h-35  md:h-70">
                <img src={bgBanner} alt="Contact Banner" className="w-full h-full object-cover" />
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{ background: "rgba(255, 255, 255, 0.2)" }}>
                    <h1 className="text-[#5A5A5A] text-2xl md:text-3xl  font-bold">My Orders</h1>
                    <ul className="flex items-center text-[#5A5A5A] font-medium justify-between gap-5 mt-5">
                        <li><Link to="/home" className="hover:underline">Home</Link></li>
                        <li>|</li>
                        <li><Link to="/products" className="hover:underline">Products</Link></li>
                        <li>|</li>
                        <li><Link to="/about" className="hover:underline">About</Link></li>
                    </ul>
                </div>
            </div>

            <div className="bg-white shadow-lg p-10 py-10 md:py-20">

                {loading && <p className="text-gray-500">Loading orders...</p>}
                {error && <p className="text-gray-500">{error}</p>}
                {!loading && !error && orders.length === 0 && <p className="text-gray-600">No orders found.</p>}

                {!loading && !error && orders.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left ">
                            <thead>
                                <tr className="border-b border-gray-300">
                                    <th className="py-3 px-4 font-medium text-lg">Order ID</th>
                                    <th className="py-3 px-4 font-medium text-lg">Products</th>
                                    <th className="py-3 px-4 font-medium text-lg">Address</th>
                                    <th className="py-3 px-4 font-medium text-lg text-center">Amount</th>
                                    <th className="py-3 px-4 font-medium text-lg text-center">Status</th>
                                    <th className="py-3 px-4 font-medium text-lg text-right">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id} className="border-b border-gray-300">
                                        <td className="py-4 px-4 text-gray-700 w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">{order.orderId}</td>
                                        <td className="py-4 px-4 w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">
                                            {order.items.map((item, index) => (
                                                <div key={index} className="text-gray-600">
                                                    {item.name} ({item.quantity}x)
                                                </div>
                                            ))}
                                        </td>
                                        <td className="py-4 px-4 text-gray-700 w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">{order.fullAddress}</td>
                                        
                                        <td className="py-4 px-4 text-center text-gray-700 font-medium w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">₹{order.totalAmount}</td>
                                        <td className="py-4 px-4 text-center w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm ${order.paymentStatus === "Paid"
                                                    ? "bg-green-200 text-green-700"
                                                    : "bg-yellow-200 text-yellow-700"
                                                    }`}
                                            >
                                                {order.paymentStatus || "Pending"}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-right text-gray-600 w-[100px] whitespace-nowrap overflow-hidden text-ellipsis">
                                            {new Date(order.orderDate).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );

};

export default OrderDetails;
