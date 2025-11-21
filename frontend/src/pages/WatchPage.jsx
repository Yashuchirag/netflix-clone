import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import YouTube from "react-youtube";

import { ChevronLeft, ChevronRight } from 'lucide-react';

import axios from 'axios';

import { useContentStore } from '../store/content';
import Navbar from '../components/Navbar';
import { ORIGINAL_IMG_BASE_URL, SMALL_IMAGE_BASE_URL } from '../utils/constants';
import formatReleaseDate from '../utils/dateFunction';
import WatchPageSkeleton from '../components/skeletons/WatchPageSkeleton';


const WatchPage = () => {
    const { id } = useParams();
    const [trailers, setTrailers] = useState([]);
    const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
    const [loading, setLoading] = useState(false);
    const [similarContent, setSimilarContent] = useState([]);
    const [content, setContent] = useState({});
    const {contentType} = useContentStore();
    const [videoError, setVideoError] = useState(false);
    const sliderRef = useRef(null);
    const [showArrows, setShowArrows] = useState(false);

    
    useEffect(() => {
        const getTrailers = async () => {
            try {
                const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
                setTrailers(res.data.content.results);
            } catch (error) {
                if (error.message.includes("404")) {
                    console.log("No trailers found");
                    setTrailers([]);
                }
            }
        };
        getTrailers();
    }, [contentType, id])

    useEffect(() => {
        const getSimilarContent = async () => {
            try {
                const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
                setSimilarContent(res.data.content.results);
            } catch (error) {
                if (error.message.includes("404")) {
                    console.log("No similar content found");
                    setSimilarContent([]);
                }
            }
        };
        getSimilarContent();
    }, [contentType, id])

    useEffect(() => {
        const getContentDetails = async () => {
            try {
                const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
                setContent(res.data.content);
            } catch (error) {
                if (error.message.includes("404")) {
                    console.log("No content details found");
                    setContent({});
                }
            }
        };
        getContentDetails();
    }, [contentType, id])

    useEffect(() => {
        setVideoError(false);
    }, [currentTrailerIdx]);

    const handlePrev = () => {
        if (currentTrailerIdx > 0) {
            setCurrentTrailerIdx(currentTrailerIdx - 1);
        }
    }

    const handleNext = () => {
        if (currentTrailerIdx < trailers.length - 1) {
            console.log(trailers[currentTrailerIdx].key);
            setCurrentTrailerIdx(currentTrailerIdx + 1);
            console.log(trailers[currentTrailerIdx].key)
        }
    }

    const scrollLeft = () => {
		if (sliderRef.current) {
			sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
		}
	};
	const scrollRight = () => {
		sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
	};

    if (loading) {
        return (
            <div className="min-h-screen bg-black p-10">
                <WatchPageSkeleton/>
            </div>
        );
    }


    if (!content) {
        return (
            <div className='bg-black text-white h-screen'>
                <div className='max-w-6xl mx-auto'>
                    <Navbar/>
                    <div className='text-center mx-auto px-4 py-8 h-full mt-40'>
                        <h2 className='text-2xl sm:text-5xl font-bold text-balance'>Content not found</h2>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div className="bg-black min-h-screen text-white">
            <div className="mx-auto container px-4 py-8 h-full">
                <Navbar />
                {trailers.length > 0 && (
                    <div className="flex justify-between items-center mb-4">
                        <button className={`
                        bg-gray-500/70 hover:bg-gray-500/90 text-white py-2 px-4 rounded ${currentTrailerIdx === 0 ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                        disabled={currentTrailerIdx === 0}
                        onClick={handlePrev}>
                            <ChevronLeft size={24}/>
                        </button>
                        <button className={`
                        bg-gray-500/70 hover:bg-gray-500/90 text-white py-2 px-4 rounded ${currentTrailerIdx === trailers.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                        disabled={currentTrailerIdx === trailers.length - 1}
                        onClick={handleNext}>
                            <ChevronRight size={24}/>
                        </button>
                    </div>
                )}
                <div className='aspect-video mb-8 p-2 sm:px-10 md:px-32'>
                    {trailers.length === 0 && (
                        <h2 className="text-center text-2xl font-bold mt-5">
                            No trailers available for{" "}
                            <span className="text-white/70">{content?.title || content?.name}</span>
                        </h2>
                    )}
                    {trailers.length > 0 && trailers[currentTrailerIdx]?.key && (
                        <div className="relative w-full h-full">
                            <YouTube
                                videoId={trailers[currentTrailerIdx]?.key}
                                className="absolute top-0 left-0 w-full h-full"
                                iframeClassName="absolute top-0 left-0 w-full h-full"
                                opts={{
                                    width: "100%",
                                    height: "100%",
                                    playerVars: {
                                        autoplay: 0,
                                        controls: 1,
                                    },
                                }}
                            />
                            
                            {videoError && (
                                <p className="text-red-400 text-center mt-2">
                                    This trailer isn’t available for embedding. <a href={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx]?.key}`} target="_blank" rel="noopener noreferrer">Watch on YouTube</a>.
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {/* movie details*/}
                <div className="flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto">
                    <div className='mb-4 md:mb-0'>
                        <h2 className="text-5xl font-bold text-balance">{content?.title || content?.name}</h2>

                        <p className="mt-2 text-lg">
                            {formatReleaseDate(content?.release_date || content?.first_air_date)} | {" "}
                            {content?.adult ? (
                                <span className="text-red-600">18+</span>
                            ) : (
                                <span className="text-green-600">PG-13</span>
                            )}{" "}
                        </p>
                        <p className="mt-2 text-lg">
                            {content?.overview}
                        </p>
                    </div>
                    <img src={ORIGINAL_IMG_BASE_URL + content?.poster_path} alt={content?.title || content?.name} 
                        className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
                    />
                </div>

                {similarContent.length > 0 && (
                    <div className='mt-12 max-w-5xl mx-auto relative'>
                        <h3 className='text-3xl font-bold mb-4'>Similar Movies/Tv Show</h3>
                        <div className="flex space-x-4 overflow-x-scroll scrollbar-hide gap-4 pb-4 group" ref={sliderRef}>
                            {similarContent?.map((content) => {
                                if((content.backdrop_path || content.poster_path) === null) return null;
                                return (
                                    <Link to={`/watch/${content.id}`} key={content.id} className="w-52 flex-none">
                                        <div className="rounded-lg overflow-hidden group">
                                            <img src={SMALL_IMAGE_BASE_URL + (content.backdrop_path || content.poster_path)} alt={content.title || content.name} 
                                                className="w-full h-auto rounded-md"
                                            />
                                            <h4 className="mt-2 text-lg font-semibold">{content.title || content.name}</h4>
                                        </div>
                                    </Link>
                                )
                            })}

                            <ChevronLeft 
                                size={24} 
                                onClick={scrollLeft} 
                                className="absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 group-hover:opacity-100
                                transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full" 
                            />
                            <ChevronRight 
                                size={24} 
                                onClick={scrollRight} 
                                className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8 opacity-0 group-hover:opacity-100
                                transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full" 
                            />
                            
                        </div>
                        
                        
                    </div>
                )}
            </div>
        </div>
    )
}

export default WatchPage