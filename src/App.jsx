import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from '@/shared/components/Navbar';
import { Footer } from '@/shared/components/Footer';
import { LandingPage } from '@/features/properties/pages/LandingPage';
import { SearchPage } from '@/features/properties/pages/SearchPage';
import { DetailPage } from '@/features/properties/pages/DetailPage';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { RegisterPage } from '@/features/auth/pages/RegisterPage';
import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#FFFBEB]">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/cari" element={<SearchPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
