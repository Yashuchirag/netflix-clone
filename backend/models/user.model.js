import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    searchHistory: {
        type: [String],   // each profile keeps search history
        default: []
    }
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    searchHistory: {
        type: Array,
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    profiles: [profileSchema]
});

const User = mongoose.model("User", userSchema);
export default User;