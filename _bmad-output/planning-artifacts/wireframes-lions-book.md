# Wireframes & Mockups - Lions' Book

**Author:** Jay  
**Date:** 2026-01-27  
**Based on:** UX Design Specification v1.0

---

## 1. Écran Principal - Accueil & Navigation

### Layout Portrait (Usage Principal)

**Composants Clés:**
- Header fixe avec logo BDC + notifications
- Barre de recherche glassmorphisme jaune
- **Carousel Actualités & Campagnes (Instagram-style)**
- Section "Accès Rapide" (grille 3x2 colorée)
- Section "Portefeuille BDC" (6 segments en Bento Grid)
- Menu flottant gauche (collapsed)

**Hiérarchie Visuelle:**
1. Barre de recherche (top, toujours visible)
2. **Carousel Actualités (swipe horizontal)**
3. Accès Rapide (grille 3x2 colorée)
4. Portefeuille BDC (segments en grid 2 colonnes)
5. Sidebar icon (gauche, floating)

**Sections:**

**Carousel Actualités & Campagnes:**
- Height: 200px
- Swipe horizontal Instagram-style
- Dots indicators (● ○ ○ ○)
- Auto-play optionnel (5 sec/slide)
- Tap → Détail actualité/campagne

**Accès Rapide (Grille 3x2 Colorée):**
- **Vérifier un Prix** (Vert #10b981) → Page prix & marges
- **Fiches Techniques** (Bleu #3b82f6) → Liste fiches produits
- **Argumentaire** (Orange #f97316) → Argumentaires par marque/canal
- **Répondre à Objection** (Rouge #ef4444 + illustration) → Gestion objections
- **Promos** (Jaune #fbbf24) → Promotions en cours
- **Assets** (Gris #6b7280) → Outils téléchargeables (PLV, logos)

**Portefeuille BDC (Segments):**
- Bières (🍺)
- Alcools Mix (🍹)
- Boissons Gazeuses (🥤)
- Eaux Minérales (💧)
- Vins & Spiritueux (🍷)
- Innovations & Éditions (✨)

**Dimensions:**
- Header: 64px height
- Search bar: 48px height, 16px margin
- **Carousel: 200px height**
- **Accès Rapide cards: 230x150px each (grille 3x2)**
- Segment cards: 350x150px
- Grid gap: 12-16px

---

## 2. Fiche Produit - Carousel Nike-Style

### Carousel avec Effet Profondeur

**Structure:**
- Item central: 100% net, scale 1.0
- Items -1/+1: Blur 4px, scale 0.8, opacity 0.7
- Items -2/+2: Blur 8px, scale 0.6, opacity 0.4
- Items -3/+3: Blur 12px, scale 0.4, opacity 0.1

**Glassmorphisme Box (Gauche):**
- Background: bg-bdc-yellow/70
- Backdrop blur: 12px
- Border: white/20
- Padding: 24px
- Border radius: 16px

**Contenu Box:**
1. Prix (32px, bold, noir BDC)
2. Contenance (16px, regular)
3. % Alcool (16px, regular)
4. Marge (16px, bold, vert)
5. Boutons: "Speech Rapide" + "Objections"

---

## 3. Sidebar Navigation - ClickUp-Style

### États Collapsed/Expanded

**Collapsed (64px width):**
- Icônes seules (24x24px)
- Spacing: 16px vertical
- Background: white/90 blur

**Expanded (240px width):**
- Icônes + labels
- Animation: 300ms ease-out
- Sections: Catalogue, Argumentaires, Objections, Activations, Paramètres

**Items:**
- Home (icône maison)
- Catalogue (icône grid)
- Argumentaires (icône document)
- Objections (icône bouclier)
- Activations (icône étoile)
- Favoris (icône coeur)
- Paramètres (icône engrenage)

---

## 4. Modal Argumentaire Rapide

### Bottom Sheet Style

**Animation:**
- Slide up depuis bas (300ms)
- Overlay: bg-black/50 blur
- Max height: 80vh
- Border radius top: 24px

**Contenu:**
1. Handle bar (drag indicator)
2. Titre "Argumentaire Rapide"
3. 3-4 arguments clés (bullet points)
4. Chiffres marges/rotation
5. Bouton "Fermer"

**Sections:**
- Pourquoi ce produit?
- Arguments clés (3-4 points)
- Chiffres de vente
- Call to action

---

## 5. Modal Gestion Objections

### Dialog Center Style

**Structure:**
- Center screen overlay
- Max width: 600px
- Glassmorphisme white/90
- Shadow: large

**Contenu:**
1. Titre "Gérer les Objections"
2. Liste objections courantes (accordéon)
3. Scripts de réponse par objection
4. Bouton "Fermer" (X top right)

**Objections Types:**
- "Prix trop élevé"
- "Je prends déjà autre marque"
- "Pas assez de rotation"
- "Client n'aime pas"

---

## 6. Layouts Responsive - Portrait/Paysage

### Portrait (768x1024px)

**Layout:**
- Vertical stack
- Glassmorphisme box: top
- Carousel: middle (vertical scroll)
- Arguments: bottom

**Proportions:**
- Box: 30% height
- Carousel: 40% height
- Arguments: 30% height

### Paysage (1024x768px)

**Layout:**
- Horizontal split
- Carousel: left (60-66%)
- Arguments + Box: right (34-40%)

**Avantages:**
- Démonstration face client
- Tout visible sans scroll
- Carousel plus grand

---

## 7. États & Interactions

### Recherche

**États:**
1. Empty (placeholder visible)
2. Typing (suggestions apparaissent)
3. Loading (spinner jaune BDC)
4. Results (grid produits)
5. No results (message empathique)

**Animations:**
- Suggestions: fade in 200ms
- Results: stagger 100ms per item
- Loading: rotate 360° 1s infinite

### Carousel

**Interactions:**
- Swipe horizontal: change item
- Tap item: zoom/détails
- Drag: momentum scroll
- Snap: center automatique

**Feedback:**
- Scale 0.98 au tap
- Blur progressif items arrière
- Transition: 300ms ease-out

### Buttons

**États:**
- Default
- Hover (scale 1.02)
- Active (scale 0.95)
- Disabled (opacity 0.5)

**Styles:**
- Primary: bg-bdc-red, text-white
- Secondary: bg-bdc-yellow, text-black
- Ghost: border-bdc-yellow, text-bdc-yellow

---

## 8. Spécifications Visuelles

### Couleurs

**BDC Brand:**
- Rouge: #ff7323f (10% usage - CTA)
- Jaune: #ffc627 (20% usage - accents)
- Noir: #1d1d1b (texte principal)
- Blanc: #ffffff (70% usage - background)

**Feedback:**
- Success: #10b981 (green)
- Warning: #f59e0b (orange)
- Error: #ef4444 (red)
- Info: #3b82f6 (blue)

### Typography

**Tailles:**
- Price: 32px, bold (700)
- H1: 28px, bold (700)
- H2: 24px, semibold (600)
- Body: 16px, regular (400)
- Caption: 14px, regular (400)

**Font Family:**
- System font stack (San Francisco, Roboto, Segoe UI)

### Spacing

**Scale (Tailwind):**
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

**Touch Targets:**
- Minimum: 44x44px
- Recommended: 48x48px

### Shadows

**Levels:**
- sm: 0 1px 2px rgba(0,0,0,0.05)
- md: 0 4px 6px rgba(0,0,0,0.1)
- lg: 0 10px 15px rgba(0,0,0,0.1)
- xl: 0 20px 25px rgba(0,0,0,0.1)

### Border Radius

**Scale:**
- sm: 4px
- md: 8px
- lg: 12px
- xl: 16px
- 2xl: 24px
- full: 9999px (pills)

### Animations

**Durations:**
- Fast: 200ms (micro-interactions)
- Normal: 300ms (transitions)
- Slow: 500ms (complex animations)

**Easing:**
- ease-out: cubic-bezier(0, 0, 0.2, 1)
- ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)

---

## Notes d'Implémentation

### Priorités MVP

1. **P0 (Critical):**
   - Écran principal + recherche
   - Fiche produit + carousel
   - Glassmorphisme box

2. **P1 (Important):**
   - Sidebar navigation
   - Modal argumentaire rapide
   - Responsive portrait/paysage

3. **P2 (Nice to have):**
   - Modal objections
   - Favoris
   - Historique recherche

### Performance Targets

- First Contentful Paint: < 1s
- Time to Interactive: < 2s
- Carousel 60 FPS: garanti
- Bundle size: < 250KB

### Accessibilité

- Contraste WCAG AA minimum (4.5:1)
- Touch targets: 44x44px minimum
- Focus states visibles
- Screen reader compatible

---

## Outils Recommandés

### Design
- Figma (prototypage interactif)
- Excalidraw (wireframes rapides)
- Framer (animations)

### Développement
- Tailwind CSS (styling)
- shadcn/ui (composants)
- Framer Motion (animations)
- React (framework)

---

**Prochaines Étapes:**
1. Créer mockups haute fidélité dans Figma
2. Prototyper carousel Nike-style
3. Tester responsive sur Samsung Tab 6
4. Valider avec utilisateurs (Marcel, Aminata, Éric)
