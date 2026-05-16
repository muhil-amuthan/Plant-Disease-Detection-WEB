import { useState } from "react";
import { Leaf, Menu, X, Activity, History, LayoutDashboard, Info, Search } from "lucide-react";
import type { Page } from "../types";

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navLinks: { label: string; page: Page; icon: React.ReactNode }[] = [
  { label: "Home",      page: "home",      icon: <Leaf size={16} /> },
  { label: "Diagnose",  page: "diagnose",  icon: <Search size={16} /> },
  { label: "Dashboard", page: "dashboard", icon: <LayoutDashboard size={16} /> },
  { label: "History",   page: "history",   icon: <History size={16} /> },
  { label: "About",     page: "about",     icon: <Info size={16} /> },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-green-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-md shadow-green-200 group-hover:shadow-green-300 transition-shadow">
              <Leaf size={18} className="text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-gray-900 text-sm tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>PlantGuard</span>
              <span className="text-[10px] text-green-600 font-semibold tracking-widest uppercase">AI</span>
            </div>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => onNavigate(link.page)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPage === link.page
                    ? "bg-green-50 text-green-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <span className={currentPage === link.page ? "text-green-600" : "text-gray-400"}>{link.icon}</span>
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => onNavigate("diagnose")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold shadow-md shadow-green-200 hover:shadow-green-300 hover:scale-105 transition-all"
            >
              <Activity size={14} />
              Analyze Plant
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-green-50 px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => { onNavigate(link.page); setMobileOpen(false); }}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                currentPage === link.page
                  ? "bg-green-50 text-green-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span>{link.icon}</span>
              {link.label}
            </button>
          ))}
          <button
            onClick={() => { onNavigate("diagnose"); setMobileOpen(false); }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold mt-2"
          >
            <Activity size={14} />
            Analyze Plant
          </button>
        </div>
      )}
    </nav>
  );
}
