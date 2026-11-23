import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import { siteConfig } from '../config';
import { resolveAsset } from '../utils/assetHelper';

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(siteConfig.music.defaultVolume || 0.3);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  // Tracks whether music was paused intentionally by a video
  const pausedByVideoRef = useRef(false);

  // Initialize audio element
  useEffect(() => {
    if (!siteConfig.music.enabled || !siteConfig.music.src) return;

    const audio = new Audio(resolveAsset(siteConfig.music.src));
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    audio.addEventListener('play', () => setIsPlaying(true));
    audio.addEventListener('pause', () => setIsPlaying(false));

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const playMusic = useCallback(async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      setIsPlaying(true);
      setHasInteracted(true);
      pausedByVideoRef.current = false;
    } catch (err) {
      console.warn('Autoplay prevented or music playback error:', err);
    }
  }, []);

  const pauseMusic = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  }, [isPlaying, playMusic, pauseMusic]);

  // Video interaction hooks: pause music when video starts, resume when video ends
  const notifyVideoPlaying = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      pausedByVideoRef.current = true;
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const notifyVideoEndedOrPaused = useCallback(() => {
    if (pausedByVideoRef.current && audioRef.current) {
      pausedByVideoRef.current = false;
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, []);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        volume,
        setVolume,
        isMuted,
        setIsMuted,
        hasInteracted,
        playMusic,
        pauseMusic,
        togglePlay,
        notifyVideoPlaying,
        notifyVideoEndedOrPaused,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
