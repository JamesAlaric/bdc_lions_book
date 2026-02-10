import yaml from 'js-yaml';

export interface Brand {
  id: string;
  name: string;
  discontinued?: boolean;
}

export interface Segment {
  id: string;
  name: string;
  icon: string;
  order: number;
  description: string;
  brands: Brand[];
}

export interface SegmentsData {
  version: string;
  generatedAt: string;
  segments: Segment[];
}

let cachedSegments: SegmentsData | null = null;

export async function loadSegmentsBrands(): Promise<SegmentsData> {
  if (cachedSegments) {
    return cachedSegments;
  }

  const response = await fetch('/data/static/catalog/segments-brands.yaml');
  if (!response.ok) {
    throw new Error(`Failed to load segments-brands: ${response.status}`);
  }

  const text = await response.text();
  const data = yaml.load(text) as SegmentsData;
  cachedSegments = data;
  return data;
}

export function getAllSegments(): Segment[] {
  return cachedSegments?.segments ?? [];
}

export function getSegmentById(id: string): Segment | undefined {
  return cachedSegments?.segments.find(s => s.id === id);
}

export function getAllBrandsFromSegments(): Brand[] {
  const brands: Brand[] = [];
  cachedSegments?.segments.forEach(segment => {
    brands.push(...segment.brands);
  });
  return brands;
}

export function getBrandsBySegment(segmentId: string): Brand[] {
  const segment = getSegmentById(segmentId);
  return segment?.brands ?? [];
}
