import React, { useState } from 'react';
import { Volume2, VolumeX, Play, Pause, Music } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { siteConfig } from '../config';

export default function AudioPlayer() {
  const { isPlaying, togglePlay, volume, setVolume, isMuted, setIsMuted } = useAudio();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!siteConfig.music.enabled) return null;

  return (
    <div
      className="fixed bottom-5 right-5 z-40 transition-all duration-300"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex items-center gap-2 bg-[#FFF9F3]/90 backdrop-blur-md border border-[#EADCCB] shadow-lg shadow-[#493A37]/5 px-3 py-2 rounded-full transition-all">
        {/* Play/Pause Disc Button */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
          className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-[#493A37] to-[#C5A46D] flex items-center justify-center text-[#FFF9F3] hover:scale-105 active:scale-95 transition-transform shadow-sm"
        >
          {isPlaying ? (
            <div className="relative flex items-center justify-center">
              <span className="absolute inset-0 rounded-full border border-dashed border-[#FFF9F3]/40 animate-spin [animation-duration:8s]" />
              <Pause className="w-4 h-4 fill-current text-[#FFF9F3]" />
            </div>
          ) : (
            <Play className="w-4 h-4 fill-current text-[#FFF9F3] ml-0.5" />
          )}
        </button>

        {/* Track Info & Controls */}
        <div className="flex items-center gap-2 pr-1">
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className="cursor-pointer select-none text-left"
          >
            <div className="flex items-center gap-1.5">
              <Music className={`w-3.5 h-3.5 text-[#C5A46D] ${isPlaying ? 'animate-bounce' : ''}`} />
              <span className="text-xs font-serif font-medium text-[#493A37] max-w-[110px] truncate sm:max-w-[140px]">
                {siteConfig.music.title || 'Soft Melody'}
              </span>
            </div>
            <p className="text-[10px] text-[#493A37]/60 tracking-wider uppercase font-sans">
              {isPlaying ? 'Playing' : 'Paused'}
            </p>
          </div>

          {/* Expanded Volume Slider */}
          {isExpanded && (
            <div className="flex items-center gap-2 pl-2 border-l border-[#EADCCB]/60 animate-fadeIn">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-[#493A37]/70 hover:text-[#493A37] transition-colors"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-3.5 h-3.5" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  if (isMuted) setIsMuted(false);
                }}
                className="w-16 h-1 accent-[#C5A46D] bg-[#EADCCB] rounded-lg cursor-pointer"
                aria-label="Volume slider"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
