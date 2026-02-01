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
          background: '#f5f5f5',
          borderRadius: '16px',
        }}
      >
        <span style={{ color: '#999' }}>Aucune image disponible</span>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'relative',
        height: '350px',
        perspective: '1000px',
        overflow: 'hidden',
        borderRadius: '16px',
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
              maxWidth: '80%',
              maxHeight: '250px',
              objectFit: 'contain',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
            }}
          />
          {images[currentIndex].format && (
            <div
              style={{
                marginTop: '16px',
                padding: '8px 16px',
                background: 'rgba(255, 115, 35, 0.9)',
                color: '#fff',
                borderRadius: '20px',
                fontSize: '0.875rem',
                fontWeight: 600,
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
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: 'none',
              background: currentIndex === 0 ? 'rgba(200, 200, 200, 0.5)' : 'rgba(255, 115, 35, 0.9)',
              color: '#fff',
              cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
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
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: 'none',
              background: currentIndex === images.length - 1 ? 'rgba(200, 200, 200, 0.5)' : 'rgba(255, 115, 35, 0.9)',
              color: '#fff',
              cursor: currentIndex === images.length - 1 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
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
                border: 'none',
                background: index === currentIndex ? '#ff7323' : 'rgba(255, 255, 255, 0.6)',
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
