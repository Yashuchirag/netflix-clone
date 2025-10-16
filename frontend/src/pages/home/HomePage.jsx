import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";
import { useAuthUser } from "../../store/authUser";

export default function HomePage() {
    const {user} = useAuthUser();
    
    return (
        <div>
            {user ? <HomeScreen /> : <AuthScreen />}
        </div>
    )
}