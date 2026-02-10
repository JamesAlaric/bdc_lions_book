import fs from 'fs/promises';
import yaml from 'js-yaml';

const ARG_PATH = 'data/static/catalog/argumentaires.yaml';
const EXTRACTED_PATH = 'data/static/catalog/argumentaires-extracted.json';

const normalizeKey = (value) =>
  String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const data = yaml.load(await fs.readFile(ARG_PATH, 'utf8'));
const extracted = JSON.parse(await fs.readFile(EXTRACTED_PATH, 'utf8'));

const fullBrands = extracted?.full?.brands ?? {};
const briefBrands = extracted?.brief?.brands ?? {};

const fullMap = new Map(Object.entries(fullBrands).map(([key, value]) => [normalizeKey(key), value]));
const briefMap = new Map(Object.entries(briefBrands).map(([key, value]) => [normalizeKey(key), value]));

let updated = 0;
for (const brand of data.brands ?? []) {
  const key = normalizeKey(brand.name || brand.id);
  const full = fullMap.get(key);
  const brief = briefMap.get(key);

  if (full?.motivations_table) {
    brand.sales_arguments_table = full.motivations_table;
  }

  if ((!brand.key_facts || brand.key_facts.length === 0) && full?.key_facts?.length) {
    brand.key_facts = full.key_facts;
  }

  if (brief?.brief) {
    brand.brief = {
      a_savoir: brief.brief.a_savoir ?? [],
      a_dire: brief.brief.a_dire ?? [],
      formats_prix: brief.brief.formats_prix ?? '',
    };
  }

  updated += 1;
}

const dumped = yaml.dump(data, {
  lineWidth: 120,
  noCompatMode: true,
  quotingType: '"',
});

await fs.writeFile(ARG_PATH, dumped, 'utf8');
console.log(`Updated ${updated} brands in ${ARG_PATH}`);
