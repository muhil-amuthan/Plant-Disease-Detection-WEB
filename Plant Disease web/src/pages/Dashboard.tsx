import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { LayoutDashboard, Leaf, TrendingUp, Activity } from "lucide-react";
import type { HistoryEntry, Page } from "../types";

interface DashboardProps {
  onNavigate: (page: Page) => void;
}

const PIE_COLORS = ["#16a34a", "#f59e0b", "#8b5cf6", "#ef4444", "#06b6d4", "#f97316"];

export default function Dashboard({ onNavigate }: DashboardProps) {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const saved: HistoryEntry[] = JSON.parse(localStorage.getItem("pg_history") || "[]");
    setEntries(saved);
  }, []);

  // ── Derived analytics ──────────────────────────────────────────────────
  const totalScans = entries.length;
  const avgConf = totalScans
    ? Math.round(entries.reduce((s, e) => s + e.confidence, 0) / totalScans)
    : 0;
  const uniqueCrops = [...new Set(entries.map((e) => e.crop))].length;
  const highConfScans = entries.filter((e) => e.confidence >= 85).length;

  // Crop frequency
  const cropFreq: Record<string, number> = {};
  entries.forEach((e) => { cropFreq[e.crop] = (cropFreq[e.crop] || 0) + 1; });
  const cropData = Object.entries(cropFreq).map(([name, count]) => ({ name, count }));

  // Disease distribution
  const diseaseFreq: Record<string, number> = {};
  entries.forEach((e) => { diseaseFreq[e.disease] = (diseaseFreq[e.disease] || 0) + 1; });
  const diseaseData = Object.entries(diseaseFreq)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  // Confidence distribution
  const confBuckets = [
    { range: "40–59%", count: entries.filter((e) => e.confidence < 60).length },
    { range: "60–74%", count: entries.filter((e) => e.confidence >= 60 && e.confidence < 75).length },
    { range: "75–84%", count: entries.filter((e) => e.confidence >= 75 && e.confidence < 85).length },
    { range: "85–99%", count: entries.filter((e) => e.confidence >= 85).length },
  ];

  const STATS = [
    { label: "Total Scans", value: totalScans, icon: <Activity size={18} className="text-green-600" />, color: "from-green-50 to-emerald-50 border-green-100" },
    { label: "Avg Confidence", value: `${avgConf}%`, icon: <TrendingUp size={18} className="text-blue-600" />, color: "from-blue-50 to-cyan-50 border-blue-100" },
    { label: "Crops Analyzed", value: uniqueCrops, icon: <Leaf size={18} className="text-purple-600" />, color: "from-purple-50 to-violet-50 border-purple-100" },
    { label: "High Confidence", value: highConfScans, icon: <LayoutDashboard size={18} className="text-amber-600" />, color: "from-amber-50 to-yellow-50 border-amber-100" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-2 mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <LayoutDashboard size={24} className="text-green-600" />
            Analytics Dashboard
          </h1>
          <p className="text-gray-500 text-sm">Visual insights from your plant disease scans</p>
        </div>

        {totalScans === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-14 text-center">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">No data yet</h3>
            <p className="text-gray-400 text-sm mb-6">Run your first diagnosis to see analytics here.</p>
            <button
              onClick={() => onNavigate("diagnose")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold"
            >
              <Leaf size={16} />
              Diagnose a Plant
            </button>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {STATS.map((s) => (
                <div key={s.label} className={`bg-gradient-to-br ${s.color} border rounded-2xl p-5`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{s.label}</span>
                    {s.icon}
                  </div>
                  <div className="text-3xl font-extrabold text-gray-900">{s.value}</div>
                </div>
              ))}
            </div>

            {/* Charts row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
              {/* Crop frequency bar chart */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-bold text-gray-900 text-sm mb-4">Scans by Crop</h2>
                {cropData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={cropData} barSize={28}>
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                      <Tooltip
                        contentStyle={{ borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 12 }}
                      />
                      <Bar dataKey="count" name="Scans" radius={[6, 6, 0, 0]}>
                        {cropData.map((_, i) => (
                          <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-52 flex items-center justify-center text-gray-400 text-sm">No data</div>
                )}
              </div>

              {/* Disease distribution pie */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-bold text-gray-900 text-sm mb-4">Disease Distribution</h2>
                {diseaseData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie
                        data={diseaseData}
                        cx="50%" cy="50%"
                        innerRadius={50} outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }: { name?: string; percent?: number }) => `${(name ?? "").split(" ")[0]} ${((percent ?? 0) * 100).toFixed(0)}%`}
                        labelLine={false}
                        fontSize={10}
                      >
                        {diseaseData.map((_, i) => (
                          <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 12 }} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-52 flex items-center justify-center text-gray-400 text-sm">No data</div>
                )}
              </div>
            </div>

            {/* Confidence distribution */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
              <h2 className="font-bold text-gray-900 text-sm mb-4">Confidence Distribution</h2>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={confBuckets} barSize={40}>
                  <XAxis dataKey="range" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                  <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 12 }} />
                  <Bar dataKey="count" name="Scans" radius={[6, 6, 0, 0]}>
                    {confBuckets.map((_, i) => (
                      <Cell key={i} fill={["#ef4444", "#f59e0b", "#3b82f6", "#16a34a"][i]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Recent scans table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-gray-900 text-sm mb-4">Recent Scans</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left text-xs text-gray-400 font-semibold pb-3 pr-4">Disease</th>
                      <th className="text-left text-xs text-gray-400 font-semibold pb-3 pr-4">Crop</th>
                      <th className="text-left text-xs text-gray-400 font-semibold pb-3 pr-4">Confidence</th>
                      <th className="text-left text-xs text-gray-400 font-semibold pb-3">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.slice(0, 8).map((e, i) => (
                      <tr key={i} className="border-b border-gray-50 last:border-0">
                        <td className="py-2.5 pr-4 font-medium text-gray-900 flex items-center gap-2">
                          <span>{e.emoji}</span> {e.disease}
                        </td>
                        <td className="py-2.5 pr-4 text-gray-500">{e.crop}</td>
                        <td className="py-2.5 pr-4">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            e.confidence >= 85 ? "bg-green-50 text-green-600" :
                            e.confidence >= 70 ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"
                          }`}>
                            {e.confidence}%
                          </span>
                        </td>
                        <td className="py-2.5 text-gray-400 text-xs">{e.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
