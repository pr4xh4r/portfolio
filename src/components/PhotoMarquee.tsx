import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { sound } from '../utils/audio';

interface PhotoItem {
  id: string;
  src: string;
}

const ALL_PHOTOS: PhotoItem[] = [
  { id: 'a', src: '/photos/a.jpg' },
  { id: 'b', src: '/photos/b.jpg' },
  { id: 'c', src: '/photos/c.jpg' },
  { id: 'd', src: '/photos/d.jpg' },
  { id: 'e', src: '/photos/e.jpg' },
  { id: 'f', src: '/photos/f.jpg' },
  { id: 'g', src: '/photos/g.jpg' },
  { id: 'h', src: '/photos/h.jpg' },
  { id: 'i', src: '/photos/i.jpg' },
  { id: 'j', src: '/photos/j.jpg' },
  { id: 'k', src: '/photos/k.jpg' },
  { id: 'l', src: '/photos/l.jpg' },
  { id: 'm', src: '/photos/m.jpg' },
  { id: 'n', src: '/photos/n.jpg' },
  { id: 'o', src: '/photos/o.jpg' },
  { id: 'p', src: '/photos/p.jpg' },
  { id: 'q', src: '/photos/q.jpg' },
  { id: 's', src: '/photos/s.jpg' },
  { id: 't', src: '/photos/t.jpg' },
  { id: 'u', src: '/photos/u.jpg' },
  { id: 'v', src: '/photos/v.jpg' },
  { id: 'w', src: '/photos/w.jpg' },
  { id: 'x', src: '/photos/x.jpg' },
  { id: 'y', src: '/photos/y.jpg' },
  { id: 'z', src: '/photos/z.jpg' },
];

const ROW_1 = ALL_PHOTOS.slice(0, 13);
const ROW_2 = ALL_PHOTOS.slice(13);

interface PhotoMarqueeProps {
  onModalOpenChange?: (isOpen: boolean) => void;
}

export const PhotoMarquee: React.FC<PhotoMarqueeProps> = ({ onModalOpenChange }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const baseDurationRow1 = 55;
  const baseDurationRow2 = 60;

  const handleOpenPhoto = (photoId: string) => {
    sound.playBlip(680, 0.03);
    const idx = ALL_PHOTOS.findIndex((p) => p.id === photoId);
    if (idx !== -1) {
      setSelectedIndex(idx);
      onModalOpenChange?.(true);
    }
  };

  const handleCloseModal = useCallback(() => {
    sound.playBlip(440, 0.03);
    setSelectedIndex(null);
    onModalOpenChange?.(false);
  }, [onModalOpenChange]);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    sound.playBlip(550, 0.03);
    setSelectedIndex((prev) => (prev === null ? 0 : (prev - 1 + ALL_PHOTOS.length) % ALL_PHOTOS.length));
  }, [selectedIndex]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    sound.playBlip(600, 0.03);
    setSelectedIndex((prev) => (prev === null ? 0 : (prev + 1) % ALL_PHOTOS.length));
  }, [selectedIndex]);

  // Keyboard navigation for modal
  useEffect(() => {
    if (selectedIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseModal();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedIndex, handleCloseModal, handlePrev, handleNext]);

  const renderCard = (photo: PhotoItem, uniqueKey: string) => (
    <div
      key={uniqueKey}
      onClick={() => handleOpenPhoto(photo.id)}
      className="group relative w-44 sm:w-56 lg:w-64 h-60 sm:h-72 lg:h-80 shrink-0 rounded-xl overflow-hidden border border-[#2a2a26] hover:border-[#B4D9FD] bg-[#171715] cursor-pointer transition-all duration-300 hover:shadow-[0_8px_30px_rgba(180,217,253,0.22)] select-none"
    >
      {/* Clean Photo Image */}
      <img
        src={photo.src}
        alt="Portfolio capture"
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 filter brightness-[0.93] group-hover:brightness-100"
      />

      {/* Subtle hover expand icon */}
      <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
        <div className="p-2.5 rounded-full bg-[#121211]/80 backdrop-blur-md border border-[#B4D9FD]/40 text-[#B4D9FD] shadow-lg">
          <Maximize2 className="w-4 h-4" />
        </div>
      </div>
    </div>
  );

  return (
    <section id="photos" className="relative py-12 sm:py-16 w-full overflow-hidden">
      
      {/* Section Header */}
      {/* Header with extending horizontal line */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-left">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#FAF9F5] flex items-center gap-2 whitespace-nowrap">
            <span className="text-[#B4D9FD] font-mono">/</span>
            <span>art & snapshots</span>
          </h2>
          <div className="h-[1px] bg-[#2a2a26] flex-grow max-w-md"></div>
        </div>
      </div>

      {/* Marquee Wrapper with Smooth Gradient Masks */}
      <div className="relative w-full overflow-hidden space-y-4">
        
        {/* Left & Right Smooth Edge Fade Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 lg:w-48 bg-gradient-to-r from-[#121211] via-[#121211]/90 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 lg:w-48 bg-gradient-to-l from-[#121211] via-[#121211]/90 to-transparent z-20" />

        {/* ROW 1: Scrolling Left */}
        <div className="flex overflow-hidden select-none marquee-row">
          {/* Track 1 */}
          <div
            className="flex shrink-0 gap-4 pr-4 animate-marquee-left"
            style={{ animationDuration: `${baseDurationRow1}s` }}
          >
            {ROW_1.concat(ROW_1).map((photo, i) => renderCard(photo, `r1-t1-${photo.id}-${i}`))}
          </div>

          {/* Track 2 (Duplicate for 100% gapless loop) */}
          <div
            className="flex shrink-0 gap-4 pr-4 animate-marquee-left"
            style={{ animationDuration: `${baseDurationRow1}s` }}
            aria-hidden="true"
          >
            {ROW_1.concat(ROW_1).map((photo, i) => renderCard(photo, `r1-t2-${photo.id}-${i}`))}
          </div>
        </div>

        {/* ROW 2: Scrolling Right */}
        <div className="flex overflow-hidden select-none marquee-row">
          {/* Track 1 */}
          <div
            className="flex shrink-0 gap-4 pr-4 animate-marquee-right"
            style={{ animationDuration: `${baseDurationRow2}s` }}
          >
            {ROW_2.concat(ROW_2).map((photo, i) => renderCard(photo, `r2-t1-${photo.id}-${i}`))}
          </div>

          {/* Track 2 (Duplicate for 100% gapless loop) */}
          <div
            className="flex shrink-0 gap-4 pr-4 animate-marquee-right"
            style={{ animationDuration: `${baseDurationRow2}s` }}
            aria-hidden="true"
          >
            {ROW_2.concat(ROW_2).map((photo, i) => renderCard(photo, `r2-t2-${photo.id}-${i}`))}
          </div>
        </div>

      </div>



      {/* High-Resolution Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={handleCloseModal}
        >
          {/* Modal Container */}
          <div
            className="relative max-w-4xl w-full max-h-[92vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Close Button */}
            <div className="w-full flex items-center justify-end pb-3 text-xs font-mono text-[#EDECE8]/80 border-b border-[#2a2a26] mb-3">
              <button
                type="button"
                onClick={handleCloseModal}
                className="p-1.5 px-3 rounded bg-[#171715] hover:bg-[#B4D9FD] hover:text-black border border-[#2a2a26] text-[#EDECE8] flex items-center gap-1.5 transition-all cursor-pointer font-mono text-xs"
                title="Close (Esc)"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline text-[11px]">CLOSE (ESC)</span>
              </button>
            </div>

            {/* Image Stage */}
            <div className="relative flex items-center justify-center w-full max-h-[75vh] overflow-hidden rounded-lg border border-[#2a2a26] bg-[#121211]">
              <img
                src={ALL_PHOTOS[selectedIndex].src}
                alt="Enlarged view"
                className="max-h-[75vh] max-w-full w-auto object-contain select-none"
              />

              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#121211]/80 hover:bg-[#B4D9FD] hover:text-black text-[#EDECE8] border border-[#2a2a26] backdrop-blur-sm transition-all cursor-pointer shadow-lg"
                title="Previous photo (Arrow Left)"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#121211]/80 hover:bg-[#B4D9FD] hover:text-black text-[#EDECE8] border border-[#2a2a26] backdrop-blur-sm transition-all cursor-pointer shadow-lg"
                title="Next photo (Arrow Right)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>



          </div>
        </div>
      )}

    </section>
  );
};
