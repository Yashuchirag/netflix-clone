import { useAuthUser } from "../../store/authUser";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function HomeScreen() {
    const {logout} = useAuthUser();
    const [searchTerm, setSearchTerm] = useState("");
    
    return (
        <div className="hero-bg relative">
            <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
                <Link to="/">
                    <img src="/netflix-logo.png" alt="logo" className="w-52" />
                </Link>
                <div className="relative flex items-center max-w-xs w-full mx-8">
                    <input
                        type="search"
                        placeholder="Search movies or shows..."
                        className="w-full pl-10 pr-4 py-2 text-sm border-2 border-gray-700 rounded-full bg-gray-800/80 text-white placeholder-gray-400 transition-all duration-200 focus:outline-none focus:border-white focus:ring-0"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {/* Search Icon (Inline SVG) - Lucide Search Icon equivalent */}
                    <svg className="absolute left-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
                
                <button 
                    onClick={logout}
                    className="text-white bg-red-600 py-1 px-3 rounded-md font-semibold transition-colors hover:bg-red-700"
                >
                    logout
                </button>
            </header>
            <h1>Home Screen</h1>
            <div>
                
            </div>
        </div>
    )
}