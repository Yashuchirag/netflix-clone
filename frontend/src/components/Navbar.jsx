import { Link, useNavigate } from "react-router-dom";
import { useAuthUser } from "../store/authUser";
import { useState } from "react";
import { MenuIcon, SearchIcon, X, LogOut } from "lucide-react";
import { useContentStore } from "../store/content";


export default function Navbar() {
    const { user, logout } = useAuthUser();
    const [searchTerm, setSearchTerm] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { contentType, setContentType } = useContentStore();
    const navigate = useNavigate();

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const handleSearchClick = () => {
        navigate('/search');
    }

    return (
        <header className="w-full text-white shadow-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
                {/* Left Section: Logo */}
                <Link to="/" className="flex items-center">
                <img
                    src="/netflix-logo.png"
                    alt="logo"
                    className="w-24 sm:w-32 object-contain"
                />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link to="/" className="hover:text-red-500 transition-colors" onClick={() => setContentType("movie")}>Movies</Link>
                    <Link to="/" className="hover:text-red-500 transition-colors" onClick={() => setContentType("tv")}>TV Shows</Link>
                    <Link to="/history" className="hover:text-red-500 transition-colors">Search History</Link>
                </nav>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    {/* Search (hidden on very small screens) */}
                    <div className="hidden sm:flex relative items-center max-w-xs w-full">
                        <input
                        type="search"
                        placeholder="Search..."
                        className="hidden sm:block w-full pl-10 pr-4 py-2 text-sm border-2 border-gray-700 rounded-full bg-gray-800/80 placeholder-gray-400 focus:outline-none focus:border-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={handleSearchClick}
                        />
                        <SearchIcon className="absolute left-3 w-5 h-5 text-gray-400" />
                    </div>

                    {/* User Avatar + Logout */}
                    {user && (
                        <>
                        <img
                            src={user.image}
                            alt="Avatar"
                            className="h-8 w-8 object-cover cursor-pointer border border-gray-700"
                        />
                        <LogOut
                            className="w-6 h-6 cursor-pointer hover:text-red-500 transition-colors"
                            onClick={logout}
                        />
                        </>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden flex items-center justify-center p-2 rounded hover:bg-gray-800 transition-colors"
                    >
                        {isMobileMenuOpen ? (
                        <X className="w-6 h-6 text-white" />
                        ) : (
                        <MenuIcon className="w-6 h-6 text-white" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-black border-t border-gray-800 flex flex-col items-center gap-4 py-4 animate-slide-down">
                    <Link
                        to="/"
                        onClick={toggleMobileMenu}
                        className="hover:text-red-500 transition-colors"
                    >
                        Movies
                    </Link>
                    <Link
                        to="/"
                        onClick={toggleMobileMenu}
                        className="hover:text-red-500 transition-colors"
                    >
                        TV Shows
                    </Link>
                    <Link
                        to="/history"
                        onClick={toggleMobileMenu}
                        className="hover:text-red-500 transition-colors"
                    >
                        Search History
                    </Link>

                    {/* Compact Search for Mobile */}
                    <div className="relative w-11/12 mt-2">
                        <SearchIcon onClick={handleSearchClick} className="absolute left-3 w-5 h-5 text-gray-400" />
                    </div>
                </div>
            )}
        </header>
    );
}
