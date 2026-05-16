import { useState, useRef, useCallback } from "react";
import {
  Upload, X, Leaf, Loader2, ChevronRight, ImagePlus, AlertCircle, Globe
} from "lucide-react";
import { mlScoreDiseases, CROPS } from "../data/diseaseData";
import type { FormData, DiagnosisResult, DiseaseCandidate } from "../types";

interface DiagnoseProps {
  onResult: (result: DiagnosisResult, formData: FormData) => void;
}

const WEATHER_OPTIONS = [
  { value: "humid",    label: "Humid / Rainy",   emoji: "🌧️" },
  { value: "dry",      label: "Dry / Hot",        emoji: "☀️" },
  { value: "moderate", label: "Moderate",          emoji: "⛅" },
  { value: "cold",     label: "Cold",              emoji: "❄️" },
];

const STAGE_OPTIONS = [
  { value: "seedling",   label: "Seedling",   emoji: "🌱" },
  { value: "vegetative", label: "Vegetative", emoji: "🌿" },
  { value: "flowering",  label: "Flowering",  emoji: "🌸" },
  { value: "fruiting",   label: "Fruiting",   emoji: "🍅" },
];

const SPREAD_OPTIONS = [
  { value: "isolated",  label: "Isolated (1–2 plants)", emoji: "🔴" },
  { value: "spreading", label: "Spreading (patch)",      emoji: "🟠" },
  { value: "whole",     label: "Whole plant",            emoji: "🟡" },
  { value: "stem",      label: "Stem / Root affected",   emoji: "🟣" },
  { value: "field",     label: "Entire field",           emoji: "⚫" },
];

const defaultForm: FormData = {
  crop:     "Tomato",
  symptoms: "",
  weather:  "moderate",
  stage:    "vegetative",
  area:     "25",
  spread:   "isolated",
  lang:     "en",
  image:    null,
};

function buildMockResult(
  formData: FormData,
  candidates: DiseaseCandidate[]
): DiagnosisResult {
  const top = candidates[0];
  const historyMock = [
    {
      time:       new Date().toLocaleString("en-GB"),
      disease:    top.name,
      crop:       formData.crop,
      confidence: top.score,
      emoji:      top.type === "Fungal" ? "🍄" : top.type === "Bacterial" ? "🦠" : top.type === "Viral" ? "🧬" : "✅",
    },
  ];

  const treatmentMap: Record<string, string> = {
    Fungal:    "Apply copper-based fungicide every 7 days. Remove and destroy all infected plant parts immediately. Ensure proper soil drainage to reduce moisture retention.",
    Bacterial: "Apply bactericide containing copper hydroxide. Prune affected parts with sterilized tools. Avoid overhead irrigation which spreads bacterial spores.",
    Viral:     "Remove and destroy all infected plants to prevent spread. Control insect vectors like aphids and whiteflies using insecticides. Use virus-free certified seeds for next season.",
    None:      "Your plant appears healthy! Continue regular monitoring, proper watering, and balanced fertilization.",
  };
  const preventionMap: Record<string, string> = {
    Fungal:    "Use disease-resistant varieties and certified disease-free seeds. Maintain proper plant spacing for good air circulation. Avoid overhead watering and water early morning.",
    Bacterial: "Practice crop rotation every 2–3 years. Sterilize all garden tools before use. Remove crop debris after harvest to eliminate overwintering bacteria.",
    Viral:     "Control insect vectors with regular scouting and insecticide applications. Use reflective mulches to repel aphids. Plant resistant varieties when available.",
    None:      "Continue good agronomic practices: balanced fertilization, proper irrigation, and regular scouting for early pest or disease detection.",
  };
  const organicMap: Record<string, string> = {
    Fungal:    "Spray neem oil solution (5 ml per litre) every 7 days. Apply Trichoderma viride bio-fungicide at the root zone.",
    Bacterial: "Apply garlic extract spray (50 g crushed garlic per litre of water). Use copper-based organic spray like Bordeaux mixture.",
    Viral:     "Spray neem oil to control aphid vectors. Apply yellow sticky traps around the crop. Use garlic and chili extract spray as a repellent.",
    None:      "Maintain soil health with compost and organic matter. Use neem cake as a preventive soil amendment.",
  };

  return {
    disease:      top.name,
    confidence:   top.score,
    severity:     top.score > 85 ? "Severe" : top.score > 75 ? "Moderate" : "Mild",
    severity_pct: top.score > 85 ? 75 : top.score > 75 ? 50 : 25,
    disease_type: top.type as DiagnosisResult["disease_type"],
    treatment:    treatmentMap[top.type] || treatmentMap["Fungal"],
    prevention:   preventionMap[top.type] || preventionMap["Fungal"],
    organic:      organicMap[top.type] || organicMap["Fungal"],
    candidates,
    history:      historyMock,
  };
}

export default function Diagnose({ onResult }: DiagnoseProps) {
  const [form, setForm] = useState<FormData>(defaultForm);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const setField = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleFile = (file: File) => {
    setField("image", file);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) handleFile(file);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // ML pre-scoring (runs client-side)
      const candidates = mlScoreDiseases(
        form.crop, form.symptoms, form.weather, form.stage, form.spread
      );

      // Simulate a short processing delay
      await new Promise((res) => setTimeout(res, 1800));

      // Build a realistic result using the ML engine
      const result = buildMockResult(form, candidates);

      // Store in history
      const existing = JSON.parse(localStorage.getItem("pg_history") || "[]");
      existing.unshift({
        time:       new Date().toLocaleString("en-GB"),
        disease:    result.disease,
        crop:       form.crop,
        confidence: result.confidence,
        emoji:      result.disease_type === "Fungal" ? "🍄"
                  : result.disease_type === "Bacterial" ? "🦠"
                  : result.disease_type === "Viral" ? "🧬"
                  : "✅",
      });
      localStorage.setItem("pg_history", JSON.stringify(existing.slice(0, 20)));

      onResult(result, form);
    } catch (err) {
      setError("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 rounded-full px-4 py-1.5 text-sm font-semibold text-green-700 mb-4">
            <Leaf size={14} />
            AI Plant Diagnosis
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Diagnose Your Plant
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            Fill in the details below and optionally upload a photo. Our AI will analyze symptoms and provide expert diagnosis within seconds.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 text-base mb-4 flex items-center gap-2">
              <ImagePlus size={18} className="text-green-600" />
              Plant Photo <span className="text-gray-400 font-normal text-sm">(optional but recommended)</span>
            </h2>
            {preview ? (
              <div className="relative rounded-xl overflow-hidden border border-gray-200">
                <img src={preview} alt="Plant" className="w-full max-h-64 object-cover" />
                <button
                  type="button"
                  onClick={() => { setPreview(null); setField("image", null); }}
                  className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-md hover:bg-white transition-colors"
                >
                  <X size={16} className="text-gray-700" />
                </button>
              </div>
            ) : (
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
                onClick={() => fileRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${
                  dragOver ? "border-green-400 bg-green-50" : "border-gray-200 hover:border-green-300 hover:bg-green-50/50"
                }`}
              >
                <Upload size={36} className="text-gray-300 mx-auto mb-3" />
                <p className="font-medium text-gray-600 mb-1">Drop your plant photo here</p>
                <p className="text-sm text-gray-400">or click to browse — JPG, PNG supported</p>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
                />
              </div>
            )}
          </div>

          {/* Crop & Language */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 text-base mb-4 flex items-center gap-2">
              <Leaf size={18} className="text-green-600" />
              Crop Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Select Crop *</label>
                <select
                  value={form.crop}
                  onChange={(e) => setField("crop", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  {CROPS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1">
                  <Globe size={14} className="text-green-600" />
                  Result Language
                </label>
                <div className="flex gap-2">
                  {[{ value: "en", label: "English" }, { value: "ta", label: "தமிழ்" }].map((l) => (
                    <button
                      key={l.value}
                      type="button"
                      onClick={() => setField("lang", l.value)}
                      className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                        form.lang === l.value
                          ? "bg-green-50 border-green-400 text-green-700"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Symptoms */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 text-base mb-4 flex items-center gap-2">
              <AlertCircle size={18} className="text-green-600" />
              Symptoms Description
            </h2>
            <textarea
              value={form.symptoms}
              onChange={(e) => setField("symptoms", e.target.value)}
              rows={4}
              placeholder="Describe what you observe — e.g. 'yellowing leaves with brown circular spots, wilting, white mold on underside, concentric rings visible...'"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            />
            <p className="text-xs text-gray-400 mt-2">More detail = better accuracy. Mention color, shape, texture, location of symptoms.</p>
          </div>

          {/* Environmental Factors */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 text-base mb-5 flex items-center gap-2">
              🌍 Environmental Conditions
            </h2>
            <div className="space-y-5">
              {/* Weather */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Weather</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {WEATHER_OPTIONS.map((w) => (
                    <button
                      key={w.value}
                      type="button"
                      onClick={() => setField("weather", w.value)}
                      className={`flex flex-col items-center gap-1 py-3 rounded-xl border text-xs font-medium transition-all ${
                        form.weather === w.value
                          ? "bg-green-50 border-green-400 text-green-700"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      <span className="text-lg">{w.emoji}</span>
                      {w.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Growth Stage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Growth Stage</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {STAGE_OPTIONS.map((s) => (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => setField("stage", s.value)}
                      className={`flex flex-col items-center gap-1 py-3 rounded-xl border text-xs font-medium transition-all ${
                        form.stage === s.value
                          ? "bg-green-50 border-green-400 text-green-700"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      <span className="text-lg">{s.emoji}</span>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Affected Area: <span className="text-green-600 font-bold">{form.area}%</span>
                </label>
                <input
                  type="range"
                  min="5" max="100" step="5"
                  value={form.area}
                  onChange={(e) => setField("area", e.target.value)}
                  className="w-full accent-green-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>5%</span><span>25%</span><span>50%</span><span>75%</span><span>100%</span>
                </div>
              </div>

              {/* Spread Pattern */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Spread Pattern</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {SPREAD_OPTIONS.map((s) => (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => setField("spread", s.value)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                        form.spread === s.value
                          ? "bg-green-50 border-green-400 text-green-700"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      <span>{s.emoji}</span>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
              <AlertCircle size={18} className="text-red-500 shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-base shadow-lg shadow-green-200 hover:shadow-green-300 hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 transition-all"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Analyzing with AI...
              </>
            ) : (
              <>
                <Leaf size={20} />
                Run AI Diagnosis
                <ChevronRight size={18} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
