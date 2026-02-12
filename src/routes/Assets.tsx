import { useState, useMemo, useRef, useLayoutEffect } from 'preact/hooks';
import { route } from 'preact-router';
import type { RouteProps } from 'preact-router';
import { packshotAssets, type PackshotAsset } from '../lib/data/packshots';
import { logoMap } from '../components/catalogue/BrandCard';
import {
  Search,
  FolderOpen,
  Download,
  Image,
  FileText,
  Camera,
  Eye,
  X,
  Beer,
  Wine,
  GlassWater,
  Droplets,
  Zap,
  CupSoda,
} from '../components/ui/Icon';
import { gsap } from 'gsap';
import type { LucideIcon } from 'lucide-react';

// ============================================
// TYPES
// ============================================

type AssetTab = 'logos' | 'packshots' | 'documents';

interface LogoAsset {
  id: string;
  name: string;
  segment: string;
  url: string;
}

interface DocumentAsset {
  id: string;
  name: string;
  description: string;
  type: 'pdf' | 'xlsx';
  size: string;
  icon: LucideIcon;
}

// ============================================
// DATA
// ============================================

const segmentIconMap: Record<string, LucideIcon> = {
  'Bieres': Beer,
  'Alcools Mix': GlassWater,
  'Boissons Gazeuses': CupSoda,
  'Eaux': Droplets,
  'Malts & Energy': Zap,
  'Spiritueux': Wine,
  'Vins': Wine,
};

const segmentLabels: Record<string, string> = {
  'bieres': 'Bieres',
  'alcoolsMix': 'Alcools Mix',
  'bg': 'Boissons Gazeuses',
  'eaux': 'Eaux',
  'Malts&energyDrink': 'Malts & Energy',
  'spirtitueux': 'Spiritueux',
  'vins': 'Vins',
};

function buildLogoAssets(): LogoAsset[] {
  const assets: LogoAsset[] = [];
  for (const [brandId, url] of Object.entries(logoMap)) {
    // Extract segment from URL path: /assets/brands/<segment>/filename.webp
    const parts = url.split('/');
    const segmentFolder = parts[3] || '';
    const segment = segmentLabels[segmentFolder] || segmentFolder;
    const name = brandId
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    assets.push({ id: brandId, name, segment, url });
  }
  return assets.sort((a, b) => a.segment.localeCompare(b.segment) || a.name.localeCompare(b.name));
}

const documents: DocumentAsset[] = [
  {
    id: 'lions-book',
    name: "Lions' Book",
    description: 'Guide complet du vendeur BDC',
    type: 'pdf',
    size: '409 Ko',
    icon: FileText,
  },
  {
    id: 'argumentaires-full',
    name: 'Argumentaires Marques',
    description: 'Argumentaires de vente toutes marques FAP - Version complete',
    type: 'pdf',
    size: '3.8 Mo',
    icon: FileText,
  },
  {
    id: 'argumentaires-brief',
    name: 'Argumentaires Brief',
    description: 'Version resumee des argumentaires marques FAP',
    type: 'pdf',
    size: '2.2 Mo',
    icon: FileText,
  },
];

// ============================================
// MAIN COMPONENT
// ============================================

export function Assets(_props: Readonly<RouteProps>) {
  const [activeTab, setActiveTab] = useState<AssetTab>('logos');
  const [search, setSearch] = useState('');
  const [previewAsset, setPreviewAsset] = useState<{ url: string; name: string } | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const logoAssets = useMemo(() => buildLogoAssets(), []);

  // GSAP stagger animation on tab change
  useLayoutEffect(() => {
    if (!contentRef.current) return;
    const cards = contentRef.current.querySelectorAll('[data-asset-card]');
    if (cards.length) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 16, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, stagger: 0.03, ease: 'power2.out' }
      );
    }
  }, [activeTab, search]);

  const tabs: { key: AssetTab; label: string; icon: LucideIcon; count: number }[] = [
    { key: 'logos', label: 'Logos', icon: Image, count: logoAssets.length },
    { key: 'packshots', label: 'Packshots', icon: Camera, count: packshotAssets.length },
    { key: 'documents', label: 'Documents', icon: FileText, count: documents.length },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-bdc-black transition-colors duration-300 pt-12 pb-24">
      {/* Sub-Header */}
      <header className="sticky top-12 z-40 bg-white/80 dark:bg-bdc-black/80 backdrop-blur-xl relative">
        <div className="absolute left-0 right-0 top-full h-6 pointer-events-none bg-gradient-to-b from-white/80 dark:from-[rgba(20,20,20,0.8)] to-transparent" />
        <div className="w-full px-4 h-12 flex items-center justify-between">
          <button
            onClick={() => route('/')}
            className="inline-flex items-center gap-2 text-bdc-black dark:text-white hover:text-bdc-blue transition-colors active:scale-95"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <span className="text-sm font-medium">Accueil</span>
          </button>
          <span className="text-sm font-bold text-bdc-black dark:text-white font-display">
            Ressources
          </span>
        </div>
      </header>

      {/* Page Header */}
      <div className="px-4 pt-5 pb-3">
        <div className="flex items-center gap-3 mb-1">
          <span className="w-10 h-10 rounded-xl bg-bdc-blue/10 flex items-center justify-center">
            <FolderOpen size={20} className="text-bdc-blue" strokeWidth={1.8} />
          </span>
          <div>
            <h1 className="text-xl font-bold text-bdc-black dark:text-white font-display">
              Assets & Ressources
            </h1>
            <p className="text-xs text-muted dark:text-gray-400">
              {logoAssets.length + packshotAssets.length + documents.length} fichiers disponibles
            </p>
          </div>
        </div>
      </div>

      {/* Tab Pills */}
      <div className="px-4 mb-3">
        <div className="flex gap-2 bg-gray-100 dark:bg-gray-800/50 rounded-xl p-1">
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => { setActiveTab(tab.key); setSearch(''); }}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-white dark:bg-gray-700 text-bdc-blue shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <TabIcon size={14} strokeWidth={isActive ? 2.2 : 1.8} />
                <span>{tab.label}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold ${
                    isActive
                      ? 'bg-bdc-blue/10 text-bdc-blue'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search Bar */}
      {activeTab !== 'documents' && (
        <div className="px-4 mb-4">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="text"
              placeholder={
                activeTab === 'logos'
                  ? 'Rechercher un logo...'
                  : 'Rechercher un packshot...'
              }
              value={search}
              onInput={(e) => setSearch((e.target as HTMLInputElement).value)}
              className="w-full h-10 pl-10 pr-10 bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-xl text-sm text-bdc-black dark:text-white placeholder:text-muted focus:outline-none focus:border-bdc-blue transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
              >
                <X size={12} className="text-gray-500" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <div ref={contentRef}>
        {activeTab === 'logos' && (
          <LogosGrid assets={logoAssets} search={search} onPreview={setPreviewAsset} />
        )}
        {activeTab === 'packshots' && (
          <PackshotsGrid assets={packshotAssets} search={search} onPreview={setPreviewAsset} />
        )}
        {activeTab === 'documents' && <DocumentsList />}
      </div>

      {/* Image Preview Modal */}
      {previewAsset && (
        <ImagePreview
          url={previewAsset.url}
          name={previewAsset.name}
          onClose={() => setPreviewAsset(null)}
        />
      )}
    </div>
  );
}

// ============================================
// LOGOS GRID
// ============================================

function LogosGrid({
  assets,
  search,
  onPreview,
}: Readonly<{
  assets: LogoAsset[];
  search: string;
  onPreview: (asset: { url: string; name: string }) => void;
}>) {
  const filtered = useMemo(() => {
    if (!search.trim()) return assets;
    const q = search.toLowerCase();
    return assets.filter(
      (a) =>
        a.name.toLowerCase().includes(q) || a.segment.toLowerCase().includes(q)
    );
  }, [assets, search]);

  // Group by segment
  const grouped = useMemo(() => {
    const groups = new Map<string, LogoAsset[]>();
    for (const asset of filtered) {
      const existing = groups.get(asset.segment) || [];
      existing.push(asset);
      groups.set(asset.segment, existing);
    }
    return groups;
  }, [filtered]);

  if (filtered.length === 0) {
    return <EmptyState message={search ? `Aucun logo pour "${search}"` : 'Aucun logo disponible'} />;
  }

  return (
    <div className="px-4 space-y-5">
      {Array.from(grouped.entries()).map(([segment, logos]) => {
        const SegIcon = segmentIconMap[segment] || FolderOpen;
        return (
          <div key={segment}>
            {/* Segment Header */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-lg bg-bdc-blue/10 flex items-center justify-center">
                <SegIcon size={14} className="text-bdc-blue" strokeWidth={1.8} />
              </span>
              <span className="text-xs font-bold text-bdc-black dark:text-white uppercase tracking-wider font-display">
                {segment}
              </span>
              <span className="text-[10px] text-muted dark:text-gray-500 ml-auto">
                {logos.length} logo{logos.length > 1 ? 's' : ''}
              </span>
            </div>

            {/* Logo Grid */}
            <div className="grid grid-cols-4 gap-2.5">
              {logos.map((logo) => (
                <LogoCard key={logo.id} logo={logo} onPreview={onPreview} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function LogoCard({
  logo,
  onPreview,
}: Readonly<{
  logo: LogoAsset;
  onPreview: (asset: { url: string; name: string }) => void;
}>) {
  const [imgError, setImgError] = useState(false);

  return (
    <button
      data-asset-card
      onClick={() => onPreview({ url: logo.url, name: logo.name })}
      className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-white/70 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 hover:border-bdc-blue/30 hover:shadow-md hover:shadow-bdc-blue/5 active:scale-95 transition-all group"
    >
      <div className="w-14 h-14 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden">
        {imgError ? (
          <span className="text-lg font-bold text-bdc-blue/50 font-display">
            {logo.name.charAt(0)}
          </span>
        ) : (
          <img
            src={logo.url}
            alt={logo.name}
            className="w-11 h-11 object-contain group-hover:scale-110 transition-transform duration-200"
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <span className="text-[9px] text-muted dark:text-gray-400 font-medium text-center leading-tight line-clamp-2 w-full">
        {logo.name}
      </span>
    </button>
  );
}

// ============================================
// PACKSHOTS GRID
// ============================================

function PackshotsGrid({
  assets,
  search,
  onPreview,
}: Readonly<{
  assets: PackshotAsset[];
  search: string;
  onPreview: (asset: { url: string; name: string }) => void;
}>) {
  const filtered = useMemo(() => {
    if (!search.trim()) return assets;
    const q = search.toLowerCase();
    return assets.filter(
      (a) =>
        a.brand.toLowerCase().includes(q) ||
        a.name.toLowerCase().includes(q) ||
        a.group?.toLowerCase().includes(q)
    );
  }, [assets, search]);

  // Group by brand
  const grouped = useMemo(() => {
    const groups = new Map<string, PackshotAsset[]>();
    for (const asset of filtered) {
      const existing = groups.get(asset.brand) || [];
      existing.push(asset);
      groups.set(asset.brand, existing);
    }
    return groups;
  }, [filtered]);

  if (filtered.length === 0) {
    return (
      <EmptyState
        message={search ? `Aucun packshot pour "${search}"` : 'Aucun packshot disponible'}
      />
    );
  }

  return (
    <div className="px-4 space-y-5">
      {Array.from(grouped.entries()).map(([brand, shots]) => (
        <div key={brand}>
          {/* Brand Header */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-7 h-7 rounded-lg bg-bdc-red/10 flex items-center justify-center">
              <Camera size={14} className="text-bdc-red" strokeWidth={1.8} />
            </span>
            <span className="text-xs font-bold text-bdc-black dark:text-white uppercase tracking-wider font-display">
              {brand}
            </span>
            <span className="text-[10px] text-muted dark:text-gray-500 ml-auto">
              {shots.length} photo{shots.length > 1 ? 's' : ''}
            </span>
          </div>

          {/* Packshot horizontal scroll */}
          <div
            className="overflow-x-auto scrollbar-hide -mx-4 px-4"
            style={{ scrollbarWidth: 'none' }}
          >
            <div className="flex gap-3 min-w-min">
              {shots.map((shot) => (
                <PackshotCard key={shot.id} shot={shot} onPreview={onPreview} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PackshotCard({
  shot,
  onPreview,
}: Readonly<{
  shot: PackshotAsset;
  onPreview: (asset: { url: string; name: string }) => void;
}>) {
  const [imgError, setImgError] = useState(false);

  return (
    <button
      data-asset-card
      onClick={() => onPreview({ url: shot.url, name: shot.name })}
      className="flex-shrink-0 w-[130px] rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 overflow-hidden hover:border-bdc-blue/30 hover:shadow-lg hover:shadow-bdc-blue/5 active:scale-[0.97] transition-all group"
    >
      {/* Image area */}
      <div className="relative h-[150px] bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center p-3">
        {imgError ? (
          <div className="flex flex-col items-center gap-1 text-gray-300 dark:text-gray-600">
            <Camera size={24} strokeWidth={1.2} />
            <span className="text-[8px]">Indisponible</span>
          </div>
        ) : (
          <img
            src={encodeURI(shot.url)}
            alt={shot.name}
            className="max-w-full max-h-full object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgError(true)}
          />
        )}
        {/* Quick preview overlay */}
        <div className="absolute inset-0 bg-bdc-blue/0 group-hover:bg-bdc-blue/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
          <span className="w-8 h-8 rounded-full bg-white/90 dark:bg-black/60 flex items-center justify-center shadow-lg">
            <Eye size={14} className="text-bdc-blue" />
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-2.5">
        {shot.group && (
          <span className="text-[9px] font-bold text-bdc-blue uppercase tracking-wider">
            {shot.group}
          </span>
        )}
        <p className="text-[10px] text-muted dark:text-gray-400 font-medium leading-tight line-clamp-2 mt-0.5">
          {shot.name.replaceAll('_', ' ')}
        </p>
      </div>
    </button>
  );
}

// ============================================
// DOCUMENTS LIST
// ============================================

function DocumentsList() {
  return (
    <div className="px-4 space-y-3">
      {/* Info banner */}
      <div className="bg-bdc-blue/5 border border-bdc-blue/10 rounded-xl p-3.5 flex items-start gap-3 mb-1">
        <span className="w-8 h-8 rounded-lg bg-bdc-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <FolderOpen size={16} className="text-bdc-blue" strokeWidth={1.8} />
        </span>
        <div>
          <p className="text-xs font-semibold text-bdc-black dark:text-white">
            Documents commerciaux
          </p>
          <p className="text-[11px] text-muted dark:text-gray-400 mt-0.5 leading-relaxed">
            Guides et argumentaires de vente pour tous les produits BDC.
          </p>
        </div>
      </div>

      {/* Document Cards */}
      {documents.map((doc) => (
        <DocumentCard key={doc.id} doc={doc} />
      ))}

      {/* Tip */}
      <div className="bg-bdc-yellow/10 border border-bdc-yellow/20 rounded-xl p-4 flex items-start gap-3 mt-4">
        <span className="w-8 h-8 rounded-lg bg-bdc-yellow/20 flex items-center justify-center flex-shrink-0">
          <svg
            className="w-4 h-4 text-bdc-yellow"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
            />
          </svg>
        </span>
        <div>
          <p className="text-xs font-semibold text-bdc-black dark:text-bdc-yellow">Astuce</p>
          <p className="text-[11px] text-muted dark:text-gray-400 mt-0.5 leading-relaxed">
            Consultez les argumentaires avant chaque visite client pour maitriser vos arguments de
            vente.
          </p>
        </div>
      </div>
    </div>
  );
}

function DocumentCard({ doc }: Readonly<{ doc: DocumentAsset }>) {
  const DocIcon = doc.icon;
  const typeColor =
    doc.type === 'pdf'
      ? 'bg-bdc-red/10 text-bdc-red'
      : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';

  return (
    <div
      data-asset-card
      className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 rounded-xl overflow-hidden hover:border-bdc-blue/20 transition-all"
    >
      <div className="p-4 flex items-start gap-3.5">
        {/* Icon */}
        <span className="w-11 h-11 rounded-xl bg-bdc-red/10 flex items-center justify-center flex-shrink-0">
          <DocIcon size={20} className="text-bdc-red" strokeWidth={1.5} />
        </span>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-bdc-black dark:text-white font-display leading-snug">
                {doc.name}
              </h3>
              <p className="text-[11px] text-muted dark:text-gray-400 mt-0.5 leading-relaxed">
                {doc.description}
              </p>
            </div>
          </div>

          {/* Meta + Action */}
          <div className="flex items-center justify-between mt-2.5">
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${typeColor}`}
              >
                {doc.type}
              </span>
              <span className="text-[10px] text-muted dark:text-gray-500">{doc.size}</span>
            </div>
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-bdc-blue/10 hover:bg-bdc-blue/20 text-bdc-blue rounded-lg text-[11px] font-semibold transition-colors active:scale-95">
              <Download size={12} strokeWidth={2.5} />
              <span>Voir</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// IMAGE PREVIEW MODAL
// ============================================

function ImagePreview({
  url,
  name,
  onClose,
}: Readonly<{
  url: string;
  name: string;
  onClose: () => void;
}>) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (overlayRef.current) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 });
    }
    if (imgRef.current) {
      gsap.fromTo(
        imgRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'back.out(1.4)' }
      );
    }
  }, []);

  const handleClose = () => {
    if (overlayRef.current && imgRef.current) {
      gsap.to(imgRef.current, { opacity: 0, scale: 0.9, duration: 0.2 });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.2,
        delay: 0.05,
        onComplete: onClose,
      });
    } else {
      onClose();
    }
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
    >
      <button
        className="absolute inset-0 w-full h-full cursor-default"
        onClick={handleClose}
        aria-label="Fermer"
        tabIndex={-1}
      />
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
      >
        <X size={20} className="text-white" />
      </button>

      {/* Image container */}
      <div
        ref={imgRef}
        className="relative max-w-[90vw] max-h-[80vh] flex flex-col items-center"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl">
          <img
            src={encodeURI(url)}
            alt={name}
            className="max-w-full max-h-[60vh] object-contain"
          />
        </div>
        <p className="text-white/80 text-sm font-medium mt-4 text-center">{name.replaceAll('_', ' ')}</p>
      </div>
    </div>
  );
}

// ============================================
// EMPTY STATE
// ============================================

function EmptyState({ message }: Readonly<{ message: string }>) {
  return (
    <div className="px-4 py-16 text-center">
      <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-white/70 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 flex items-center justify-center">
        <Search size={20} className="text-muted" strokeWidth={1.5} />
      </div>
      <p className="text-sm text-muted dark:text-gray-400 font-medium">{message}</p>
    </div>
  );
}
