import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthUser } from "../store/authUser";

export default function SignUpPage() {
    const {searchParams} = new URL(document.location);
    const emailValue = searchParams.get("email");

    const [email, setEmail] = useState(emailValue)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const {signup} = useAuthUser();

    const handleSubmit = (e) => {
        e.preventDefault()
        signup({email, username, password});
    }

    return (
        <div className="h-screen w-full hero-bg">
            <header className="max-w-6xl mx-auto items-center justify-between p-4">
                <Link to="/">
                    <img src="/netflix-logo.png" alt="logo" className="w-52" />
                </Link>
            </header>

            <div className="flex justify-center items-center mt-20 mx-3">
                <div className="w-full max-w-6xl p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
                    <h1 className="text-center text-white text-2xl font-bold mb-4">Sign Up</h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-gray-300 block">Email</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full px-3 mt-1 border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="username" className="text-sm font-medium text-gray-300 block">Username</label>
                            <input
                                type="text"
                                placeholder="johndoe"
                                className="w-full px-3 mt-1 border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="password" className="text-sm font-medium text-gray-300 block">Password</label>
                            <input
                                type="password"
                                placeholder="*******"
                                className="w-full px-3 mt-1 border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <button type="submit" className="w-full px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600">Sign Up</button>
                    </form>
                    <p className="text-center text-gray-300 mt-4">
                        Already have an account? {" "}
                        <Link to="/login" className="text-red-500 font-bold hover:underline">
                            Log In
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    )
}