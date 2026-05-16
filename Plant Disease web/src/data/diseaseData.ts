export const DISEASE_KB: Record<string, { name: string; type: string; base_conf: number; keywords: string[] }[]> = {
  Tomato: [
    { name: "Early Blight",       type: "Fungal",    base_conf: 82, keywords: ["brown","dark","spots","concentric","yellowing"] },
    { name: "Late Blight",        type: "Fungal",    base_conf: 85, keywords: ["water","soaked","dark","lesion","white","mold"] },
    { name: "Leaf Curl Virus",    type: "Viral",     base_conf: 78, keywords: ["curl","yellow","vein","mosaic","stunted"] },
    { name: "Bacterial Wilt",     type: "Bacterial", base_conf: 80, keywords: ["wilt","droop","brown","stem","water"] },
    { name: "Septoria Leaf Spot", type: "Fungal",    base_conf: 76, keywords: ["small","circular","spot","grey","brown","margin"] },
    { name: "Healthy",            type: "None",      base_conf: 95, keywords: ["healthy","green","normal","fine"] },
  ],
  Potato: [
    { name: "Late Blight",   type: "Fungal",    base_conf: 88, keywords: ["dark","lesion","water","soaked","rot"] },
    { name: "Early Blight",  type: "Fungal",    base_conf: 80, keywords: ["brown","spots","concentric","yellowing"] },
    { name: "Black Scurf",   type: "Fungal",    base_conf: 74, keywords: ["black","scurf","tuber","surface","rough"] },
    { name: "Common Scab",   type: "Bacterial", base_conf: 72, keywords: ["scab","rough","corky","lesion"] },
    { name: "Healthy",       type: "None",      base_conf: 95, keywords: ["healthy","green","normal"] },
  ],
  Pepper: [
    { name: "Anthracnose",          type: "Fungal",    base_conf: 81, keywords: ["sunken","dark","lesion","fruit","rot"] },
    { name: "Bacterial Leaf Spot",  type: "Bacterial", base_conf: 79, keywords: ["water","soaked","yellow","halo","angular"] },
    { name: "Phytophthora Blight",  type: "Fungal",    base_conf: 83, keywords: ["wilt","collapse","dark","stem","rot"] },
    { name: "Healthy",              type: "None",      base_conf: 95, keywords: ["healthy","green","normal"] },
  ],
  Rice: [
    { name: "Rice Blast",            type: "Fungal",    base_conf: 87, keywords: ["diamond","lesion","grey","center","brown","border"] },
    { name: "Brown Spot",            type: "Fungal",    base_conf: 80, keywords: ["brown","circular","spot","yellow","halo"] },
    { name: "Bacterial Leaf Blight", type: "Bacterial", base_conf: 82, keywords: ["yellow","stripe","wilt","margin","water"] },
    { name: "Sheath Blight",         type: "Fungal",    base_conf: 78, keywords: ["sheath","white","lesion","oval","grey"] },
    { name: "Healthy",               type: "None",      base_conf: 95, keywords: ["healthy","green","normal"] },
  ],
  Maize: [
    { name: "Northern Corn Leaf Blight", type: "Fungal",  base_conf: 84, keywords: ["long","grey","tan","lesion","cigar"] },
    { name: "Common Rust",               type: "Fungal",  base_conf: 86, keywords: ["rust","orange","pustule","powder","brown"] },
    { name: "Grey Leaf Spot",            type: "Fungal",  base_conf: 79, keywords: ["grey","rectangular","spot","tan","stripe"] },
    { name: "Maize Streak Virus",        type: "Viral",   base_conf: 77, keywords: ["streak","yellow","stripe","mosaic","stunted"] },
    { name: "Healthy",                   type: "None",    base_conf: 95, keywords: ["healthy","green","normal"] },
  ],
  Cotton: [
    { name: "Cotton Leaf Curl",     type: "Viral",     base_conf: 85, keywords: ["curl","yellow","vein","thicken","stunted"] },
    { name: "Alternaria Leaf Spot", type: "Fungal",    base_conf: 78, keywords: ["brown","circular","spot","concentric"] },
    { name: "Bacterial Blight",     type: "Bacterial", base_conf: 80, keywords: ["angular","water","soaked","brown","black"] },
    { name: "Healthy",              type: "None",      base_conf: 95, keywords: ["healthy","green","normal"] },
  ],
  Wheat: [
    { name: "Wheat Rust",      type: "Fungal", base_conf: 87, keywords: ["rust","orange","yellow","pustule","stripe"] },
    { name: "Powdery Mildew",  type: "Fungal", base_conf: 83, keywords: ["white","powder","coating","mildew"] },
    { name: "Septoria Blotch", type: "Fungal", base_conf: 78, keywords: ["brown","blotch","tan","lesion","irregular"] },
    { name: "Healthy",         type: "None",   base_conf: 95, keywords: ["healthy","green","normal"] },
  ],
  Banana: [
    { name: "Panama Wilt",        type: "Fungal", base_conf: 88, keywords: ["wilt","yellow","brown","vascular","rot"] },
    { name: "Sigatoka Leaf Spot", type: "Fungal", base_conf: 82, keywords: ["yellow","streak","brown","necrotic","border"] },
    { name: "Bunchy Top Virus",   type: "Viral",  base_conf: 80, keywords: ["stunted","bunchy","mosaic","yellow","narrow"] },
    { name: "Healthy",            type: "None",   base_conf: 95, keywords: ["healthy","green","normal"] },
  ],
};

export const WEATHER_BOOST: Record<string, Record<string, number>> = {
  Fungal:    { humid: 8,  dry: -6, moderate: 0,  cold: 3 },
  Bacterial: { humid: 5,  dry: -3, moderate: 0,  cold: -2 },
  Viral:     { humid: 2,  dry: 2,  moderate: 0,  cold: -1 },
  None:      { humid: 0,  dry: 0,  moderate: 0,  cold: 0 },
};

export const STAGE_BOOST: Record<string, Record<string, number>> = {
  Fungal:    { seedling: -3, vegetative: 2, flowering: 5,  fruiting: 4 },
  Bacterial: { seedling: -2, vegetative: 1, flowering: 3,  fruiting: 3 },
  Viral:     { seedling: 4,  vegetative: 2, flowering: 0,  fruiting: -1 },
  None:      { seedling: 0,  vegetative: 0, flowering: 0,  fruiting: 0 },
};

export const SPREAD_BOOST: Record<string, number> = {
  isolated:  -5,
  spreading: 3,
  whole:     7,
  stem:      9,
  field:     10,
};

export function mlScoreDiseases(
  crop: string,
  symptoms: string,
  weather: string,
  stage: string,
  spread: string
): { name: string; type: string; score: number }[] {
  const diseases = DISEASE_KB[crop] ?? DISEASE_KB["Tomato"];
  const symLower = (symptoms || "").toLowerCase();
  const scored: { name: string; type: string; score: number }[] = [];

  for (const d of diseases) {
    let score = d.base_conf;
    const dtype = d.type;
    const matched = d.keywords.filter((kw) => symLower.includes(kw)).length;
    score += Math.min(matched * 3, 12);
    score += WEATHER_BOOST[dtype]?.[weather] ?? 0;
    score += STAGE_BOOST[dtype]?.[stage] ?? 0;
    score += SPREAD_BOOST[spread] ?? 0;
    score = Math.max(40, Math.min(99, score));
    scored.push({ name: d.name, type: dtype, score: Math.round(score) });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 3);
}

export const CROPS = ["Tomato","Potato","Pepper","Rice","Maize","Cotton","Wheat","Banana"];

export const DISEASE_TYPE_COLOR: Record<string, string> = {
  Fungal:      "bg-amber-100 text-amber-800 border-amber-200",
  Bacterial:   "bg-red-100 text-red-800 border-red-200",
  Viral:       "bg-purple-100 text-purple-800 border-purple-200",
  Nutritional: "bg-blue-100 text-blue-800 border-blue-200",
  Pest:        "bg-orange-100 text-orange-800 border-orange-200",
  None:        "bg-green-100 text-green-800 border-green-200",
};

export const DISEASE_TYPE_EMOJI: Record<string, string> = {
  Fungal:      "🍄",
  Bacterial:   "🦠",
  Viral:       "🧬",
  Nutritional: "🌿",
  Pest:        "🐛",
  None:        "✅",
};
