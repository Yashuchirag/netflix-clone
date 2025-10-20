import { fetchFromTMDB } from "../services/tmdb.service.js";

export const getTrendingContent = async (req, res) => {
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.TMDB_API_KEY}`);
        res.status(200).json({ success: true, content: response.results });
    } catch (error) {
        console.error("Error fetching trending content:", error);
        res.status(500).json({ success: false, message: "Failed to fetch trending content" });
    }
};