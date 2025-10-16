import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";


export const signup = async function (req, res) {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid email" });
        }

        if(password.length < 6){
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
        }

        const userExistsByEmail = await User.findOne({ email: email });
        if(userExistsByEmail){
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const userExistsByUsername = await User.findOne({ username: username });
        if(userExistsByUsername){
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"]
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];
        const newUser = new User({ 
            username, 
            email, 
            password: hashedPassword,
            image
        });

        
        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();
        res.status(201).json({ success: true, message: "User created successfully", user:{
            ...newUser._doc,
            password: ""
        } });
        
        
    } catch (error) {
        console.log("Error in signup controller");
        res.status(500).json({ success: false, message: error.message });
    }
};

export const login = async function (req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({ success: true, message: "User logged in successfully", user:{
            ...user._doc,
            password: ""
        } });
    } catch (error) {
        console.log("Error in login controller");
        res.status(500).json({ success: false, message: error.message });
    }
};

export const logout = async function (req, res) {
    try {
        res.clearCookie("jwt-netflix");
        res.status(200).json({ success: true, message: "User logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller");
        res.status(500).json({ success: false, message: error.message });
    }
};

export const authCheck = async function (req, res) {
    try {
        res.status(200).json({ success: true, user: req.user });
    } catch (error) {
        console.log("Error in authCheck controller", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};
