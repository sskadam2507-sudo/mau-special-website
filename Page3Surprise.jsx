import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Undo2, Sparkles } from 'lucide-react';
import { siteConfig } from '../config';
import { deleteVideoBlob } from '../utils/videoStorage';

export default function Page3Surprise({ onRestartJourney, onNavigateToMau }) {
  const { page3 } = siteConfig;
  const { finalMessage } = page3;

  // Clean up any previously stored surprise video from browser storage
  useEffect(() => {
    deleteVideoBlob('surprise_video').catch(() => {});
  }, []);

  // Trigger celebratory warm confetti burst upon entering
  useEffect(() => {
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.55 },
        colors: ['#C5A46D', '#C98F9B', '#EADCCB', '#F2D8D8'],
        disableForReducedMotion: true,
      });
    } catch {
      // safe fallback
    }
  }, []);

  return (
    <div className="relative min-h-[85vh] py-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex flex-col items-center justify-center">
      {/* Background soft ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#C98F9B]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#C5A46D]/15 rounded-full blur-3xl pointer-events-none" />

      {/* =========================================================
         HEARTFELT MESSAGE LETTER FROM COOKIE TO MAU
         ========================================================= */}
      <div className="w-full max-w-2xl bg-gradient-to-b from-[#FFFDFB] to-[#FBF5EE] border border-[#EADCCB] rounded-3xl p-8 sm:p-12 shadow-2xl shadow-[#493A37]/5 my-8 relative overflow-hidden animate-fadeIn">
        {/* Subtle decorative inner border */}
        <div className="absolute inset-3 border border-[#C5A46D]/20 rounded-2xl pointer-events-none" />

        {/* Header Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#F2D8D8]/60 flex items-center justify-center text-[#C98F9B]">
            <Heart className="w-6 h-6 fill-current" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="font-serif text-2xl sm:text-3xl text-center text-[#493A37] font-semibold mb-8">
          {finalMessage.heading}
        </h2>

        {/* Letter Paragraphs */}
        <div className="space-y-5 text-sm sm:text-base text-[#493A37]/85 font-sans font-light leading-relaxed">
          {finalMessage.paragraphs.map((paragraph, idx) => (
            <p key={idx} className={idx === 0 ? 'font-serif text-lg font-medium text-[#493A37]' : ''}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* Signoff */}
        <div className="mt-10 pt-6 border-t border-[#EADCCB]/60 text-right">
          <p className="font-cormorant italic text-lg sm:text-xl text-[#8C4656]">
            {finalMessage.closing}
          </p>
          <p className="font-serif font-semibold text-base sm:text-lg text-[#493A37] mt-1">
            {finalMessage.sender}
          </p>
        </div>
      </div>

      {/* =========================================================
         ACTION BUTTONS (ADVANCE TO PAGE 4 & RELIVE)
         ========================================================= */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 pb-8 w-full">
        {onNavigateToMau && (
          <button
            onClick={onNavigateToMau}
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#493A37] via-[#5D4A47] to-[#493A37] hover:from-[#C5A46D] hover:to-[#B39055] text-[#FFF9F3] text-sm sm:text-base font-medium shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <span>One Last Thing For Mau... ✨</span>
            <Sparkles className="w-4 h-4 text-[#C5A46D] group-hover:text-[#FFF9F3] transition-colors" />
          </button>
        )}

        <button
          onClick={onRestartJourney}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#EADCCB] bg-white/70 hover:bg-white text-xs sm:text-sm font-medium text-[#493A37] shadow-xs hover:shadow-md transition-all cursor-pointer"
        >
          <Undo2 className="w-4 h-4 text-[#C5A46D]" />
          <span>Relive from Page 1</span>
        </button>
      </div>
    </div>
  );
}
