import fs from 'fs/promises';
import yaml from 'js-yaml';

const ARG_PATH = 'data/static/catalog/argumentaires.yaml';
const TARGETS = [
  { path: 'data/static/catalog/bieres-complete.yaml', overrideSales: true, overrideObjections: true },
  { path: 'data/static/catalog/alcools-mix.yaml', overrideSales: false, overrideObjections: false },
  { path: 'data/static/catalog/boissons-gazeuses.yaml', overrideSales: false, overrideObjections: false },
  { path: 'data/static/catalog/eaux.yaml', overrideSales: false, overrideObjections: false },
  { path: 'data/static/catalog/bieres.yaml', overrideSales: false, overrideObjections: false },
];

const text = await fs.readFile(ARG_PATH, 'utf8');
const argData = yaml.load(text);
const argBrands = Array.isArray(argData?.brands) ? argData.brands : [];

const normalizeId = (value) =>
  String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '-');

const normalizeName = (value) =>
  String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const hasSalesArguments = (salesArguments) => {
  if (!salesArguments) return false;
  const rational = Array.isArray(salesArguments.rational) && salesArguments.rational.length > 0;
  const emotional = Array.isArray(salesArguments.emotional) && salesArguments.emotional.length > 0;
  const byChannel = salesArguments.by_channel &&
    Object.values(salesArguments.by_channel).some(
      (value) => Array.isArray(value) && value.length > 0
    );
  return rational || emotional || byChannel;
};

const argById = new Map();
const argByName = new Map();
for (const brand of argBrands) {
  argById.set(normalizeId(brand.id), brand);
  argByName.set(normalizeName(brand.name), brand);
}

const extractHeader = (fileText) => {
  const lines = fileText.split('\n');
  let idx = 0;
  while (idx < lines.length) {
    const line = lines[idx];
    if (line.trim() === '' || line.trim().startsWith('#')) {
      idx += 1;
      continue;
    }
    break;
  }
  return {
    header: lines.slice(0, idx).join('\n').trimEnd(),
    body: lines.slice(idx).join('\n'),
  };
};

const sanitizeYaml = (bodyText) => {
  const lines = bodyText.split('\n');
  return lines
    .map((line) => {
      const match = line.match(/^(\s*[^:#]+:\s*)"(.+)"\s*$/);
      if (!match) return line;
      const value = match[2];
      if (!value.includes('"')) return line;
      const safe = value.replace(/'/g, "''");
      return `${match[1]}'${safe}'`;
    })
    .join('\n');
};

const mergeBrand = (brand, argBrand, options) => {
  const { overrideSales, overrideObjections } = options;

  if (argBrand.identity && Object.values(argBrand.identity).some((v) => v)) {
    brand.identity = argBrand.identity;
    if (brand.positioning === undefined && argBrand.identity.positioning) {
      brand.positioning = argBrand.identity.positioning;
    }
    if (brand.target === undefined && argBrand.identity.target) {
      brand.target = argBrand.identity.target;
    }
    if (brand.alcohol_rate === undefined && argBrand.identity.alcohol_rate) {
      brand.alcohol_rate = argBrand.identity.alcohol_rate;
    }
    if (brand.signature === undefined && argBrand.identity.signature) {
      brand.signature = argBrand.identity.signature;
    }
  }

  if (Array.isArray(argBrand.key_facts) && argBrand.key_facts.length > 0) {
    brand.key_facts = [...argBrand.key_facts];
    if (!brand.briefs) {
      brand.briefs = [...argBrand.key_facts];
    }
    if (!brand.history && !brand.histoire) {
      brand.history = argBrand.key_facts.join('\n');
    }
  }

  if (hasSalesArguments(argBrand.sales_arguments)) {
    if (overrideSales || brand.sales_arguments === undefined) {
      brand.sales_arguments = argBrand.sales_arguments;
    }
  }

  if (Array.isArray(argBrand.objections) && argBrand.objections.length > 0) {
    if (overrideObjections || !Array.isArray(brand.objections) || brand.objections.length === 0) {
      brand.objections = argBrand.objections;
    }
  }
};

for (const target of TARGETS) {
  const fileText = await fs.readFile(target.path, 'utf8');
  const { header, body } = extractHeader(fileText);
  const sanitized = sanitizeYaml(body);
  const data = yaml.load(sanitized);

  if (!data || !Array.isArray(data.brands)) {
    console.warn(`Skip ${target.path}: no brands array.`);
    continue;
  }

  let updated = 0;
  for (const brand of data.brands) {
    const argBrand = argById.get(normalizeId(brand.id)) || argByName.get(normalizeName(brand.name));
    if (!argBrand) {
      continue;
    }
    mergeBrand(brand, argBrand, target);
    updated += 1;
  }

  const dumped = yaml.dump(data, {
    lineWidth: 120,
    noCompatMode: true,
    quotingType: '"',
  });
  const finalText = header ? `${header}\n\n${dumped}` : dumped;
  await fs.writeFile(target.path, finalText, 'utf8');
  console.log(`${target.path}: ${updated} brands updated`);
}
