import React, { useState } from 'react';
import ParticleCanvas from './components/ParticleCanvas';
import AudioPlayer from './components/AudioPlayer';
import Page1MysteryCard from './components/Page1MysteryCard';
import Page2Memories from './components/Page2Memories';
import Page3Surprise from './components/Page3Surprise';
import Page4CinematicMau from './components/Page4CinematicMau';
import { AudioProvider } from './context/AudioContext';
import { siteConfig } from './config';

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Smooth cinematic page change with scroll reset
  const navigateToPage = (targetPage) => {
    if (currentPage === targetPage || isTransitioning) return;
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentPage(targetPage);
      window.scrollTo({ top: 0, behavior: 'instant' });

      setTimeout(() => {
        setIsTransitioning(false);
      }, 150);
    }, 400);
  };

  return (
    <AudioProvider>
      <div className={`relative min-h-screen font-sans selection:bg-[#F2D8D8] selection:text-[#493A37] flex flex-col justify-between overflow-x-hidden transition-colors duration-700 ${
        currentPage === 4 ? 'bg-[#141010] text-[#FFF9F3]' : 'bg-[#FFF9F3] text-[#493A37]'
      }`}>
        {/* Ambient Particle System */}
        <ParticleCanvas />

        {/* Minimalist Top Story Progress Bar */}
        <header className="sticky top-0 z-30 w-full py-4 px-6 flex items-center justify-between pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-2">
            <span className={`font-serif font-bold text-lg tracking-tight transition-colors duration-500 ${
              currentPage === 4 ? 'text-[#FFF9F3]' : 'text-[#493A37]'
            }`}>
              {siteConfig.recipient.nickname}
            </span>
            <span className="text-[11px] text-[#C5A46D] uppercase tracking-widest font-mono">
              • Special Edition
            </span>
          </div>

          {/* Discreet Step Indicators for all 4 Pages */}
          <nav className={`pointer-events-auto flex items-center gap-2 backdrop-blur-md px-3.5 py-1.5 rounded-full border shadow-xs transition-all duration-500 ${
            currentPage === 4
              ? 'bg-[#1E1817]/80 border-white/10 shadow-black/40'
              : 'bg-[#FFF9F3]/80 border-[#EADCCB]/70 shadow-[#493A37]/5'
          }`}>
            {[1, 2, 3, 4].map((page) => (
              <button
                key={page}
                onClick={() => navigateToPage(page)}
                aria-label={`Go to page ${page}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentPage === page
                    ? 'w-6 h-2 bg-gradient-to-r from-[#C5A46D] to-[#C98F9B]'
                    : currentPage === 4
                    ? 'w-2 h-2 bg-white/20 hover:bg-[#C5A46D]'
                    : 'w-2 h-2 bg-[#EADCCB] hover:bg-[#C98F9B]'
                }`}
                title={`Page ${page}`}
              />
            ))}
          </nav>
        </header>

        {/* Main Content Area with Transition Glow */}
        <main
          className={`flex-1 transition-all duration-500 relative z-10 ${
            isTransitioning ? 'opacity-0 scale-98 blur-xs' : 'opacity-100 scale-100 blur-0'
          }`}
        >
          {currentPage === 1 && (
            <Page1MysteryCard onNavigateNext={() => navigateToPage(2)} />
          )}

          {currentPage === 2 && (
            <Page2Memories onNavigateSurprise={() => navigateToPage(3)} />
          )}

          {currentPage === 3 && (
            <Page3Surprise
              onRestartJourney={() => navigateToPage(1)}
              onNavigateToMau={() => navigateToPage(4)}
            />
          )}

          {currentPage === 4 && (
            <Page4CinematicMau
              onRestartJourney={() => navigateToPage(1)}
              onNavigateBack={() => navigateToPage(3)}
            />
          )}
        </main>

        {/* Floating Audio Player */}
        <AudioPlayer />
      </div>
    </AudioProvider>
  );
}
