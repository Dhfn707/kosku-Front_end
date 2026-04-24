import { Link } from "react-router-dom";
import { Search, Info, User, Home } from "lucide-react";


export const Navbar = () => {
  return (
    <nav className="bg-white border-b border-[#D97706]/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-[#D97706] tracking-tight">
              Kos<span className="text-[#78350F]">Ku</span>
            </span>
          </Link>
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-[#D97706] font-medium transition-colors font-sans">
                <Home size={18} />Beranda
            </Link>
            <Link
              to="/cari"
              className="flex items-center gap-2 text-gray-600 hover:text-[#D97706] font-medium transition-colors font-sans"
            >
              <Search size={18} /> Cari Kos
            </Link>
            <a
              href="#"
              className="flex items-center gap-2 text-gray-600 hover:text-[#D97706] font-medium transition-colors font-sans"
            >
              <Info size={18} /> Tentang Kami
            </a>
            <button className="flex items-center gap-2 bg-[#D97706] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#78350F] transition-all shadow-md font-sans">
              <User size={18} /> Masuk
            </button>
          </div>
          <div className="md:hidden text-[#78350F]">
            <Link to="/cari" className="mr-4 inline-block">
              <Search size={24} />
            </Link>
            <button className="focus:outline-none">
              <svg
                className="h-6 w-6 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
