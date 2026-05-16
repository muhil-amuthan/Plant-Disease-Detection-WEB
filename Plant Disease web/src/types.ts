export interface DiseaseCandidate {
  name: string;
  type: string;
  score: number;
}

export interface DiagnosisResult {
  disease: string;
  confidence: number;
  severity: "Mild" | "Moderate" | "Severe";
  severity_pct: number;
  disease_type: "Fungal" | "Bacterial" | "Viral" | "Nutritional" | "Pest" | "None";
  treatment: string;
  prevention: string;
  organic: string;
  candidates: DiseaseCandidate[];
  history: HistoryEntry[];
}

export interface HistoryEntry {
  time: string;
  disease: string;
  crop: string;
  confidence: number;
  emoji: string;
}

export interface FormData {
  crop: string;
  symptoms: string;
  weather: string;
  stage: string;
  area: string;
  spread: string;
  lang: string;
  image: File | null;
}

export type Page = "home" | "diagnose" | "result" | "history" | "dashboard" | "about";
