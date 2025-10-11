import User from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";

export const searchPerson = async (req, res) => {
    const { query } = req.params;
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);

        if (response.results.length === 0) {
            return res.status(200).json({ success: true, content: [] });
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id:response.results[0].id,
                    image:response.results[0].profile_path,
                    title:response.results[0].name,
                    searchType:"person",
                    createdAt: new Date(),
                }
            }
        });
        console.log("Person results updated successfully");
        res.status(200).json({ success: true, content: response.results });
    } catch (error) {
        console.log("Error in searchPerson: ", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

export const searchMovie = async (req, res) => {
    const { query } = req.params;
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);
        if (response.results.length === 0) {
            return res.status(200).json({ success: true, content: [] });
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id:response.results[0].id,
                    image:response.results[0].poster_path,
                    title:response.results[0].title,
                    searchType:"movie",
                    createdAt: new Date(),
                }
            }        });
        console.log("Movie results updated successfully");
        res.status(200).json({ success: true, content: response.results });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const searchTV = async (req, res) => {
    const { query } = req.params;
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);
        if (response.results.length === 0) {
            return res.status(200).json({ success: true, content: [] });
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id:response.results[0].id,
                    image:response.results[0].poster_path,
                    title:response.results[0].name,
                    searchType:"tv",
                    createdAt: new Date(),
                }
            }        });
        console.log("TV results updated successfully");
        res.status(200).json({ success: true, content: response.results });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getSearchHistory = async (req, res) => {
    try {
        res.status(200).json({ success: true, content: req.user.searchHistory });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const removeItemFromSearchHistory = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await User.findByIdAndUpdate(req.user._id, 
            {$pull: { searchHistory: { id: id }}},
            {new: true}
        );
        res.status(200).json({ success: true, content: req.user.searchHistory });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}