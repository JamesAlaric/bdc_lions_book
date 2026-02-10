import yaml from 'js-yaml';

export interface ArgumentaireIdentity {
  target?: string;
  positioning?: string;
  alcohol_rate?: string;
  signature?: string;
}

export interface ArgumentaireSalesArguments {
  rational?: string[];
  emotional?: string[];
  by_channel?: Record<string, string[]>;
}

export interface ArgumentaireTableRow {
  motivation: string;
  fact: string;
  proof: string;
  benefit: string;
}

export interface ArgumentaireSalesArgumentsTable {
  rational?: ArgumentaireTableRow[];
  emotional?: ArgumentaireTableRow[];
}

export interface ArgumentaireBrief {
  a_savoir?: string[];
  a_dire?: string[];
  formats_prix?: string;
}

export interface ArgumentaireObjection {
  question?: string;
  response?: string;
  script?: string;
}

export interface ArgumentaireBrand {
  id: string;
  name: string;
  identity?: ArgumentaireIdentity;
  key_facts?: string[];
  sales_arguments?: ArgumentaireSalesArguments;
  sales_arguments_table?: ArgumentaireSalesArgumentsTable;
  brief?: ArgumentaireBrief;
  objections?: ArgumentaireObjection[];
}

export interface ArgumentairesData {
  version?: string;
  generatedAt?: string;
  brands: ArgumentaireBrand[];
}

let cachedArgumentaires: ArgumentairesData | null = null;

function normalizeKey(value?: string | null) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export async function loadArgumentaires(): Promise<ArgumentairesData> {
  if (cachedArgumentaires) {
    return cachedArgumentaires;
  }

  const response = await fetch('/data/static/catalog/argumentaires.yaml');
  if (!response.ok) {
    throw new Error(`Failed to load argumentaires: ${response.status}`);
  }

  const text = await response.text();
  const data = yaml.load(text) as ArgumentairesData;
  cachedArgumentaires = data;
  return data;
}

export function findArgumentaireBrand(
  data: ArgumentairesData,
  options: { id?: string; name?: string }
): ArgumentaireBrand | undefined {
  const idKey = normalizeKey(options.id);
  const nameKey = normalizeKey(options.name);
  return (
    data.brands.find((brand) => normalizeKey(brand.id) === idKey) ||
    data.brands.find((brand) => normalizeKey(brand.name) === nameKey) ||
    data.brands.find((brand) => normalizeKey(brand.name) === idKey)
  );
}
