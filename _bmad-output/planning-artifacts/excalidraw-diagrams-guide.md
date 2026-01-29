# Guide Excalidraw - Diagrammes Lions' Book

**Author:** Jay  
**Date:** 2026-01-27  
**Objectif:** Créer diagrammes de flux et wireframes interactifs

---

## 1. Diagramme de Flux Utilisateur Principal

### Flux: Navigation → Catalogue → Fiche Produit → Action

**À créer dans Excalidraw:**

```
┌─────────────┐
│   START     │
│  App Open   │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────┐
│  Écran Home                     │
│  ┌───────────────┐              │
│  │ 🔍 Recherche  │              │
│  └───────────────┘              │
│                                 │
│  ACCÈS RAPIDE                   │
│  [💰 Prix] [📄 Fiches]         │
│  [📢 Arguments] [🎨 PLV]       │
│                                 │
│  PORTEFEUILLE BDC               │
│  [🍺 Bières] [🍹 Alcools]      │
│  [🥤 Gazeuses] [💧 Eaux]       │
│  [🍷 Vins] [✨ Innovations]    │
└──────┬──────────────────────────┘
       │
       │ User tap "Bières"
       ▼
┌─────────────────────────────────┐
│  Catalogue Bières               │
│  [Toutes] [Premium] [Éco]      │
│                                 │
│  [33 Export] [Castel]           │
│  [Beaufort] [Isenbeck]          │
│  [Mützig] [Manyan]              │
└──────┬──────────────────────────┘
       │
       │ User tap "33 Export"
       ▼
┌─────────────────────────────────┐
│  Fiche Produit                  │
│  ┌──────┐    ╔════════╗        │
│  │Glass │    ║Carousel║        │
│  │morph │    ║ Nike   ║        │
│  │Box   │    ║ Style  ║        │
│  └──────┘    ╚════════╝        │
│  [Arguments] [Boutons CTA]     │
└──────┬─────────────────────────┘
       │
       ├─────► [Speech Rapide] ──► Modal Bottom Sheet
       │
       ├─────► [Gérer Objections] ──► Modal Center Dialog
       │
       └─────► [⭐ Favoris] ──► Ajouté (Toast)

Alternative: Recherche directe
┌─────────────────────┐
│ User tape "33"      │
│ dans recherche      │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Suggestions        │
│  • 33 Export        │◄─── Temps réel
│  • 33 Export Casier │     < 2 sec
│  • 33 Export 65cl   │
└──────┬──────────────┘
       │
       │ User tap résultat
       ▼
    [Fiche Produit]
```

**Éléments Excalidraw:**
- Rectangles arrondis pour écrans
- Flèches pour flux
- Annotations pour timing
- Couleurs: Jaune BDC pour actions principales

---

## 2. Diagramme Navigation Globale

### Architecture Information

**À créer dans Excalidraw:**

```
                    ┌──────────────┐
                    │   App Root   │
                    └──────┬───────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   Home       │  │  Sidebar     │  │  Search      │
│  (Catalogue) │  │  Navigation  │  │  Global      │
└──────┬───────┘  └──────┬───────┘  └──────┬───────┘
       │                 │                  │
       │                 │                  │
       ▼                 ▼                  ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Fiche        │  │ • Catalogue  │  │ Résultats    │
│ Produit      │  │ • Arguments  │  │ Filtrés      │
│              │  │ • Objections │  │              │
│ ┌─────────┐  │  │ • Activations│  └──────────────┘
│ │Carousel │  │  │ • Favoris    │
│ │Nike     │  │  │ • Paramètres │
│ └─────────┘  │  └──────────────┘
│              │
│ [Modals]     │
│ • Speech     │
│ • Objections │
└──────────────┘
```

**Légende:**
- Rectangles: Écrans principaux
- Bullets: Sections sidebar
- Flèches: Navigation possible

---

## 3. Wireframe Excalidraw - Écran Home

### Instructions de Création

**Étape 1: Créer le cadre principal**
1. Rectangle arrondi (768x1024px)
2. Couleur: Blanc #ffffff
3. Border: 2px gris clair

**Étape 2: Header**
1. Rectangle (768x64px) en haut
2. Ajouter texte "Lions' Book"
3. Icônes: ≡ (gauche), 🔔 👤 (droite)

**Étape 3: Barre de recherche**
1. Rectangle arrondi (720x48px)
2. Couleur: Jaune BDC #ffc627 avec opacité 70%
3. Texte: "🔍 Rechercher un produit, marque..."
4. Border: 1px blanc/20

**Étape 4: Carousel Actualités & Campagnes**
1. Rectangle conteneur (720x200px)
2. Titre "📰 ACTUALITÉS & CAMPAGNES"
3. Rectangle image (700x150px) pour slide
4. Dots indicators en bas (● ○ ○ ○)
5. Flèches swipe ← →
6. Couleur: Blanc avec shadow-md

**Étape 5: Section Accès Rapide (Grille 3x2 Colorée)**
1. Rectangle conteneur avec titre "ACCÈS RAPIDE"
2. Grille 3 colonnes x 2 lignes
3. 6 rectangles arrondis (230x150px) avec couleurs:
   - **Vérifier un Prix**: Vert #10b981 (gradient)
   - **Fiches Techniques**: Bleu #3b82f6 (gradient)
   - **Argumentaire**: Orange #f97316 (gradient)
   - **Répondre à Objection**: Rouge #ef4444 (gradient + illustration)
   - **Promos**: Jaune #fbbf24 (gradient)
   - **Assets**: Gris #6b7280 (gradient)
4. Texte blanc sur fond coloré
5. Gap: 12px entre cards

**Étape 6: Section Portefeuille BDC**
1. Rectangle conteneur avec titre "PORTEFEUILLE BDC"
2. Grille 2 colonnes, 3 lignes
3. 6 rectangles (350x150px) pour segments:
   - 🍺 Bières
   - 🍹 Alcools Mix
   - 🥤 Boissons Gazeuses
   - 💧 Eaux Minérales
   - 🍷 Vins & Spiritueux
   - ✨ Innovations & Éditions
4. Couleur: Blanc avec shadow-md

**Étape 7: Sidebar (collapsed)**
1. Rectangle vertical gauche (64px width)
2. Icônes empilées verticalement
3. Floating effect (shadow)

---

## 3bis. Diagramme Carousel Actualités Instagram-Style

### Visualisation Carousel

**À créer dans Excalidraw:**

```
┌────────────────────────────────────────┐
│  📰 ACTUALITÉS & CAMPAGNES             │
│                                        │
│  ┌──────────────────────────────────┐ │
│  │                                  │ │
│  │    [Image Campagne]              │ │
│  │    "Nouvelle Promo 33 Export"    │ │
│  │                                  │ │
│  │    ● ○ ○ ○                       │ │
│  └──────────────────────────────────┘ │
│                                        │
│  ← Swipe horizontal →                 │
└────────────────────────────────────────┘

Slide 1: Promo 33 Export
Slide 2: Nouvelle campagne Castel
Slide 3: Activation merchandising
Slide 4: Formation produit
```

**Caractéristiques:**
- Swipe horizontal fluide
- Auto-play 5 secondes (optionnel)
- Dots indicators actifs
- Tap slide → Détail complet
- Pause auto-play au touch

**Implémentation Framer Motion:**
```jsx
<motion.div
  drag="x"
  dragConstraints={{ left: -1500, right: 0 }}
  onDragEnd={(e, { offset, velocity }) => {
    const swipe = swipePower(offset.x, velocity.x)
    if (swipe < -swipeConfidenceThreshold) {
      paginate(1) // Next slide
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1) // Previous slide
    }
  }}
>
  {slides.map((slide, index) => (
    <motion.div
      key={slide.id}
      animate={{ x: -currentIndex * 720 }}
      transition={{ duration: 0.3 }}
    >
      {/* Slide content */}
    </motion.div>
  ))}
</motion.div>
```

---

## 4. Wireframe Excalidraw - Fiche Produit

### Instructions de Création

**Étape 1: Header**
1. Rectangle (768x64px)
2. Flèche retour ← (gauche)
3. Titre "33 Export"
4. Icônes ⭐ ⋮ (droite)

**Étape 2: Glassmorphisme Box (Gauche)**
1. Rectangle arrondi (180x400px)
2. Couleur: Jaune BDC #ffc627 opacité 70%
3. Border: 1px blanc/20
4. Textes:
   - "Prix: 15 000 FCFA" (32px bold)
   - "Contenance: 65cl"
   - "Alcool: 5.2%"
   - "Marge: 18%"

**Étape 3: Carousel Center**
1. Rectangle principal (400x400px) - Item central
2. Placeholder image "33 Export"
3. 2 rectangles plus petits (320x320px) - Items ±1
4. Ajouter effet blur (annotations)
5. Flèches swipe ← →

**Étape 4: Section Arguments**
1. Rectangle arrondi (720x150px)
2. Titre "📄 Arguments de Vente"
3. Bullet points:
   - "• Bière premium camerounaise"
   - "• Forte rotation en CHR"
   - "• Marque reconnue depuis 1960"

**Étape 5: Boutons CTA**
1. 2 rectangles arrondis côte à côte
2. "Speech Rapide" (Rouge BDC #ff7323f)
3. "Gérer Objections" (Jaune BDC #ffc627)

---

## 5. Diagramme Carousel Nike-Style - Effet Profondeur

### Visualisation 3D

**À créer dans Excalidraw:**

```
Vue de dessus (perspective):

        [Item -2]
         Blur 8px
        Scale 0.6
       Opacity 0.4

    [Item -1]
     Blur 4px
    Scale 0.8
   Opacity 0.7

╔═══════════╗
║  Item 0   ║  ← Central (Focus)
║  NET      ║     Blur 0px
║  Scale 1.0║     Opacity 1.0
╚═══════════╝

    [Item +1]
     Blur 4px
    Scale 0.8
   Opacity 0.7

        [Item +2]
         Blur 8px
        Scale 0.6
       Opacity 0.4
```

**Annotations:**
- Flèches montrant direction swipe
- Labels pour chaque niveau de blur
- Indication z-index (10, 9, 8...)

---

## 6. Diagramme États de Recherche

### State Machine

**À créer dans Excalidraw:**

```
    ┌─────────┐
    │  EMPTY  │
    │ (Init)  │
    └────┬────┘
         │
         │ User types
         ▼
    ┌─────────┐
    │ TYPING  │◄────┐
    │ (Suggest)│     │
    └────┬────┘     │
         │          │
         │ > 2 char │ User continues
         ▼          │
    ┌─────────┐    │
    │SEARCHING│────┘
    │(Loading)│
    └────┬────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌─────────┐ ┌─────────┐
│RESULTS  │ │NO RESULT│
│(Display)│ │(Empty)  │
└────┬────┘ └─────────┘
     │
     │ User selects
     ▼
┌─────────┐
│ PRODUCT │
│ SHEET   │
└─────────┘
```

**Couleurs:**
- Vert: États success
- Orange: États intermédiaires
- Rouge: États erreur

---

## 7. Diagramme Responsive Portrait/Paysage

### Layout Adaptatif

**Portrait (768x1024px):**

```
┌──────────────────┐
│     Header       │ 64px
├──────────────────┤
│  Glassmorphisme  │
│      Box         │ 30%
├──────────────────┤
│                  │
│    Carousel      │ 40%
│    Vertical      │
│                  │
├──────────────────┤
│   Arguments      │
│   Empilés        │ 30%
└──────────────────┘
```

**Paysage (1024x768px):**

```
┌────────────────────────────────────────┐
│              Header                    │ 64px
├─────────────────────┬──────────────────┤
│                     │  Glassmorphisme  │
│                     │      Box         │
│    Carousel         ├──────────────────┤
│    Horizontal       │                  │
│    (60-66%)         │   Arguments      │
│                     │   (34-40%)       │
│                     │                  │
└─────────────────────┴──────────────────┘
```

**Annotations:**
- Flèches montrant rotation device
- Labels pour pourcentages
- Indication breakpoints

---

## 8. Palette de Couleurs pour Excalidraw

### Couleurs à Utiliser

**BDC Brand:**
- Rouge: `#ff7323f` (CTA, boutons primaires)
- Jaune: `#ffc627` (Accents, glassmorphisme)
- Noir: `#1d1d1b` (Texte)
- Blanc: `#ffffff` (Background)

**UI Elements:**
- Gris clair: `#f3f4f6` (Borders, disabled)
- Gris moyen: `#9ca3af` (Texte secondaire)
- Gris foncé: `#374151` (Texte tertiaire)

**Feedback:**
- Success: `#10b981` (Vert)
- Warning: `#f59e0b` (Orange)
- Error: `#ef4444` (Rouge)
- Info: `#3b82f6` (Bleu)

---

## 9. Bibliothèque d'Icônes

### Icônes à Utiliser (Lucide Style)

**Navigation:**
- Home: 🏠
- Catalogue: 📦
- Search: 🔍
- Menu: ≡
- Back: ←
- Close: ✕

**Actions:**
- Favoris: ⭐ / ❤️
- Notifications: 🔔
- User: 👤
- Settings: ⚙️
- Filter: 🔽

**Content:**
- Document: 📄
- Shield: 🛡️
- Star: ⭐
- Speech: 📢
- Check: ✓

---

## 10. Templates Excalidraw

### Template 1: Écran Mobile

**Dimensions:**
- Width: 768px
- Height: 1024px
- Border radius: 40px (device frame)
- Shadow: large

**Layers:**
1. Device frame (gris foncé)
2. Screen content (blanc)
3. Status bar (top)
4. Navigation bar (bottom si Android)

### Template 2: Modal

**Dimensions:**
- Max width: 600px
- Max height: 80vh
- Border radius: 24px
- Shadow: xl

**Layers:**
1. Overlay (noir/50 blur)
2. Modal content (blanc)
3. Handle bar (si bottom sheet)
4. Close button (si center dialog)

### Template 3: Card Produit

**Dimensions:**
- Width: 350px
- Height: 200px
- Border radius: 16px
- Shadow: md

**Content:**
1. Image placeholder (top, 60%)
2. Product name (bold)
3. Price (jaune BDC, bold)
4. Rating (⭐ + number)

---

## 11. Workflow Création Excalidraw

### Étapes Recommandées

**1. Setup Initial**
- Créer nouveau fichier Excalidraw
- Définir canvas size (2000x3000px)
- Importer palette couleurs BDC

**2. Créer Templates**
- Device frame mobile
- Modal templates
- Card templates
- Sauvegarder comme library

**3. Diagrammes de Flux**
- Commencer par flux principal
- Ajouter annotations timing
- Utiliser couleurs pour états
- Exporter en PNG/SVG

**4. Wireframes**
- Utiliser templates
- Respecter dimensions réelles
- Ajouter annotations
- Grouper éléments par écran

**5. Validation**
- Vérifier proportions
- Tester lisibilité
- Partager avec équipe
- Itérer selon feedback

---

## 12. Export & Partage

### Formats Recommandés

**Pour Développement:**
- SVG (vectoriel, scalable)
- PNG haute résolution (2x, 3x)
- JSON Excalidraw (éditable)

**Pour Présentation:**
- PDF (multi-pages)
- PNG (preview rapide)
- Link Excalidraw (collaboration)

**Pour Documentation:**
- Embed dans Notion/Confluence
- Screenshots annotés
- Vidéo walkthrough (Loom)

---

## Checklist Création

### Diagrammes de Flux
- [ ] Flux recherche → fiche produit
- [ ] Navigation globale app
- [ ] États de recherche (state machine)
- [ ] Responsive portrait/paysage
- [ ] Carousel effet profondeur

### Wireframes
- [ ] Écran home (portrait)
- [ ] Fiche produit (portrait)
- [ ] Fiche produit (paysage)
- [ ] Sidebar collapsed/expanded
- [ ] Modal argumentaire rapide
- [ ] Modal gestion objections

### Annotations
- [ ] Dimensions (px)
- [ ] Couleurs (hex codes)
- [ ] Timing (ms)
- [ ] Interactions (tap, swipe)
- [ ] États (hover, active, disabled)

---

**Prochaines Étapes:**
1. Ouvrir Excalidraw (excalidraw.com)
2. Créer diagrammes selon ce guide
3. Exporter et partager avec équipe
4. Valider avec utilisateurs
5. Passer au développement

**Ressources:**
- Excalidraw: https://excalidraw.com
- Lucide Icons: https://lucide.dev
- Tailwind Colors: https://tailwindcss.com/docs/customizing-colors
