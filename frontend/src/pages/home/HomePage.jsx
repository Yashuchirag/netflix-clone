import { useState } from "react";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";
import { Link } from "react-router-dom";

export default function HomePage() {
    const [user, setUser] = useState(false);
    
    return (
        <div>
            {user ? <HomeScreen /> : <AuthScreen />}
        </div>
    )
}