import { useState, useEffect, useRef } from 'preact/hooks';

export interface Packshot {
  id: string;
  name: string;
  image: string;
  format: string;
  contenance: string;
  price?: number;
  margin?: number;
}

interface PackshotGalleryProps {
  packshots: Packshot[];
  selectedPackshot: Packshot | null;
  onPackshotSelect: (packshot: Packshot) => void;
}

export function PackshotGallery({ packshots, selectedPackshot, onPackshotSelect }: Readonly<PackshotGalleryProps>) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setScrollY(scrollRef.current.scrollTop);
      }
    };

    const element = scrollRef.current;
    if (element) {
      element.addEventListener('scroll', handleScroll);
      return () => element.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Helper function to get image extension
  const getImageExtension = (imagePath: string) => {
    // Try common extensions for packshots
    const extensions = ['.webp', '.png', '.jpg', '.jpeg'];
    for (const ext of extensions) {
      if (imagePath.includes(ext)) return ext;
    }
    return '.webp'; // default
  };

  return (
    <div className="space-y-6">
      {/* Main Packshot Display with 3D Depth Effect */}
      <div className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-bdc-red/5 to-bdc-yellow/5 opacity-50"></div>
        
        {selectedPackshot ? (
          <div className="relative z-10 space-y-4">
            {/* 3D Depth Container - Multiple Layers */}
            <div 
              className="w-full h-80 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg relative overflow-hidden"
              style={{
                transform: `perspective(1000px) rotateY(${scrollY * 0.02}deg) rotateX(${-scrollY * 0.01}deg)`,
                transition: 'transform 0.1s ease-out'
              }}
            >
              {/* Background Layer 1 - Furthest */}
              <div 
                className="absolute inset-0 flex items-center justify-center opacity-20"
                style={{
                  transform: `translateZ(-100px) translateY(${scrollY * 0.15}px) scale(0.8)`,
                  filter: 'blur(2px)'
                }}
              >
                <img
                  src={`${selectedPackshot.image}${getImageExtension(selectedPackshot.image)}`}
                  alt={selectedPackshot.name}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    const currentSrc = target.src;
                    if (currentSrc.includes('.webp')) {
                      target.src = currentSrc.replace('.webp', '.png');
                    } else if (currentSrc.includes('.png')) {
                      target.src = currentSrc.replace('.png', '.jpg');
                    } else {
                      target.style.display = 'none';
                    }
                  }}
                />
              </div>
              
              {/* Background Layer 2 - Middle */}
              <div 
                className="absolute inset-0 flex items-center justify-center opacity-30"
                style={{
                  transform: `translateZ(-60px) translateY(${scrollY * 0.1}px) scale(0.9)`,
                  filter: 'blur(1px)'
                }}
              >
                <img
                  src={`${selectedPackshot.image}${getImageExtension(selectedPackshot.image)}`}
                  alt={selectedPackshot.name}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
              
              {/* Background Layer 3 - Near */}
              <div 
                className="absolute inset-0 flex items-center justify-center opacity-40"
                style={{
                  transform: `translateZ(-30px) translateY(${scrollY * 0.05}px) scale(0.95)`,
                  filter: 'blur(0.5px)'
                }}
              >
                <img
                  src={`${selectedPackshot.image}${getImageExtension(selectedPackshot.image)}`}
                  alt={selectedPackshot.name}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>

              {/* Main Image - Front Layer */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  transform: `translateZ(0px) translateY(${-scrollY * 0.02}px) scale(${1 + scrollY * 0.0002})`,
                  transition: 'transform 0.1s ease-out'
                }}
              >
                <img
                  src={`${selectedPackshot.image}${getImageExtension(selectedPackshot.image)}`}
                  alt={selectedPackshot.name}
                  className="max-w-full max-h-full object-contain drop-shadow-2xl"
                  style={{
                    filter: 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.15))'
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    const currentSrc = target.src;
                    if (currentSrc.includes('.webp')) {
                      target.src = currentSrc.replace('.webp', '.png');
                    } else if (currentSrc.includes('.png')) {
                      target.src = currentSrc.replace('.png', '.jpg');
                    } else {
                      target.src = '/images/products/placeholder.svg';
                    }
                  }}
                />
              </div>
              
              {/* Side Images - Left and Right */}
              {packshots.length > 1 && (
                <>
                  {/* Left Side Image */}
                  <div
                    className="absolute left-0 top-1/2 w-1/3 h-2/3 flex items-center justify-center opacity-30"
                    style={{
                      transform: `translateZ(-50px) translateX(-80px) translateY(-50%) rotateY(25deg) scale(0.7)`,
                      filter: 'blur(1px)'
                    }}
                  >
                    <img
                      src={packshots[1]?.image ? `${packshots[1].image}${getImageExtension(packshots[1].image)}` : `${selectedPackshot.image}${getImageExtension(selectedPackshot.image)}`}
                      alt={packshots[1]?.name || selectedPackshot.name}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                  
                  {/* Right Side Image */}
                  <div
                    className="absolute right-0 top-1/2 w-1/3 h-2/3 flex items-center justify-center opacity-30"
                    style={{
                      transform: `translateZ(-50px) translateX(80px) translateY(-50%) rotateY(-25deg) scale(0.7)`,
                      filter: 'blur(1px)'
                    }}
                  >
                    <img
                      src={packshots[2]?.image ? `${packshots[2].image}${getImageExtension(packshots[2].image)}` : `${selectedPackshot.image}${getImageExtension(selectedPackshot.image)}`}
                      alt={packshots[2]?.name || selectedPackshot.name}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                </>
              )}
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-semibold text-bdc-black">{selectedPackshot.name}</h3>
              <p className="text-sm text-gray-600">{selectedPackshot.format} • {selectedPackshot.contenance}</p>
              {selectedPackshot.price && selectedPackshot.margin && (
                <div className="flex items-center justify-center gap-4 mt-2">
                  <span className="text-sm font-bold text-bdc-red">{selectedPackshot.price} FCFA</span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm font-medium text-bdc-black">Marge {selectedPackshot.margin}%</span>
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">Scroll pour effet 3D • {packshots.length} formats disponibles</p>
            </div>
          </div>
        ) : (
          <div className="w-full h-80 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Aucun packshot disponible</p>
          </div>
        )}
      </div>

      {/* E-commerce Style Preview Box */}
      {packshots.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-bdc-black mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-bdc-red rounded-full"></span>
            Tous les packshots ({packshots.length})
          </h3>
          
          {/* Grid Preview */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
            {packshots.map((packshot) => (
              <button
                key={packshot.id}
                onClick={() => onPackshotSelect(packshot)}
                className={`relative group rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                  selectedPackshot?.id === packshot.id
                    ? 'border-bdc-red shadow-lg ring-2 ring-bdc-red/20'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                style={{
                  transform: `translateZ(${selectedPackshot?.id === packshot.id ? '15px' : '0px'})`,
                }}
              >
                {/* Image Container */}
                <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
                  <img
                    src={`${packshot.image}${getImageExtension(packshot.image)}`}
                    alt={packshot.name}
                    className="w-full h-full object-contain p-2 transition-transform duration-200 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  {/* Fallback */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ display: 'none' }}
                  >
                    <div className="w-12 h-12 bg-bdc-red/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-bdc-red">
                        {packshot.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Product Info Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
                    <p className="text-xs font-medium truncate">{packshot.name}</p>
                    <p className="text-xs opacity-90">{packshot.contenance}</p>
                  </div>
                </div>
                
                {/* Selected Indicator */}
                {selectedPackshot?.id === packshot.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-bdc-red rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>
          
          {/* Scrollable List for Mobile */}
          <div className="md:hidden">
            <div 
              ref={scrollRef}
              className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-bdc-red scrollbar-track-gray-100"
            >
              {packshots.map((packshot) => (
                <button
                  key={packshot.id}
                  onClick={() => onPackshotSelect(packshot)}
                  className={`w-full p-3 rounded-lg border transition-all hover:scale-[1.02] ${
                    selectedPackshot?.id === packshot.id
                      ? 'border-bdc-red bg-bdc-red/5 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      <img
                        src={`${packshot.image}${getImageExtension(packshot.image)}`}
                        alt={packshot.name}
                        className="w-full h-full object-contain p-1"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div 
                        className="w-full h-full flex items-center justify-center"
                        style={{ display: 'none' }}
                      >
                        <div className="w-8 h-8 bg-bdc-red/20 rounded flex items-center justify-center">
                          <span className="text-xs font-bold text-bdc-red">
                            {packshot.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-medium text-bdc-black text-sm">{packshot.name}</p>
                      <p className="text-xs text-gray-600">{packshot.format} • {packshot.contenance}</p>
                    </div>
                    {selectedPackshot?.id === packshot.id && (
                      <div className="w-6 h-6 bg-bdc-red rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Info */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              {packshots.length} packshot{packshots.length > 1 ? 's' : ''} disponibles • Cliquez pour agrandir
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
