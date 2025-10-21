import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import useWindowSize from '../hooks/useWindowSize';

import { pauseImg, playImg, replayImg } from '../utils';
import { hightlightsSlides } from '../constants';

import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

export const VideoCarousel = () => {
  const { width } = useWindowSize();

  // Refs for videos and progress indicators
  const videoRef = useRef([]);
  const videoDivRef = useRef([]);
  const videoSpanRef = useRef([]);

  // Manage current video and playback
  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState([]);

  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

  // GSAP animation for sliding between videos + scroll trigger
  useGSAP(() => {
    gsap.to('#slider', {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: 'power2.inOut',
    });

    gsap.to('#video', {
      scrollTrigger: {
        trigger: '#video',
        toggleActions: 'restart none none none',
      },
      onComplete: () => {
        setVideo((prev) => ({
          ...prev,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  // Play / Pause logic based on current state
  useEffect(() => {
    if (loadedData.length > 3) {
      const currentVideo = videoRef.current[videoId];
      if (!currentVideo) return;

      if (isPlaying) {
        startPlay && currentVideo.play();
      } else {
        currentVideo.pause();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  // Capture metadata (duration info)
  const loadMetaData = (i, e) => {
    setLoadedData((prev) => [...prev, e]);
  };

  // Progress bar animation for each video
  useEffect(() => {
    let currentProgress = 0;
    const div = videoDivRef.current[videoId];
    const span = videoSpanRef.current[videoId];
    const currentVideo = videoRef.current[videoId];

    if (!span || !div || !currentVideo) return;

    // Create the GSAP progress animation
    const anim = gsap.to(span, {
      onUpdate: () => {
        const progress = Math.ceil(anim.progress() * 100);

        if (progress !== currentProgress) {
          currentProgress = progress;

          gsap.to(div, {
            width: width < 760 ? '10vh' : width < 1200 ? '10vw' : '4vw',
          });

          gsap.to(span, {
            width: `${currentProgress}%`,
            backgroundColor: 'white',
          });
        }
      },
      onComplete: () => {
        if (isPlaying) {
          gsap.to(div, { width: '12px' });
          gsap.to(span, { backgroundColor: '#afafaf' });
        }
      },
    });

    // Restart on first video
    if (videoId === 0) anim.restart();

    // Update animation progress based on video playback
    const animUpdate = () => {
      anim.progress(currentVideo.currentTime / hightlightsSlides[videoId].videoDuration);
    };

    if (isPlaying) {
      gsap.ticker.add(animUpdate);
    } else {
      gsap.ticker.remove(animUpdate);
    }
  }, [videoId, startPlay]);

  // Handle video state transitions (end, play, pause, reset, etc.)
  const handleProcess = (type, i) => {
    switch (type) {
      case 'video-end':
        setVideo((prev) => ({
          ...prev,
          isEnd: true,
          videoId: i + 1,
        }));
        break;
      case 'video-last':
        setVideo((prev) => ({
          ...prev,
          isLastVideo: true,
        }));
        break;
      case 'video-reset':
        setVideo((prev) => ({
          ...prev,
          isLastVideo: false,
          videoId: 0,
        }));
        break;
      case 'play':
        setVideo((prev) => ({
          ...prev,
          isPlaying: true,
        }));
        break;
      case 'pause':
        setVideo((prev) => ({
          ...prev,
          isPlaying: false,
        }));
        break;
      default:
        return video;
    }
  };

  return (
    <>
      {/* Main Video Carousel */}
      <div className="flex items-center">
        {hightlightsSlides.map((highlight, i) => (
          <div key={highlight.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              {/* Video Container */}
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  ref={(el) => (videoRef.current[i] = el)}
                  id="video"
                  playsInline
                  preload="auto"
                  muted
                  onEnded={() =>
                    i !== 3 ? handleProcess('video-end', i) : handleProcess('video-last')
                  }
                  onPlay={() =>
                    setVideo((prev) => ({
                      ...prev,
                      isPlaying: true,
                    }))
                  }
                  onLoadedMetadata={(e) => loadMetaData(i, e)}
                  className={`${highlight.id === 2 && 'translate-x-44'} pointer-events-none`}
                >
                  <source src={highlight.video} type="video/mp4" />
                </video>
              </div>

              {/* Overlay Text */}
              <div className="absolute top-12 left-[5%] z-10">
                {highlight.textLists.map((text) => (
                  <p key={text} className="md:text-2xl text-xl font-medium">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Progress Controls */}
      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 rounded-full backdrop-blur">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              ref={(el) => (videoDivRef.current[i] = el)}
              className="mx-2 size-3 bg-gray-200 rounded-full relative cursor-pointer"
            >
              <span
                ref={(el) => (videoSpanRef.current[i] = el)}
                className="absolute size-full rounded-full"
              />
            </span>
          ))}
        </div>

        {/* Play / Pause / Replay Button */}
        <button className="control-btn">
          <img
            role="none"
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'}
            onClick={
              isLastVideo
                ? () => handleProcess('video-reset')
                : !isPlaying
                  ? () => handleProcess('play')
                  : () => handleProcess('pause')
            }
          />
        </button>
      </div>
    </>
  );
};
