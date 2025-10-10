import express from "express";
import { 
    getFavouriteMovies,
    getMovieCategories,
    getMovieDetails,
    getMovieTrailer,
    getSimilarMovies,
    getTrendingMovie
} from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/trending", getTrendingMovie);
router.get("/favourites", getFavouriteMovies);
router.get("/:id/trailers", getMovieTrailer);
router.get("/:id/details", getMovieDetails);
router.get("/:id/similar", getSimilarMovies);
router.get("/:category", getMovieCategories);

export default router;
