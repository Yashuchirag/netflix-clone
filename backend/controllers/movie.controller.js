import { fetchFromTMDB } from "../services/tmdb.service.js";

export const getTrendingMovie = async (req, res) => {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1");
        const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
        res.status(200).json({ success: true, content: randomMovie });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getFavouriteMovies = async (req, res) => {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc");
        res.status(200).json({ success: true, content: data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getMovieTrailer = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
        res.status(200).json({ success: true, content: data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getMovieDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        res.status(200).json({ success: true, content: data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
    
export const getSimilarMovies = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
        res.status(200).json({ success: true, content: data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getMovieCategories = async (req, res) => {
    const { category } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
        res.status(200).json({ success: true, content: data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
    