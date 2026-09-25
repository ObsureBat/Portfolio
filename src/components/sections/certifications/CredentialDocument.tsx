'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CredentialItem } from '@/data/certificationsData';
import {
  Award,
  CheckCircle2,
  Building,
  Hash,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink,
} from 'lucide-react';

interface CredentialDocumentProps {
  item: CredentialItem;
  currentIndex: number;
  totalCount: number;
}

export function CredentialDocument({
  item,
  currentIndex,
  totalCount,
}: CredentialDocumentProps) {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Reset photo index when item changes
  useEffect(() => {
    setActivePhotoIndex(0);
  }, [item.id]);

  const currentPhotos = item.gallery && item.gallery.length > 0 ? item.gallery : [item.image];
  const activePhoto = currentPhotos[activePhotoIndex] || item.image;
  const hasMultiplePhotos = currentPhotos.length > 1;

  const handlePrevPhoto = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : currentPhotos.length - 1));
  };

  const handleNextPhoto = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActivePhotoIndex((prev) => (prev < currentPhotos.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation & scroll locking for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    if ((window as any).__lenis) {
      (window as any).__lenis.stop();
    }
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowLeft' && hasMultiplePhotos) {
        handlePrevPhoto();
      } else if (e.key === 'ArrowRight' && hasMultiplePhotos) {
        handleNextPhoto();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      if ((window as any).__lenis) {
        (window as any).__lenis.start();
      }
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen, hasMultiplePhotos, currentPhotos.length]);

  return (
    <>
      <div
        style={{ perspective: 1200 }}
        className="relative w-full max-w-2xl mx-auto"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{
              opacity: 0,
              x: 16,
              rotateY: 2,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              x: 0,
              rotateY: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              x: -16,
              rotateY: -2,
              scale: 0.98,
            }}
            transition={{
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative w-full p-5 sm:p-7 rounded-3xl bg-white border border-zinc-200/90 shadow-xl shadow-zinc-950/5 overflow-hidden flex flex-col justify-between min-h-[460px]"
          >
            {/* Subtle Archival Watermark */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.025] bg-[radial-gradient(#18181B_1px,transparent_1px)] [background-size:20px_20px]"
            />

            {/* Top Hairline Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-zinc-900 via-indigo-600 to-indigo-800" />

            {/* Document Header Metadata */}
            <div className="relative z-10 flex items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-zinc-100 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                <span className="font-bold text-zinc-800 uppercase tracking-wider">
                  {item.type}
                </span>
                <span className="text-zinc-400">·</span>
                <span className="text-zinc-500 font-semibold">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(totalCount).padStart(2, '0')}
                </span>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-50 border border-zinc-200/70 text-[11px] font-medium text-zinc-700">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>{item.recordType}</span>
              </div>
            </div>

            {/* Credential Image Display Stage (Capped height for perfect vertical harmony) */}
            <div className="relative z-10 my-3.5">
              <div
                id="credential-image-trigger"
                onClick={() => setIsLightboxOpen(true)}
                className="group/img relative w-full h-[200px] sm:h-[235px] rounded-2xl overflow-hidden bg-gradient-to-b from-zinc-100 via-zinc-50 to-zinc-100 border border-zinc-200/90 shadow-inner cursor-pointer"
              >
                {/* Certificate / Photograph View */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePhoto}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="absolute inset-0 p-2 sm:p-2.5 flex items-center justify-center"
                  >
                    <img
                      src={activePhoto}
                      alt={`${item.title} — ${item.organization}`}
                      className="w-full h-full object-contain rounded-lg drop-shadow-sm select-none"
                      loading="eager"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Inspect Button Pill */}
                <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/80 hover:bg-zinc-900 backdrop-blur-md text-white text-[11px] font-mono shadow-md transition-all group-hover/img:scale-105">
                  <ZoomIn className="w-3.5 h-3.5 text-zinc-300" />
                  <span className="text-zinc-200 font-medium">Inspect High-Res</span>
                </div>

                {/* Multi-Photo Carousel Controls for Conference / Activity Items */}
                {hasMultiplePhotos && (
                  <>
                    <button
                      onClick={handlePrevPhoto}
                      aria-label="Previous photo"
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white text-zinc-800 shadow-md flex items-center justify-center transition-all opacity-85 hover:opacity-100 hover:scale-110 border border-zinc-200"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      onClick={handleNextPhoto}
                      aria-label="Next photo"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white text-zinc-800 shadow-md flex items-center justify-center transition-all opacity-85 hover:opacity-100 hover:scale-110 border border-zinc-200"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    {/* Pagination Indicators */}
                    <div className="absolute bottom-2 inset-x-0 z-20 flex items-center justify-center">
                      <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-900/80 backdrop-blur-md text-[10px] font-mono text-zinc-200 shadow-md">
                        {currentPhotos.map((_, pIdx) => (
                          <button
                            key={pIdx}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActivePhotoIndex(pIdx);
                            }}
                            className={`h-1.5 rounded-full transition-all ${
                              pIdx === activePhotoIndex
                                ? 'w-4 bg-white'
                                : 'w-1.5 bg-white/40 hover:bg-white/80'
                            }`}
                            aria-label={`View photo ${pIdx + 1}`}
                          />
                        ))}
                        <span className="ml-1 text-[9px] text-zinc-300">
                          {activePhotoIndex + 1}/{currentPhotos.length}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Core Content Body */}
            <div className="relative z-10 space-y-2 pt-0.5">
              <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 font-semibold uppercase tracking-wider">
                <Building className="w-3.5 h-3.5 shrink-0" />
                <span>{item.organization}</span>
                <span className="text-zinc-300">|</span>
                <span className="text-zinc-500 font-normal">{item.date}</span>
              </div>

              <h3 className="font-display font-extrabold text-lg sm:text-xl text-zinc-950 tracking-tight leading-snug">
                {item.title}
              </h3>

              {item.description && (
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans line-clamp-2">
                  {item.description}
                </p>
              )}

              {/* Discreet Credential ID Metadata & Verification URL */}
              {(item.credentialId || item.verificationUrl) && (
                <div className="flex flex-wrap items-center gap-2 pt-0.5">
                  {item.credentialId && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-50 border border-zinc-200/80 font-mono text-xs text-zinc-700">
                      <Hash className="w-3 h-3 text-zinc-400" />
                      <span className="text-zinc-400 uppercase tracking-wider text-[10px]">ID:</span>
                      <span className="font-semibold text-zinc-900">{item.credentialId}</span>
                    </span>
                  )}

                  {item.verificationUrl && (
                    <a
                      href={item.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-50/70 hover:bg-indigo-100/70 border border-indigo-200/80 font-mono text-xs text-indigo-700 transition-colors group/link"
                    >
                      <span>Verify Online</span>
                      <ExternalLink className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Document Footer */}
            <div className="relative z-10 mt-3 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="uppercase tracking-widest text-[10px]">
                Ayush Sharma · Proof Archive
              </span>

              <button
                onClick={() => setIsLightboxOpen(true)}
                className="flex items-center gap-1.5 text-zinc-600 hover:text-indigo-600 transition-colors font-medium text-[11px]"
              >
                <Award className="w-3.5 h-3.5 text-indigo-600" />
                <span>Inspect Document</span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* High-Resolution Document Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] bg-zinc-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
            onClick={() => setIsLightboxOpen(false)}
          >
            <div
              className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lightbox Header Bar */}
              <div className="w-full flex items-center justify-between pb-3 text-white">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded-md bg-white/10 font-mono text-xs text-zinc-200">
                    {item.number}
                  </span>
                  <div>
                    <h4 className="font-display font-bold text-base sm:text-lg text-white">
                      {item.title}
                    </h4>
                    <p className="text-xs text-zinc-400 font-mono">
                      {item.organization} · {item.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {item.verificationUrl && (
                    <a
                      href={item.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs transition-colors"
                    >
                      <span>Verify Online</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <button
                    onClick={() => setIsLightboxOpen(false)}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Lightbox Image Container */}
              <div className="relative w-full flex-1 min-h-[320px] max-h-[76vh] flex items-center justify-center bg-black/50 rounded-2xl border border-white/10 p-3 sm:p-5 overflow-hidden">
                <img
                  src={activePhoto}
                  alt={`${item.title} - ${item.organization}`}
                  className="max-w-full max-h-[72vh] object-contain rounded-lg shadow-2xl select-none"
                />

                {hasMultiplePhotos && (
                  <>
                    <button
                      onClick={(e) => handlePrevPhoto(e)}
                      aria-label="Previous photo"
                      className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-all border border-white/20 shadow-lg"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => handleNextPhoto(e)}
                      aria-label="Next photo"
                      className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-all border border-white/20 shadow-lg"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Lightbox Bottom Controls */}
              {hasMultiplePhotos && (
                <div className="mt-3 flex items-center gap-2">
                  {currentPhotos.map((_, pIdx) => (
                    <button
                      key={pIdx}
                      onClick={() => setActivePhotoIndex(pIdx)}
                      className={`h-2 rounded-full transition-all ${
                        pIdx === activePhotoIndex
                          ? 'w-8 bg-white'
                          : 'w-2 bg-white/40 hover:bg-white/70'
                      }`}
                      aria-label={`View photo ${pIdx + 1}`}
                    />
                  ))}
                  <span className="ml-2 font-mono text-xs text-zinc-400">
                    Photo {activePhotoIndex + 1} of {currentPhotos.length}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default CredentialDocument;
