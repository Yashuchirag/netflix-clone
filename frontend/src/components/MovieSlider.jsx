import { useContentStore } from "../store/content";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMAGE_BASE_URL } from "../utils/constants";

export default function MovieSlider({ category }) {
    const { contentType } = useContentStore();
    const [content, setContent] = useState([]);
    
    const formattedContentType = contentType === "movie"? "Movies": "TV Shows";
    const formattedCategory = category.replaceAll("_", " ")[0].toUpperCase() + category.replaceAll("_", " ").slice(1);

    useEffect(() => {
        const getContent = async () => {
            const res = await axios.get(`/api/v1/${contentType}/${category}`);
            setContent(res.data.content);
        };
        getContent();
    }, [contentType, category]);

    console.log("Content Type in Movie Slider", content);
    
    return (
        <div className="bg-black text-white relative px-5 md:px-20">
            <h2 className="text-2xl font-bold mb-4">{formattedCategory} {formattedContentType}</h2>
            
            <div className="flex space-x-4 overflow-x-scroll scrollbar-hide">
                {content?.results?.map((item) => (
                    <Link to={`/watch/${item.id}`} key={item.id} className="min-w-[250px] relative group ">
                        <div className="rounded-lg overflow-hidden">
                            <img src={SMALL_IMAGE_BASE_URL + item.backdrop_path} alt={item.title || item.name} 
                                className="transition-transform duration-300 ease-in-out group-hover:scale-125" />
                        </div>
                        <p className="mt-2 text-sm">{item.title || item.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}