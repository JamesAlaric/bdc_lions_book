# Story 2.4: Afficher Fiches Produits avec Glassmorphisme et Carousel 3D

Status: ready-for-dev

## Story

As a vendeur,
I want consulter des fiches produits visuellement attractives,
So that je peux présenter les produits de manière professionnelle aux clients.

## Acceptance Criteria

**Given** un produit est sélectionné
**When** j'ouvre la fiche produit
**Then** la fiche s'affiche avec glassmorphisme adaptatif (overlay transparent, couleurs marque)
**And** un carousel 3D interactif montre les différents formats/packs disponibles
**And** les informations critiques sont ultra-visibles: prix, % alcool, contenance, nombre bouteilles
**And** le fond utilise les couleurs marque (rouge #ff7323, jaune #ffc627)
**And** la fiche est responsive (portrait/paysage avec layout adaptatif)
**And** les animations sont fluides (200-300ms) même offline

## Business Context

**Epic 2 - Catalogue Produits & Navigation Offline-First:**
Les vendeurs peuvent consulter le catalogue complet BDC avec prix, marges et informations produits, fonctionnant 100% offline même en zones rurales sans connexion.

**Valeur utilisateur:**
- Présentation professionnelle et premium des produits BDC
- Interface visuellement attractive qui inspire confiance (Critical Success Moment #1)
- Informations critiques ultra-visibles pour négociation client
- Expérience premium qui différencie BDC de la concurrence
- Carousel 3D interactif pour montrer tous les formats disponibles

**Functional Requirements couverts:**
- FR1: Catalogue complet BDC avec fiches produits structurées
- FR2: Prix et marges ultra-visibles
- FR3: Historique et positionnement marque
- FR4: Certifications, ingrédients, conseils conservation
- FR35: Fonctionnement 100% offline (animations fluides même offline)
- NFR-P1: Performance (animations 200-300ms, transitions fluides)
- NFR-UX1: Prise en main < 5 minutes (interface intuitive)

**Continuité avec Stories précédentes:**
- Story 2.1: IndexedDB configuré avec ProductStore (données disponibles)
- Story 2.2: Service Worker configuré (assets cachés, offline garanti)
- Story 2.3: Catalogue initial chargé (produits disponibles dans IndexedDB)
- Story 2.4: Affiche fiches produits avec glassmorphisme (cette story)
- Story 2.5: Ajoutera filtres avancés (dépend de 2.4)

## Technical Requirements

### UX Design Specifications (from ux-design-specification.md)

**Pattern Glassmorphisme + Carousel Validé:**

> "**Carousel/Slider produits** au centre avec rotation 3D des formats/packs  
> **Box glassmorphisme à gauche** avec overlay transparent couleur marque  
> Informations critiques ultra-visibles : prix, % alcool, contenance, nombre bouteilles  
> Fond couleur marque (rouge #ff7323, jaune #ffc627) pour identité forte"

**Layout Adaptatif Orientation:**

> "**Portrait** : Glassmorphisme + carousel vertical, infos empilées  
> **Paysage** : Division 2/3 ou 1/2 - Slider gauche, argumentaires droite  
> Transition fluide entre orientations sans perte de contexte  
> Optimisation pour démonstration face au client"

**Glassmorphisme Adaptatif:**

> "Overlay transparent avec opacité modérée  
> Fond couleur marque (rouge/jaune BDC) pour identité  
> Contraste texte optimisé pour lisibilité maximale  
> Adaptation automatique selon luminosité ambiante  
> **Lisible dans tous les contextes** : soleil, ombre, bars sombres"

**Critical Success Moment #1 - La Première Recherche (Aminata):**

> "Résultats affichés en 2 secondes  
> Fiche produit s'ouvre avec glassmorphisme couleur marque  
> Prix, % alcool, contenance ultra-visibles  
> Carousel de formats disponibles  
> Argumentaires par canal accessibles  
> Réaction : 'C'est exactement ce que je cherchais. Je suis prête.'"

### Architecture Decisions (from architecture.md)

**UX Design Implications:**

> "**Glassmorphisme Adaptatif** : Overlay transparent avec couleurs marque (rouge #ff7323, jaune #ffc627), contraste optimisé  
> **Carousel 3D Interactif** : Rotation 3D des formats/packs avec performance fluide même offline  
> **Responsive Multi-Orientation** : Portrait (consultation rapide) et Paysage (démonstration client avec division 2/3 ou 1/2)"

**Performance Critique:**

> "Contraintes strictes (< 5s recherche, < 1.5s FCP, < 3s TTI) avec performance identique online/offline  
> **UX Exceptionnelle** : Glassmorphisme, carousel 3D, animations subtiles (200-300ms), micro-interactions, responsive multi-orientation"

### Technical Implementation Strategy

**1. Glassmorphisme Implementation (Tailwind CSS + Emotion)**

**CSS Classes for Glassmorphisme:**
```css
/* Base glassmorphisme effect */
.glass-card {
  backdrop-filter: blur(12px);
  background: rgba(255, 115, 35, 0.7); /* BDC Rouge with 70% opacity */
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
}

/* Variant with yellow background */
.glass-card-yellow {
  backdrop-filter: blur(12px);
  background: rgba(255, 198, 39, 0.7); /* BDC Jaune with 70% opacity */
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
}

/* Text contrast optimization */
.glass-text {
  color: #1a1a1a;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
  font-weight: 600;
}

/* Price highlight */
.glass-price {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  text-shadow: 0 2px 4px rgba(255, 255, 255, 0.9);
}
```

**Tailwind Config Extension:**
```typescript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'bdc-rouge': '#ff7323',
        'bdc-jaune': '#ffc627',
        'bdc-bg': '#fafafa',
      },
      backdropBlur: {
        'glass': '12px',
      },
    },
  },
}
```

**2. Carousel 3D Implementation (Framer Motion)**

**Carousel Component Structure:**
```typescript
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'preact/hooks'

interface CarouselItem {
  id: string
  imageUrl: string
  format: string
  contenance: number
  nbBouteilles?: number
}

export function Carousel3D({ items }: { items: CarouselItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      rotateY: direction < 0 ? 45 : -45,
    }),
  }
  
  return (
    <div className="carousel-container">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x)
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1)
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1)
            }
          }}
        >
          <img src={items[currentIndex].imageUrl} alt={items[currentIndex].format} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
```

**3. Layout Responsive (Portrait vs Paysage)**

**Portrait Layout:**
```typescript
<div className="product-sheet portrait">
  {/* Glassmorphisme box - top */}
  <div className="glass-card p-6 mb-4">
    <h1 className="glass-text text-2xl">{product.name}</h1>
    <p className="glass-price">{product.prix}€</p>
    <div className="specs">
      <span>{product.specs.alcool}% alc.</span>
      <span>{product.specs.contenance}ml</span>
      {product.specs.nbBouteilles && <span>{product.specs.nbBouteilles} btl</span>}
    </div>
  </div>
  
  {/* Carousel - center */}
  <Carousel3D items={formats} />
  
  {/* Additional info - bottom */}
  <div className="info-section">
    <p>Marge: {product.marge}%</p>
    <p>Marque: {product.brand}</p>
  </div>
</div>
```

**Paysage Layout (2/3 division):**
```typescript
<div className="product-sheet landscape grid grid-cols-3 gap-4">
  {/* Left 2/3: Carousel + Glassmorphisme */}
  <div className="col-span-2">
    <Carousel3D items={formats} />
    <div className="glass-card p-6 mt-4">
      <h1 className="glass-text text-3xl">{product.name}</h1>
      <p className="glass-price">{product.prix}€</p>
    </div>
  </div>
  
  {/* Right 1/3: Argumentaires (Story 2.6+) */}
  <div className="col-span-1">
    <div className="info-panel">
      <h2>Informations</h2>
      <p>Marge: {product.marge}%</p>
      <p>{product.specs.alcool}% alc.</p>
      <p>{product.specs.contenance}ml</p>
    </div>
  </div>
</div>
```

**4. Animation Performance (200-300ms target)**

**Framer Motion Configuration:**
```typescript
const transition = {
  duration: 0.25, // 250ms - within 200-300ms target
  ease: 'easeInOut',
}

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.2 }, // 200ms
}
```

**Performance Optimization:**
- Use `will-change: transform` for carousel
- Preload next/previous images
- Use `transform` instead of `left/right` for GPU acceleration
- Lazy load non-visible formats
- Optimize images (WebP, responsive sizes)

### Data Structure for Formats/Packs

**Product with Multiple Formats:**
```typescript
interface Product {
  id: string
  name: string
  brand: string
  category: string
  prix: number
  marge: number
  specs: {
    alcool?: number
    contenance: number
    nbBouteilles?: number
    format: string
  }
  // NEW: Multiple formats for carousel
  formats?: ProductFormat[]
}

interface ProductFormat {
  id: string
  format: string // "Bouteille", "Canette", "Pack 6", "Pack 12"
  contenance: number
  nbBouteilles?: number
  prix: number
  imageUrl?: string // Optional product image
}
```

**Example Data:**
```typescript
const heinekenProduct = {
  id: "prod-heineken",
  name: "Heineken",
  brand: "Heineken",
  prix: 2.50, // Prix du format principal
  formats: [
    {
      id: "heineken-33cl-btl",
      format: "Bouteille 33cl",
      contenance: 330,
      nbBouteilles: 1,
      prix: 2.50,
      imageUrl: "/images/heineken-33cl.webp"
    },
    {
      id: "heineken-pack-6",
      format: "Pack 6x33cl",
      contenance: 330,
      nbBouteilles: 6,
      prix: 12.90,
      imageUrl: "/images/heineken-pack6.webp"
    },
    {
      id: "heineken-pack-12",
      format: "Pack 12x33cl",
      contenance: 330,
      nbBouteilles: 12,
      prix: 24.50,
      imageUrl: "/images/heineken-pack12.webp"
    }
  ]
}
```

## Current State Analysis

**Existing Implementation (from Stories 2.1-2.3):**

✅ **IndexedDB:** ProductStore configured with all product data
✅ **Service Worker:** Assets cached, offline guaranteed
✅ **Catalogue Data:** Products loaded from YAML, stored in IndexedDB
✅ **Catalogue List:** Basic product list page exists (Story 2.3)
✅ **Routing:** Preact Router configured

**What's Missing (This Story):**

❌ **Product Detail Page:** No dedicated page for individual product
❌ **Glassmorphisme UI:** No glassmorphisme components implemented
❌ **Carousel 3D:** No carousel component
❌ **Responsive Layouts:** No portrait/paysage adaptive layouts
❌ **Animations:** No Framer Motion integration
❌ **Product Images:** No image assets or placeholders
❌ **Format Variants:** No support for multiple formats per product

## File Structure

```
src/routes/
├── ProductDetail.tsx         # NEW - Product detail page with glassmorphisme

src/components/product/
├── GlassCard.tsx             # NEW - Glassmorphisme card component
├── Carousel3D.tsx            # NEW - 3D carousel component
├── ProductSpecs.tsx          # NEW - Product specifications display
├── ProductHeader.tsx         # NEW - Product name, brand, price
└── FormatSelector.tsx        # NEW - Format selection UI

src/styles/
├── glassmorphisme.css        # NEW - Glassmorphisme CSS utilities
└── animations.css            # NEW - Animation utilities

public/images/products/
├── placeholder.webp          # NEW - Placeholder product image
└── ... (product images)

src/hooks/
├── useOrientation.ts         # NEW - Detect portrait/paysage
└── useProduct.ts             # NEW - Fetch product from IndexedDB
```

## Implementation Instructions

### Task 1: Install Dependencies

**Install Framer Motion:**
```bash
pnpm add framer-motion
```

**Verify Tailwind CSS and Emotion are installed (from Story 1.1):**
```bash
pnpm list tailwindcss @emotion/react @emotion/styled
```

### Task 2: Create Glassmorphisme Components

**Create `src/components/product/GlassCard.tsx`:**
```typescript
import { h } from 'preact'
import { css } from '@emotion/react'

interface GlassCardProps {
  variant?: 'rouge' | 'jaune'
  children: preact.ComponentChildren
  className?: string
}

const glassCardStyle = (variant: 'rouge' | 'jaune') => css`
  backdrop-filter: blur(12px);
  background: ${variant === 'rouge' 
    ? 'rgba(255, 115, 35, 0.7)' 
    : 'rgba(255, 198, 39, 0.7)'};
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  padding: 24px;
`

const glassTextStyle = css`
  color: #1a1a1a;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
  font-weight: 600;
`

export function GlassCard({ variant = 'rouge', children, className }: GlassCardProps) {
  return (
    <div css={glassCardStyle(variant)} className={className}>
      <div css={glassTextStyle}>
        {children}
      </div>
    </div>
  )
}
```

**Create `src/components/product/ProductHeader.tsx`:**
```typescript
import { h } from 'preact'
import { css } from '@emotion/react'

interface ProductHeaderProps {
  name: string
  brand: string
  prix: number
  marge: number
}

const priceStyle = css`
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  text-shadow: 0 2px 4px rgba(255, 255, 255, 0.9);
  margin: 8px 0;
`

const specsStyle = css`
  display: flex;
  gap: 16px;
  margin-top: 12px;
  font-size: 0.9rem;
`

export function ProductHeader({ name, brand, prix, marge }: ProductHeaderProps) {
  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{name}</h1>
      <p style={{ color: '#666', marginBottom: '8px' }}>{brand}</p>
      <p css={priceStyle}>{prix.toFixed(2)}€</p>
      <div css={specsStyle}>
        <span>Marge: {marge}%</span>
      </div>
    </div>
  )
}
```

### Task 3: Create Carousel 3D Component

**Create `src/components/product/Carousel3D.tsx`:**
```typescript
import { h } from 'preact'
import { useState } from 'preact/hooks'
import { motion, AnimatePresence } from 'framer-motion'
import { css } from '@emotion/react'

interface CarouselItem {
  id: string
  imageUrl?: string
  format: string
  contenance: number
  nbBouteilles?: number
  prix: number
}

interface Carousel3DProps {
  items: CarouselItem[]
  onFormatChange?: (item: CarouselItem) => void
}

const containerStyle = css`
  position: relative;
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

const imageStyle = css`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  user-select: none;
`

const indicatorsStyle = css`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 16px;
`

const indicatorStyle = (active: boolean) => css`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${active ? '#ff7323' : '#ccc'};
  cursor: pointer;
  transition: background 0.2s;
`

export function Carousel3D({ items, onFormatChange }: Carousel3DProps) {
  const [[currentIndex, direction], setPage] = useState([0, 0])
  
  const paginate = (newDirection: number) => {
    const newIndex = (currentIndex + newDirection + items.length) % items.length
    setPage([newIndex, newDirection])
    onFormatChange?.(items[newIndex])
  }
  
  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }
  
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      rotateY: direction < 0 ? 45 : -45,
    }),
  }
  
  return (
    <div>
      <div css={containerStyle}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x)
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1)
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1)
              }
            }}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img 
              src={items[currentIndex].imageUrl || '/images/products/placeholder.webp'} 
              alt={items[currentIndex].format}
              css={imageStyle}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Format info */}
      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <p style={{ fontWeight: 'bold' }}>{items[currentIndex].format}</p>
        <p>{items[currentIndex].prix.toFixed(2)}€</p>
      </div>
      
      {/* Indicators */}
      <div css={indicatorsStyle}>
        {items.map((_, index) => (
          <div
            key={index}
            css={indicatorStyle(index === currentIndex)}
            onClick={() => setPage([index, index > currentIndex ? 1 : -1])}
          />
        ))}
      </div>
    </div>
  )
}
```

### Task 4: Create Product Detail Page

**Create `src/routes/ProductDetail.tsx`:**
```typescript
import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { route } from 'preact-router'
import { getProduct } from '../lib/storage/catalogue'
import { GlassCard } from '../components/product/GlassCard'
import { ProductHeader } from '../components/product/ProductHeader'
import { Carousel3D } from '../components/product/Carousel3D'
import type { Product } from '../lib/storage/types'

interface ProductDetailProps {
  id: string
}

export function ProductDetail({ id }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [isLandscape, setIsLandscape] = useState(
    window.innerWidth > window.innerHeight
  )
  
  useEffect(() => {
    async function loadProduct() {
      try {
        const prod = await getProduct(id)
        setProduct(prod)
      } catch (error) {
        console.error('Failed to load product:', error)
      } finally {
        setLoading(false)
      }
    }
    loadProduct()
  }, [id])
  
  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Chargement...</div>
  }
  
  if (!product) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Produit introuvable</h2>
        <button onClick={() => route('/catalogue')}>Retour au catalogue</button>
      </div>
    )
  }
  
  // Create formats array (for now, single format)
  const formats = product.formats || [
    {
      id: product.id,
      format: product.specs.format,
      contenance: product.specs.contenance,
      nbBouteilles: product.specs.nbBouteilles,
      prix: product.prix,
    }
  ]
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#fafafa',
      padding: '20px'
    }}>
      {/* Back button */}
      <button 
        onClick={() => route('/catalogue')}
        style={{
          background: 'transparent',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        ← Retour
      </button>
      
      {isLandscape ? (
        // Landscape layout (2/3 division)
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
          <div>
            <Carousel3D items={formats} />
            <GlassCard variant="rouge" style={{ marginTop: '20px' }}>
              <ProductHeader 
                name={product.name}
                brand={product.brand}
                prix={product.prix}
                marge={product.marge}
              />
            </GlassCard>
          </div>
          <div>
            <GlassCard variant="jaune">
              <h2 style={{ marginBottom: '12px' }}>Spécifications</h2>
              {product.specs.alcool && <p>Alcool: {product.specs.alcool}%</p>}
              <p>Contenance: {product.specs.contenance}ml</p>
              {product.specs.nbBouteilles && <p>Bouteilles: {product.specs.nbBouteilles}</p>}
              <p>Format: {product.specs.format}</p>
            </GlassCard>
          </div>
        </div>
      ) : (
        // Portrait layout (stacked)
        <div>
          <GlassCard variant="rouge" style={{ marginBottom: '20px' }}>
            <ProductHeader 
              name={product.name}
              brand={product.brand}
              prix={product.prix}
              marge={product.marge}
            />
          </GlassCard>
          
          <Carousel3D items={formats} />
          
          <GlassCard variant="jaune" style={{ marginTop: '20px' }}>
            <h2 style={{ marginBottom: '12px' }}>Spécifications</h2>
            {product.specs.alcool && <p>Alcool: {product.specs.alcool}%</p>}
            <p>Contenance: {product.specs.contenance}ml</p>
            {product.specs.nbBouteilles && <p>Bouteilles: {product.specs.nbBouteilles}</p>}
            <p>Format: {product.specs.format}</p>
          </GlassCard>
        </div>
      )}
    </div>
  )
}
```

### Task 5: Add Route and Navigation

**Modify `src/App.tsx` to add ProductDetail route:**
```typescript
import { Router, Route } from 'preact-router'
import { ProductDetail } from './routes/ProductDetail'

// Inside App component
<Router>
  <Route path="/" component={Home} />
  <Route path="/catalogue" component={Catalogue} />
  <Route path="/product/:id" component={ProductDetail} />
  <Route path="/settings" component={Settings} />
</Router>
```

**Modify `src/routes/Catalogue.tsx` to add navigation to ProductDetail:**
```typescript
// In product card click handler
<div 
  key={product.id} 
  onClick={() => route(`/product/${product.id}`)}
  style={{ 
    background: 'white', 
    padding: '15px', 
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    cursor: 'pointer'
  }}
>
  {/* Product card content */}
</div>
```

### Task 6: Add Placeholder Images

**Create `public/images/products/placeholder.webp`:**
- Use a generic product placeholder image
- Dimensions: 800x800px
- Format: WebP for optimal size
- Fallback: Create a simple SVG placeholder if no image available

**SVG Placeholder (if needed):**
```html
<!-- public/images/products/placeholder.svg -->
<svg width="800" height="800" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="800" fill="#fafafa"/>
  <text x="50%" y="50%" text-anchor="middle" fill="#ff7323" font-size="48" font-family="system-ui">
    🦁 Lions' Book
  </text>
</svg>
```

### Task 7: Testing

**Create `src/components/product/Carousel3D.test.tsx`:**
```typescript
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/preact'
import { Carousel3D } from './Carousel3D'

describe('Carousel3D', () => {
  const mockItems = [
    { id: '1', format: 'Bouteille 33cl', contenance: 330, prix: 2.50 },
    { id: '2', format: 'Pack 6x33cl', contenance: 330, nbBouteilles: 6, prix: 12.90 },
  ]
  
  it('should render carousel with items', () => {
    const { container } = render(<Carousel3D items={mockItems} />)
    expect(container.querySelector('img')).toBeTruthy()
  })
  
  it('should show format info', () => {
    const { getByText } = render(<Carousel3D items={mockItems} />)
    expect(getByText('Bouteille 33cl')).toBeTruthy()
    expect(getByText('2.50€')).toBeTruthy()
  })
  
  it('should render indicators for each item', () => {
    const { container } = render(<Carousel3D items={mockItems} />)
    const indicators = container.querySelectorAll('[style*="border-radius: 50%"]')
    expect(indicators.length).toBe(2)
  })
})
```

**Manual Testing Checklist:**
- [ ] Product detail page loads from catalogue
- [ ] Glassmorphisme card displays correctly
- [ ] Carousel swipe works (drag left/right)
- [ ] Carousel indicators work (click to navigate)
- [ ] Animations are smooth (200-300ms)
- [ ] Portrait layout displays correctly
- [ ] Landscape layout displays correctly (2/3 division)
- [ ] Orientation change transitions smoothly
- [ ] Back button returns to catalogue
- [ ] Placeholder image displays if no product image
- [ ] All product info is visible and readable
- [ ] Works offline (test with DevTools offline mode)

## Definition of Done

- [ ] Framer Motion installed and configured
- [ ] GlassCard component created with rouge/jaune variants
- [ ] ProductHeader component created
- [ ] Carousel3D component created with 3D rotation
- [ ] ProductDetail page created with responsive layouts
- [ ] Portrait layout implemented (stacked)
- [ ] Landscape layout implemented (2/3 division)
- [ ] Orientation detection working
- [ ] Route added to App.tsx (/product/:id)
- [ ] Navigation from Catalogue to ProductDetail working
- [ ] Placeholder product image created
- [ ] Animations are smooth (200-300ms measured)
- [ ] Glassmorphisme is readable in all contexts
- [ ] All tests pass (Carousel3D.test.tsx)
- [ ] Manual testing checklist completed
- [ ] Works offline (verified in DevTools)
- [ ] No console errors
- [ ] Story marked as "done" in sprint-status.yaml

## Tasks/Subtasks

### Task 1: Setup Dependencies
- [ ] Install framer-motion
- [ ] Verify Tailwind CSS and Emotion installed
- [ ] Configure Tailwind with BDC colors

### Task 2: Create Glassmorphisme Components
- [ ] Create GlassCard.tsx with rouge/jaune variants
- [ ] Create ProductHeader.tsx with price display
- [ ] Test glassmorphisme readability

### Task 3: Create Carousel 3D Component
- [ ] Create Carousel3D.tsx with Framer Motion
- [ ] Implement swipe gestures (drag left/right)
- [ ] Add 3D rotation animations (rotateY)
- [ ] Add format indicators (dots)
- [ ] Test animation performance (target 200-300ms)

### Task 4: Create Product Detail Page
- [ ] Create ProductDetail.tsx route
- [ ] Implement portrait layout (stacked)
- [ ] Implement landscape layout (2/3 division)
- [ ] Add orientation detection hook
- [ ] Add back button navigation
- [ ] Integrate GlassCard, ProductHeader, Carousel3D

### Task 5: Add Navigation
- [ ] Add /product/:id route to App.tsx
- [ ] Modify Catalogue.tsx to navigate to ProductDetail
- [ ] Test navigation flow (Catalogue → Product → Back)

### Task 6: Add Product Images
- [ ] Create placeholder.webp (800x800px)
- [ ] Add placeholder.svg fallback
- [ ] Test image loading and fallback

### Task 7: Testing and Validation
- [ ] Create Carousel3D.test.tsx
- [ ] Write tests for carousel functionality
- [ ] Complete manual testing checklist
- [ ] Test offline functionality
- [ ] Measure animation performance (DevTools Performance tab)
- [ ] Test on different screen sizes

### Task 8: Documentation and Cleanup
- [ ] Update story file with completion notes
- [ ] Document glassmorphisme CSS patterns
- [ ] Update sprint-status.yaml (2.4: done)
- [ ] Commit with message: "feat: Complete Story 2.4 - Product Sheets with Glassmorphisme"

## Dev Agent Record

### Agent Model Used

_À remplir par le dev agent_

### Debug Log References

_À remplir par le dev agent_

### Completion Notes List

_À remplir par le dev agent lors de l'implémentation_

### File List

_À remplir par le dev agent avec la liste des fichiers créés/modifiés_

## Design System

**Couleurs BDC:**
- Rouge: #ff7323
- Jaune: #ffc627
- Background: Off-white #fafafa (pas pure white)

**Glassmorphisme:**
- Backdrop blur: 12px
- Background opacity: 70% (rgba with 0.7 alpha)
- Border: 1px solid rgba(255, 255, 255, 0.2)
- Box shadow: 0 8px 32px rgba(0, 0, 0, 0.1)
- Border radius: 16px

**Typography:**
- System fonts: system-ui, -apple-system, sans-serif
- Headings: Bold, couleur #1a1a1a with text-shadow
- Price: 2rem, font-weight 700, text-shadow for contrast
- Body: Regular, couleur #1a1a1a

**Animations:**
- Duration: 200-300ms (target: 250ms)
- Easing: easeInOut
- Carousel rotation: rotateY(-45deg to 45deg)
- Page transitions: opacity + translateY

**Responsive Breakpoints:**
- Portrait: width < height
- Landscape: width > height
- Layout adapts automatically based on orientation

## Related Stories

**Depends on:**
- ✅ Story 2.1: IndexedDB configuré (ProductStore available)
- ✅ Story 2.2: Service Worker configuré (offline guaranteed)
- ✅ Story 2.3: Catalogue chargé (products in IndexedDB)

**Enables:**
- Story 2.5: Filtres par Catégorie et Marque (uses ProductDetail page)
- Story 2.6: Indicateur Statut Connexion (can add to ProductDetail)
- Story 3.1+: Argumentaires et Objections (will extend ProductDetail)

**Future Enhancements:**
- Add real product images (replace placeholders)
- Add multiple formats per product (extend carousel)
- Add zoom on product images
- Add share product feature
- Add favorite/bookmark feature

## Notes

**Performance Considerations:**
- Use `will-change: transform` for carousel animations
- Preload next/previous images in carousel
- Use `transform` instead of `left/right` for GPU acceleration
- Optimize images (WebP format, responsive sizes)
- Lazy load non-visible formats

**Accessibility:**
- Ensure glassmorphisme has sufficient contrast (WCAG AA minimum)
- Add aria-labels to carousel navigation
- Support keyboard navigation (arrow keys for carousel)
- Test with screen readers (future enhancement)

**Offline-First:**
- All components work 100% offline
- Images cached by Service Worker (Story 2.2)
- No network dependency for product display
- Smooth animations even offline (no degradation)

**UX Critical Success:**
This story implements **Critical Success Moment #1** from UX design:
> "Fiche produit s'ouvre avec glassmorphisme couleur marque  
> Prix, % alcool, contenance ultra-visibles  
> Carousel de formats disponibles  
> Réaction : 'C'est exactement ce que je cherchais. Je suis prête.'"

**Testing in Real Conditions:**
- Test glassmorphisme readability in bright sunlight (if possible)
- Test in dark environment (bars)
- Test with one hand (portrait mode)
- Test swipe gestures with gloves (winter conditions)
- Measure animation performance on target device (Samsung Tab 6)
