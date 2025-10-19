import { Link } from "react-router-dom";
import { useAuthUser } from "../store/authUser";
import { useState } from "react";
import { MenuIcon, SearchIcon, Menu, LogOut} from "lucide-react";


export default function Navbar() {
    const {user, logout} = useAuthUser();
    const [searchTerm, setSearchTerm] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="max-w-6xl mx-auto flex items-center justify-between p-4 h-20">
            <div className="flex flex-wrap items-center justify-between gap-4 z-50 px-4">
                <Link to="/">
                    <img src="/netflix-logo.png" alt="logo" className="w-20 sm:w-40" />
                </Link>

                {/* Desktop navbar items */}
                <div className="hidden sm:flex items-center gap-4">
                    <Link to="/" className="hover:underline">Movies</Link>
                    <Link to="/" className="hover:underline">TV Shows</Link>
                    <Link to="/history" className="hover:underline">Search History</Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link to={"/search"}>
                        
                        <div className="relative flex items-center max-w-xs w-full mx-8">
                            <input
                                type="search"
                                placeholder="Search movies or shows..."
                                className="w-full pl-10 pr-4 py-2 text-sm border-2 border-gray-700 rounded-full bg-gray-800/80 text-white placeholder-gray-400 focus:outline-none focus:border-white"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <SearchIcon className="absolute left-3 w-5 h-5 text-gray-400" />
                        </div>
                    </Link>
                    <img src={user.image} alt="Avatar" className="h-8 rounded cursor-pointer ml-6" />
                    <LogOut className="size-6 cursor-pointer ml-2" onClick={logout}/>
                </div>

                {/* Mobile menu button */}
                {isMobileMenuOpen ? (
                    <div className="w-full sm:hidden mt-36 z-50 bg-black border rounded border-gray-800">
                        <Link 
                            to="/" 
                            className="block hover:underline p-2"
                            onClick={toggleMobileMenu}
                        >Movies</Link>
                        <Link 
                            to="/" 
                            className="block hover:underline p-2"
                            onClick={toggleMobileMenu}
                        >TV Shows</Link>
                        <Link 
                            to="/history" 
                            className="block hover:underline p-2"
                            onClick={toggleMobileMenu}
                        >Search History</Link>
                    </div>
                ) : (
                    <button onClick={toggleMobileMenu} className="sm:hidden">
                        <MenuIcon className="w-6 h-6 text-white" />
                    </button>
                )}
            </div>
        </header>
    )
}