import { Leaf, Zap, Shield, Globe, ChevronRight, Star, CheckCircle, Microscope, FlaskConical, BarChart3 } from "lucide-react";
import type { Page } from "../types";

interface HomeProps {
  onNavigate: (page: Page) => void;
}

const STATS = [
  { value: "8+", label: "Crop Types", icon: "🌾" },
  { value: "30+", label: "Diseases Detected", icon: "🔬" },
  { value: "95%", label: "Detection Accuracy", icon: "🎯" },
  { value: "2s", label: "Analysis Speed", icon: "⚡" },
];

const FEATURES = [
  {
    icon: <Microscope size={22} className="text-green-600" />,
    title: "AI-Powered Diagnosis",
    desc: "Uses Claude AI combined with ML pre-scoring to deliver expert-level plant disease identification from a single photo.",
    color: "from-green-50 to-emerald-50 border-green-100",
  },
  {
    icon: <FlaskConical size={22} className="text-blue-600" />,
    title: "Treatment Recommendations",
    desc: "Get detailed, actionable treatment plans including chemical, biological, and organic remedies tailored to your crop.",
    color: "from-blue-50 to-cyan-50 border-blue-100",
  },
  {
    icon: <BarChart3 size={22} className="text-purple-600" />,
    title: "Disease Analytics",
    desc: "Track your scan history and visualize disease patterns across your farm with interactive charts and dashboards.",
    color: "from-purple-50 to-violet-50 border-purple-100",
  },
  {
    icon: <Shield size={22} className="text-orange-600" />,
    title: "Prevention Tips",
    desc: "Proactive crop protection with evidence-based prevention strategies to stop diseases before they spread.",
    color: "from-orange-50 to-amber-50 border-orange-100",
  },
  {
    icon: <Globe size={22} className="text-teal-600" />,
    title: "Bilingual Support",
    desc: "Results available in English and Tamil, making the tool accessible to a wider farming community.",
    color: "from-teal-50 to-cyan-50 border-teal-100",
  },
  {
    icon: <Zap size={22} className="text-yellow-600" />,
    title: "Instant Results",
    desc: "Get comprehensive diagnosis within seconds — no waiting, no lab tests, no expertise required.",
    color: "from-yellow-50 to-amber-50 border-yellow-100",
  },
];

const CROPS = [
  { name: "Tomato", emoji: "🍅", diseases: 5 },
  { name: "Potato", emoji: "🥔", diseases: 4 },
  { name: "Pepper", emoji: "🌶️", diseases: 3 },
  { name: "Rice",   emoji: "🌾", diseases: 4 },
  { name: "Maize",  emoji: "🌽", diseases: 4 },
  { name: "Cotton", emoji: "🌿", diseases: 3 },
  { name: "Wheat",  emoji: "🌾", diseases: 3 },
  { name: "Banana", emoji: "🍌", diseases: 3 },
];

const TESTIMONIALS = [
  { name: "Ravi Kumar", role: "Tomato Farmer, Tamil Nadu", rating: 5, text: "PlantGuard saved my entire crop! Detected late blight early and gave me the exact treatment I needed. My yield improved by 40%." },
  { name: "Suresh Patel", role: "Rice Grower, Punjab", rating: 5, text: "The Tamil language option is a game changer for me. I can now understand all recommendations clearly without any language barrier." },
  { name: "Anita Singh", role: "Cotton Farmer, Maharashtra", rating: 5, text: "Within 2 seconds of uploading my plant photo I had a full diagnosis. The organic remedy suggestions are especially helpful." },
];

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-900 via-emerald-800 to-green-700 text-white">
        {/* Background image overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        />
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400 rounded-full blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-300 rounded-full blur-3xl opacity-10 translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium text-green-100 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              AI-Powered Plant Disease Detection
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Protect Your Crops with
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-200">
                AI Diagnosis
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-green-100 leading-relaxed mb-8 max-w-xl">
              Upload a photo of your plant, describe the symptoms, and get instant expert-level diagnosis, treatment plans, and prevention tips — powered by Claude AI.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate("diagnose")}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-green-800 font-bold text-base shadow-xl hover:shadow-green-900/30 hover:scale-105 transition-all"
              >
                <Leaf size={18} />
                Diagnose Now
                <ChevronRight size={16} />
              </button>
              <button
                onClick={() => onNavigate("about")}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl border border-white/30 bg-white/10 backdrop-blur-sm text-white font-semibold text-base hover:bg-white/20 transition-all"
              >
                Learn More
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-5 mt-10 text-sm text-green-200">
              {["No signup required", "Free to use", "Instant results", "Open source"].map((badge) => (
                <span key={badge} className="flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-green-400" />
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L48 52.5C96 45 192 30 288 27.5C384 25 480 35 576 40C672 45 768 45 864 40C960 35 1056 25 1152 22.5C1248 20 1344 25 1392 27.5L1440 30V60H1392C1344 60 1248 60 1152 60C1056 60 960 60 864 60C768 60 672 60 576 60C480 60 384 60 288 60C192 60 96 60 48 60H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center p-5 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                <div className="text-3xl mb-1">{stat.icon}</div>
                <div className="text-3xl font-extrabold text-green-700 mb-0.5">{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-green-600 tracking-widest uppercase">Features</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Everything You Need to Protect Your Farm
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              PlantGuard AI combines cutting-edge artificial intelligence with agronomic expertise to deliver comprehensive plant health management.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className={`p-6 rounded-2xl border bg-gradient-to-br ${f.color} hover:shadow-md transition-shadow`}>
                <div className="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Crops ─────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-green-600 tracking-widest uppercase">Supported Crops</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              8 Major Crops Supported
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Our AI model is trained on comprehensive datasets covering the most important food and cash crops worldwide.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CROPS.map((crop) => (
              <button
                key={crop.name}
                onClick={() => onNavigate("diagnose")}
                className="p-5 rounded-2xl border border-gray-100 bg-white hover:border-green-200 hover:bg-green-50 hover:shadow-md transition-all text-center group"
              >
                <div className="text-4xl mb-2">{crop.emoji}</div>
                <div className="font-bold text-gray-800 text-sm">{crop.name}</div>
                <div className="text-xs text-gray-400 mt-0.5">{crop.diseases} diseases</div>
                <div className="text-xs text-green-600 font-medium mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                  Diagnose <ChevronRight size={10} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-green-900 to-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-green-300 tracking-widest uppercase">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2 mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Diagnosis in 3 Simple Steps
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Upload Photo", desc: "Take a clear photo of your affected plant leaf, stem, or fruit and upload it to PlantGuard AI.", icon: "📸" },
              { step: "02", title: "Describe Symptoms", desc: "Fill in details about visible symptoms, weather conditions, crop growth stage, and affected area.", icon: "📝" },
              { step: "03", title: "Get Diagnosis", desc: "Receive instant AI-powered diagnosis with treatment plans, prevention tips, and organic remedies.", icon: "🎯" },
            ].map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-3xl mx-auto mb-4">
                  {step.icon}
                </div>
                <div className="text-green-400 font-bold text-xs tracking-widest mb-2">STEP {step.step}</div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-green-200 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate("diagnose")}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-green-800 font-bold text-base shadow-xl hover:scale-105 transition-all"
            >
              <Leaf size={18} />
              Start Free Diagnosis
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-green-600 tracking-widest uppercase">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Trusted by Farmers
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-10 shadow-xl shadow-green-200">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Ready to Protect Your Crops?
            </h2>
            <p className="text-green-100 mb-6 max-w-md mx-auto">
              Join thousands of farmers using PlantGuard AI to detect and treat plant diseases early.
            </p>
            <button
              onClick={() => onNavigate("diagnose")}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white text-green-700 font-bold text-base hover:scale-105 transition-all shadow-lg"
            >
              <Leaf size={18} />
              Diagnose Your Plant Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
