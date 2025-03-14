import { useState } from "react";
import google from '../assets/gicon.webp'
import { auth, provider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, formData.email, formData.password);
          

            setFormData({ email: "", password: "" });

            setTimeout(() => {
                navigate("/home");
            }, 1000);
        } catch (error) {
            toast.error("Invalid Credentials");
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, provider);
          
            setTimeout(() => {
                navigate("/home");
            }, 1000);
        } catch (error) {
            toast.error("Error, Please try again");
        }
    };


    return (
        <>
            <ToastContainer />
            <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
                <div className="bg-white p-8  shadow-md w-full max-w-md">
                    <h2 className="text-2xl text-gray-900 text-start mb-2">Welcome Back</h2>
                    <p className="text-base text-gray-600 mb-6">Please enter your details</p>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="text-sm text-gray-600">Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange}
                                className="w-full bg-white border border-gray-300 focus:border-[#536e1c] focus:ring-1 focus:ring-[#536e1c] text-gray-900 py-2 px-4 outline-none"
                                required />
                        </div>
                        <div className="mb-4">
                            <label className="text-sm text-gray-600">Password</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange}
                                className="w-full bg-white border border-gray-300 focus:border-[#536e1c] focus:ring-1 focus:ring-[#536e1c] text-gray-900 py-2 px-4 outline-none"
                                required />
                        </div>
                        <button type="submit" onClick={handleLogin}
                            className="w-full text-white bg-[#536e1c] py-3 cursor-pointer px-6  text-base hover:bg-[#697c45]">
                            Login
                        </button>
                    </form>
                    <div className="mt-4 flex items-center justify-center gap-3 border border-gray-300 py-2 px-6 cursor-pointer hover:bg-gray-100" onClick={handleGoogleSignIn}>
                        <img className="w-9" src={google}></img>
                        <span className="text-gray-700 text-base">Continue with Google</span>
                    </div>
                    <p className='text-[#737373] font-medium text-[16px] mt-5 text-center '>Don't have an account? <a href="/signup"><span className='text-[#536e1c] font-medium underline text-[16px] cursor-pointer'>Sign Up</span></a></p>
                </div>
            </div>
        </>
    );
}
