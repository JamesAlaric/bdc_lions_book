export interface PackshotAsset {
  id: string;
  brand: string;
  category: string;
  group?: string;
  name: string;
  url: string;
}

export const packshotAssets: PackshotAsset[] = [
  // Bières - 33 Export
  { id: "packshot-1", brand: "33 Export", category: "Bières", group: "33 CL", name: "33 Export 33 CL", url: "/assets/packshots/bieres/33-export/33cl/33-export-33cl.webp" },
  { id: "packshot-2", brand: "33 Export", category: "Bières", group: "50 CL", name: "33 Export 50 CL", url: "/assets/packshots/bieres/33-export/50cl/33-export-50cl.webp" },
  { id: "packshot-3", brand: "33 Export", category: "Bières", group: "65 CL", name: "33 Export 65 CL", url: "/assets/packshots/bieres/33-export/65cl/33-export-65cl.webp" },
  { id: "packshot-4", brand: "33 Export", category: "Bières", group: "CANETTE", name: "33 Export Canette", url: "/assets/packshots/bieres/33-export/canette/33-export-can.webp" },
  // Bières - Beaufort
  { id: "packshot-5", brand: "Beaufort", category: "Bières", group: "33 CL", name: "Beaufort 33 CL Caps", url: "/assets/packshots/bieres/beaufort/33cl/beaufort-33-caps.webp" },
  { id: "packshot-6", brand: "Beaufort", category: "Bières", group: "33 CL FROZEN", name: "Beaufort 33 CL Frozen", url: "/assets/packshots/bieres/beaufort/33cl/beaufort-33-caps-frozen.webp" },
  { id: "packshot-7", brand: "Beaufort", category: "Bières", group: "33 CL PO", name: "Beaufort 33 CL PO", url: "/assets/packshots/bieres/beaufort/33cl/beaufort-33-po.webp" },
  { id: "packshot-8", brand: "Beaufort", category: "Bières", group: "33 CL PO FROZEN", name: "Beaufort 33 CL PO Frozen", url: "/assets/packshots/bieres/beaufort/33cl/beaufort-33-po-frozen.webp" },
  { id: "packshot-10", brand: "Beaufort", category: "Bières", group: "CANETTE", name: "Beaufort Canette", url: "/assets/packshots/bieres/beaufort/canette/beaufort-can.webp" },
  { id: "packshot-11", brand: "Beaufort", category: "Bières", group: "CANETTE FROZEN", name: "Beaufort Canette Frozen", url: "/assets/packshots/bieres/beaufort/canette/beaufort-can-frozen.webp" },
  // Bières - Castel Beer
  { id: "packshot-12", brand: "Castel Beer", category: "Bières", group: "ALE 50", name: "Castel ALE 50 CL", url: "/assets/packshots/bieres/castel-beer/50cl/ale-50.webp" },
  { id: "packshot-13", brand: "Castel Beer", category: "Bières", group: "APO 33", name: "Castel APO 33 CL", url: "/assets/packshots/bieres/castel-beer/33cl/apo-33.webp" },
  { id: "packshot-14", brand: "Castel Beer", category: "Bières", group: "APO 65", name: "Castel APO 65 CL", url: "/assets/packshots/bieres/castel-beer/65cl/apo-65.webp" },
  { id: "packshot-15", brand: "Castel Beer", category: "Bières", group: "BREMER 33", name: "Castel Bremer 33 CL", url: "/assets/packshots/bieres/castel-beer/bremer-33/bremer-33.webp" },
  { id: "packshot-16", brand: "Castel Beer", category: "Bières", group: "BREMER 65", name: "Castel Bremer 65 CL", url: "/assets/packshots/bieres/castel-beer/bremer-65/bremer-65.webp" },
  // Bières - Chill
  { id: "packshot-18", brand: "Chill", category: "Bières", group: "CANETTE", name: "Chill Citron Canette", url: "/assets/packshots/bieres/chill/canette/chill-citron-33-can.webp" },
  { id: "packshot-19", brand: "Chill", category: "Bières", group: "50 CL", name: "Chill Citron 50 CL", url: "/assets/packshots/bieres/chill/50cl/chill-citron-50.webp" },
  // Bières - Doppel Munich
  { id: "packshot-20", brand: "Doppel Munich", category: "Bières", group: "50 CL", name: "Doppel Munich 50 CL", url: "/assets/packshots/bieres/doppel-munich/50cl/doppel-munich-50cl.webp" },
  // Alcools Mix - Racine
  { id: "packshot-21", brand: "Racine", category: "Alcools Mix", group: "33 CL", name: "Racine 33 CL", url: "/assets/packshots/alcools-mix/racines/33cl/racine-33cl.webp" },
  // Boissons Gazeuses - World Cola
  { id: "packshot-22", brand: "World Cola", category: "Boissons Gazeuses", group: "50 CL", name: "World Cola 50 CL", url: "/assets/packshots/bg/world-cola/50cl/world-cola-50cl.webp" },
  { id: "packshot-23", brand: "World Cola", category: "Boissons Gazeuses", group: "60 CL", name: "World Cola 60 CL", url: "/assets/packshots/bg/world-cola/60cl/world-cola-60cl.webp" },
];