import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, RotateCcw, ArrowLeft, Star } from 'lucide-react';
import { siteConfig } from '../config';

export default function Page4CinematicMau({ onRestartJourney, onNavigateBack }) {
  const [hasInteracted, setHasInteracted] = useState(false);
  const { recipient, page4 } = siteConfig;

  // Gentle starry sparkle celebration on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 40,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#C5A46D', '#EADCCB', '#C98F9B', '#FFF9F3'],
        disableForReducedMotion: true,
      });
    } catch {
      // safe fallback
    }
  }, []);

  const triggerSparkle = (e) => {
    setHasInteracted(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    try {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { x, y },
        colors: ['#C5A46D', '#C98F9B', '#F2D8D8'],
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <div className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 py-12 overflow-hidden selection:bg-[#C5A46D]/30">
      {/* Cinematic Ambient Glow Backdrops */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#251E1C] via-[#1E1817] to-[#141010] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#C5A46D]/15 via-[#C98F9B]/15 to-transparent rounded-full blur-[120px] pointer-events-none animate-soft-pulse" />

      {/* Subtle Star Points */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/5 w-1 h-1 bg-[#FFF9F3] rounded-full animate-ping [animation-duration:3s]" />
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-[#C5A46D] rounded-full animate-pulse [animation-duration:4s]" />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-[#F2D8D8] rounded-full animate-ping [animation-duration:5s]" />
        <div className="absolute bottom-1/3 right-1/5 w-1.5 h-1.5 bg-[#FFF9F3] rounded-full animate-pulse [animation-duration:3.5s]" />
      </div>

      {/* Central Cinematic Container */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center animate-fadeIn">
        {/* Top Floating Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#C5A46D]/30 backdrop-blur-md text-[#EADCCB] text-xs uppercase tracking-[0.3em] font-sans font-light mb-8 shadow-lg shadow-black/20">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A46D] animate-spin [animation-duration:10s]" />
          <span>{page4?.badge || 'Forever & Always'}</span>
          <Sparkles className="w-3.5 h-3.5 text-[#C5A46D] animate-spin [animation-duration:10s]" />
        </div>

        {/* =========================================================
           CINEMATIC "MAU" TITLE
           ========================================================= */}
        <div
          onClick={triggerSparkle}
          className="group cursor-pointer select-none relative my-4 sm:my-6 transition-transform duration-700 hover:scale-[1.03] active:scale-[0.99]"
          title="Click to send sparkles to Mau"
        >
          {/* Subtle Ambient Behind-Glow */}
          <div className="absolute inset-0 bg-radial from-[#C5A46D]/30 via-[#C98F9B]/10 to-transparent blur-3xl opacity-80 group-hover:opacity-100 transition-opacity" />

          {/* Lettering with Gradient & Luxury Serif */}
          <h1 className="relative font-serif font-bold text-7xl sm:text-9xl md:text-[11rem] tracking-[0.2em] sm:tracking-[0.25em] pl-[0.2em] text-transparent bg-clip-text bg-gradient-to-b from-[#FFF9F3] via-[#EADCCB] to-[#C5A46D] drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)] leading-none">
            {page4?.title || 'MAU'}
          </h1>

          {/* Subtle Underline Beam */}
          <div className="w-32 sm:w-48 h-0.5 bg-gradient-to-r from-transparent via-[#C5A46D] to-transparent mx-auto mt-4 sm:mt-6 opacity-75 group-hover:w-64 transition-all duration-700" />
        </div>

        {/* Poetic Subtitles */}
        <p className="font-cormorant italic text-2xl sm:text-3xl md:text-4xl text-[#F2D8D8] mt-6 max-w-xl mx-auto leading-relaxed drop-shadow-md">
          "{page4?.quote || 'Some bonds don’t need everyday words—they just live in the quiet trust that we’ll always have each other.'}"
        </p>

        <p className="font-sans text-xs sm:text-sm text-[#EADCCB]/70 tracking-widest uppercase font-light mt-4 max-w-md mx-auto">
          {page4?.subtitle || 'To the laughter, the memories, and the special human you are.'}
        </p>

        {/* Delicate Heart / Infinity Element */}
        <div className="flex items-center justify-center gap-3 my-8 text-[#C98F9B]">
          <span className="w-8 h-px bg-[#C98F9B]/30" />
          <Heart className="w-4 h-4 fill-current text-[#C98F9B] animate-pulse" />
          <span className="w-8 h-px bg-[#C98F9B]/30" />
        </div>

        {/* Final Signoff Statement */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-md px-6 py-4 rounded-2xl max-w-md mx-auto shadow-xl">
          <p className="font-serif text-sm sm:text-base text-[#FFF9F3] font-medium leading-snug">
            {page4?.footerLine || 'Mayuri, always remember: you are deeply appreciated, endlessly valued, and genuinely cherished.'}
          </p>
          <p className="text-[11px] text-[#C5A46D] font-mono tracking-widest uppercase mt-2">
            Always by your side • Cookie
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-12">
          <button
            onClick={onNavigateBack}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-[#FFF9F3] text-xs sm:text-sm font-medium transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#C5A46D]" />
            <span>Back to Letter</span>
          </button>

          <button
            onClick={onRestartJourney}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C5A46D] to-[#B39055] hover:brightness-110 text-[#1E1817] text-xs sm:text-sm font-semibold shadow-lg shadow-[#C5A46D]/20 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Relive From Beginning</span>
          </button>
        </div>
      </div>
    </div>
  );
}
