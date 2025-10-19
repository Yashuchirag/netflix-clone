import { useAuthUser } from "../../store/authUser";
import { useState } from "react";
import Navbar from "../../components/Navbar";

export default function HomeScreen() {
    
    return (
        <div className="hero-bg relative">
            <Navbar />
            {/* Separator Component */}
            <div className="h-2 w-full bg-[#232323]"
                aria-hidden="true"
            />
        </div>
    )
}