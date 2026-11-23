import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, RotateCcw, Sparkles, Play, Pause, AlertCircle, ArrowRight } from 'lucide-react';
import { siteConfig } from '../config';
import { useAudio } from '../context/AudioContext';
import { resolveAsset } from '../utils/assetHelper';
import { saveVideoBlob, getVideoBlob } from '../utils/videoStorage';

export default function Page1MysteryCard({ onNavigateNext }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [showSkipFallback, setShowSkipFallback] = useState(false);
  const [currentVideoSrc, setCurrentVideoSrc] = useState(resolveAsset(siteConfig.page1.openingVideo.src));

  const videoRef = useRef(null);
  const { notifyVideoPlaying, notifyVideoEndedOrPaused, playMusic } = useAudio();

  const { recipient, page1 } = siteConfig;

  // Check if user previously saved a custom opening video to IndexedDB
  useEffect(() => {
    let objectUrl = null;
    async function checkSavedOpeningVideo() {
      try {
        const savedBlob = await getVideoBlob('opening_video');
        if (savedBlob) {
          objectUrl = URL.createObjectURL(savedBlob);
          setCurrentVideoSrc(objectUrl);
          setHasVideoError(false);
        }
      } catch (err) {
        console.warn('Could not read saved opening video:', err);
      }
    }
    checkSavedOpeningVideo();

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  // Handle card click
  const handleOpenCard = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Initial user gesture: also prime audio context
    playMusic();

    // Start video playback after card unfolding animation
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsVideoPlaying(true);
              notifyVideoPlaying();
            })
            .catch((err) => {
              console.warn('Video autoplay blocked or failed:', err);
              setIsVideoPlaying(false);
            });
        }
      }
    }, 900);
  };

  // Video event handlers
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration || 1;
    setVideoProgress((current / total) * 100);

    // If user has watched at least 4 seconds, show subtle fallback skip button just in case
    if (current > 4 && !showSkipFallback) {
      setShowSkipFallback(true);
    }
  };

  const handleVideoEnded = () => {
    setIsVideoPlaying(false);
    notifyVideoEndedOrPaused();

    // Wait 800ms for emotional resonance, then smoothly transition to Page 2
    setTimeout(() => {
      onNavigateNext();
    }, 800);
  };

  const handleVideoError = () => {
    setHasVideoError(true);
    setShowSkipFallback(true);
    notifyVideoEndedOrPaused();
  };

  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsVideoPlaying(true);
      notifyVideoPlaying();
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
      notifyVideoEndedOrPaused();
    }
  };

  const toggleVideoMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleReplayVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsVideoPlaying(true);
    notifyVideoPlaying();
  };

  const handleRetryVideo = () => {
    setHasVideoError(false);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8 overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="absolute inset-0 bg-radial from-[#F2D8D8]/40 via-[#FFF9F3] to-[#EADCCB]/50 pointer-events-none" />

      {/* Subtle background ambient circles */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#F2D8D8]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#C5A46D]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center">
        {!isOpen ? (
          /* =========================================================
             STAGE 1A: THE 3D MYSTERY INVITATION CARD
             ========================================================= */
          <div className="flex flex-col items-center text-center animate-fadeIn w-full max-w-md sm:max-w-lg">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EADCCB]/60 border border-[#C5A46D]/30 text-xs tracking-widest uppercase text-[#493A37] mb-6 font-medium shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
              <span>{page1.badge}</span>
            </div>

            {/* 3D Envelope & Card */}
            <div
              onClick={handleOpenCard}
              className="group cursor-pointer w-full perspective-1200 transition-transform duration-500 hover:scale-[1.02] active:scale-[0.99]"
              role="button"
              tabIndex={0}
              aria-label="Open invitation card"
            >
              <div className="relative bg-gradient-to-b from-[#FFFDFB] to-[#FBF5EE] border border-[#EADCCB] rounded-2xl p-6 sm:p-9 shadow-2xl shadow-[#493A37]/10 transition-all duration-500 overflow-hidden">
                {/* Gold foil decorative inner border */}
                <div className="absolute inset-3 border border-[#C5A46D]/25 rounded-xl pointer-events-none" />

                {/* Corner ornament flourishes */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#C5A46D]/40" />
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#C5A46D]/40" />
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#C5A46D]/40" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#C5A46D]/40" />

                {/* Wax Seal Motif */}
                <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#8C4656] via-[#C98F9B] to-[#E5ACB7] shadow-lg shadow-[#8C4656]/20 flex items-center justify-center text-white mb-6 border-2 border-[#FFF9F3] group-hover:scale-110 transition-transform duration-500">
                  <span className="font-serif font-bold text-2xl tracking-tighter">M</span>
                </div>

                {/* Card Typography */}
                <h1 className="font-serif text-3xl sm:text-4xl text-[#493A37] font-semibold mb-3 tracking-tight">
                  {page1.greeting}
                </h1>

                <p className="font-cormorant text-xl sm:text-2xl text-[#8C4656] italic mb-4 leading-relaxed">
                  "{page1.invitationLine1}"
                </p>

                <p className="text-sm sm:text-base text-[#493A37]/80 leading-relaxed font-sans font-light max-w-sm mx-auto mb-7">
                  {page1.invitationLine2}
                </p>

                {/* Primary Action Button */}
                <div className="relative inline-block">
                  <div className="px-6 py-3 rounded-full bg-gradient-to-r from-[#493A37] to-[#5D4A47] text-[#FFF9F3] font-medium text-sm sm:text-base shadow-md group-hover:shadow-lg group-hover:from-[#C5A46D] group-hover:to-[#B39055] transition-all duration-300 flex items-center gap-2">
                    <span>{page1.openCardButtonText}</span>
                    <Sparkles className="w-4 h-4 text-[#FFF9F3]/90" />
                  </div>
                </div>

                {/* Hint Text */}
                <p className="text-[11px] text-[#493A37]/50 mt-4 tracking-wider uppercase font-sans">
                  {page1.cardHint}
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* =========================================================
             STAGE 1B: CINEMATIC OPENING VIDEO PLAYER
             ========================================================= */
          <div className="w-full flex flex-col items-center animate-fadeIn transition-all duration-700">
            {/* Header info */}
            <div className="text-center mb-4">
              <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-medium font-sans">
                {recipient.nickname}’s Special Moment
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#493A37] font-semibold mt-1">
                {page1.openingVideo.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#493A37]/70 mt-1 font-light">
                {page1.openingVideo.subtitle}
              </p>
            </div>

            {/* Video Container */}
            <div className="relative w-full max-w-3xl aspect-video bg-[#1C1716] rounded-2xl overflow-hidden shadow-2xl shadow-[#493A37]/25 border-2 border-[#EADCCB]/70 group">
              {/* Actual Video */}
              <video
                ref={videoRef}
                src={currentVideoSrc}
                playsInline
                preload="auto"
                onLoadedData={() => setIsVideoReady(true)}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoEnded}
                onError={handleVideoError}
                className="w-full h-full object-contain bg-black"
              />

              {/* Error State */}
              {hasVideoError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-[#1C1716]/95 text-[#FFF9F3] text-center z-30">
                  <AlertCircle className="w-10 h-10 text-[#C98F9B] mb-3" />
                  <p className="text-sm max-w-md mb-5 text-[#FFF9F3]/80">
                    {page1.openingVideo.errorMessage}
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={handleRetryVideo}
                      className="px-4 py-2 bg-[#EADCCB]/20 hover:bg-[#EADCCB]/30 border border-[#EADCCB]/40 rounded-full text-xs font-medium text-white transition-colors"
                    >
                      {page1.openingVideo.retryButtonText}
                    </button>
                    <button
                      onClick={onNavigateNext}
                      className="px-4 py-2 bg-[#C5A46D] hover:bg-[#B39055] rounded-full text-xs font-medium text-black transition-colors flex items-center gap-1.5"
                    >
                      <span>{page1.openingVideo.skipButtonText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Overlay Play / Pause when clicked on video area */}
              {!hasVideoError && (
                <div
                  onClick={toggleVideoPlayback}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/10 hover:bg-black/20 transition-colors"
                >
                  {!isVideoPlaying && isVideoReady && (
                    <div className="w-16 h-16 rounded-full bg-[#FFF9F3]/90 text-[#493A37] flex items-center justify-center shadow-xl backdrop-blur-sm transform hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 fill-current ml-1" />
                    </div>
                  )}
                </div>
              )}

              {/* Custom Cinematic Controls Bar */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col gap-2 z-20 opacity-90 group-hover:opacity-100 transition-opacity">
                {/* Progress Bar */}
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#C5A46D] to-[#C98F9B] transition-all duration-150"
                    style={{ width: `${videoProgress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-white text-xs pt-1">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={toggleVideoPlayback}
                      className="hover:text-[#C5A46D] transition-colors p-1"
                      aria-label={isVideoPlaying ? 'Pause' : 'Play'}
                    >
                      {isVideoPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4 fill-current" />
                      )}
                    </button>

                    <button
                      onClick={toggleVideoMute}
                      className="hover:text-[#C5A46D] transition-colors p-1"
                      aria-label={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4 text-red-300" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>

                    <button
                      onClick={handleReplayVideo}
                      className="hover:text-[#C5A46D] transition-colors p-1"
                      title="Replay from start"
                      aria-label="Replay"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>

                  <span className="text-[11px] text-white/70 font-mono tracking-wider">
                    {Math.round(videoProgress)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Note and Fallback Skip Button */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between w-full max-w-3xl text-xs text-[#493A37]/60 px-2 gap-2">
              <span className="italic font-cormorant text-base text-[#493A37]/80">
                ✨ Page 2 will unlock automatically when the video concludes.
              </span>

              {showSkipFallback && (
                <button
                  onClick={onNavigateNext}
                  className="inline-flex items-center gap-1.5 text-xs text-[#493A37]/70 hover:text-[#493A37] underline underline-offset-4 font-medium transition-colors cursor-pointer"
                >
                  <span>Skip to Memories</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
