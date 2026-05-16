import { useState, useEffect } from "react";
import { Trash2, RefreshCcw, History as HistoryIcon, Leaf } from "lucide-react";
import type { HistoryEntry, Page } from "../types";

interface HistoryPageProps {
  onNavigate: (page: Page) => void;
}

export default function HistoryPage({ onNavigate }: HistoryPageProps) {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("pg_history") || "[]");
    setEntries(saved);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("pg_history");
    setEntries([]);
  };

  const deleteEntry = (index: number) => {
    const updated = entries.filter((_, i) => i !== index);
    setEntries(updated);
    localStorage.setItem("pg_history", JSON.stringify(updated));
  };

  const confColor = (conf: number) => {
    if (conf >= 85) return "text-green-600 bg-green-50";
    if (conf >= 70) return "text-amber-600 bg-amber-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <HistoryIcon size={24} className="text-green-600" />
              Scan History
            </h1>
            <p className="text-gray-500 text-sm mt-1">Your last {entries.length} plant diagnoses</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onNavigate("diagnose")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold shadow-sm hover:scale-105 transition-all"
            >
              <Leaf size={14} />
              New Scan
            </button>
            {entries.length > 0 && (
              <button
                onClick={clearHistory}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-200 text-red-600 text-sm font-semibold bg-white hover:bg-red-50 transition-all"
              >
                <Trash2 size={14} />
                Clear All
              </button>
            )}
          </div>
        </div>

        {entries.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-14 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">No scans yet</h3>
            <p className="text-gray-400 text-sm mb-6">Diagnose your first plant to see results here.</p>
            <button
              onClick={() => onNavigate("diagnose")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold"
            >
              <Leaf size={16} />
              Diagnose a Plant
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {entries.map((entry, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-2xl shrink-0">
                  {entry.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-gray-900 text-sm truncate">{entry.disease}</h3>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${confColor(entry.confidence)}`}>
                      {entry.confidence}% confidence
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-400 flex-wrap">
                    <span className="flex items-center gap-1"><Leaf size={11} className="text-green-400" />{entry.crop}</span>
                    <span>•</span>
                    <span>🕐 {entry.time}</span>
                  </div>
                </div>
                <button
                  onClick={() => deleteEntry(i)}
                  className="p-2 rounded-lg text-gray-300 hover:text-red-400 hover:bg-red-50 transition-colors shrink-0"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}

            {/* Summary */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-5 mt-4">
              <h3 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
                <RefreshCcw size={15} className="text-green-600" />
                Summary
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-extrabold text-green-600">{entries.length}</div>
                  <div className="text-xs text-gray-500">Total Scans</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-green-600">
                    {[...new Set(entries.map((e) => e.crop))].length}
                  </div>
                  <div className="text-xs text-gray-500">Crops Scanned</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-green-600">
                    {entries.length > 0 ? Math.round(entries.reduce((s, e) => s + e.confidence, 0) / entries.length) : 0}%
                  </div>
                  <div className="text-xs text-gray-500">Avg Confidence</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
