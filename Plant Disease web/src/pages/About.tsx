import { Leaf, Zap, Globe, Shield, BookOpen, FlaskConical, ChevronRight } from "lucide-react";
import type { Page } from "../types";

interface AboutProps {
  onNavigate: (page: Page) => void;
}

const TECH_STACK = [
  { name: "Claude AI (Anthropic)", role: "Natural language plant disease diagnosis & expert recommendations", icon: "🤖" },
  { name: "ML Pre-Scoring Engine", role: "Rule-based scoring using symptom keywords + environmental factors", icon: "⚙️" },
  { name: "Python Flask", role: "Lightweight REST API backend serving predictions", icon: "🐍" },
  { name: "React + TypeScript", role: "Modern, type-safe frontend user interface", icon: "⚛️" },
  { name: "Tailwind CSS", role: "Utility-first styling for rapid, responsive design", icon: "🎨" },
  { name: "Recharts", role: "Data visualization for analytics dashboard", icon: "📊" },
];

const HOW_IT_WORKS = [
  {
    title: "ML Pre-Scoring",
    icon: "⚙️",
    desc: "A rule-based scoring engine analyzes symptom keywords, weather conditions, growth stage, and spread pattern to pre-rank candidate diseases for each crop. This provides a structured starting point for the AI.",
  },
  {
    title: "Image Analysis",
    icon: "📸",
    desc: "If a photo is uploaded, Claude's vision model examines visual cues like lesion shape, color, pattern, and distribution alongside the textual symptom data for comprehensive diagnosis.",
  },
  {
    title: "Expert AI Diagnosis",
    icon: "🤖",
    desc: "Claude AI acts as an expert plant pathologist, combining the ML pre-scores with all input data to produce the final diagnosis, severity assessment, and complete treatment recommendations.",
  },
  {
    title: "Structured Output",
    icon: "📋",
    desc: "Results are returned as structured JSON including disease name, confidence score, severity level, treatment plan, prevention strategies, and organic remedy options.",
  },
];

const CROPS_INFO = [
  { crop: "Tomato",  emoji: "🍅", diseases: ["Early Blight","Late Blight","Leaf Curl Virus","Bacterial Wilt","Septoria Leaf Spot"] },
  { crop: "Potato",  emoji: "🥔", diseases: ["Late Blight","Early Blight","Black Scurf","Common Scab"] },
  { crop: "Pepper",  emoji: "🌶️", diseases: ["Anthracnose","Bacterial Leaf Spot","Phytophthora Blight"] },
  { crop: "Rice",    emoji: "🌾", diseases: ["Rice Blast","Brown Spot","Bacterial Leaf Blight","Sheath Blight"] },
  { crop: "Maize",   emoji: "🌽", diseases: ["Northern Corn Leaf Blight","Common Rust","Grey Leaf Spot","Maize Streak Virus"] },
  { crop: "Cotton",  emoji: "🌿", diseases: ["Cotton Leaf Curl","Alternaria Leaf Spot","Bacterial Blight"] },
  { crop: "Wheat",   emoji: "🌾", diseases: ["Wheat Rust","Powdery Mildew","Septoria Blotch"] },
  { crop: "Banana",  emoji: "🍌", diseases: ["Panama Wilt","Sigatoka Leaf Spot","Bunchy Top Virus"] },
];

export default function About({ onNavigate }: AboutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-green-900 to-emerald-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mx-auto mb-5">
            <Leaf size={28} className="text-green-300" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            About PlantGuard AI
          </h1>
          <p className="text-green-200 max-w-xl mx-auto leading-relaxed">
            An open-source, AI-powered plant disease detection system designed to empower farmers, agronomists, and researchers with instant, expert-level crop diagnostics.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">
        {/* Mission */}
        <section>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h2 className="text-xl font-extrabold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen size={20} className="text-green-600" />
              Mission
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              PlantGuard AI was built to bridge the gap between advanced AI technology and everyday farmers. Plant diseases cause an estimated <strong>20–40% of global crop loss</strong> each year, costing billions in agricultural productivity.
            </p>
            <p className="text-gray-600 leading-relaxed">
              By combining Claude's multimodal AI capabilities with a structured ML pre-scoring engine, PlantGuard delivers fast, accurate, and actionable plant disease diagnoses — without requiring any agricultural expertise from the user.
            </p>
          </div>
        </section>

        {/* How it Works */}
        <section>
          <h2 className="text-xl font-extrabold text-gray-900 mb-5 flex items-center gap-2">
            <Zap size={20} className="text-green-600" />
            How the AI Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-xl">{step.icon}</div>
                  <div>
                    <span className="text-xs font-bold text-green-600 tracking-widest">STEP {String(i+1).padStart(2,"0")}</span>
                    <h3 className="font-bold text-gray-900 text-sm">{step.title}</h3>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section>
          <h2 className="text-xl font-extrabold text-gray-900 mb-5 flex items-center gap-2">
            <FlaskConical size={20} className="text-green-600" />
            Technology Stack
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TECH_STACK.map((t) => (
              <div key={t.name} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <div className="text-2xl mb-2">{t.icon}</div>
                <div className="font-bold text-gray-900 text-sm mb-1">{t.name}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{t.role}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Supported Diseases */}
        <section>
          <h2 className="text-xl font-extrabold text-gray-900 mb-5 flex items-center gap-2">
            <Shield size={20} className="text-green-600" />
            Supported Crops & Diseases
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CROPS_INFO.map((c) => (
              <div key={c.crop} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{c.emoji}</span>
                  <h3 className="font-bold text-gray-900">{c.crop}</h3>
                  <span className="text-xs text-gray-400 ml-auto">{c.diseases.length} diseases</span>
                </div>
                <ul className="space-y-1">
                  {c.diseases.map((d) => (
                    <li key={d} className="text-xs text-gray-600 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full shrink-0" />
                      {d}
                    </li>
                  ))}
                  <li className="text-xs text-green-600 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full shrink-0" />
                    Healthy (no disease)
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Bilingual */}
        <section>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h2 className="text-xl font-extrabold text-gray-900 mb-3 flex items-center gap-2">
              <Globe size={20} className="text-green-600" />
              Bilingual Support
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              PlantGuard AI supports results in <strong>English</strong> and <strong>Tamil (தமிழ்)</strong>, making it accessible to a broader farming community across Tamil Nadu and other Tamil-speaking regions. More languages can be added easily via Claude's language capabilities.
            </p>
          </div>
        </section>

        {/* Open Source */}
        <section>
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-xl font-extrabold mb-3">Open Source Project</h2>
            <p className="text-green-100 max-w-md mx-auto mb-6 leading-relaxed">
              PlantGuard AI is fully open-source. The complete source code, model, and documentation are available on GitHub for anyone to use, modify, and improve.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-green-700 font-bold text-sm hover:scale-105 transition-all shadow-md"
              >
                View on GitHub
              </a>
              <button
                onClick={() => onNavigate("diagnose")}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/20 border border-white/30 text-white font-bold text-sm hover:bg-white/30 transition-all"
              >
                <Leaf size={16} />
                Try It Now
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
