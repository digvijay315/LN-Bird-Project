"use client"

import { useState, useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import { base_url } from "../Utils/base_url"
import axios from "axios"
import ReactPlayer from "react-player"
import PptSlides from "../Pptslides"
import "../Courses/curiculam.css"

const Curriculum = () => {
  const location = useLocation()
  const { course } = location.state || {}
  const [curriculum, setCurriculum] = useState(null)
  const [activeLesson, setActiveLesson] = useState(null)
  const [showCurriculum, setShowCurriculum] = useState(true)
  const [activeMediaType, setActiveMediaType] = useState("video")
  const [activePptUrl, setActivePptUrl] = useState(null)
  const youtubePlayerRef = useRef(null)
  const youtubeTimerRef = useRef(null)

  // Get current logged-in user from localStorage or session
  const [currentUser, setCurrentUser] = useState(null)

  // New state for completion tracking (now user-specific)
  const [completedLessons, setCompletedLessons] = useState(new Set())
  const [currentLessonProgress, setCurrentLessonProgress] = useState({
    videoWatched: false,
    youtubeWatched: false,
    pptViewed: false,
    descriptionRead: false,
  })

  // YouTube player state
  const [youtubePlayerReady, setYoutubePlayerReady] = useState(false)
  const [youtubeVideoProgress, setYoutubeVideoProgress] = useState(0)
  const [youtubeWatchedSegments, setYoutubeWatchedSegments] = useState([])
  const [youtubeVideoDuration, setYoutubeVideoDuration] = useState(0)
  const [youtubeVideoEnoughWatched, setYoutubeVideoEnoughWatched] = useState(false)

  // Video resume state
  const [videoPositions, setVideoPositions] = useState({})
  const [savedProgress, setSavedProgress] = useState({})

  // Get current user from localStorage or session
  useEffect(() => {
    // Get user data from localStorage (adjust this based on how your auth system stores user data)
    const userData = localStorage.getItem("employeeData")
    
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setCurrentUser(parsedUser)
      } catch (error) {
        console.error("Error parsing user data:", error)
      }
    }
  }, [])

  // User-specific key generator for localStorage
  const getUserSpecificKey = (baseKey) => {
    if (!currentUser || !currentUser._id) return baseKey
    return `user_${currentUser._id}_${baseKey}`
  }

  const fetchCurriculum = async (courseId) => {
    if (!courseId) {
      console.error("No Course ID provided")
      return
    }
    try {
      const response = await axios.get(`${base_url}/view_Course/${courseId}`)
      const courseData = response.data.data

      if (!courseData || !courseData.sections) {
        console.error("Invalid course data structure")
        return
      }
      setCurriculum(courseData)

      // Load completion data for current user
      if (currentUser && currentUser._id) {
        loadUserProgress(currentUser._id, courseId)
      }
    } catch (error) {
      console.error("Error fetching curriculum:", error)
    }
  }

  // Load user progress from localStorage
  const loadUserProgress = (userId, courseId) => {
    const completionsKey = getUserSpecificKey(`course_${courseId}_completions`)
    const savedCompletions = localStorage.getItem(completionsKey)

    if (savedCompletions) {
      setCompletedLessons(new Set(JSON.parse(savedCompletions)))
    } else {
      setCompletedLessons(new Set())
    }
  }

  useEffect(() => {
    if (course?._id && currentUser?._id) {
      fetchCurriculum(course._id)
    }
  }, [course, currentUser])

  // Load YouTube API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script")
      tag.src = "https://www.youtube.com/iframe_api"
      const firstScriptTag = document.getElementsByTagName("script")[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

      window.onYouTubeIframeAPIReady = () => {
        setYoutubePlayerReady(true)
      }
    } else {
      setYoutubePlayerReady(true)
    }

    // Cleanup function
    return () => {
      if (youtubeTimerRef.current) {
        clearInterval(youtubeTimerRef.current)
      }
    }
  }, [])

  // Get flat list of all lessons with their indices
  const getFlatLessons = () => {
    if (!curriculum?.sections) return []

    const flatLessons = []
    curriculum.sections.forEach((section, sectionIndex) => {
      section.add_Content.forEach((chapter, chapterIndex) => {
        flatLessons.push({
          id: `${sectionIndex}-${chapterIndex}`,
          title: chapter.chapter_title,
          content: chapter.chapter_description,
          sectionTitle: section.section_title,
          videoUrl: chapter.video_file?.[0],
          youtubeLink: chapter.youtube_link,
          pptFiles: chapter.ppt_file,
          sectionIndex,
          chapterIndex,
        })
      })
    })
    return flatLessons
  }

  // Check if a lesson is accessible
  const isLessonAccessible = (lessonId) => {
    const flatLessons = getFlatLessons()
    const lessonIndex = flatLessons.findIndex((lesson) => lesson.id === lessonId)

    // First lesson is always accessible
    if (lessonIndex === 0) return true

    // Check if all previous lessons are completed
    for (let i = 0; i < lessonIndex; i++) {
      if (!completedLessons.has(flatLessons[i].id)) {
        return false
      }
    }
    return true
  }

  // Check if current lesson is completed
  const isLessonCompleted = (lesson) => {
    if (!lesson) return false

    const hasVideo = lesson.videoUrl
    const hasYoutube = lesson.youtubeLink
    const hasPpt = lesson.pptFiles && lesson.pptFiles.length > 0

    const requiredProgress = {
      descriptionRead: true, // Always required
    }

    if (hasVideo) requiredProgress.videoWatched = true
    if (hasYoutube) requiredProgress.youtubeWatched = true
    if (hasPpt) requiredProgress.pptViewed = true

    // Check if all required progress is met
    return Object.keys(requiredProgress).every((key) => currentLessonProgress[key])
  }

  // Mark lesson as completed (user-specific)
  const markLessonCompleted = (lessonId) => {
    if (!currentUser?._id || !course?._id) return

    const newCompletedLessons = new Set([...completedLessons, lessonId])
    setCompletedLessons(newCompletedLessons)

    // Save to localStorage with user-specific key
    const completionsKey = getUserSpecificKey(`course_${course._id}_completions`)
    localStorage.setItem(completionsKey, JSON.stringify([...newCompletedLessons]))
  }

  // Save video progress to localStorage (user-specific)
  const saveVideoProgress = (lessonId, position, progress, mediaType) => {
    if (!currentUser?._id || !course?._id) return

    const progressKey = getUserSpecificKey(`course_${course._id}_video_progress`)
    const existingProgress = JSON.parse(localStorage.getItem(progressKey) || "{}")

    existingProgress[lessonId] = {
      position,
      progress,
      mediaType,
      timestamp: Date.now(),
    }

    localStorage.setItem(progressKey, JSON.stringify(existingProgress))

    setVideoPositions((prev) => ({
      ...prev,
      [lessonId]: position,
    }))

    setSavedProgress((prev) => ({
      ...prev,
      [lessonId]: progress,
    }))
  }

  // Load video progress from localStorage (user-specific)
  const loadVideoProgress = (lessonId) => {
    if (!currentUser?._id || !course?._id) return null

    const progressKey = getUserSpecificKey(`course_${course._id}_video_progress`)
    const existingProgress = JSON.parse(localStorage.getItem(progressKey) || "{}")

    return existingProgress[lessonId] || null
  }

  // Track YouTube video progress
  const trackYoutubeProgress = () => {
    if (!youtubePlayerRef.current || typeof youtubePlayerRef.current.getCurrentTime !== "function") {
      return
    }

    try {
      const currentTime = youtubePlayerRef.current.getCurrentTime()
      const duration = youtubePlayerRef.current.getDuration()
      const playerState = youtubePlayerRef.current.getPlayerState()

      // Update duration if needed
      if (duration > 0 && duration !== youtubeVideoDuration) {
        setYoutubeVideoDuration(duration)
      }

      // Only track progress when video is playing
      if (playerState === window.YT.PlayerState.PLAYING && duration > 0) {
        setYoutubeWatchedSegments((prevSegments) => {
          const updatedSegments = [...prevSegments]
          const lastSegment = updatedSegments.length > 0 ? updatedSegments[updatedSegments.length - 1] : null

          if (!lastSegment || Math.abs(currentTime - lastSegment.end) > 2) {
            // Start a new segment if there's no previous segment or if there's a gap > 2 seconds
            updatedSegments.push({ start: currentTime, end: currentTime })
          } else {
            // Update the end time of the current segment
            updatedSegments[updatedSegments.length - 1].end = currentTime
          }

          // Calculate watched percentage with updated segments
          let totalWatchedTime = 0
          const mergedSegments = []

          // Sort segments by start time
          const sortedSegments = [...updatedSegments].sort((a, b) => a.start - b.start)

          // Merge overlapping segments
          for (const segment of sortedSegments) {
            if (mergedSegments.length === 0) {
              mergedSegments.push({ ...segment })
              continue
            }

            const lastMergedSegment = mergedSegments[mergedSegments.length - 1]

            // If current segment overlaps with last merged segment
            if (segment.start <= lastMergedSegment.end + 1) {
              lastMergedSegment.end = Math.max(lastMergedSegment.end, segment.end)
            } else {
              mergedSegments.push({ ...segment })
            }
          }

          // Calculate total watched time from merged segments
          for (const segment of mergedSegments) {
            totalWatchedTime += Math.max(0, segment.end - segment.start)
          }

          // Calculate percentage
          const watchedPercentage = Math.min((totalWatchedTime / duration) * 100, 100)

          // Update progress state
          setYoutubeVideoProgress(watchedPercentage)

          // Save progress every 5 seconds
          if (Math.floor(currentTime) % 5 === 0) {
            saveVideoProgress(activeLesson.id, currentTime, watchedPercentage, "youtube")
          }

          // Check if enough of the video has been watched (80%)
          if (watchedPercentage >= 80 && !youtubeVideoEnoughWatched) {
            setYoutubeVideoEnoughWatched(true)
          }

          console.log(
            `Progress: ${watchedPercentage.toFixed(1)}%, Duration: ${duration.toFixed(1)}s, Watched: ${totalWatchedTime.toFixed(1)}s`,
          )

          return updatedSegments
        })
      }

      // Save progress when video is paused
      if (playerState === window.YT.PlayerState.PAUSED && duration > 0) {
        const watchedPercentage = youtubeVideoProgress
        saveVideoProgress(activeLesson.id, currentTime, watchedPercentage, "youtube")
      }
    } catch (error) {
      console.error("Error tracking YouTube progress:", error)
    }
  }

  // Handle lesson click with accessibility check
  const handleLessonClick = (chapterContent, sectionTitle, sectionIndex, chapterIndex) => {
    if (!currentUser?._id) {
      alert("Please log in to track your progress!")
      return
    }

    const lessonId = `${sectionIndex}-${chapterIndex}`

    if (!isLessonAccessible(lessonId)) {
      alert("Please complete the previous lessons first!")
      return
    }

    const lesson = {
      id: lessonId,
      title: chapterContent.chapter_title,
      content: chapterContent.chapter_description,
      sectionTitle: sectionTitle,
      videoUrl: chapterContent.video_file?.[0],
      youtubeLink: chapterContent.youtube_link,
      pptFiles: chapterContent.ppt_file,
    }

    setActiveLesson(lesson)

    // Load saved progress
    const savedVideoProgress = loadVideoProgress(lessonId)

    // Reset progress for new lesson
    setCurrentLessonProgress({
      videoWatched: false,
      youtubeWatched: false,
      pptViewed: false,
      descriptionRead: false,
    })

    // Reset YouTube state but restore saved progress if available
    if (savedVideoProgress && savedVideoProgress.mediaType === "youtube") {
      setYoutubeVideoProgress(savedVideoProgress.progress)
      setYoutubeWatchedSegments([]) // Will be rebuilt as video plays
      setYoutubeVideoDuration(0)
      setYoutubeVideoEnoughWatched(savedVideoProgress.progress >= 80)
    } else {
      setYoutubeVideoProgress(0)
      setYoutubeWatchedSegments([])
      setYoutubeVideoDuration(0)
      setYoutubeVideoEnoughWatched(false)
    }

    // Clear any existing timer
    if (youtubeTimerRef.current) {
      clearInterval(youtubeTimerRef.current)
      youtubeTimerRef.current = null
    }

    // Set initial media type
    if (lesson.videoUrl) {
      setActiveMediaType("video")
    } else if (lesson.youtubeLink) {
      setActiveMediaType("youtube")
    } else if (lesson.pptFiles && lesson.pptFiles.length > 0) {
      setActiveMediaType("ppt")
    }
  }

  // Track media completion
  const handleMediaComplete = (mediaType) => {
    setCurrentLessonProgress((prev) => ({
      ...prev,
      [mediaType]: true,
    }))
  }

  // Track description read
  const handleDescriptionRead = () => {
    setCurrentLessonProgress((prev) => ({
      ...prev,
      descriptionRead: true,
    }))
  }

  // Check and mark lesson completion
  useEffect(() => {
    if (activeLesson && isLessonCompleted(activeLesson)) {
      markLessonCompleted(activeLesson.id)
    }
  }, [currentLessonProgress, activeLesson])

  const getNeighborLessons = () => {
    const flatLessons = getFlatLessons()
    const currentIndex = flatLessons.findIndex((lesson) => lesson.id === activeLesson?.id)

    return {
      previousLesson: currentIndex > 0 ? flatLessons[currentIndex - 1] : null,
      nextLesson: currentIndex < flatLessons.length - 1 ? flatLessons[currentIndex + 1] : null,
    }
  }

  const navigateLesson = (direction) => {
    const { previousLesson, nextLesson } = getNeighborLessons()
    const targetLesson = direction < 0 ? previousLesson : nextLesson

    if (targetLesson) {
      if (direction > 0 && !isLessonAccessible(targetLesson.id)) {
        alert("Please complete the current lesson first!")
        return
      }
      setActiveLesson(targetLesson)
      setCurrentLessonProgress({
        videoWatched: false,
        youtubeWatched: false,
        pptViewed: false,
        descriptionRead: false,
      })

      // Reset YouTube state
      setYoutubeVideoProgress(0)
      setYoutubeWatchedSegments([])
      setYoutubeVideoDuration(0)
      setYoutubeVideoEnoughWatched(false)
    }
  }

  const getYouTubeVideoId = (url) => {
    if (!url) return ""

    const standardPattern =
      /(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    const match = url.match(standardPattern)

    return match ? match[1] : ""
  }

  // Initialize YouTube player
  const initializeYouTubePlayer = (videoId) => {
    if (!window.YT || !youtubePlayerReady) return

    // Clear any existing timer
    if (youtubeTimerRef.current) {
      clearInterval(youtubeTimerRef.current)
    }

    if (youtubePlayerRef.current) {
      youtubePlayerRef.current.destroy()
    }

    youtubePlayerRef.current = new window.YT.Player("youtube-player", {
      height: "500",
      width: "100%",
      videoId: videoId,
      playerVars: {
        autoplay: 0,
        controls: 1,
        rel: 0,
        showinfo: 0,
        modestbranding: 1,
      },
      events: {
        onReady: (event) => {
          console.log("YouTube player ready")

          // Seek to saved position if available
          const savedVideoProgress = loadVideoProgress(activeLesson.id)
          if (savedVideoProgress && savedVideoProgress.mediaType === "youtube" && savedVideoProgress.position > 0) {
            setTimeout(() => {
              youtubePlayerRef.current.seekTo(savedVideoProgress.position, true)
              console.log(`Resumed YouTube video at ${savedVideoProgress.position} seconds`)
            }, 1000)
          }

          // Start tracking progress
          youtubeTimerRef.current = setInterval(trackYoutubeProgress, 1000)
        },
        onStateChange: (event) => {
          if (event.data === window.YT.PlayerState.ENDED) {
            // Mark as enough watched when video ends naturally
            setYoutubeVideoEnoughWatched(true)
          }
        },
      },
    })
  }

  // Effect to initialize YouTube player when switching to YouTube media type
  useEffect(() => {
    if (activeMediaType === "youtube" && activeLesson?.youtubeLink && youtubePlayerReady) {
      const videoId = getYouTubeVideoId(activeLesson.youtubeLink)
      if (videoId) {
        setTimeout(() => {
          initializeYouTubePlayer(videoId)
        }, 100)
      }
    }

    // Cleanup function
    return () => {
      if (youtubeTimerRef.current) {
        clearInterval(youtubeTimerRef.current)
      }
    }
  }, [activeMediaType, activeLesson?.youtubeLink, youtubePlayerReady])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (youtubeTimerRef.current) {
        clearInterval(youtubeTimerRef.current)
      }
    }
  }, [])

  const renderMedia = () => {
    if (!activeLesson) return null

    switch (activeMediaType) {
      case "video":
        const savedVideoProgress = loadVideoProgress(activeLesson.id)
        const startTime =
          savedVideoProgress && savedVideoProgress.mediaType === "video" ? savedVideoProgress.position : 0

        return activeLesson.videoUrl ? (
          <div className="media-container">
            <ReactPlayer
              url={activeLesson.videoUrl}
              controls
              width="100%"
              height="500px"
              onReady={() => {
                if (startTime > 0) {
                  console.log(`Resuming regular video at ${startTime} seconds`)
                }
              }}
              onProgress={(progress) => {
                const currentTime = progress.playedSeconds
                const watchedPercentage = progress.played * 100

                // Save progress every 5 seconds
                if (Math.floor(currentTime) % 5 === 0) {
                  saveVideoProgress(activeLesson.id, currentTime, watchedPercentage, "video")
                }

                if (progress.played > 0.9) {
                  // 90% watched
                  handleMediaComplete("videoWatched")
                }
              }}
              onPause={(e) => {
                // Save progress when paused
                const currentTime = e.target.getCurrentTime()
                const duration = e.target.getDuration()
                const watchedPercentage = (currentTime / duration) * 100
                saveVideoProgress(activeLesson.id, currentTime, watchedPercentage, "video")
              }}
              onEnded={() => handleMediaComplete("videoWatched")}
              config={{
                file: {
                  attributes: {
                    controlsList: "nodownload",
                    disablePictureInPicture: true,
                  },
                },
              }}
            />
            {startTime > 0 && (
              <div className="resume-indicator">
                <p
                  style={{
                    background: "#e3f2fd",
                    padding: "8px",
                    borderRadius: "4px",
                    margin: "10px 0",
                    fontSize: "14px",
                  }}
                >
                  ▶️ Resuming from {Math.floor(startTime / 60)}:{(startTime % 60).toFixed(0).padStart(2, "0")}
                </p>
              </div>
            )}
            {currentLessonProgress.videoWatched && <div className="completion-indicator">✅ Video completed</div>}
          </div>
        ) : null
      case "youtube":
        const savedYoutubeProgress = loadVideoProgress(activeLesson.id)

        return activeLesson.youtubeLink ? (
          <div className="media-container">
            <div id="youtube-player" style={{ borderRadius: "8px" }}></div>

            {savedYoutubeProgress && savedYoutubeProgress.position > 0 && (
              <div className="resume-indicator">
                <p
                  style={{
                    background: "#e3f2fd",
                    padding: "8px",
                    borderRadius: "4px",
                    margin: "10px 0",
                    fontSize: "14px",
                  }}
                >
                  ▶️ Will resume from {Math.floor(savedYoutubeProgress.position / 60)}:
                  {(savedYoutubeProgress.position % 60).toFixed(0).padStart(2, "0")}
                  (Progress: {savedYoutubeProgress.progress.toFixed(0)}%)
                </p>
              </div>
            )}

            {/* Progress bar */}
            <div className="youtube-progress-container">
              <div className="youtube-progress-bar">
                <div className="youtube-progress-fill" style={{ width: `${youtubeVideoProgress}%` }}></div>
              </div>
              <div className="youtube-progress-text">{youtubeVideoProgress.toFixed(0)}% watched</div>
            </div>

            {youtubeVideoEnoughWatched && !currentLessonProgress.youtubeWatched && (
              <button className="mark-complete-btn" onClick={() => handleMediaComplete("youtubeWatched")}>
                Mark YouTube Video as Completed
              </button>
            )}
            {currentLessonProgress.youtubeWatched && (
              <div className="completion-indicator">✅ YouTube video completed</div>
            )}
            {!youtubeVideoEnoughWatched && (
              <div className="youtube-instruction">
                <p
                  style={{
                    background: "#f0f8ff",
                    padding: "10px",
                    borderRadius: "4px",
                    margin: "10px 0",
                    border: "1px solid #7a1cac",
                  }}
                >
                  📺 Please watch at least 80% of the YouTube video. The completion button will appear when you've
                  watched enough.
                </p>
              </div>
            )}
          </div>
        ) : null
      case "ppt":
        return activePptUrl ? (
          <div>
            <PptSlides pptUrl={activePptUrl} />
            <button className="mark-complete-btn" onClick={() => handleMediaComplete("pptViewed")}>
              Mark Presentation as Viewed
            </button>
            {currentLessonProgress.pptViewed && <div className="completion-indicator">✅ Presentation completed</div>}
          </div>
        ) : (
          <div className="ppt-prompt">
            <p>Select a presentation to view</p>
          </div>
        )
      default:
        return null
    }
  }

  const { previousLesson, nextLesson } = getNeighborLessons()

  // If no user is logged in, show a message
  if (!currentUser) {
    return (
      <div className="login-required" style={{ padding: "40px", textAlign: "center" }}>
        <h2>👋 Please Log In</h2>
        <p>You need to log in to access your personalized learning path.</p>
      </div>
    )
  }

  return (
    <div>
      {/* User Header */}
      <div
        className="user-header"
        style={{
          backgroundColor: "#f8f9fa",
          padding: "10px 20px",
          borderBottom: "2px solid #dee2e6",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="current-user-info">
          <h3 style={{ margin: 0, color: "#495057" }}>
            👨‍🎓 {currentUser.name || currentUser.username || currentUser.email}
          </h3>
          {currentUser.email && <p style={{ margin: 0, fontSize: "14px", color: "#6c757d" }}>{currentUser.email}</p>}
        </div>
      </div>

      <div className="curriculum-container">
        {showCurriculum && (
          <div className="curriculum-sidebar">
            <div className="curriculum-header">
              <h3 style={{ color: "#ffffff" }}>📖 Curriculum</h3>
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
                  <div>
                    {section.add_Content.map((chapter, chapterIndex) => {
                      const lessonId = `${sectionIndex}-${chapterIndex}`
                      const isAccessible = isLessonAccessible(lessonId)
                      const isCompleted = completedLessons.has(lessonId)

                      return (
                        <div
                          key={chapterIndex}
                          className={`lesson-item ${
                            isCompleted ? "completed" : isAccessible ? "accessible" : "locked"
                          }`}
                          onClick={() => {
                            if (isAccessible) {
                              handleLessonClick(chapter, section.section_title, sectionIndex, chapterIndex)
                            }
                          }}
                        >
                          <span>{chapter.chapter_title}</span>
                          <span className="lesson-status">{isCompleted ? "✅" : isAccessible ? "🔓" : "🔒"}</span>
                        </div>
                      )
                    })}
                  </div>
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
                <h4>
                  {activeLesson.sectionTitle}: {activeLesson.title}
                </h4>

                {/* Progress Tracker */}
                <div className="lesson-progress">
                  <h5>Lesson Progress:</h5>
                  {activeLesson.videoUrl && (
                    <div className={`progress-item ${currentLessonProgress.videoWatched ? "completed" : "pending"}`}>
                      {currentLessonProgress.videoWatched ? "✅" : "⏳"} Watch Course Video
                    </div>
                  )}
                  {activeLesson.youtubeLink && (
                    <div className={`progress-item ${currentLessonProgress.youtubeWatched ? "completed" : "pending"}`}>
                      {currentLessonProgress.youtubeWatched ? "✅" : "⏳"} Watch YouTube Video
                    </div>
                  )}
                  {activeLesson.pptFiles && activeLesson.pptFiles.length > 0 && (
                    <div className={`progress-item ${currentLessonProgress.pptViewed ? "completed" : "pending"}`}>
                      {currentLessonProgress.pptViewed ? "✅" : "⏳"} View Presentation
                    </div>
                  )}
                  <div className={`progress-item ${currentLessonProgress.descriptionRead ? "completed" : "pending"}`}>
                    {currentLessonProgress.descriptionRead ? "✅" : "⏳"} Read Description
                  </div>
                </div>

                <div className="media-controls">
                  {activeLesson.videoUrl && (
                    <button
                      className={`media-button ${activeMediaType === "video" ? "active" : ""}`}
                      onClick={() => setActiveMediaType("video")}
                    >
                      Course Video
                    </button>
                  )}
                  {activeLesson.youtubeLink && (
                    <button
                      className={`media-button ${activeMediaType === "youtube" ? "active" : ""}`}
                      onClick={() => setActiveMediaType("youtube")}
                    >
                      YouTube Video
                    </button>
                  )}
                  {activeLesson.pptFiles && activeLesson.pptFiles.length > 0 && (
                    <button
                      className={`media-button ${activeMediaType === "ppt" ? "active" : ""}`}
                      onClick={() => setActiveMediaType("ppt")}
                    >
                      Presentation Files
                    </button>
                  )}
                </div>

                {activeMediaType === "ppt" && activeLesson.pptFiles && activeLesson.pptFiles.length > 0 && (
                  <div className="ppt-files">
                    <div className="ppt-header">
                      <h5>Available Presentations:</h5>
                    </div>
                    <div className="ppt-actions">
                      {activeLesson.pptFiles.map((ppt, index) => (
                        <div key={index} className="ppt-action-group">
                          <button
                            className="view-button"
                            onClick={() => setActivePptUrl(ppt)}
                            style={{ marginRight: "10px" }}
                          >
                            View PPT {index + 1}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {renderMedia()}

                <div className="descition-div">
                  <h5>Chapter Description</h5>
                  <p>{activeLesson.content}</p>
                  <button
                    className="mark-complete-btn"
                    onClick={handleDescriptionRead}
                    disabled={currentLessonProgress.descriptionRead}
                  >
                    {currentLessonProgress.descriptionRead ? "✅ Description Read" : "Mark Description as Read"}
                  </button>
                </div>
              </>
            ) : (
              <p>Select a lesson to view its content</p>
            )}
          </div>

          <div className="navigations-btn-div">
            <div className="navigation-buttons">
              <button onClick={() => navigateLesson(-1)} disabled={!previousLesson}>
                ⬅️ {previousLesson ? `${previousLesson.sectionTitle}: ${previousLesson.title}` : "No Previous Lesson"}
              </button>
              <button
                onClick={() => navigateLesson(1)}
                disabled={!nextLesson || (nextLesson && !isLessonAccessible(nextLesson.id))}
              >
                {nextLesson ? `${nextLesson.sectionTitle}: ${nextLesson.title}` : "No Next Lesson"} ➡️
              </button>
            </div>
          </div>
        </div>

        {!showCurriculum && (
          <button className="floating-book-icon" onClick={() => setShowCurriculum(true)}>
            📖
          </button>
        )}
      </div>
    </div>
  )
}

export default Curriculum
