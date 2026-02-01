import { useEffect, useState } from 'preact/hooks';
import { route } from 'preact-router';
import { ArrowLeft, Package, Info, Star, Share2, CheckCircle, AlertTriangle, Clock, Truck, Award, Target, Box } from '../components/ui/Icon';
import { PackshotGallery } from '../components/catalogue/PackshotGallery';
import type { Brand } from '../lib/data/segments';
import type { Packshot } from '../components/catalogue/PackshotGallery';

interface BrandDetailProps {
  id?: string;
  path?: string;
}

// Dynamic pricing configuration
const DYNAMIC_PRICING = {
  basePrice: 400,
  formatMultipliers: {
    '33cl': 1.0,
    '50cl': 1.3,
    '65cl': 1.7,
    'Canette': 1.1
  },
  brandPremiums: {
    'castel-beer': 1.1,
    '33-export': 1.25,
    'beaufort': 1.5,
    'heineken': 1.3
  },
  specialFeatures: {
    'Frozen': 1.2,
    'Open': 1.05,
    'Caps': 1.0,
    'PO': 1.0,
    'ALE': 1.1,
    'APO': 1.0,
    'BREMER': 1.0,
    'GRAVEE': 1.3,
    'NEW LOOK': 1.15
  },
  marginRanges: {
    'castel-beer': { min: 18, max: 22 },
    '33-export': { min: 16, max: 20 },
    'beaufort': { min: 19, max: 24 },
    'heineken': { min: 17, max: 19 }
  }
};

// Calculate dynamic price and margin
const calculateDynamicPricing = (brandId: string, packshotName: string, format: string) => {
  const { basePrice, formatMultipliers, brandPremiums, specialFeatures, marginRanges } = DYNAMIC_PRICING;
  
  // Calculate base price with format multiplier
  let price = basePrice * (formatMultipliers[format as keyof typeof formatMultipliers] || 1.0);
  
  // Apply brand premium
  price *= brandPremiums[brandId as keyof typeof brandPremiums] || 1.0;
  
  // Apply special features
  Object.entries(specialFeatures).forEach(([feature, multiplier]) => {
    if (packshotName.toUpperCase().includes(feature.toUpperCase())) {
      price *= multiplier;
    }
  });
  
  // Round to nearest 50
  price = Math.round(price / 50) * 50;
  
  // Calculate margin based on brand range and price
  const marginRange = marginRanges[brandId as keyof typeof marginRanges] || { min: 15, max: 20 };
  const margin = Math.round(marginRange.min + (price - basePrice) / (basePrice * 2) * (marginRange.max - marginRange.min));
  
  return { price, margin };
};

// Mock packshots with dynamic pricing
const MOCK_PACKSHOTS: Record<string, Packshot[]> = {
  'castel-beer': [
    { id: '1', name: 'CASTEL BEER ALE 50cl', image: '/assets/packshots/Bières/Castel Beer/ALE 50/APO-33-Gouttes', format: 'Bouteille', contenance: '50cl' },
    { id: '2', name: 'CASTEL BEER APO 33cl', image: '/assets/packshots/Bières/Castel Beer/APO 33/APO-33-Gouttes', format: 'Bouteille', contenance: '33cl' },
    { id: '3', name: 'CASTEL BEER APO 65cl', image: '/assets/packshots/Bières/Castel Beer/APO 65/APO-33-Gouttes', format: 'Bouteille', contenance: '65cl' },
    { id: '4', name: 'CASTEL BEER BREMER 33cl', image: '/assets/packshots/Bières/Castel Beer/BREMER 33/APO-33-Gouttes', format: 'Bouteille', contenance: '33cl' },
    { id: '5', name: 'CASTEL BEER BREMER 65cl', image: '/assets/packshots/Bières/Castel Beer/BREMER 65/APO-33-Gouttes', format: 'Bouteille', contenance: '65cl' },
    { id: '6', name: 'CASTEL BEER GRAVEE', image: '/assets/packshots/Bières/Castel Beer/GRAVEE/APO-33-Gouttes', format: 'Bouteille', contenance: '65cl' },
  ],
  'heineken': [
    { id: '1', name: '33 EXPORT 33cl', image: '/assets/packshots/Bières/33 Export/33 CL/33 EXPORT NEW LOOK 33 CL_McCANN', format: 'Bouteille', contenance: '33cl' },
    { id: '2', name: '33 EXPORT 65cl', image: '/assets/packshots/Bières/33 Export/65 CL/33 EXPORT NEW LOOK 65 CL_McCANN', format: 'Bouteille', contenance: '65cl' },
  ],
  '33-export': [
    { id: '1', name: '33 EXPORT 33cl', image: '/assets/packshots/Bières/33 Export/33 CL/33 EXPORT NEW LOOK 33 CL_McCANN', format: 'Bouteille', contenance: '33cl' },
    { id: '2', name: '33 EXPORT 50cl', image: '/assets/packshots/Bières/33 Export/50 CL/33 EXPORT NEW LOOK 50 CL_McCANN', format: 'Bouteille', contenance: '50cl' },
    { id: '3', name: '33 EXPORT 65cl', image: '/assets/packshots/Bières/33 Export/65 CL/33 EXPORT NEW LOOK 65 CL_McCANN', format: 'Bouteille', contenance: '65cl' },
    { id: '4', name: '33 EXPORT 65cl Open', image: '/assets/packshots/Bières/33 Export/65 CL/33 EXPORT NEW LOOK 65 CL_McCANN_open', format: 'Bouteille', contenance: '65cl' },
    { id: '5', name: '33 EXPORT Canette', image: '/assets/packshots/Bières/33 Export/CANETTE/33 EXPORT NEW LOOK CAN', format: 'Canette', contenance: '50cl' },
  ],
  'beaufort': [
    { id: '1', name: 'Beaufort 33cl Caps', image: '/assets/packshots/Bières/Beaufort/Beaufort_33_Caps', format: 'Bouteille', contenance: '33cl' },
    { id: '2', name: 'Beaufort 33cl PO', image: '/assets/packshots/Bières/Beaufort/Beaufort_33_PO', format: 'Bouteille', contenance: '33cl' },
    { id: '3', name: 'Beaufort 33cl Caps Frozen', image: '/assets/packshots/Bières/Beaufort/Beaufort_33_Caps_Frozen', format: 'Bouteille', contenance: '33cl' },
    { id: '4', name: 'Beaufort 33cl PO Frozen', image: '/assets/packshots/Bières/Beaufort/Beaufort_33_PO_Frozen', format: 'Bouteille', contenance: '33cl' },
    { id: '5', name: 'Beaufort 33cl Open', image: '/assets/packshots/Bières/Beaufort/Beaufort_33_open', format: 'Bouteille', contenance: '33cl' },
    { id: '6', name: 'Beaufort Canette', image: '/assets/packshots/Bières/Beaufort/Beaufort_Can', format: 'Canette', contenance: '50cl' },
    { id: '7', name: 'Beaufort Canette Frozen', image: '/assets/packshots/Bières/Beaufort/Beaufort_Can_Frozen', format: 'Canette', contenance: '50cl' },
  ],
};

// Arguments de vente par marque
const BRAND_ARGUMENTS: Record<string, { main: string[], objections: { question: string; answer: string }[] }> = {
  'castel-beer': {
    main: [
      "Castel Beer, la bière camerounaise par excellence depuis 1948",
      "Qualité certifiée ISO 9001, brassée avec des ingrédients premium locaux",
      "Disponibilité garantie sur tout le territoire camerounais",
      "Marge attractive de 18-22% pour les revendeurs",
      "Rotation rapide assurée par la forte demande du marché"
    ],
    objections: [
      { question: "C'est plus cher que la concurrence", answer: "Qualité supérieure justifie le prix. Marge 18-22% meilleure que marché. Ingrédients locaux premium." },
      { question: "Les clients ne connaissent pas", answer: "Marque historique depuis 1948. Forte notoriété nationale. Support marketing BDC inclus." },
      { question: "Ça ne tourne pas assez", answer: "Rotation rapide garantie. Stock permanent. Demande supérieure à l'offre. Support promotionnel." }
    ]
  },
  '33-export': {
    main: [
      "33 Export, l'icône de la bière camerounaise internationale",
      "Goût unique et reconnaissable, apprécié des consommateurs exigeants",
      "Présence dans plus de 50 pays, gage de qualité mondiale",
      "Packaging moderne NEW LOOK pour attractivité maximale en rayon",
      "Gamme complète : 33cl, 50cl, 65cl et canette pour tous les usages"
    ],
    objections: [
      { question: "Pourquoi changer de packaging ?", answer: "NEW LOOK moderne attire clients jeunes. Maintient qualité. Différenciation rayon. Impact ventes +15%." },
      { question: "Les clients préfèrent les marques locales", answer: "33 Export = fierté camerounaise exportée mondiale. Qualité internationale reconnue. Prix compétitif." },
      { question: "La canette est plus chère", answer: "Format pratique premium. Marge 20% supérieure. Conservation meilleure. Cible clients modernes." }
    ]
  },
  'beaufort': {
    main: [
      "Beaufort, l'excellence brassicole camerounaise artisanale",
      "Recette traditionnelle préservée depuis 1948",
      "Ingrédients 100% locaux : malt camerounais, houblon sélectionné",
      "Processus de fermentation unique pour goût inimitable",
      "Versions Frozen exclusives pour marché CHR et événements"
    ],
    objections: [
      { question: "C'est une bière artisanale, pas assez de volume", answer: "Production industrielle contrôlée. Volume suffisant. Qualité artisanale = premium. Marge 19-24%." },
      { question: "Les versions Frozen sont chères", answer: "Produit premium pour segment haute. Marge 21-24% excellente. Différenciation concurrentielle." },
      { question: "Pas assez connue", answer: "Positionnement premium = moins de concurrence. Clientèle fidèle. Support dégustation. Storytelling fort." }
    ]
  }
};

export function BrandDetail({ id, path }: BrandDetailProps) {
  // Extract id from path if not provided directly
  const brandId = id || (path && path.replace('/brand/', '')) || '';
  const [brand, setBrand] = useState<Brand | null>(null);
  const [packshots, setPackshots] = useState<Packshot[]>([]);
  const [selectedPackshot, setSelectedPackshot] = useState<Packshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'specs' | 'arguments' | 'conservation' | 'characteristics'>('specs');

  useEffect(() => {
    // Load brand info from segments data
    async function loadBrand() {
      try {
        const { loadSegmentsBrands } = await import('../lib/data/segments');
        const data = await loadSegmentsBrands();
        const foundBrand = data.segments
          .flatMap(s => s.brands)
          .find(b => b.id === brandId);
        
        if (foundBrand) {
          setBrand(foundBrand);
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to load brand:', error);
        setLoading(false);
      }
    }

    loadBrand();
  }, [brandId]);

  // Load packshots with dynamic pricing
  useEffect(() => {
    const loadPackshots = async () => {
      const packshotsData = MOCK_PACKSHOTS[brandId] || [];
      
      // Apply dynamic pricing to each packshot
      const packshotsWithPricing = packshotsData.map(packshot => {
        const { price, margin } = calculateDynamicPricing(
          brandId, 
          packshot.name, 
          packshot.format
        );
        return {
          ...packshot,
          price,
          margin
        };
      });
      
      setPackshots(packshotsWithPricing);
      
      // Select first packshot by default
      if (packshotsWithPricing.length > 0 && !selectedPackshot) {
        setSelectedPackshot(packshotsWithPricing[0]);
      }
    };

    if (brandId) {
      loadPackshots();
    }
  }, [brandId, selectedPackshot]);

  if (loading) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="flex items-center gap-3 text-bdc-red">
          <div className="w-8 h-8 border-2 border-bdc-red border-t-transparent rounded-full animate-spin"></div>
          <span className="font-medium">Chargement...</span>
        </div>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-bdc-black mb-4">Marque non trouvée</h2>
          <button 
            onClick={() => route('/catalogue')}
            className="px-4 py-2 bg-bdc-red text-white rounded-lg hover:bg-bdc-red/90 transition-colors"
          >
            Retour au catalogue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => route('/catalogue')}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors mr-4"
              >
                <ArrowLeft size={20} className="text-bdc-black" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-bdc-black">{brand.name}</h1>
                <p className="text-xs text-gray-500">Fiche technique</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Star size={20} className="text-bdc-yellow" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Share2 size={20} className="text-bdc-black" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column - Packshot Gallery */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-bdc-black flex items-center gap-2">
              <Package size={20} />
              Packshots
            </h2>
            
            <PackshotGallery
              packshots={packshots}
              selectedPackshot={selectedPackshot}
              onPackshotSelect={setSelectedPackshot}
            />
          </div>

          {/* Right Column - Technical Sheet with Enhanced Glassmorphisme */}
          <div className="space-y-6">
            {/* Priority 1: Disponibilité */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl transition-all duration-300 group-hover:from-green-500/30 group-hover:to-green-600/30"></div>
              <div className="relative backdrop-blur-lg bg-white/80 border border-white/30 rounded-xl p-6 shadow-xl transition-all duration-300 group-hover:shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle size={20} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-green-800 uppercase tracking-wider">
                      1️⃣ Disponibilité (100%)
                    </h3>
                    <p className="text-xs text-green-600">Toujours en stock</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle size={18} className="text-green-600" />
                      <span className="text-sm font-medium text-gray-800">Stock disponible</span>
                    </div>
                    <span className="text-sm font-bold text-green-600">Oui</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Truck size={18} className="text-green-600" />
                      <span className="text-sm font-medium text-gray-800">Livraison</span>
                    </div>
                    <span className="text-sm font-bold text-green-600">24-48h</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock size={18} className="text-green-600" />
                      <span className="text-sm font-medium text-gray-800">Rotation</span>
                    </div>
                    <span className="text-sm font-bold text-green-600">Rapide</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Priority 2: Qualité */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl transition-all duration-300 group-hover:from-blue-500/30 group-hover:to-blue-600/30"></div>
              <div className="relative backdrop-blur-lg bg-white/80 border border-white/30 rounded-xl p-6 shadow-xl transition-all duration-300 group-hover:shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Award size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-blue-800 uppercase tracking-wider">
                      2️⃣ Qualité Certifiée (100%)
                    </h3>
                    <p className="text-xs text-blue-600">Excellence garantie</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Award size={18} className="text-blue-600" />
                      <span className="text-sm font-medium text-gray-800">Certification</span>
                    </div>
                    <span className="text-sm font-bold text-blue-600">ISO 9001</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock size={18} className="text-blue-600" />
                      <span className="text-sm font-medium text-gray-800">Depuis</span>
                    </div>
                    <span className="text-sm font-bold text-blue-600">1948</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Star size={18} className="text-blue-600" />
                      <span className="text-sm font-medium text-gray-800">Ingrédients</span>
                    </div>
                    <span className="text-sm font-bold text-blue-600">Premium</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Priority 3: Prix */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-bdc-yellow/30 to-bdc-yellow/40 rounded-xl transition-all duration-300 group-hover:from-bdc-yellow/40 group-hover:to-bdc-yellow/50"></div>
              <div className="relative backdrop-blur-lg bg-white/80 border border-white/30 rounded-xl p-6 shadow-xl transition-all duration-300 group-hover:shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-bdc-yellow/20 rounded-full flex items-center justify-center">
                    <Target size={20} className="text-bdc-black" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-bdc-black uppercase tracking-wider">
                      3️⃣ Prix Compétitif (50%)
                    </h3>
                    <p className="text-xs text-bdc-black/70">
                      {selectedPackshot?.name || 'Meilleur rapport Q/P'}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-bdc-yellow/10 rounded-lg">
                    <span className="text-sm font-medium text-gray-800">Prix détaillant</span>
                    <span className="text-lg font-bold text-bdc-black">
                      {selectedPackshot?.price ? `${selectedPackshot.price} FCFA` : '500 FCFA'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-bdc-yellow/10 rounded-lg">
                    <span className="text-sm font-medium text-gray-800">Marge</span>
                    <span className="text-lg font-bold text-bdc-black">
                      {selectedPackshot?.margin ? `${selectedPackshot.margin}%` : '18%'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-bdc-yellow/10 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Target size={18} className="text-bdc-black" />
                      <span className="text-sm font-medium text-gray-800">Positionnement</span>
                    </div>
                    <span className="text-sm font-bold text-bdc-black">Premium</span>
                  </div>
                  {selectedPackshot && (
                    <div className="flex items-center justify-between p-3 bg-bdc-yellow/10 rounded-lg">
                      <span className="text-sm font-medium text-gray-800">Format</span>
                      <span className="text-sm font-bold text-bdc-black">{selectedPackshot.format}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Priority 4: Gamme */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl transition-all duration-300 group-hover:from-purple-500/30 group-hover:to-purple-600/30"></div>
              <div className="relative backdrop-blur-lg bg-white/80 border border-white/30 rounded-xl p-6 shadow-xl transition-all duration-300 group-hover:shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Box size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-purple-800 uppercase tracking-wider">
                      4️⃣ Large Gamme BDC (50%)
                    </h3>
                    <p className="text-xs text-purple-600">Portfolio complet</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-purple-50/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Box size={18} className="text-purple-600" />
                      <span className="text-sm font-medium text-gray-800">Produits</span>
                    </div>
                    <span className="text-sm font-bold text-purple-600">50+</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Star size={18} className="text-purple-600" />
                      <span className="text-sm font-medium text-gray-800">Catégories</span>
                    </div>
                    <span className="text-sm font-bold text-purple-600">Toutes</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Award size={18} className="text-purple-600" />
                      <span className="text-sm font-medium text-gray-800">Couverture</span>
                    </div>
                    <span className="text-sm font-bold text-purple-600">Nationale</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Tabs Navigation */}
            <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-white/30 overflow-hidden">
              <div className="flex border-b border-gray-200/50">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    activeTab === 'specs'
                      ? 'text-bdc-red bg-bdc-red/10 border-b-2 border-bdc-red'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50/50'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Info size={16} />
                    Caractéristiques
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('arguments')}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    activeTab === 'arguments'
                      ? 'text-bdc-red bg-bdc-red/10 border-b-2 border-bdc-red'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50/50'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Target size={16} />
                    Arguments
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('conservation')}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    activeTab === 'conservation'
                      ? 'text-bdc-red bg-bdc-red/10 border-b-2 border-bdc-red'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50/50'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Clock size={16} />
                    Conservation
                  </div>
                </button>
              </div>

              {/* Enhanced Tab Content */}
              <div className="p-6">
                {activeTab === 'specs' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Info size={18} className="text-bdc-red" />
                        Informations générales
                      </h4>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="p-4 bg-gray-50/50 rounded-lg border border-gray-200/50">
                          <dt className="text-sm text-gray-600 mb-1">Marque</dt>
                          <dd className="text-base font-bold text-bdc-black">{brand.name}</dd>
                        </div>
                        <div className="p-4 bg-gray-50/50 rounded-lg border border-gray-200/50">
                          <dt className="text-sm text-gray-600 mb-1">Segment</dt>
                          <dd className="text-base font-bold text-bdc-black">Boissons</dd>
                        </div>
                        <div className="p-4 bg-gray-50/50 rounded-lg border border-gray-200/50">
                          <dt className="text-sm text-gray-600 mb-1">Positionnement</dt>
                          <dd className="text-base font-bold text-bdc-black">Premium</dd>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Package size={18} className="text-bdc-red" />
                        Produits disponibles ({packshots.length})
                      </h4>
                      <div className="space-y-2">
                        {packshots.map((packshot) => (
                          <div key={packshot.id} className="flex justify-between items-center p-3 bg-gray-50/50 rounded-lg border border-gray-200/50 hover:bg-gray-100/50 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-bdc-red/10 rounded-full flex items-center justify-center">
                                <Package size={16} className="text-bdc-red" />
                              </div>
                              <div>
                                <span className="text-sm font-medium text-bdc-black">{packshot.name}</span>
                                <p className="text-xs text-gray-500">{packshot.format}</p>
                              </div>
                            </div>
                            <span className="text-xs font-bold text-bdc-black bg-bdc-yellow/20 px-2 py-1 rounded">{packshot.contenance}</span>
                          </div>
                        ))}
                        {packshots.length === 0 && (
                          <div className="text-center py-8 text-gray-500">
                            <Package size={32} className="mx-auto mb-2 opacity-50" />
                            <p className="text-sm">Aucun produit disponible</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'arguments' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Target size={18} className="text-bdc-red" />
                        Arguments de vente - {brand.name}
                      </h4>
                      <div className="space-y-4">
                        {BRAND_ARGUMENTS[brandId]?.main.map((argument, index) => (
                          <div key={index} className="p-4 bg-gradient-to-r from-bdc-red/5 to-bdc-yellow/5 rounded-lg border border-bdc-red/20">
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-bdc-red rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-white text-xs font-bold">{index + 1}</span>
                              </div>
                              <p className="text-sm text-gray-700 leading-relaxed">{argument}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <AlertTriangle size={18} className="text-bdc-red" />
                        Réponses aux objections fréquentes
                      </h4>
                      <div className="space-y-3">
                        {BRAND_ARGUMENTS[brandId]?.objections.map((objection, index) => (
                          <div key={index} className="p-4 bg-gray-50/50 rounded-lg border border-gray-200/50">
                            <div className="flex items-start gap-3 mb-2">
                              <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <AlertTriangle size={14} className="text-orange-600" />
                              </div>
                              <p className="text-sm font-medium text-gray-800 italic">
                                "{objection.question}"
                              </p>
                            </div>
                            <div className="flex items-start gap-3 ml-9">
                              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <CheckCircle size={14} className="text-green-600" />
                              </div>
                              <p className="text-sm text-gray-700 leading-relaxed">{objection.answer}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {selectedPackshot && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <Package size={18} className="text-bdc-red" />
                          Arguments spécifiques - {selectedPackshot.name}
                        </h4>
                        <div className="p-4 bg-bdc-yellow/10 rounded-lg border border-bdc-yellow/30">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-gray-600">Prix concurrentiel :</span>
                              <p className="text-bdc-black font-bold">{selectedPackshot.price} FCFA</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-600">Marge attractive :</span>
                              <p className="text-bdc-black font-bold">{selectedPackshot.margin}%</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-600">Format pratique :</span>
                              <p className="text-bdc-black font-bold">{selectedPackshot.format}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-600">Contenance idéale :</span>
                              <p className="text-bdc-black font-bold">{selectedPackshot.contenance}</p>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-bdc-yellow/20">
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">Argument clé :</span> Ce format offre le meilleur rapport qualité/prix pour votre clientèle avec une marge de {selectedPackshot.margin}%.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === 'conservation' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Clock size={18} className="text-bdc-red" />
                        Conseils de conservation
                      </h4>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-200/50">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-bold text-sm">°C</span>
                            </div>
                            <h5 className="font-medium text-blue-800">Température</h5>
                          </div>
                          <p className="text-sm text-gray-700">4-8°C optimal pour préserver les arômes et la fraîcheur.</p>
                        </div>
                        <div className="p-4 bg-green-50/50 rounded-lg border border-green-200/50">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                              <Clock size={16} className="text-green-600" />
                            </div>
                            <h5 className="font-medium text-green-800">Durée</h5>
                          </div>
                          <p className="text-sm text-gray-700">6 mois après production pour qualité optimale.</p>
                        </div>
                        <div className="p-4 bg-purple-50/50 rounded-lg border border-purple-200/50">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                              <Box size={16} className="text-purple-600" />
                            </div>
                            <h5 className="font-medium text-purple-800">Stockage</h5>
                          </div>
                          <p className="text-sm text-gray-700">Débout, au frais, à l'abri de la lumière directe.</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Award size={18} className="text-bdc-red" />
                        Merchandising
                      </h4>
                      <div className="p-4 bg-gray-50/50 rounded-lg border border-gray-200/50">
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-600" />
                            Rotation FIFO obligatoire
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-600" />
                            Vérification dates hebdomadaire
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-600" />
                            Présentation en tête de gondole
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
