import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Program from "@/pages/Program";
import Transformations from "@/pages/Transformations";
import Partner from "@/pages/Partner";
import CsrPartners from "@/pages/CsrPartners";
import About from "@/pages/About";
import Centers from "@/pages/Centers";
import Contact from "@/pages/Contact";
import Internships from "@/pages/Internships";
import Admin from "@/pages/Admin";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
};

function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    window.__lenis = lenis;
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);


  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/program" element={<Program />} />
          <Route path="/transformations" element={<Transformations />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/csr-partners" element={<CsrPartners />} />
          <Route path="/about" element={<About />} />
          <Route path="/community-centers" element={<Centers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
        <Toaster position="top-center" richColors />
      </BrowserRouter>
    </div>
  );
}

export default App;
