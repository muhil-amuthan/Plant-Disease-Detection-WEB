import { Leaf, Mail, Globe } from "lucide-react";
import type { Page } from "../types";

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <Leaf size={18} className="text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-white text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>PlantGuard AI</span>
                <span className="text-[10px] text-green-400 font-semibold tracking-widest uppercase">Disease Detection</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              AI-powered plant disease detection system supporting 8 major crops and 30+ diseases.
              Empowering farmers with instant, accurate diagnostics.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                <span className="text-gray-400 text-xs font-bold">GH</span>
              </a>
              <a href="mailto:contact@plantguard.ai" className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Mail size={15} className="text-gray-400" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Globe size={15} className="text-gray-400" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Home", page: "home" as Page },
                { label: "Diagnose Plant", page: "diagnose" as Page },
                { label: "Dashboard", page: "dashboard" as Page },
                { label: "Scan History", page: "history" as Page },
                { label: "About", page: "about" as Page },
              ].map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-sm text-gray-400 hover:text-green-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Supported Crops */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Supported Crops</h4>
            <ul className="space-y-2">
              {["Tomato", "Potato", "Pepper", "Rice", "Maize", "Cotton", "Wheat", "Banana"].map((crop) => (
                <li key={crop} className="text-sm text-gray-400">🌱 {crop}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} PlantGuard AI. Open-source plant disease detection system.
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <span>Built with</span>
            <span className="text-green-500">♥</span>
            <span>for farmers worldwide</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
