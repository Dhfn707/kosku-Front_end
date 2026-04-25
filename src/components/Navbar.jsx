import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Info, User, Home, Menu, X, LogOut } from "lucide-react";
import useAuth from "../hooks/useAuth";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-[#D97706]/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-[#D97706] tracking-tight">
              Kos<span className="text-[#78350F]">Ku</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-600 hover:text-[#D97706] font-medium transition-colors font-sans"
            >
              <Home size={18} />
              Beranda
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
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-700 font-medium font-sans flex items-center gap-2">
                  <User size={18} /> {user.name}
                </span>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-all shadow-md font-sans"
                >
                  <LogOut size={18} /> Keluar
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-2 bg-[#D97706] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#78350F] transition-all shadow-md font-sans">
                <User size={18} /> Masuk
              </Link>
            )}
          </div>

          {/* Mobile Right Icons */}
          <div className="md:hidden flex items-center gap-4 text-[#78350F]">
            <Link to="/cari">
              <Search size={22} />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none p-1"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-4 text-gray-700 hover:bg-[#FFFBEB] hover:text-[#D97706] rounded-xl font-bold transition-all"
            >
              <Home size={20} /> Beranda
            </Link>
            <Link
              to="/cari"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-4 text-gray-700 hover:bg-[#FFFBEB] hover:text-[#D97706] rounded-xl font-bold transition-all"
            >
              <Search size={20} /> Cari Kos
            </Link>
            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-4 text-gray-700 hover:bg-[#FFFBEB] hover:text-[#D97706] rounded-xl font-bold transition-all"
            >
              <Info size={20} /> Tentang Kami
            </a>
            <div className="pt-4 px-4">
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 px-4 py-3 text-gray-700 font-bold">
                    <User size={20} /> {user.name}
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-4 rounded-xl font-bold shadow-lg active:scale-95 transition-all"
                  >
                    <LogOut size={20} /> Keluar
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-[#D97706] text-white py-4 rounded-xl font-bold shadow-lg active:scale-95 transition-all"
                >
                  <User size={20} /> Masuk / Daftar
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
