import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Star,
  ArrowRight,
  Search,
  SlidersHorizontal,
  X,
  Loader2,
} from "lucide-react";
import { useProperties } from "../hooks/useProperties";

export const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("Semua");
  const [selectedType, setSelectedType] = useState("Semua");
  const [selectedFacility, setSelectedFacility] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const { properties, metadata, isLoading, error } = useProperties(
    searchTerm,
    selectedCity,
    selectedType,
    selectedFacility
  );

  const types = ["Semua", "Putra", "Putri", "Campur"];

  const toggleFacility = (facility) => {
    setSelectedFacility((prev) =>
      prev.includes(facility)
        ? prev.filter((f) => f !== facility)
        : [...prev, facility],
    );
  };

  const clearFilters = () => {
    setSelectedCity("Semua");
    setSelectedType("Semua");
    setSelectedFacility([]);
    setSearchTerm("");
  };

  return (
    <div className="bg-[#FFFBEB] min-h-screen">
      <div className="bg-white border-b border-[#D97706]/10 pt-8 pb-6 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Cari nama kos atau alamat..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D97706]/50 focus:border-[#D97706] transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all border ${
                showFilters ||
                selectedFacility.length > 0 ||
                selectedCity !== "Semua" ||
                selectedType !== "Semua"
                  ? "bg-[#78350F] text-white border-[#78350F]"
                  : "bg-white text-[#78350F] border-gray-200 hover:border-[#D97706]"
              }`}
            >
              <SlidersHorizontal size={20} />
              Filter{" "}
              {(selectedFacility.length > 0 ||
                selectedCity !== "Semua" ||
                selectedType !== "Semua") &&
                `(${(selectedCity !== "Semua" ? 1 : 0) + (selectedType !== "Semua" ? 1 : 0) + selectedFacility.length})`}
            </button>
          </div>

          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <label className="block text-sm font-bold text-[#78350F] mb-3 uppercase tracking-wider">
                  Kota
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Semua", ...metadata.cities].map((city) => (
                    <button
                      key={city}
                      onClick={() => setSelectedCity(city)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        selectedCity === city
                          ? "bg-[#D97706] text-white shadow-sm"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#78350F] mb-3 uppercase tracking-wider">
                  Tipe Kos
                </label>
                <div className="flex flex-wrap gap-2">
                  {types.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        selectedType === type
                          ? "bg-[#78350F] text-white shadow-sm"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#78350F] mb-3 uppercase tracking-wider">
                  Fasilitas
                </label>
                <div className="flex flex-wrap gap-2">
                  {metadata.facilities.map((facility) => (
                    <button
                      key={facility}
                      onClick={() => toggleFacility(facility)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                        selectedFacility.includes(facility)
                          ? "bg-green-600 text-white shadow-sm"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {facility}
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-3 flex justify-end gap-3 pt-4 border-t border-gray-50">
                <button
                  onClick={clearFilters}
                  className="text-sm font-bold text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1"
                >
                  <X size={16} /> Reset Filter
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-8 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-full">
                <X size={20} className="text-red-600" />
              </div>
              <p className="font-medium">{error}</p>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="text-sm font-bold underline hover:text-red-800"
            >
              Coba Lagi
            </button>
          </div>
        )}

        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-black text-[#78350F]">
              {properties.length} Kos Ditemukan
            </h2>
            <p className="text-gray-500 font-sans">
              Menampilkan properti terbaik untuk Anda
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-[#D97706] animate-spin mb-4" />
            <p className="text-[#78350F] font-bold">Mencari kos terbaik...</p>
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((kos) => (
              <div
                key={kos.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#D97706]/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={kos.image}
                    alt={kos.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#78350F] shadow-sm">
                    {kos.type}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm flex items-center gap-1 text-[#78350F]">
                    <Star
                      size={14}
                      className="text-yellow-500"
                      fill="currentColor"
                    />{" "}
                    {kos.rating}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-[#D97706] text-xs font-bold mb-3 uppercase tracking-widest">
                    <MapPin size={14} /> {kos.city}
                  </div>
                  <h3 className="text-xl font-bold text-[#78350F] mb-3 group-hover:text-[#D97706] transition-colors line-clamp-1">
                    {kos.name}
                  </h3>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {kos.facilities.slice(0, 3).map((f, idx) => (
                      <span
                        key={idx}
                        className="bg-[#FFFBEB] text-[#78350F]/70 text-[10px] px-2.5 py-1 rounded-lg border border-[#D97706]/10 font-bold"
                      >
                        {f}
                      </span>
                    ))}
                    {kos.facilities.length > 3 && (
                      <span className="text-[10px] text-gray-400 self-center ml-1">
                        +{kos.facilities.length - 3} lainnya
                      </span>
                    )}
                  </div>

                  <div className="pt-5 border-t border-gray-50 flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mb-0.5">
                        Mulai dari
                      </p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-black text-[#D97706]">
                          Rp {kos.price.toLocaleString("id-ID")}
                        </span>
                        <span className="text-gray-400 text-xs">/bln</span>
                      </div>
                    </div>
                    <Link
                      to={`/detail/${kos.id}`}
                      className="h-10 w-10 bg-[#FFFBEB] text-[#D97706] rounded-xl flex items-center justify-center hover:bg-[#D97706] hover:text-white transition-all shadow-sm border border-[#D97706]/10"
                    >
                      <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
            <h3 className="text-xl font-bold text-[#78350F] mb-2">
              Yah, Kos Tidak Ditemukan
            </h3>
            <button
              onClick={clearFilters}
              className="bg-[#D97706] text-white px-8 py-3 rounded-xl font-bold mt-4 shadow-lg hover:bg-[#78350F]"
            >
              Reset Semua Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
