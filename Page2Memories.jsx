import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { siteConfig } from '../config';
import { resolveAsset } from '../utils/assetHelper';

export default function Page2Memories({ onNavigateSurprise }) {
  const { page2, recipient } = siteConfig;
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const gallery = page2.gallery || [];

  // Lightbox navigation
  const openLightbox = (index) => setSelectedImageIndex(index);
  const closeLightbox = () => setSelectedImageIndex(null);

  const showNext = useCallback(() => {
    setSelectedImageIndex((prev) => (prev + 1) % gallery.length);
  }, [gallery.length]);

  const showPrev = useCallback(() => {
    setSelectedImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  }, [gallery.length]);

  // Handle keyboard events for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, showNext, showPrev]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedImageIndex]);

  return (
    <div className="relative min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col justify-between">
      {/* Background ambient accents */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-60 bg-gradient-to-b from-[#F2D8D8]/30 to-transparent blur-3xl pointer-events-none" />

      {/* Editorial Scrapbook Photo Gallery - Masonry Layout: Each photo fits its frame properly without cropping or awkward letterboxing */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 sm:gap-8 my-6 [column-fill:_balance]">
        {gallery.map((item, index) => {
          // Subtle staggered layout rotations for editorial scrapbook aesthetic
          const rotations = [
            'hover:rotate-0 rotate-[-0.8deg]',
            'hover:rotate-0 rotate-[0.8deg]',
            'hover:rotate-0 rotate-[-0.5deg]',
            'hover:rotate-0 rotate-[1deg]',
            'hover:rotate-0 rotate-[-1deg]',
            'hover:rotate-0 rotate-[0.5deg]',
          ];
          const tiltClass = rotations[index % rotations.length];

          return (
            <div
              key={item.id || index}
              onClick={() => openLightbox(index)}
              className={`break-inside-avoid mb-6 sm:mb-8 group cursor-pointer bg-white p-3.5 sm:p-4 rounded-2xl border border-[#EADCCB] shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${tiltClass} flex flex-col`}
            >
              {/* Photo Frame - Displays 100% full uncropped photo directly on the page */}
              <div className="relative w-full rounded-xl overflow-hidden bg-[#FAF3EC] border border-[#EADCCB]/40 shadow-inner mb-3">
                <img
                  src={resolveAsset(item.src)}
                  alt={`Memory ${index + 1}`}
                  loading="lazy"
                  className="w-full h-auto block rounded-lg transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl">
                  <div className="w-11 h-11 rounded-full bg-[#FFF9F3]/95 text-[#493A37] flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                    <Eye className="w-5 h-5 text-[#493A37]" />
                  </div>
                </div>
              </div>

              {/* Memory text */}
              <div className="px-1 text-center py-1">
                <p className="font-serif text-base sm:text-lg text-[#493A37] font-medium tracking-wide">
                  Memory {index + 1}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* =========================================================
         SURPRISE BUTTON
         ========================================================= */}
      <div className="flex justify-center my-12 animate-fadeIn">
        <button
          onClick={onNavigateSurprise}
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#493A37] via-[#5D4A47] to-[#493A37] text-[#FFF9F3] font-medium text-base sm:text-lg shadow-xl shadow-[#493A37]/20 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <span>Reveal Your Surprise ✨</span>
          <Sparkles className="w-5 h-5 text-[#C5A46D] group-hover:rotate-12 transition-transform" />
        </button>
      </div>

      {/* =========================================================
         FULL PHOTO IN THE MIDDLE (LIGHTBOX)
         ========================================================= */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 animate-fadeIn"
          onClick={closeLightbox}
        >
          {/* Close button (top right of screen) */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-60 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-2xl"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button (Left Side) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="absolute left-2 sm:left-6 z-60 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/90 hover:bg-white text-[#493A37] shadow-2xl flex items-center justify-center border border-[#EADCCB] transition-transform hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Previous photograph"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button (Right Side) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="absolute right-2 sm:right-6 z-60 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/90 hover:bg-white text-[#493A37] shadow-2xl flex items-center justify-center border border-[#EADCCB] transition-transform hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Next photograph"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* The Full Photo Centered in the Middle */}
          <div
            className="relative flex flex-col items-center justify-center max-w-[92vw] max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white p-2.5 sm:p-4 rounded-3xl shadow-2xl border-2 sm:border-4 border-[#EADCCB] flex flex-col items-center">
              <img
                src={resolveAsset(gallery[selectedImageIndex].src)}
                alt={`Memory ${selectedImageIndex + 1}`}
                className="max-h-[76vh] sm:max-h-[80vh] max-w-[86vw] sm:max-w-[82vw] w-auto h-auto object-contain rounded-xl drop-shadow-md block"
              />

              {/* Memory Label at the bottom of the frame */}
              <div className="pt-2.5 pb-0.5 text-center">
                <p className="font-serif text-lg sm:text-xl font-semibold text-[#493A37] tracking-wide">
                  Memory {selectedImageIndex + 1}
                </p>
                <span className="text-[11px] text-[#493A37]/60 font-sans tracking-widest uppercase font-medium">
                  {selectedImageIndex + 1} of {gallery.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
