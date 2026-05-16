import { CheckCircle, AlertTriangle, XCircle, Leaf, RotateCcw, History, FlaskConical, Shield, Sprout } from "lucide-react";
import { RadialBarChart, RadialBar, ResponsiveContainer, Cell } from "recharts";
import { DISEASE_TYPE_COLOR, DISEASE_TYPE_EMOJI } from "../data/diseaseData";
import type { DiagnosisResult, FormData, Page } from "../types";

interface ResultProps {
  result: DiagnosisResult;
  formData: FormData;
  onNavigate: (page: Page) => void;
}

function SeverityIcon({ severity }: { severity: string }) {
  if (severity === "Mild") return <CheckCircle size={18} className="text-green-500" />;
  if (severity === "Moderate") return <AlertTriangle size={18} className="text-amber-500" />;
  return <XCircle size={18} className="text-red-500" />;
}

function SeverityColor(severity: string) {
  if (severity === "Mild") return "text-green-600 bg-green-50 border-green-200";
  if (severity === "Moderate") return "text-amber-600 bg-amber-50 border-amber-200";
  return "text-red-600 bg-red-50 border-red-200";
}

function ConfGaugeColor(conf: number) {
  if (conf >= 85) return "#16a34a";
  if (conf >= 70) return "#ca8a04";
  return "#dc2626";
}

export default function Result({ result, formData, onNavigate }: ResultProps) {
  const gaugeData = [{ name: "conf", value: result.confidence }];
  const isHealthy = result.disease_type === "None";

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back + actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-7">
          <button
            onClick={() => onNavigate("diagnose")}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-green-600 transition-colors"
          >
            <RotateCcw size={15} />
            New Scan
          </button>
          <button
            onClick={() => onNavigate("history")}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-green-600 transition-colors"
          >
            <History size={15} />
            View History
          </button>
        </div>

        {/* Hero Card */}
        <div className={`rounded-3xl p-7 mb-6 border shadow-sm ${isHealthy ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200" : "bg-white border-gray-100"}`}>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Gauge */}
            <div className="relative w-36 h-36 shrink-0 mx-auto md:mx-0">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%" cy="50%"
                  innerRadius="65%" outerRadius="90%"
                  startAngle={230} endAngle={-50}
                  data={gaugeData}
                >
                  <RadialBar
                    dataKey="value"
                    cornerRadius={8}
                    background={{ fill: "#f3f4f6" }}
                  >
                    <Cell fill={ConfGaugeColor(result.confidence)} />
                  </RadialBar>
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-extrabold text-gray-900">{result.confidence}%</span>
                <span className="text-xs text-gray-500 font-medium">Confidence</span>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-3xl">{DISEASE_TYPE_EMOJI[result.disease_type] || "🔬"}</span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${DISEASE_TYPE_COLOR[result.disease_type] || "bg-gray-100 text-gray-700 border-gray-200"}`}>
                  {result.disease_type}
                </span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border flex items-center gap-1 ${SeverityColor(result.severity)}`}>
                  <SeverityIcon severity={result.severity} />
                  {result.severity}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {result.disease}
              </h1>
              <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1"><Leaf size={13} className="text-green-500" />{formData.crop}</span>
                <span>•</span>
                <span>🌤️ {formData.weather}</span>
                <span>•</span>
                <span>🌱 {formData.stage}</span>
                <span>•</span>
                <span>📊 {formData.area}% affected</span>
              </div>

              {/* Severity bar */}
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Severity Level</span>
                  <span className="font-semibold">{result.severity_pct}%</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      result.severity === "Severe" ? "bg-red-500" :
                      result.severity === "Moderate" ? "bg-amber-500" : "bg-green-500"
                    }`}
                    style={{ width: `${result.severity_pct}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ML Candidates */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="font-bold text-gray-900 text-base mb-4 flex items-center gap-2">
            🤖 ML Analysis — Top Candidates
          </h2>
          <div className="space-y-3">
            {result.candidates.map((c, i) => (
              <div key={c.name} className={`flex items-center gap-3 p-3 rounded-xl ${i === 0 ? "bg-green-50 border border-green-200" : "bg-gray-50"}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  i === 0 ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
                }`}>
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-900">{c.name}</span>
                    <span className={`text-xs font-bold ${i === 0 ? "text-green-600" : "text-gray-500"}`}>{c.score}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${i === 0 ? "bg-green-500" : "bg-gray-400"}`}
                      style={{ width: `${c.score}%` }}
                    />
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${DISEASE_TYPE_COLOR[c.type] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
                  {c.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Treatment / Prevention / Organic */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                <FlaskConical size={18} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Treatment Plan</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{result.treatment}</p>
          </div>

          <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center">
                <Shield size={18} className="text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Prevention Tips</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{result.prevention}</p>
          </div>

          <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                <Sprout size={18} className="text-emerald-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Organic Remedies</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{result.organic}</p>
          </div>
        </div>

        {/* Image if present */}
        {formData.image && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
            <h2 className="font-bold text-gray-900 text-base mb-3">📸 Scanned Image</h2>
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Uploaded plant"
              className="rounded-xl max-h-64 object-cover border border-gray-100"
            />
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate("diagnose")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold text-sm shadow-md shadow-green-200 hover:scale-105 transition-all"
          >
            <RotateCcw size={16} />
            Scan Another Plant
          </button>
          <button
            onClick={() => onNavigate("dashboard")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-all"
          >
            📊 View Dashboard
          </button>
          <button
            onClick={() => onNavigate("history")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-all"
          >
            <History size={16} />
            View All History
          </button>
        </div>
      </div>
    </div>
  );
}
