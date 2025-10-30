import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useContentStore } from '../store/content';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ReactPlayer from 'react-player';

const WatchPage = () => {
    const { id } = useParams();
    const [trailers, setTrailers] = useState([]);
    const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
    const [loading, setLoading] = useState(true);
    const [similarContent, setSimilarContent] = useState([]);
    const [content, setContent] = useState({});
    const {contentType} = useContentStore();

    
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

    const handlePrev = () => {
        if (currentTrailerIdx > 0) {
            setCurrentTrailerIdx(currentTrailerIdx - 1);
        }
    }

    const handleNext = () => {
        if (currentTrailerIdx < trailers.length - 1) {
            setCurrentTrailerIdx(currentTrailerIdx + 1);
        }
    }

    console.log("trailers: ", trailers[currentTrailerIdx]);
    // console.log("similarContent: ", similarContent);
    // console.log("content: ", content);

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
                    {trailers.length > 0 && (
                        <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
                            controls={true}
                            width={'100%'}
                            height={'70vh'}
                            className='mx-auto overflow-hidden rounded-lg'
                        />
                    )}
                </div>
            </div>
            




            {/* <div>
                <h2>Trailers</h2>
                <div className='flex'>
                    {trailers.map((trailer, idx) => (
                        <div key={idx} className='flex-1'>
                            <iframe
                                width="560"
                                height="315"
                                src={`https://www.youtube.com/embed/${trailer.key}`}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        </div>
                    ))}
                </div>
            </div> */}
        </div>
    )
}

export default WatchPage