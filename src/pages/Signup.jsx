import { useState } from "react";
import google from '../assets/gicon.webp'
import { auth, provider } from "../firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            console.log("Signing up user:", formData);
            await createUserWithEmailAndPassword(auth, formData.email, formData.password);
    
            // Save user in MongoDB
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/signup`, {
                username: formData.username,
                email: formData.email,
                password: formData.password, 
                googleAuth: false
            });
    
            console.log("MongoDB Response:", response.data);
    
            setFormData({
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
            });
    
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (error) {
            console.error("Signup Error:", error);
            toast.error(error.message || "Error, Please try again");
        }
    };
    
    const handleGoogleSignIn = async () => {
        try {
            console.log("Signing in with Google...");
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
    
            console.log("Google Sign-In Success:", user);
    
            // Save Google user to MongoDB
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/signup`, {
                username: user.displayName,
                email: user.email,
                password: "",
                googleAuth: true
            });
    
            console.log("MongoDB Response:", response.data);
    
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (error) {
            console.error("Google Sign-In Error:", error);
            toast.error(error.message || "Error, Please try again");
        }
    };


    return (
        <>
            <ToastContainer />
            <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
                <div className="bg-white p-8  shadow-md w-full max-w-md">
                    <h2 className="text-2xl text-gray-900 text-start mb-2">Create an Account</h2>
                    <p className="text-base text-gray-600 mb-6">Please enter your details</p>
                    <form onSubmit={handleSignup}>
                        <div className="mb-4">
                            <label className="text-sm text-gray-600">Username</label>
                            <input type="text" name="username" value={formData.username} onChange={handleChange}
                                className="w-full bg-white  border border-gray-300 focus:border-[#536e1c] focus:ring-1 focus:ring-[#536e1c] text-gray-900 py-2 px-4 outline-none"
                                required />
                        </div>
                        <div className="mb-4">
                            <label className="text-sm text-gray-600">Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange}
                                className="w-full bg-white border border-gray-300 focus:border-[#536e1c] focus:ring-1 focus:ring-[#536e1c] text-gray-900 py-2 px-4 outline-none"
                                required />
                        </div>
                        <div className="mb-4">
                            <label className="text-sm text-gray-600">Password</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange}
                                className="w-full bg-white  border border-gray-300 focus:border-[#536e1c] focus:ring-1 focus:ring-[#536e1c] text-gray-900 py-2 px-4 outline-none"
                                required />
                        </div>
                        <div className="mb-4">
                            <label className="text-sm text-gray-600">Confirm Password</label>
                            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                                className="w-full bg-white border border-gray-300 focus:border-[#536e1c] focus:ring-1 focus:ring-[#536e1c] text-gray-900 py-2 px-4 outline-none"
                                required />
                        </div>
                        <button type="submit" onClick={handleSignup}
                            className="w-full text-white bg-[#536e1c] py-3 px-6  cursor-pointer text-base hover:bg-[#697c45]">
                            Sign Up
                        </button>
                    </form>
                    <div className="mt-4 flex items-center justify-center gap-3 border border-gray-300 py-2 px-6 cursor-pointer hover:bg-gray-100" onClick={handleGoogleSignIn}>
                        <img className="w-9" src={google}></img>
                        <span className="text-gray-700 text-base">Continue with Google</span>
                    </div>
                </div>
            </div>
        </>
    );
}
