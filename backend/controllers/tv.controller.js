import { fetchFromTMDB } from "../services/tmdb.service.js";

export const getTrendingTV = async (req, res) => {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/tv/popular?language=en-US&page=1");
        const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
        res.status(200).json({ success: true, content: randomMovie });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getTVTrailer = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
        res.status(200).json({ success: true, content: data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getTVDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        res.status(200).json({ success: true, content: data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
    
export const getSimilarTV = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
        res.status(200).json({ success: true, content: data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getTVCategories = async (req, res) => {
    const { category } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
        res.status(200).json({ success: true, content: data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
    