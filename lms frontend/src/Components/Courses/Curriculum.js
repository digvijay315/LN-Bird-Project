import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { base_url } from "../Utils/base_url";
import axios from 'axios';
import ReactPlayer from 'react-player';
import PptSlides from '../Pptslides';

const Curriculum = () => {
    const location = useLocation();
    const { course } = location.state || {};
    const [curriculum, setCurriculum] = useState(null);
    const [activeLesson, setActiveLesson] = useState(null);
    const [showCurriculum, setShowCurriculum] = useState(true);
    const [activeMediaType, setActiveMediaType] = useState('video');
    const [activePptUrl, setActivePptUrl] = useState(null);

    
    const fetchCurriculum = async (courseId) => {
        if (!courseId) {
            console.error('No Course ID provided');
            return;
        }
        try {
            const response = await axios.get(`${base_url}/view_Course/${courseId}`);

            // Access the course data directly from response.data
            const courseData = response.data.data; // Note: Changed to match your API response structure

            if (!courseData || !courseData.sections) {
                console.error('Invalid course data structure');
                return;
            }
            // Set the entire course data
            setCurriculum(courseData);
        } catch (error) {
            console.error('Error fetching curriculum:', error);
        }
    };

    useEffect(() => {
        if (course?._id) {
            fetchCurriculum(course._id);
        }
    }, [course]);

    const handleLessonClick = (chapterContent, sectionTitle) => {
        setActiveLesson({
            title: chapterContent.chapter_title,
            content: chapterContent.chapter_description,
            sectionTitle: sectionTitle,
            videoUrl: chapterContent.video_file?.[0],
            youtubeLink: chapterContent.youtube_link,
            pptFiles: chapterContent.ppt_file
        });
    };

    const getNeighborLessons = () => {
        if (!curriculum?.sections) return { previousLesson: null, nextLesson: null };

        const flatLessons = curriculum.sections.flatMap(section =>
            section.add_Content.map(chapter => ({
                title: chapter.chapter_title,
                content: chapter.chapter_description,
                sectionTitle: section.section_title,
                videoUrl: chapter.video_file?.[0],
                youtubeLink: chapter.youtube_link,
                pptFiles: chapter.ppt_file
            }))
        );

        const currentIndex = flatLessons.findIndex(
            lesson => lesson.title === activeLesson?.title
        );

        return {
            previousLesson: currentIndex > 0 ? flatLessons[currentIndex - 1] : null,
            nextLesson: currentIndex < flatLessons.length - 1 ? flatLessons[currentIndex + 1] : null
        };
    };

    const navigateLesson = (direction) => {
        const { previousLesson, nextLesson } = getNeighborLessons();
        if (direction < 0 && previousLesson) {
            setActiveLesson(previousLesson);
        } else if (direction > 0 && nextLesson) {
            setActiveLesson(nextLesson);
        }
    };

    const getYouTubeEmbedUrl = (url) => {
        if (!url) return '';
        
        // Handle different YouTube URL formats
        let videoId = '';
        
        // Pattern for standard YouTube URLs
        const standardPattern = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        
        const match = url.match(standardPattern);
        if (match) {
            videoId = match[1];
        }
        
        return `https://www.youtube.com/embed/${videoId}`;
    };

    const renderMedia = () => {
        if (!activeLesson) return null;

        switch (activeMediaType) {
            case 'video':
                return activeLesson.videoUrl ? (
                    <div className="media-container">
                        <ReactPlayer
                            url={activeLesson.videoUrl}
                            controls
                            width="100%"
                            height="500px"
                            config={{
                                file: {
                                    attributes: {
                                        controlsList: 'nodownload', // Prevents download button
                                        disablePictureInPicture: true
                                    }
                                }
                            }}
                        />
                    </div>
                ) : null;
            case 'youtube':
                const embedUrl = getYouTubeEmbedUrl(activeLesson.youtubeLink);
                console.log('YouTube Embed URL:', embedUrl);
                return activeLesson.youtubeLink ? (
                    <div className="media-container">
                        <iframe
                            width="100%"
                            height="500"
                            src={getYouTubeEmbedUrl(activeLesson.youtubeLink)}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ borderRadius: '8px' }}
                        />
                    </div>
                ) : null;
            case 'ppt':
                // return activePptUrl ? (
                //     <div className="ppt-container">
                //         <div className="ppt-viewer">
                //             <iframe
                //                 src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(activePptUrl)}`}
                //                 width="100%"
                //                 height="500px"
                //                 frameBorder="0"
                //             />
                //         </div>
                //     </div>
                // ) 
                case 'ppt':
                    return activePptUrl ? (
                            <PptSlides pptUrl={activePptUrl} />
                        ) : (
                    <div className="ppt-prompt">
                        <p>Select a presentation to view</p>
                    </div>
                );
            default:
                return null;
        }
    };

    const { previousLesson, nextLesson } = getNeighborLessons();

    return (
      <div>

        <style>
            {
                `
                .curriculum-container {
            display: flex;
            height: 100vh;
            }

            .curriculum-sidebar {
            width: 22%;
            background: #f8f9fa;
            border-right: 1px solid #ddd;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            }

            .curriculum-header {
            position: sticky;
            top: 0;
            z-index: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            background: #7a1cac;
            color: white;
            }

            .curriculum-header button {
            background-color: transparent;
            }

            .curriculum-sections {
            flex: 1;
            overflow-y: auto;
            }

            .section {
            border-bottom: 1px solid #ddd;
            padding: 10px;
            }

            .section-header h5 {
            background: #f8f9fa;
            cursor: pointer;
            }

            .dropdown {
            width: 100%;
            margin: 10px 0;
            padding: 8px;
            border: 1px solid #ddd;
            background: #f8f9fa;
            }

            .content-area {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            position: relative !important;
            }

            .content-header {
            border-bottom: 1px solid rgba(0,0,0,0.3);
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            padding: 10px;
            }

            .lesson-content {
            position: absolute;
            top: 80px;
            left: 20px;
            right: 20px;
            bottom: 100px;
            // border: 2px solid #000;
            overflow: scroll;
            }

            .lesson-content h2 {
            margin-bottom: 10px;
            }

            .navigation-buttons {
            display: flex;
            justify-content: space-between;
            }

            .navigation-buttons button {
            background-color: #ffffff;
            box-shadow: inset 0 5px 10px rgba(0, 0, 0, 0.1), 0 2px 5px rgba(0, 0, 0, 0.5);
            color: #7a1cac;
            border-radius: 1.5rem;
            padding: 8px 1rem;
            }

            .navigation-buttons button:hover {
            background-color: #7a1cac;
            color: #ffffff;
            }

            .navigations-btn-div {
            border-top: 1px solid rgba(0, 0, 0, 0.3);
            padding: 30px 25px;
            position: absolute !important;
            z-index: 99;
            bottom: 0px;
            right: 0;
            left: 0;
            background-color: #fff;
            }

            .floating-book-icon {
            position: fixed;
            bottom: 120px;
            left: 20px;
            background: #7a1cac;
            color: white;
            padding: 10px 15px;
            border-radius: 50%;
            font-size: 20px;
            cursor: pointer;
            border: none;
            }

            .floating-book-icon:hover {
            background-color: #2e073f;
            }

            .media-container, .ppt-container {
            margin: 20px 0;
            width: 100%;
            height: auto;
            position: relative;
            }

            .ppt-viewer {
            width: 100%;
            height: 600px; /* Fixed height for better visibility */
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 20px;
            background: #fff;
            position: relative;
            }

            .ppt-viewer iframe {
            width: 100%;
            height: 100%;
            border: none;
            position: absolute;
            top: 0;
            left: 0;
            }

            .media-controls {
            margin: 20px 0;
            display: flex;
            gap: 10px;
            }

            .media-button {
            padding: 8px 16px;
            border: 1px solid #7a1cac;
            background: white;
            color: #7a1cac;
            border-radius: 4px;
            cursor: pointer;
            }

            .media-button:hover {
            background-color: #7a1cac;
            color: white;
            }

            .media-button.active {
            background: #7a1cac;
            color: white;
            }

            .ppt-files {
            margin: 20px 0;
            }

            .ppt-header {
            margin-bottom: 15px;
            }

            .ppt-actions {
            display: flex;
            gap: 10px;
            margin: 10px 0;
            }

            .view-button {
            padding: 8px 16px;
            background: #7a1cac;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            }

            .view-button:hover {
            background: #621589;
            }

            .download-button {
            padding: 8px 16px;
            background: white;
            color: #7a1cac;
            border: 1px solid #7a1cac;
            border-radius: 4px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 5px;
            text-decoration: none;
            }

            .download-button:hover {
            background: #f8f4fa;
            }

            .slide-navigation {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            margin: 20px 0;
            padding: 10px;
            background: #f8f9fa;
            border-radius: 4px;
            }

            .slide-navigation button {
            padding: 8px 16px;
            background: #7a1cac;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            min-width: 120px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            }

            .slide-navigation span {
            font-weight: 500;
            color: #333;
            }

            .slide-navigation button:disabled {
            background: #ccc;
            cursor: not-allowed;
            }

            .ppt-action-group {
            display: flex;
            }

            .descition-div {
            margin-top: 3rem;
            }
            .descition-div h5{
            border-bottom: 2px solid #7a1cac;
            padding-bottom: 12px;
            margin-bottom: 1.5rem;
            }
                `
            }
        </style>

        <div className="curriculum-container">
                {showCurriculum && (
                    <div className="curriculum-sidebar">
                        <div className="curriculum-header">
                            <h3 style={{color:"#ffffff"}}>📖 Curriculum</h3>
                            <button onClick={() => setShowCurriculum(false)}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <div className="curriculum-sections">
                            {curriculum?.sections?.map((section, sectionIndex) => (
                                <div key={sectionIndex} className="section">
                                    <div className="section-header">
                                        <h5>{section.section_title}</h5>
                                    </div>
                                    <select
                                        className="dropdown"
                                        onChange={(e) => {
                                            const selectedChapter = section.add_Content[e.target.value];
                                            if (selectedChapter) {
                                                handleLessonClick(selectedChapter, section.section_title);
                                            }
                                        }}
                                    >
                                        <option value="">Select a lesson</option>
                                        {section.add_Content.map((chapter, index) => (
                                            <option key={index} value={index}>
                                                {chapter.chapter_title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="content-area">
                    <div className="content-header">
                        <h3>{curriculum?.course_title_main}</h3>
                    </div>
                    <div className="lesson-content">
                        {activeLesson ? (
                            <>
                                <h4>{activeLesson.sectionTitle}: {activeLesson.title}</h4>
                                
                                <div className="media-controls">
                                    {activeLesson.videoUrl && (
                                        <button 
                                            className={`media-button ${activeMediaType === 'video' ? 'active' : ''}`}
                                            onClick={() => setActiveMediaType('video')}
                                        >
                                            Course Video
                                        </button>
                                    )}
                                    {activeLesson.youtubeLink && (
                                        <button 
                                            className={`media-button ${activeMediaType === 'youtube' ? 'active' : ''}`}
                                            onClick={() => setActiveMediaType('youtube')}
                                        >
                                            YouTube Video
                                        </button>
                                    )}
                                    {activeLesson.pptFiles && activeLesson.pptFiles.length > 0 && (
                                        <button 
                                            className={`media-button ${activeMediaType === 'ppt' ? 'active' : ''}`}
                                            onClick={() => setActiveMediaType('ppt')}
                                        >
                                            Presentation Files
                                        </button>
                                    )}
                                </div>

                                {activeMediaType === 'ppt' && activeLesson.pptFiles && activeLesson.pptFiles.length > 0 && (
                                    <div className="ppt-files">
                                        <div className="ppt-header">
                                            <h5>Available Presentations:</h5>
                                        </div>
                                        <div className="ppt-actions">
                                            {activeLesson.pptFiles.map((ppt, index) => (
                                                <div key={index} className="ppt-action-group">
                                                    <button 
                                                        className="view-button"
                                                        onClick={() => {
                                                            setActivePptUrl(ppt);
                                                            // setCurrentSlide(1);
                                                        }}
                                                        style={{marginRight: "10px"}}
                                                    >
                                                        View PPT {index + 1}
                                                    </button>
                                                    {/* <a 
                                                        href={ppt}
                                                        download
                                                        className="download-button"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <span>⬇️</span>
                                                        Download
                                                    </a> */}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {renderMedia()}

                                <div className='descition-div'>
                                    <h5>Chapter Description</h5>
                                    <p>{activeLesson.content}</p>
                                </div>
                            </>
                        ) : (
                            <p>Select a lesson to view its content</p>
                        )}
                    </div>

                    <div className="navigations-btn-div">
                        <div className="navigation-buttons">
                            <button
                                onClick={() => navigateLesson(-1)}
                                disabled={!previousLesson}
                            >
                                ⬅️ {previousLesson
                                    ? `${previousLesson.sectionTitle}: ${previousLesson.title}`
                                    : "No Previous Lesson"}
                            </button>
                            <button
                                onClick={() => navigateLesson(1)}
                                disabled={!nextLesson}
                            >
                                {nextLesson
                                    ? `${nextLesson.sectionTitle}: ${nextLesson.title}`
                                    : "No Next Lesson"} ➡️
                            </button>
                        </div>
                    </div>
                </div>

                {!showCurriculum && (
                    <button
                        className="floating-book-icon"
                        onClick={() => setShowCurriculum(true)}
                    >
                        📖
                    </button>
                )}
        </div>
        </div>
    );
};

export default Curriculum;




// import React, { useState, useEffect, useRef } from 'react';
// import { useLocation } from "react-router-dom";
// import { base_url } from "../Utils/base_url";
// import axios from 'axios';
// import ReactPlayer from 'react-player';

// const Curriculum = () => {
//     const location = useLocation();
//     const { course } = location.state || {};
//     const [curriculum, setCurriculum] = useState(null);
//     const [activeLesson, setActiveLesson] = useState(null);
//     const [showCurriculum, setShowCurriculum] = useState(true);
//     const [activeMediaType, setActiveMediaType] = useState('video');
//     const [activePptIndex, setActivePptIndex] = useState(0);
//     const [currentSlide, setCurrentSlide] = useState(1);
//     const [isLoading, setIsLoading] = useState(false);
//     const videoRef = useRef(null);

//     const fetchCurriculum = async (courseId) => {
//         if (!courseId) {
//             console.error('No Course ID provided');
//             return;
//         }
//         try {
//             const response = await axios.get(`${base_url}/view_Course/${courseId}`);
//             const courseData = response.data.data;

//             if (!courseData || !courseData.sections) {
//                 console.error('Invalid course data structure');
//                 return;
//             }
//             setCurriculum(courseData);
//         } catch (error) {
//             console.error('Error fetching curriculum:', error);
//         }
//     };

//     useEffect(() => {
//         if (course?._id) {
//             fetchCurriculum(course._id);
//         }
//     }, [course]);

//     const handleLessonClick = (chapterContent, sectionTitle) => {
//         setActiveLesson({
//             title: chapterContent.chapter_title,
//             content: chapterContent.chapter_description,
//             sectionTitle: sectionTitle,
//             videoUrl: chapterContent.video_file?.[0],
//             youtubeLink: chapterContent.youtube_link,
//             pptFiles: chapterContent.ppt_file,
//             pptSlides: chapterContent.ppt_slides || []
//         });
        
//         // Reset to default media type when changing lessons
//         if (chapterContent.video_file?.[0]) {
//             setActiveMediaType('video');
//         } else if (chapterContent.youtube_link) {
//             setActiveMediaType('youtube');
//         } else if (chapterContent.ppt_slides?.length > 0 || chapterContent.ppt_file?.length > 0) {
//             setActiveMediaType('ppt');
//         }
        
//         // Reset slide position
//         setCurrentSlide(1);
//         setActivePptIndex(0);
//     };

//     const getNeighborLessons = () => {
//         if (!curriculum?.sections) return { previousLesson: null, nextLesson: null };

//         const flatLessons = curriculum.sections.flatMap(section =>
//             section.add_Content.map(chapter => ({
//                 title: chapter.chapter_title,
//                 content: chapter.chapter_description,
//                 sectionTitle: section.section_title,
//                 videoUrl: chapter.video_file?.[0],
//                 youtubeLink: chapter.youtube_link,
//                 pptFiles: chapter.ppt_file,
//                 pptSlides: chapter.ppt_slides || []
//             }))
//         );

//         const currentIndex = flatLessons.findIndex(
//             lesson => lesson.title === activeLesson?.title
//         );

//         return {
//             previousLesson: currentIndex > 0 ? flatLessons[currentIndex - 1] : null,
//             nextLesson: currentIndex < flatLessons.length - 1 ? flatLessons[currentIndex + 1] : null
//         };
//     };

//     const navigateLesson = (direction) => {
//         const { previousLesson, nextLesson } = getNeighborLessons();
//         if (direction < 0 && previousLesson) {
//             setActiveLesson(previousLesson);
//             setCurrentSlide(1);
//             setActivePptIndex(0);
//         } else if (direction > 0 && nextLesson) {
//             setActiveLesson(nextLesson);
//             setCurrentSlide(1);
//             setActivePptIndex(0);
//         }
//     };

//     const getYouTubeEmbedUrl = (url) => {
//         if (!url) return '';
        
//         // Handle different YouTube URL formats
//         let videoId = '';
        
//         // Pattern for standard YouTube URLs
//         const standardPattern = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        
//         const match = url.match(standardPattern);
//         if (match) {
//             videoId = match[1];
//         }
        
//         // Add parameters to disable download options and related videos
//         return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&disablekb=1`;
//     };

//     // Custom video controls
//     const handlePlayPause = () => {
//         if (videoRef.current) {
//             if (videoRef.current.paused) {
//                 videoRef.current.play();
//             } else {
//                 videoRef.current.pause();
//             }
//         }
//     };

//     const handleVolumeChange = (e) => {
//         if (videoRef.current) {
//             videoRef.current.volume = e.target.value;
//         }
//     };

//     const handleTimeUpdate = () => {
//         const progressBar = document.getElementById('video-progress');
//         if (videoRef.current && progressBar) {
//             const percent = (videoRef.current.currentTime / videoRef.current.duration) * 100;
//             progressBar.style.width = `${percent}%`;
//         }
//     };

//     const handleProgressBarClick = (e) => {
//         if (videoRef.current) {
//             const progressContainer = document.getElementById('progress-container');
//             const rect = progressContainer.getBoundingClientRect();
//             const pos = (e.clientX - rect.left) / rect.width;
//             videoRef.current.currentTime = pos * videoRef.current.duration;
//         }
//     };

//     // PPT navigation
//     const handlePrevSlide = () => {
//         if (currentSlide > 1) {
//             setCurrentSlide(currentSlide - 1);
//         }
//     };

//     const handleNextSlide = () => {
//         const currentPptSlides = activeLesson?.pptSlides[activePptIndex]?.slides || [];
//         if (currentSlide < currentPptSlides.length) {
//             setCurrentSlide(currentSlide + 1);
//         }
//     };

//     const handleSelectPpt = (index) => {
//         setActivePptIndex(index);
//         setCurrentSlide(1);
//     };

//     const renderMedia = () => {
//         if (!activeLesson) return null;

//         switch (activeMediaType) {
//             case 'video':
//                 return activeLesson.videoUrl ? (
//                     <div className="custom-video-player">
//                         <div className="video-container">
//                             <video
//                                 ref={videoRef}
//                                 src={activeLesson.videoUrl}
//                                 className="lesson-video"
//                                 onTimeUpdate={handleTimeUpdate}
//                                 style={{ 
//                                     width: '100%', 
//                                     height: '450px', 
//                                     borderRadius: '8px',
//                                     objectFit: 'cover'
//                                 }}
//                                 controlsList="nodownload nofullscreen" 
//                                 onContextMenu={(e) => e.preventDefault()}
//                             />
//                             <div className="custom-controls">
//                                 <div 
//                                     id="progress-container" 
//                                     className="progress-container"
//                                     onClick={handleProgressBarClick}
//                                 >
//                                     <div id="video-progress" className="progress-bar"></div>
//                                 </div>
//                                 <div className="controls-row">
//                                     <button className="control-button" onClick={handlePlayPause}>
//                                         <i className="fa fa-play"></i>
//                                     </button>
//                                     <div className="volume-control">
//                                         <i className="fa fa-volume-up"></i>
//                                         <input 
//                                             type="range" 
//                                             min="0" 
//                                             max="1" 
//                                             step="0.1" 
//                                             defaultValue="1"
//                                             onChange={handleVolumeChange}
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ) : null;
//             case 'youtube':
//                 return activeLesson.youtubeLink ? (
//                     <div className="youtube-container">
//                         <iframe
//                             width="100%"
//                             height="500"
//                             src={getYouTubeEmbedUrl(activeLesson.youtubeLink)}
//                             frameBorder="0"
//                             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                             allowFullScreen
//                             style={{ borderRadius: '8px' }}
//                         />
//                     </div>
//                 ) : null;
//             case 'ppt':
//                 // Check if we have pre-converted slides available
//                 if (activeLesson.pptSlides && activeLesson.pptSlides.length > 0) {
//                     const currentPptData = activeLesson.pptSlides[activePptIndex];
//                     const slides = currentPptData?.slides || [];
//                     const currentSlideData = slides.find(slide => slide.slideNumber === currentSlide) || slides[0];
                    
//                     return (
//                         <div className="custom-ppt-viewer">
//                             {isLoading ? (
//                                 <div className="ppt-loading">
//                                     <p>Loading presentation...</p>
//                                     <div className="loading-spinner"></div>
//                                 </div>
//                             ) : (
//                                 <>
//                                     <div className="ppt-display">
//                                         <img 
//                                             src={currentSlideData?.url || '/api/placeholder/800/600?text=No+Slide+Available'}
//                                             alt={`Slide ${currentSlide}`}
//                                             style={{
//                                                 width: '100%',
//                                                 height: '450px',
//                                                 objectFit: 'contain',
//                                                 backgroundColor: '#fff',
//                                                 borderRadius: '8px'
//                                             }}
//                                             onContextMenu={(e) => e.preventDefault()}
//                                         />
//                                     </div>
//                                     <div className="ppt-controls">
//                                         <button 
//                                             onClick={handlePrevSlide}
//                                             disabled={currentSlide === 1}
//                                             className="ppt-nav-button"
//                                         >
//                                             Previous
//                                         </button>
//                                         <span className="slide-counter">
//                                             {currentSlide} / {slides.length}
//                                         </span>
//                                         <button 
//                                             onClick={handleNextSlide}
//                                             disabled={currentSlide === slides.length}
//                                             className="ppt-nav-button"
//                                         >
//                                             Next
//                                         </button>
//                                     </div>
//                                 </>
//                             )}
//                         </div>
//                     );
//                 } else {
//                     // Fallback message if no slides are available
//                     return (
//                         <div className="ppt-prompt">
//                             <p>This presentation is not available in slide view format.</p>
//                         </div>
//                     );
//                 }
//             default:
//                 return null;
//         }
//     };

//     const { previousLesson, nextLesson } = getNeighborLessons();

//     return (
//         <div>
//             <div className="curriculum-container">
//                 {showCurriculum && (
//                     <div className="curriculum-sidebar">
//                         <div className="curriculum-header">
//                             <h3 style={{color:"#ffffff"}}>📖 Curriculum</h3>
//                             <button onClick={() => setShowCurriculum(false)}>
//                                 <i className="fa-solid fa-xmark"></i>
//                             </button>
//                         </div>
//                         <div className="curriculum-sections">
//                             {curriculum?.sections?.map((section, sectionIndex) => (
//                                 <div key={sectionIndex} className="section">
//                                     <div className="section-header">
//                                         <h5>{section.section_title}</h5>
//                                     </div>
//                                     <select
//                                         className="dropdown"
//                                         onChange={(e) => {
//                                             const selectedChapter = section.add_Content[e.target.value];
//                                             if (selectedChapter) {
//                                                 handleLessonClick(selectedChapter, section.section_title);
//                                             }
//                                         }}
//                                     >
//                                         <option value="">Select a lesson</option>
//                                         {section.add_Content.map((chapter, index) => (
//                                             <option key={index} value={index}>
//                                                 {chapter.chapter_title}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 )}

//                 <div className="content-area">
//                     <div className="content-header">
//                         <h3>{curriculum?.course_title_main}</h3>
//                     </div>
//                     <div className="lesson-content">
//                         {activeLesson ? (
//                             <>
//                                 <h4>{activeLesson.sectionTitle}: {activeLesson.title}</h4>
                                
//                                 <div className="media-controls">
//                                     {activeLesson.videoUrl && (
//                                         <button 
//                                             className={`media-button ${activeMediaType === 'video' ? 'active' : ''}`}
//                                             onClick={() => setActiveMediaType('video')}
//                                         >
//                                             Course Video
//                                         </button>
//                                     )}
//                                     {activeLesson.youtubeLink && (
//                                         <button 
//                                             className={`media-button ${activeMediaType === 'youtube' ? 'active' : ''}`}
//                                             onClick={() => setActiveMediaType('youtube')}
//                                         >
//                                             YouTube Video
//                                         </button>
//                                     )}
//                                     {(activeLesson.pptSlides?.length > 0 || activeLesson.pptFiles?.length > 0) && (
//                                         <button 
//                                             className={`media-button ${activeMediaType === 'ppt' ? 'active' : ''}`}
//                                             onClick={() => setActiveMediaType('ppt')}
//                                         >
//                                             Presentation Files
//                                         </button>
//                                     )}
//                                 </div>

//                                 {activeMediaType === 'ppt' && activeLesson.pptSlides && activeLesson.pptSlides.length > 0 && (
//                                     <div className="ppt-files">
//                                         <div className="ppt-header">
//                                             <h5>Available Presentations:</h5>
//                                         </div>
//                                         <div className="ppt-actions">
//                                             {activeLesson.pptSlides.map((ppt, index) => (
//                                                 <div key={index} className="ppt-action-group">
//                                                     <button 
//                                                         className={`view-button ${index === activePptIndex ? 'active' : ''}`}
//                                                         onClick={() => handleSelectPpt(index)}
//                                                         style={{marginRight: "10px"}}
//                                                     >
//                                                         View Presentation {index + 1}
//                                                     </button>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 )}

//                                 {renderMedia()}

//                                 <div className='description-div'>
//                                     <h5>Chapter Description</h5>
//                                     <p>{activeLesson.content}</p>
//                                 </div>
//                             </>
//                         ) : (
//                             <p>Select a lesson to view its content</p>
//                         )}
//                     </div>

//                     <div className="navigations-btn-div">
//                         <div className="navigation-buttons">
//                             <button
//                                 onClick={() => navigateLesson(-1)}
//                                 disabled={!previousLesson}
//                             >
//                                 ⬅️ {previousLesson
//                                     ? `${previousLesson.sectionTitle}: ${previousLesson.title}`
//                                     : "No Previous Lesson"}
//                             </button>
//                             <button
//                                 onClick={() => navigateLesson(1)}
//                                 disabled={!nextLesson}
//                             >
//                                 {nextLesson
//                                     ? `${nextLesson.sectionTitle}: ${nextLesson.title}`
//                                     : "No Next Lesson"} ➡️
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {!showCurriculum && (
//                     <button
//                         className="floating-book-icon"
//                         onClick={() => setShowCurriculum(true)}
//                     >
//                         📖
//                     </button>
//                 )}
//             </div>

//             <style jsx>{`
//             .curriculum-container {
//             display: flex;
//             height: 100vh;
//             }

//             .curriculum-sidebar {
//             width: 22%;
//             background: #f8f9fa;
//             border-right: 1px solid #ddd;
//             overflow: hidden;
//             display: flex;
//             flex-direction: column;
//             }

//             .curriculum-header {
//             position: sticky;
//             top: 0;
//             z-index: 1;
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             padding: 10px;
//             background: #7a1cac;
//             color: white;
//             }

//             .curriculum-header button {
//             background-color: transparent;
//             }

//             .curriculum-sections {
//             flex: 1;
//             overflow-y: auto;
//             }

//             .section {
//             border-bottom: 1px solid #ddd;
//             padding: 10px;
//             }

//             .section-header h5 {
//             background: #f8f9fa;
//             cursor: pointer;
//             }

//             .dropdown {
//             width: 100%;
//             margin: 10px 0;
//             padding: 8px;
//             border: 1px solid #ddd;
//             background: #f8f9fa;
//             }

//             .content-area {
//             flex: 1;
//             padding: 20px;
//             overflow-y: auto;
//             position: relative !important;
//             }

//             .content-header {
//             border-bottom: 1px solid rgba(0,0,0,0.3);
//             position: absolute;
//             top: 0;
//             left: 0;
//             right: 0;
//             padding: 10px;
//             }

//             .lesson-content {
//             position: absolute;
//             top: 80px;
//             left: 20px;
//             right: 20px;
//             bottom: 100px;
//             // border: 2px solid #000;
//             overflow: scroll;
//             }

//             .lesson-content h2 {
//             margin-bottom: 10px;
//             }

//             .navigation-buttons {
//             display: flex;
//             justify-content: space-between;
//             }

//             .navigation-buttons button {
//             background-color: #ffffff;
//             box-shadow: inset 0 5px 10px rgba(0, 0, 0, 0.1), 0 2px 5px rgba(0, 0, 0, 0.5);
//             color: #7a1cac;
//             border-radius: 1.5rem;
//             padding: 8px 1rem;
//             }

//             .navigation-buttons button:hover {
//             background-color: #7a1cac;
//             color: #ffffff;
//             }

//             .navigations-btn-div {
//             border-top: 1px solid rgba(0, 0, 0, 0.3);
//             padding: 30px 25px;
//             position: absolute !important;
//             z-index: 99;
//             bottom: 0px;
//             right: 0;
//             left: 0;
//             background-color: #fff;
//             }

//             .floating-book-icon {
//             position: fixed;
//             bottom: 120px;
//             left: 20px;
//             background: #7a1cac;
//             color: white;
//             padding: 10px 15px;
//             border-radius: 50%;
//             font-size: 20px;
//             cursor: pointer;
//             border: none;
//             }

//             .floating-book-icon:hover {
//             background-color: #2e073f;
//             }

//             .media-container, .ppt-container {
//             margin: 20px 0;
//             width: 100%;
//             height: auto;
//             position: relative;
//             }

//             .ppt-viewer {
//             width: 100%;
//             height: 600px; /* Fixed height for better visibility */
//             border-radius: 8px;
//             overflow: hidden;
//             box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//             margin-bottom: 20px;
//             background: #fff;
//             position: relative;
//             }

//             .ppt-viewer iframe {
//             width: 100%;
//             height: 100%;
//             border: none;
//             position: absolute;
//             top: 0;
//             left: 0;
//             }

//             .media-controls {
//             margin: 20px 0;
//             display: flex;
//             gap: 10px;
//             }

//             .media-button {
//             padding: 8px 16px;
//             border: 1px solid #7a1cac;
//             background: white;
//             color: #7a1cac;
//             border-radius: 4px;
//             cursor: pointer;
//             }

//             .media-button:hover {
//             background-color: #7a1cac;
//             color: white;
//             }

//             .media-button.active {
//             background: #7a1cac;
//             color: white;
//             }

//             .ppt-files {
//             margin: 20px 0;
//             }

//             .ppt-header {
//             margin-bottom: 15px;
//             }

//             .ppt-actions {
//             display: flex;
//             gap: 10px;
//             margin: 10px 0;
//             }

//             .view-button {
//             padding: 8px 16px;
//             background: #7a1cac;
//             color: white;
//             border: none;
//             border-radius: 4px;
//             cursor: pointer;
//             }

//             .view-button:hover {
//             background: #621589;
//             }

//             .download-button {
//             padding: 8px 16px;
//             background: white;
//             color: #7a1cac;
//             border: 1px solid #7a1cac;
//             border-radius: 4px;
//             cursor: pointer;
//             display: flex;
//             align-items: center;
//             gap: 5px;
//             text-decoration: none;
//             }

//             .download-button:hover {
//             background: #f8f4fa;
//             }

//             .slide-navigation {
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             gap: 20px;
//             margin: 20px 0;
//             padding: 10px;
//             background: #f8f9fa;
//             border-radius: 4px;
//             }

//             .slide-navigation button {
//             padding: 8px 16px;
//             background: #7a1cac;
//             color: white;
//             border: none;
//             border-radius: 4px;
//             cursor: pointer;
//             min-width: 120px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             gap: 5px;
//             }

//             .slide-navigation span {
//             font-weight: 500;
//             color: #333;
//             }

//             .slide-navigation button:disabled {
//             background: #ccc;
//             cursor: not-allowed;
//             }

//             .ppt-action-group {
//             display: flex;
//             }

//             .descition-div {
//             margin-top: 3rem;
//             }
//             .descition-div h5{
//             border-bottom: 2px solid #7a1cac;
//             padding-bottom: 12px;
//             margin-bottom: 1.5rem;
//             }
//             `}</style>
//         </div>
//     );
// };

// export default Curriculum;
