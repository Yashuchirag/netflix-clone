import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthUser } from "../store/authUser";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {login, isLoggingIn, user} = useAuthUser();

    const handleSubmit = (e) => {
        e.preventDefault()
        login({email, password})
    }

    useEffect(() => {
        if(user){
            navigate("/")
        }
    }, [user])

    return (
        <div className="h-screen w-full hero-bg">
            <header className="max-w-6xl mx-auto items-center justify-between p-4">
                <Link to="/">
                    <img src="/Clone.png" alt="logo" className="w-52" />
                </Link>
            </header>

            <div className="flex justify-center items-center mt-20 mx-3">
                <div className="w-full max-w-6xl p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
                    <h1 className="text-center text-white text-2xl font-bold mb-4">Log In</h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-gray-300 block">Email</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full px-3 mt-1 border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoggingIn}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="text-sm font-medium text-gray-300 block">Password</label>
                            <input
                                type="password"
                                placeholder="*******"
                                className="w-full px-3 mt-1 border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoggingIn}
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="w-full px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                            disabled={isLoggingIn}
                        >
                            {isLoggingIn ? "Logging In..." : "Log In"}
                        </button>
                    </form>
                    <p className="text-center text-gray-300 mt-4">
                        Don't have an account? {" "}
                        <Link to="/signup" className="text-red-500 font-bold hover:underline">
                            Sign Up
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    )
}