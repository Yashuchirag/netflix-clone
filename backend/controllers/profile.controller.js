import User from "../models/user.model.js";

export const createProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { name, avatar } = req.body;
        if (!name || !avatar) {
            return res.status(400).json({ success: false, message: "Name and avatar are required" });
        }
        const updatedUser = await User.findByIdAndUpdate(userId, {
            $push: {
                profiles: {
                    name,
                    avatar,
                    searchHistory: []
                }
            }
        }, {
            new: true
        });

        res.status(200).json({
            success: true,
            profiles: updatedUser.profiles
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.status(200).json({ success: true, profiles: user.profiles });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const profileId = req.params.profileId;
        const { name, avatar } = req.body;

        const updatedUser = await User.findOneAndUpdate(
            { _id: userId, "profiles._id": profileId },
            {
                $set: {
                    "profiles.$.name": name,
                    "profiles.$.avatar": avatar
                }
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            profiles: updatedUser.profiles
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const profileId = req.params.profileId;

        const updatedUser = await User.findByIdAndUpdate(userId, {
            $pull: {
                profiles: { _id: profileId }
            }
        }, {
            new: true
        });

        res.status(200).json({
            success: true,
            profiles: updatedUser.profiles
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
