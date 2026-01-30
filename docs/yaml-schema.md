# Schéma YAML du catalogue BDC

## metadata.yaml
- `version` (string) : version des données.
- `lastUpdate` (ISO date) : horodatage de mise à jour.
- `checksum` (string) : empreinte SHA pour vérifier l’intégrité.
- `categories` (string[]) : liste des catégories couvertes.
- `totalProducts` (number) : nombre total de produits.
- `totalBrands` (number) : nombre total de marques.

## products/*.yaml
- `version` (string) : version du fichier catégorie.
- `lastUpdate` (date) : date de mise à jour.
- `category` (enum) : `biere` | `soft` | `eau` | `vin` | `spiritueux`.
- `products` (array):
  - `id` (string) : identifiant unique.
  - `name` (string) : nom produit.
  - `brand` (string) : marque.
  - `historique` (string) : historique de la marque/produit.
  - `positionnement` (string) : positionnement marketing.
  - `category` (enum) : cohérent avec le fichier.
  - `canal` (enum) : `CHR` | `PSV` | `TT` | `MT`.
  - `prix` (number) : prix unitaire TTC.
  - `marge` (number) : marge en pourcentage.
  - `specs` (object):
    - `alcool` (number | optionnel) : pourcentage alcool.
    - `contenance` (number) : volume en ml.
    - `nbBouteilles` (number | optionnel) : nombre d’unités par pack.
    - `format` (string) : libellé de format.
  - `certifications` (string[] | optionnel).
  - `ingredients` (string[] | optionnel).
  - `conservation` (string | optionnel).
  - `lastUpdated` (timestamp ms).

## brands/*.yaml
- `id` (string) : identifiant marque.
- `name` (string) : nom complet.
- `histoire` (string) : résumé historique.
- `positionnement` (string) : axe marketing.
- `argumentaires` (string[]) : bullets d’argumentaire.
- `lastUpdated` (timestamp ms).

## Bonnes pratiques
- Garder les dates en ISO ou timestamp ms pour la cohérence.
- Vérifier la cohérence des catégories et canaux via CI/tests.
- Préférer les valeurs numériques pour `prix` et `marge` (pas de chaînes).
- Mettre à jour `metadata.yaml` lors de l’ajout d’un fichier ou d’une nouvelle version.
