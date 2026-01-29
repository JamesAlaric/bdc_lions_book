# Lions' Book - Convention de Nomenclature des Images
## Guide pour Organisation des Assets Visuels

**Date :** 2026-01-26  
**Version :** 1.0

---

## 📁 Structure des Dossiers

```
/assets/
├── brands/              # Logos des marques
├── packshots/           # Packshots produits haute résolution
├── products/            # Photos produits
├── plv/                 # Visuels PLV et activations
├── best-practices/      # Photos merchandising
└── icons/               # Icônes interface
```

---

## 🏷️ Convention de Nomenclature

### Règles Générales

**Format :** `{type}-{identifiant}-{variant}.{extension}`

**Caractères autorisés :**
- Lettres minuscules (a-z)
- Chiffres (0-9)
- Tirets (-) pour séparer les mots
- **PAS d'espaces, accents, caractères spéciaux**

**Extensions :**
- `.png` : Logos, packshots avec transparence
- `.jpg` : Photos produits, merchandising
- `.svg` : Icônes, logos vectoriels
- `.webp` : Version optimisée web (optionnel)

---

## 1️⃣ Logos Marques

### Format
```
{brand-id}-logo.png
{brand-id}-logo-white.png    # Version blanc sur fond foncé
{brand-id}-logo.svg          # Version vectorielle
```

### Exemples

**Bières :**
```
33-export-logo.png
castel-beer-logo.png
mutzig-logo.png
manyan-logo.png
isenbeck-logo.png
beaufort-lager-logo.png
beaufort-light-logo.png
chill-citron-logo.png
doppel-munich-logo.png
doppel-lager-logo.png
castle-milk-stout-logo.png
heineken-logo.png
```

**Alcools Mix :**
```
booster-whisky-cola-logo.png
booster-gin-tonic-logo.png
smirnoff-ice-pineapple-logo.png
smirnoff-ice-black-logo.png
orijin-logo.png
```

**Boissons Gazeuses :**
```
top-ananas-logo.png
top-grenadine-logo.png
top-orange-logo.png
top-pamplemousse-logo.png
top-soda-logo.png
top-tonic-logo.png
world-cola-logo.png
youzou-logo.png
orangina-logo.png
djino-cocktail-logo.png
vimto-logo.png
xxl-logo.png
```

**Eaux :**
```
tangui-naturelle-logo.png
tangui-citron-logo.png
vitale-logo.png
aquabelle-logo.png
```

### Spécifications Techniques
- **Format :** PNG avec transparence
- **Résolution :** Minimum 1000px de largeur
- **Poids :** < 500KB
- **Fond :** Transparent
- **Couleurs :** RVB (pas CMJN)

---

## 2️⃣ Packshots Produits

### Format
```
{product-code}-hd.png           # Haute définition
{product-code}-thumb.png        # Miniature
{product-code}-{angle}.png      # Angles multiples (optionnel)
```

### Exemples par Code Produit

**Bières 33 Export :**
```
exp65c-hd.png          # Casier 33 Export 65cl
exp50c-hd.png          # Casier 33 Export 50cl
exp33c-hd.png          # Casier 33 Export 33cl
exp50b-hd.png          # Carton 33 Export Boîte 50cl
```

**Bières Castel :**
```
cas65c-hd.png
cas50c-hd.png
cas33c-hd.png
cas50b-hd.png
```

**Bières Mützig :**
```
mut65c-hd.png
mut33c-hd.png
mut50b-hd.png
```

**Soft Drinks TOP :**
```
tgi50c-hd.png          # TOP Grenadine 50cl
tgi10p-hd.png          # TOP Grenadine 100cl PET
tgi35p-hd.png          # TOP Grenadine 35cl PET
tpa50c-hd.png          # TOP Ananas 50cl
tpo50c-hd.png          # TOP Orange 50cl
tpp50c-hd.png          # TOP Pamplemousse 50cl
```

**Eaux :**
```
vit15p-hd.png          # Vitale 150cl
vit10j-hd.png          # Vitale 10L bidon
vit05p-hd.png          # Vitale 50cl PET
tgi18p-hd.png          # Tangui 180cl
tgi15p-hd.png          # Tangui 150cl
aqb05p-hd.png          # Aquabelle 50cl
```

### Spécifications Techniques

**Haute Définition (-hd.png) :**
- **Format :** PNG avec transparence
- **Résolution :** 2000px x 2000px minimum
- **Poids :** < 2MB
- **Fond :** Transparent ou blanc pur (#FFFFFF)
- **Angle :** Face avant, centré

**Miniature (-thumb.png) :**
- **Format :** PNG ou JPG
- **Résolution :** 400px x 400px
- **Poids :** < 100KB
- **Optimisé :** Pour affichage liste/grille

---

## 3️⃣ Photos Produits

### Format
```
{product-code}.jpg              # Photo standard
{product-code}-lifestyle.jpg    # Photo en situation
{product-code}-detail.jpg       # Photo détail
```

### Exemples
```
exp65c.jpg
exp65c-lifestyle.jpg
exp65c-detail.jpg
```

### Spécifications Techniques
- **Format :** JPG
- **Résolution :** 1200px x 1200px minimum
- **Poids :** < 500KB
- **Qualité :** 85%
- **Fond :** Blanc ou contexte lifestyle

---

## 4️⃣ Visuels PLV et Activations

### Format
```
{campaign-id}-{type}.{ext}
{campaign-id}-{type}-{format}.{ext}
```

### Types
- `affiche` : Affiches murales
- `kakemono` : Kakémonos/roll-up
- `sticker` : Stickers vitrine
- `wobbler` : Wobblers frigo
- `banner` : Bannières web
- `flyer` : Flyers/dépliants

### Exemples
```
booster-33-2026-affiche-a3.jpg
booster-33-2026-kakemono.jpg
booster-33-2026-sticker-vitrine.png
booster-33-2026-wobbler-frigo.png
top-grenadine-promo-affiche.jpg
world-cola-inspire-banner-web.jpg
```

### Spécifications Techniques
- **Format :** JPG pour photos, PNG pour graphiques
- **Résolution :** Selon format d'impression
  - A4 : 2480 x 3508px (300dpi)
  - A3 : 3508 x 4961px (300dpi)
  - Web : 1920px largeur max
- **Poids :** < 5MB pour impression, < 500KB pour web

---

## 5️⃣ Photos Merchandising

### Format
```
{brand-id}-{type}-{description}.jpg
best-practice-{number}-{description}.jpg
```

### Types
- `fridge` : Frigo
- `shelf` : Linéaire/étagère
- `activation` : Activation en PDV
- `planogram` : Planogramme
- `pos` : Point de vente complet

### Exemples
```
33-export-fridge-full.jpg
33-export-shelf-optimized.jpg
33-export-activation-booster.jpg
castel-beer-planogram-chr.jpg
best-practice-001-fridge-visibility.jpg
best-practice-002-shelf-facing.jpg
best-practice-003-activation-setup.jpg
```

### Spécifications Techniques
- **Format :** JPG
- **Résolution :** 1920px x 1080px minimum
- **Poids :** < 1MB
- **Qualité :** 80%
- **Contexte :** Photos réelles en PDV

---

## 6️⃣ Icônes Interface

### Format
```
icon-{name}.svg
icon-{name}-{size}.png
```

### Exemples
```
icon-beer.svg
icon-drink.svg
icon-water.svg
icon-search.svg
icon-favorite.svg
icon-cart.svg
icon-menu.svg
icon-close.svg
icon-beer-24.png
icon-beer-48.png
```

### Spécifications Techniques
- **Format :** SVG (vectoriel) + PNG (fallback)
- **Tailles PNG :** 24px, 48px, 96px
- **Couleurs :** Monochrome ou palette BDC
- **Poids :** < 10KB

---

## 📋 Liste Complète des Images Requises

### CRITIQUE (MVP - Priorité 1)

**Logos Marques (32) :**
```
✓ Bières (11)
  - 33-export-logo.png
  - castel-beer-logo.png
  - mutzig-logo.png
  - manyan-logo.png
  - isenbeck-logo.png
  - beaufort-lager-logo.png
  - beaufort-light-logo.png
  - chill-citron-logo.png
  - doppel-munich-logo.png
  - doppel-lager-logo.png
  - castle-milk-stout-logo.png
  - heineken-logo.png

✓ Alcools Mix (5)
  - booster-whisky-cola-logo.png
  - booster-gin-tonic-logo.png
  - smirnoff-ice-pineapple-logo.png
  - smirnoff-ice-black-logo.png
  - orijin-logo.png

✓ Boissons Gazeuses (12)
  - top-ananas-logo.png
  - top-grenadine-logo.png
  - top-orange-logo.png
  - top-pamplemousse-logo.png
  - top-soda-logo.png
  - top-tonic-logo.png
  - world-cola-logo.png
  - youzou-logo.png
  - orangina-logo.png
  - djino-cocktail-logo.png
  - vimto-logo.png
  - xxl-logo.png

✓ Eaux (4)
  - tangui-naturelle-logo.png
  - tangui-citron-logo.png
  - vitale-logo.png
  - aquabelle-logo.png
```

**Packshots Prioritaires (20) :**
```
✓ Top 5 Bières
  - exp65c-hd.png (33 Export 65cl)
  - exp50c-hd.png (33 Export 50cl)
  - exp33c-hd.png (33 Export 33cl)
  - cas65c-hd.png (Castel 65cl)
  - mut65c-hd.png (Mützig 65cl)

✓ Top 5 Soft
  - tgi50c-hd.png (TOP Grenadine 50cl)
  - tpa50c-hd.png (TOP Ananas 50cl)
  - wco50c-hd.png (World Cola 50cl)
  - you50c-hd.png (Youzou 50cl)
  - org50c-hd.png (Orangina 50cl)

✓ Top 5 Eaux
  - vit15p-hd.png (Vitale 150cl)
  - tgi18p-hd.png (Tangui 180cl)
  - tgi15p-hd.png (Tangui 150cl)
  - aqb05p-hd.png (Aquabelle 50cl)
  - vit10j-hd.png (Vitale 10L)

✓ Top 5 Alcools Mix
  - bwc50c-hd.png (Booster Whisky Cola 50cl)
  - bgt50c-hd.png (Booster Gin Tonic 50cl)
  - smp50c-hd.png (Smirnoff Pineapple 50cl)
  - smb50c-hd.png (Smirnoff Black 50cl)
  - ori50c-hd.png (Orijin 50cl)
```

### IMPORTANT (MVP - Priorité 2)

**Photos Merchandising (5) :**
```
- best-practice-001-fridge-visibility.jpg
- best-practice-002-shelf-facing.jpg
- best-practice-003-activation-setup.jpg
- 33-export-fridge-full.jpg
- castel-beer-shelf-optimized.jpg
```

**Visuels PLV (3 campagnes) :**
```
- booster-33-2026-affiche-a3.jpg
- booster-33-2026-kakemono.jpg
- top-grenadine-promo-affiche.jpg
```

---

## 🔧 Outils Recommandés

### Optimisation Images
```bash
# Optimiser PNG
pngquant --quality=80-95 input.png -o output.png

# Optimiser JPG
jpegoptim --max=85 --strip-all input.jpg

# Convertir en WebP
cwebp -q 85 input.jpg -o output.webp

# Redimensionner
convert input.jpg -resize 1200x1200 output.jpg
```

### Renommage Batch
```bash
# Renommer tous les fichiers en minuscules
for file in *; do mv "$file" "$(echo $file | tr '[:upper:]' '[:lower:]')"; done

# Remplacer espaces par tirets
for file in *\ *; do mv "$file" "${file// /-}"; done
```

---

## ✅ Checklist Validation

### Avant Upload
- [ ] Nom en minuscules
- [ ] Pas d'espaces ni accents
- [ ] Extension correcte (.png, .jpg, .svg)
- [ ] Taille optimisée (< limites spécifiées)
- [ ] Résolution suffisante
- [ ] Fond transparent (PNG logos/packshots)
- [ ] Couleurs RVB (pas CMJN)

### Organisation
- [ ] Fichier dans le bon dossier
- [ ] Nomenclature respectée
- [ ] Pas de doublons
- [ ] Versions HD + thumb créées si nécessaire

---

## 📞 Contact pour Assets

**Équipe Marketing BDC :**
- Logos marques
- Packshots produits
- Visuels campagnes

**Équipe Trade BDC :**
- Photos merchandising
- PLV activations
- Planogrammes

**Format de demande :**
```
Objet : Demande Assets Visuels - Lions' Book MVP

Bonjour,

Dans le cadre du développement de Lions' Book (PWA d'aide à la vente),
nous avons besoin des assets visuels suivants :

LOGOS MARQUES (32) :
- Format : PNG transparent, 1000px min, < 500KB
- Liste : [voir liste complète ci-dessus]

PACKSHOTS PRODUITS (20 prioritaires) :
- Format : PNG transparent, 2000x2000px, < 2MB
- Liste : [voir liste complète ci-dessus]

PHOTOS MERCHANDISING (5) :
- Format : JPG, 1920x1080px, < 1MB
- Exemples bonnes pratiques en PDV

Deadline : 27 janvier 2026

Merci de respecter la nomenclature fournie en pièce jointe.

Cordialement,
```

---

**Document créé le : 2026-01-26**  
**Version : 1.0**  
**Statut : GUIDE OFFICIEL**
