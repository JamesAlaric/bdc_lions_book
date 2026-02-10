import { useState } from 'preact/hooks';
import { motion, AnimatePresence } from 'framer-motion';

interface CarouselImage {
  id: string;
  src: string;
  alt: string;
  format?: string;
}

interface Carousel3DProps {
  images: CarouselImage[];
  onFormatChange?: (index: number) => void;
}

export function Carousel3D({ images, onFormatChange }: Carousel3DProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      rotateY: direction > 0 ? 45 : -45,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      rotateY: direction < 0 ? 45 : -45,
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    }),
  };

  const paginate = (newDirection: number) => {
    const newIndex = currentIndex + newDirection;
    if (newIndex >= 0 && newIndex < images.length) {
      setDirection(newDirection);
      setCurrentIndex(newIndex);
      onFormatChange?.(newIndex);
    }
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    onFormatChange?.(index);
  };

  if (images.length === 0) {
    return (
      <div
        style={{
          height: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--aw-soft, #ffffff)',
          border: '1px solid rgba(19, 18, 16, 0.12)',
          borderRadius: '18px',
          boxShadow: 'var(--aw-shadow, 0 18px 32px rgba(15, 23, 42, 0.08))',
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        }}
      >
        <span style={{ color: 'var(--aw-muted, #94a3b8)' }}>Aucune image disponible</span>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'relative',
        height: '360px',
        perspective: '1000px',
        overflow: 'hidden',
        borderRadius: '18px',
        background: 'var(--aw-soft, #ffffff)',
        border: '1px solid rgba(19, 18, 16, 0.12)',
        boxShadow: 'var(--aw-shadow, 0 18px 32px rgba(15, 23, 42, 0.08))',
      }}
    >
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(_, info) => {
            if (info.offset.x < -100) {
              paginate(1);
            } else if (info.offset.x > 100) {
              paginate(-1);
            }
          }}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transformStyle: 'preserve-3d',
            cursor: 'grab',
          }}
          role="region"
          aria-label="Carousel de produits"
        >
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            style={{
              maxWidth: '78%',
              maxHeight: '240px',
              objectFit: 'contain',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.92)',
              padding: '12px',
              boxShadow: '0 16px 30px rgba(15, 23, 42, 0.12)',
            }}
          />
          {images[currentIndex].format && (
            <div
              style={{
                marginTop: '16px',
                padding: '6px 14px',
                background: 'var(--aw-ink, #0f172a)',
                color: '#fff',
                borderRadius: '999px',
                fontSize: '0.85rem',
                fontWeight: 600,
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              }}
            >
              {images[currentIndex].format}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => paginate(-1)}
            disabled={currentIndex === 0}
            aria-label="Image précédente"
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              border: '1px solid rgba(19, 18, 16, 0.15)',
              background: currentIndex === 0 ? 'rgba(255, 255, 255, 0.6)' : 'var(--aw-soft, #fff)',
              color: 'var(--aw-ink, #0f172a)',
              cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              boxShadow: '0 8px 18px rgba(15, 23, 42, 0.12)',
              zIndex: 10,
            }}
          >
            ‹
          </button>
          <button
            onClick={() => paginate(1)}
            disabled={currentIndex === images.length - 1}
            aria-label="Image suivante"
            style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              border: '1px solid rgba(19, 18, 16, 0.15)',
              background:
                currentIndex === images.length - 1
                  ? 'rgba(255, 255, 255, 0.6)'
                  : 'var(--aw-soft, #fff)',
              color: 'var(--aw-ink, #0f172a)',
              cursor: currentIndex === images.length - 1 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              boxShadow: '0 8px 18px rgba(15, 23, 42, 0.12)',
              zIndex: 10,
            }}
          >
            ›
          </button>
        </>
      )}

      {/* Indicators */}
      {images.length > 1 && (
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            zIndex: 10,
          }}
        >
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                border: '1px solid rgba(19, 18, 16, 0.2)',
                background: index === currentIndex ? 'var(--aw-ink, #0f172a)' : 'var(--aw-soft, #fff)',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
