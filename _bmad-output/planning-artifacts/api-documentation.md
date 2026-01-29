# Documentation API - Lions' Book

**Date:** 2026-01-29  
**Author:** Jay  
**Version:** 1.0.0 (MVP)  
**Base URL:** `https://api.lionsbook.bdc.cm/v1`

---

## Vue d'Ensemble

API REST pour Lions' Book, l'application PWA de sales enablement pour BDC Cameroun.

### **Caractéristiques**

- ✅ REST API avec JSON
- ✅ Authentification JWT (Brand Managers uniquement)
- ✅ Pas d'auth pour consultation (Vendeurs)
- ✅ Rate limiting : 1000 req/min
- ✅ Compression gzip
- ✅ CORS activé
- ✅ HTTPS uniquement

### **Environnements**

| Environnement | URL | Usage |
|---------------|-----|-------|
| **Production** | `https://api.lionsbook.bdc.cm/v1` | App en production |
| **Staging** | `https://staging-api.lionsbook.bdc.cm/v1` | Tests pré-prod |
| **Development** | `http://localhost:3000/v1` | Développement local |

---

## Authentification

### **Pas d'Auth Requise (Public)**

Les endpoints suivants sont **accessibles sans authentification** pour les vendeurs :

- `GET /products/*` - Catalogue produits
- `GET /brands/*` - Marques
- `GET /categories/*` - Catégories
- `GET /arguments/*` - Argumentaires
- `GET /campaigns/*` - Campagnes (lecture)
- `GET /sync/*` - Synchronisation

### **Auth Requise (Brand Managers)**

Les endpoints suivants nécessitent un **token JWT** :

- `POST /auth/login` - Connexion
- `POST /campaigns` - Création campagne
- `PUT /campaigns/:id` - Modification campagne
- `DELETE /campaigns/:id` - Suppression campagne
- `POST /media/upload` - Upload médias
- `GET /admin/*` - Interface admin

### **Obtenir un Token**

```http
POST /auth/login
Content-Type: application/json

{
  "email": "sophie@bdc.cm",
  "password": "SecurePassword123!"
}
```

**Response 200 OK:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "sophie@bdc.cm",
    "name": "Sophie Kamga",
    "role": "brand_manager",
    "managedBrands": ["brand-id-1", "brand-id-2"]
  },
  "expiresIn": 86400
}
```

### **Utiliser le Token**

```http
GET /admin/campaigns
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Endpoints

### **1. Products (Produits)**

#### `GET /products`

Récupère la liste des produits avec filtres.

**Query Parameters:**

| Paramètre | Type | Requis | Description |
|-----------|------|--------|-------------|
| `search` | string | Non | Recherche par nom |
| `brandId` | UUID | Non | Filtrer par marque |
| `categoryId` | UUID | Non | Filtrer par catégorie |
| `channel` | enum | Non | `CHR`, `PSV`, `TT`, `MT` |
| `minPrice` | decimal | Non | Prix minimum |
| `maxPrice` | decimal | Non | Prix maximum |
| `stockStatus` | enum | Non | `IN_STOCK`, `LOW_STOCK`, `OUT_OF_STOCK` |
| `limit` | integer | Non | Limite résultats (défaut: 50) |
| `offset` | integer | Non | Pagination (défaut: 0) |

**Example Request:**
```http
GET /products?search=Castel&channel=CHR&limit=10
```

**Response 200 OK:**
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Castel Beer 65cl",
      "description": "Bière blonde premium",
      "categoryId": "cat-bieres-id",
      "brandId": "brand-castel-id",
      "pricing": {
        "chr": { "price": 650, "margin": 15 },
        "psv": { "price": 600, "margin": 12 },
        "tt": { "price": 550, "margin": 10 },
        "mt": { "price": 500, "margin": 8 }
      },
      "format": "65cl",
      "packaging": "Bouteille verre",
      "alcoholContent": 5.0,
      "stockStatus": "IN_STOCK",
      "certifications": ["ISO 9001", "HACCP"],
      "createdAt": "2026-01-15T10:00:00Z",
      "updatedAt": "2026-01-28T14:30:00Z"
    }
  ],
  "meta": {
    "total": 156,
    "limit": 10,
    "offset": 0,
    "hasMore": true
  }
}
```

---

#### `GET /products/:id`

Récupère les détails complets d'un produit.

**Path Parameters:**
- `id` (UUID) - ID du produit

**Response 200 OK:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Castel Beer 65cl",
  "description": "Bière blonde premium brassée au Cameroun",
  "category": {
    "id": "cat-bieres-id",
    "name": "Bières",
    "icon": "🍺"
  },
  "brand": {
    "id": "brand-castel-id",
    "name": "Castel",
    "logoUrl": "https://cdn.lionsbook.bdc.cm/brands/castel-logo.png",
    "colorPrimary": "#E31E24",
    "history": "Fondée en 1949...",
    "positioning": "Bière premium accessible"
  },
  "pricing": {
    "chr": { "price": 650, "margin": 15 },
    "psv": { "price": 600, "margin": 12 },
    "tt": { "price": 550, "margin": 10 },
    "mt": { "price": 500, "margin": 8 }
  },
  "details": {
    "format": "65cl",
    "packaging": "Bouteille verre",
    "alcoholContent": 5.0,
    "ingredients": "Eau, malt d'orge, houblon",
    "conservation": "À conserver au frais (4-8°C)",
    "certifications": ["ISO 9001", "HACCP"]
  },
  "stockStatus": "IN_STOCK",
  "arguments": [
    {
      "id": "arg-1",
      "title": "Qualité Premium",
      "content": "Brassée avec du malt d'orge 100% naturel",
      "channel": "CHR",
      "argumentType": "QUALITY"
    }
  ],
  "activeCampaigns": [
    {
      "id": "camp-1",
      "title": "Promo Flash Castel",
      "startDate": "2026-01-20T00:00:00Z",
      "endDate": "2026-02-15T23:59:59Z"
    }
  ]
}
```

---

### **2. Brands (Marques)**

#### `GET /brands`

Liste toutes les marques.

**Response 200 OK:**
```json
{
  "data": [
    {
      "id": "brand-castel-id",
      "name": "Castel",
      "logoUrl": "https://cdn.lionsbook.bdc.cm/brands/castel-logo.png",
      "colorPrimary": "#E31E24",
      "colorSecondary": "#FFFFFF",
      "productsCount": 12
    }
  ]
}
```

---

#### `GET /brands/:id`

Détails d'une marque avec ses produits.

**Response 200 OK:**
```json
{
  "id": "brand-castel-id",
  "name": "Castel",
  "logoUrl": "https://cdn.lionsbook.bdc.cm/brands/castel-logo.png",
  "colorPrimary": "#E31E24",
  "colorSecondary": "#FFFFFF",
  "history": "Fondée en 1949, Castel est le leader...",
  "positioning": "Bière premium accessible à tous",
  "values": ["Qualité", "Authenticité", "Convivialité"],
  "products": [
    {
      "id": "prod-1",
      "name": "Castel Beer 65cl",
      "format": "65cl"
    }
  ],
  "arguments": [
    {
      "id": "arg-1",
      "title": "Qualité Premium",
      "content": "...",
      "channel": "CHR"
    }
  ]
}
```

---

### **3. Categories (Catégories)**

#### `GET /categories`

Liste hiérarchique des catégories.

**Response 200 OK:**
```json
{
  "data": [
    {
      "id": "cat-bieres-id",
      "name": "Bières",
      "icon": "🍺",
      "displayOrder": 1,
      "productsCount": 45,
      "subcategories": [
        {
          "id": "cat-bieres-blondes-id",
          "name": "Bières Blondes",
          "productsCount": 20
        }
      ]
    }
  ]
}
```

---

### **4. Arguments (Argumentaires)**

#### `GET /arguments`

Liste des argumentaires avec filtres.

**Query Parameters:**
- `brandId` (UUID) - Filtrer par marque
- `channel` (enum) - `CHR`, `PSV`, `TT`, `MT`
- `argumentType` (enum) - `QUALITY`, `PRICE`, `AVAILABILITY`, etc.

**Response 200 OK:**
```json
{
  "data": [
    {
      "id": "arg-1",
      "brandId": "brand-castel-id",
      "title": "Qualité Premium",
      "content": "Brassée avec du malt d'orge 100% naturel importé d'Europe",
      "channel": "CHR",
      "argumentType": "QUALITY",
      "displayOrder": 1,
      "objections": [
        {
          "objection": "Trop cher par rapport à la concurrence",
          "response": "Notre qualité premium justifie un prix légèrement supérieur. Vos clients apprécient la différence."
        }
      ]
    }
  ]
}
```

---

### **5. Campaigns (Campagnes)**

#### `GET /campaigns`

Liste des campagnes actives.

**Query Parameters:**
- `status` (enum) - `ACTIVE`, `DRAFT`, `ENDED`
- `brandId` (UUID) - Filtrer par marque
- `channel` (enum) - Canal ciblé

**Response 200 OK:**
```json
{
  "data": [
    {
      "id": "camp-1",
      "brandId": "brand-castel-id",
      "title": "Promo Flash Castel - 20% de réduction",
      "description": "Promotion exceptionnelle sur toute la gamme Castel",
      "startDate": "2026-01-20T00:00:00Z",
      "endDate": "2026-02-15T23:59:59Z",
      "status": "ACTIVE",
      "heroImageUrl": "https://cdn.lionsbook.bdc.cm/campaigns/castel-promo.jpg",
      "priority": "HIGH",
      "targetChannels": ["CHR", "PSV"],
      "viewsCount": 420,
      "createdAt": "2026-01-18T10:00:00Z"
    }
  ]
}
```

---

#### `GET /campaigns/:id`

Détails complets d'une campagne.

**Response 200 OK:**
```json
{
  "id": "camp-1",
  "brand": {
    "id": "brand-castel-id",
    "name": "Castel",
    "logoUrl": "..."
  },
  "title": "Promo Flash Castel - 20% de réduction",
  "description": "Promotion exceptionnelle...",
  "startDate": "2026-01-20T00:00:00Z",
  "endDate": "2026-02-15T23:59:59Z",
  "status": "ACTIVE",
  "heroImageUrl": "https://cdn.lionsbook.bdc.cm/campaigns/castel-promo.jpg",
  "media": [
    {
      "id": "media-1",
      "fileUrl": "https://cdn.lionsbook.bdc.cm/media/castel-affiche.pdf",
      "fileType": "PDF",
      "fileSize": 2048576,
      "thumbnailUrl": "https://cdn.lionsbook.bdc.cm/media/castel-affiche-thumb.jpg"
    }
  ],
  "targetChannels": ["CHR", "PSV"],
  "priority": "HIGH",
  "stats": {
    "views": 420,
    "downloads": 156,
    "adoptionRate": 0.84
  },
  "publishedBy": {
    "id": "user-1",
    "name": "Sophie Kamga"
  }
}
```

---

#### `POST /campaigns` 🔐

Créer une nouvelle campagne (Auth requise).

**Request Body:**
```json
{
  "brandId": "brand-castel-id",
  "title": "Promo Flash Castel",
  "description": "Promotion exceptionnelle...",
  "startDate": "2026-02-01T00:00:00Z",
  "endDate": "2026-02-28T23:59:59Z",
  "heroImageUrl": "https://cdn.lionsbook.bdc.cm/campaigns/new-promo.jpg",
  "targetChannels": ["CHR", "PSV"],
  "priority": "HIGH"
}
```

**Response 201 Created:**
```json
{
  "id": "camp-new-id",
  "brandId": "brand-castel-id",
  "title": "Promo Flash Castel",
  "status": "DRAFT",
  "createdAt": "2026-01-29T10:00:00Z"
}
```

---

#### `PUT /campaigns/:id/publish` 🔐

Publier une campagne (Auth requise).

**Response 200 OK:**
```json
{
  "id": "camp-new-id",
  "status": "ACTIVE",
  "publishedAt": "2026-01-29T10:05:00Z",
  "notificationsSent": 500
}
```

---

### **6. Sync (Synchronisation)**

#### `GET /sync/products`

Sync incrémentale des produits.

**Query Parameters:**
- `since` (ISO 8601) - Date de dernière sync

**Response 200 OK:**
```json
{
  "data": [
    {
      "id": "prod-1",
      "name": "Castel Beer 65cl",
      "updatedAt": "2026-01-28T14:30:00Z",
      "action": "UPDATE"
    },
    {
      "id": "prod-2",
      "name": "33 Export 33cl",
      "updatedAt": "2026-01-29T09:00:00Z",
      "action": "CREATE"
    }
  ],
  "meta": {
    "syncDate": "2026-01-29T10:00:00Z",
    "itemsCount": 2,
    "hasMore": false
  }
}
```

---

#### `GET /sync/campaigns`

Sync incrémentale des campagnes.

**Query Parameters:**
- `since` (ISO 8601) - Date de dernière sync

**Response 200 OK:**
```json
{
  "data": [
    {
      "id": "camp-1",
      "title": "Promo Flash Castel",
      "status": "ACTIVE",
      "updatedAt": "2026-01-29T08:00:00Z",
      "action": "UPDATE"
    }
  ],
  "meta": {
    "syncDate": "2026-01-29T10:00:00Z",
    "itemsCount": 1
  }
}
```

---

### **7. Media (Médias)**

#### `POST /media/upload` 🔐

Upload un fichier média (Auth requise).

**Request:**
```http
POST /media/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: [binary data]
campaignId: camp-1
```

**Response 201 Created:**
```json
{
  "id": "media-new-id",
  "fileUrl": "https://cdn.lionsbook.bdc.cm/media/file-123.jpg",
  "thumbnailUrl": "https://cdn.lionsbook.bdc.cm/media/file-123-thumb.jpg",
  "fileType": "IMAGE",
  "fileSize": 1024576,
  "uploadedAt": "2026-01-29T10:00:00Z"
}
```

---

#### `GET /media/:id/download`

Télécharger un média.

**Response 200 OK:**
```
Content-Type: image/jpeg
Content-Length: 1024576

[binary data]
```

---

### **8. Search (Recherche)**

#### `GET /search`

Recherche globale multi-entités.

**Query Parameters:**
- `q` (string) - Requête de recherche
- `type` (enum) - `PRODUCT`, `BRAND`, `CAMPAIGN`, `ALL`
- `limit` (integer) - Limite résultats

**Response 200 OK:**
```json
{
  "query": "Castel",
  "results": {
    "products": [
      {
        "id": "prod-1",
        "name": "Castel Beer 65cl",
        "type": "PRODUCT",
        "relevance": 0.95
      }
    ],
    "brands": [
      {
        "id": "brand-castel-id",
        "name": "Castel",
        "type": "BRAND",
        "relevance": 1.0
      }
    ],
    "campaigns": []
  },
  "meta": {
    "totalResults": 13,
    "searchTime": 0.045
  }
}
```

---

## Codes d'Erreur

### **Codes HTTP Standard**

| Code | Signification | Description |
|------|---------------|-------------|
| `200` | OK | Requête réussie |
| `201` | Created | Ressource créée |
| `204` | No Content | Suppression réussie |
| `400` | Bad Request | Paramètres invalides |
| `401` | Unauthorized | Token manquant ou invalide |
| `403` | Forbidden | Permissions insuffisantes |
| `404` | Not Found | Ressource introuvable |
| `409` | Conflict | Conflit (ex: email déjà utilisé) |
| `422` | Unprocessable Entity | Validation échouée |
| `429` | Too Many Requests | Rate limit dépassé |
| `500` | Internal Server Error | Erreur serveur |
| `503` | Service Unavailable | Service temporairement indisponible |

### **Format d'Erreur**

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Le champ 'email' est requis",
    "details": {
      "field": "email",
      "constraint": "required"
    },
    "timestamp": "2026-01-29T10:00:00Z",
    "requestId": "req-123-456"
  }
}
```

### **Codes d'Erreur Personnalisés**

| Code | Description |
|------|-------------|
| `VALIDATION_ERROR` | Erreur de validation |
| `AUTH_FAILED` | Authentification échouée |
| `TOKEN_EXPIRED` | Token JWT expiré |
| `PERMISSION_DENIED` | Permissions insuffisantes |
| `RESOURCE_NOT_FOUND` | Ressource introuvable |
| `DUPLICATE_ENTRY` | Entrée dupliquée |
| `RATE_LIMIT_EXCEEDED` | Limite de requêtes dépassée |
| `SYNC_CONFLICT` | Conflit de synchronisation |
| `FILE_TOO_LARGE` | Fichier trop volumineux (> 10MB) |
| `INVALID_FILE_TYPE` | Type de fichier non supporté |

---

## Rate Limiting

### **Limites par Endpoint**

| Endpoint | Limite | Fenêtre |
|----------|--------|---------|
| `GET /products` | 1000 req | 1 minute |
| `GET /sync/*` | 100 req | 1 minute |
| `POST /campaigns` | 10 req | 1 minute |
| `POST /media/upload` | 20 req | 1 minute |

### **Headers de Rate Limit**

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 995
X-RateLimit-Reset: 1643457600
```

---

## Pagination

### **Query Parameters**

- `limit` (integer) - Nombre d'items par page (défaut: 50, max: 100)
- `offset` (integer) - Offset pour pagination (défaut: 0)

### **Response Meta**

```json
{
  "data": [...],
  "meta": {
    "total": 156,
    "limit": 50,
    "offset": 0,
    "hasMore": true
  }
}
```

---

## Webhooks (Future)

### **Événements Disponibles**

| Événement | Description |
|-----------|-------------|
| `campaign.published` | Nouvelle campagne publiée |
| `campaign.updated` | Campagne mise à jour |
| `product.updated` | Produit mis à jour |
| `sync.completed` | Synchronisation terminée |

### **Format Webhook**

```json
{
  "event": "campaign.published",
  "data": {
    "id": "camp-1",
    "title": "Promo Flash Castel",
    "publishedAt": "2026-01-29T10:00:00Z"
  },
  "timestamp": "2026-01-29T10:00:01Z"
}
```

---

## Exemples d'Utilisation

### **Recherche de Produit (JavaScript)**

```javascript
const searchProducts = async (query) => {
  const response = await fetch(
    `https://api.lionsbook.bdc.cm/v1/products?search=${query}&limit=10`
  );
  const data = await response.json();
  return data.data;
};

// Usage
const products = await searchProducts('Castel');
console.log(products);
```

---

### **Sync Incrémentale (JavaScript)**

```javascript
const syncProducts = async (lastSyncDate) => {
  const response = await fetch(
    `https://api.lionsbook.bdc.cm/v1/sync/products?since=${lastSyncDate}`
  );
  const data = await response.json();
  
  // Mettre à jour IndexedDB
  await updateLocalDatabase(data.data);
  
  // Sauvegarder nouvelle date de sync
  localStorage.setItem('lastSync', data.meta.syncDate);
};

// Usage
const lastSync = localStorage.getItem('lastSync') || '2026-01-01T00:00:00Z';
await syncProducts(lastSync);
```

---

### **Publication Campagne (JavaScript)**

```javascript
const publishCampaign = async (campaignData, token) => {
  const response = await fetch(
    'https://api.lionsbook.bdc.cm/v1/campaigns',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(campaignData)
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to create campaign');
  }
  
  const campaign = await response.json();
  
  // Publier immédiatement
  await fetch(
    `https://api.lionsbook.bdc.cm/v1/campaigns/${campaign.id}/publish`,
    {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` }
    }
  );
  
  return campaign;
};
```

---

## Changelog

### **Version 1.0.0 (2026-01-29)**

- ✅ Endpoints produits, marques, catégories
- ✅ Endpoints argumentaires
- ✅ Endpoints campagnes (CRUD)
- ✅ Endpoints synchronisation
- ✅ Upload médias
- ✅ Authentification JWT
- ✅ Rate limiting
- ✅ Recherche globale

### **Roadmap (Post-MVP)**

- 🔜 GraphQL API
- 🔜 Webhooks
- 🔜 Analytics API
- 🔜 Bulk operations
- 🔜 API versioning (v2)

---

## Support

**Contact Technique :**
- Email : dev@bdc.cm
- Slack : #lions-book-api
- Documentation : https://docs.lionsbook.bdc.cm

**Status Page :**
- https://status.lionsbook.bdc.cm

---

**Fichier généré automatiquement - Lions' Book MVP**
