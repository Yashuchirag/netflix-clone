import { useContentStore } from "../store/content";
import { useEffect, useState } from "react";
import axios from "axios";

export default function useGetTrendingContent() {
    const { contentType } = useContentStore();
    const [trendingContent, setTrendingContent] = useState(null);
    
    useEffect(() => {
        const getTrendingContent = async () => {
            const res = await axios.get(`/api/v1/${contentType}/trending`);
            setTrendingContent(res.data.content);
        };
        getTrendingContent();
    }, [contentType]);
    
    return { trendingContent };
}
