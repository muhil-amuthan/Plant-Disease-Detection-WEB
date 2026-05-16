import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Diagnose from "./pages/Diagnose";
import Result from "./pages/Result";
import HistoryPage from "./pages/History";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import type { DiagnosisResult, FormData, Page } from "./types";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);

  const handleResult = (res: DiagnosisResult, form: FormData) => {
    setResult(res);
    setFormData(form);
    setPage("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigate = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (page) {
      case "home":
        return <Home onNavigate={handleNavigate} />;
      case "diagnose":
        return <Diagnose onResult={handleResult} />;
      case "result":
        return result && formData
          ? <Result result={result} formData={formData} onNavigate={handleNavigate} />
          : <Diagnose onResult={handleResult} />;
      case "history":
        return <HistoryPage onNavigate={handleNavigate} />;
      case "dashboard":
        return <Dashboard onNavigate={handleNavigate} />;
      case "about":
        return <About onNavigate={handleNavigate} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar currentPage={page} onNavigate={handleNavigate} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
