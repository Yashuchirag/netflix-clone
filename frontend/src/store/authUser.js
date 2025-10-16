import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const useAuthUser = create((set) => ({
    user: null,
    isSigningUp: false,
    isCheckingAuth: true,
    signup: async (credentials) => {
        set({isSigningUp:true})
        const { username, email, password } = credentials;
        try {
            const response = await axios.post("/api/v1/auth/signup", {username, email, password},{
                withCredentials: true
            });
            set({user:response.data.user})
            toast.success("Account created successfully")
        } catch (error) {
            toast.error(error.response?.data.message || "Something went wrong")
            set({isSigningUp:false, user:null})
        }
    },
    login: async (credentials) => {
        try {
            const response = await axios.post("/api/v1/auth/login", credentials);
            set({user:response.data.user})
        } catch (error) {
            console.log(error);
        }
    },
    logout: async () => {},
    authCheck: async () => {
        try {
            const response = await axios.get("/api/v1/auth/authCheck", {
                withCredentials: true
            });
            set({user:response.data.user, isCheckingAuth:false})
        } catch (error) {
            console.log(error);
            set({isCheckingAuth:false})
        }
    }
}));
