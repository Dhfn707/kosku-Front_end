import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Star, ArrowRight, Square } from "lucide-react";
import { DUMMY_KOS } from "../data";
import MapComponent from "./MapComponent";

export const HighlightSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % DUMMY_KOS.length);
    }, 5000); // Ganti setiap 5 detik
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="py-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 font-sans">
            Rekomendasi Terkini
          </h2>
          <p className="text-gray-600 font-sans pt-1">
            Lihat lebih dekat properti pilihan kami secara bergantian.
          </p>
        </div>

        <div className="relative bg-[#FFFBEB] rounded-3xl overflow-hidden border border-[#D97706]/10 shadow-xl">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {DUMMY_KOS.map((kos) => (
              <div key={kos.id} className="w-full flex-shrink-0 p-6 lg:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* Image Side */}
                  <div className="relative h-64 lg:h-96 rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={kos.image}
                      alt={kos.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sm font-bold text-[#78350F] shadow-md">
                      {kos.type}
                    </div>
                  </div>

                  {/* Info Side */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 text-[#D97706] font-bold mb-2">
                      <MapPin size={20} /> {kos.city}
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-black text-[#78350F] mb-4">
                      {kos.name}
                    </h3>

                    {/* OpenStreetMap Search Preview */}
                    <div className="w-full h-32 rounded-xl overflow-hidden mb-6 border border-[#D97706]/20 relative group-hover:border-[#D97706]/40 transition-colors">
                      <MapComponent 
                        lat={kos.lat} 
                        lng={kos.lng} 
                        address={kos.name} 
                      />
                      <div className="absolute inset-0 bg-[#78350F]/5 pointer-events-none"></div>
                    </div>

                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                      {kos.address}
                    </p>

                    <div className="flex gap-6 mb-8">
                      <div className="flex flex-col items-center p-3 bg-white rounded-xl border border-[#D97706]/10 w-24">
                        <Star
                          className="text-yellow-500 mb-1"
                          fill="currentColor"
                        />
                        <span className="font-bold text-[#78350F]">
                          {kos.rating}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          Rating
                        </span>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-white rounded-xl border border-[#D97706]/10 w-24">
                        <Square className="text-[#D97706] mb-1" />
                        <span className="font-bold text-[#78350F]">
                          {kos.sqft} m²
                        </span>
                        <span className="text-[10px] text-gray-400">Luas</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-[#D97706]/10">
                      <div>
                        <p className="text-gray-400 text-sm">Mulai Dari</p>
                        <span className="text-2xl font-black text-[#D97706]">
                          Rp {kos.price.toLocaleString("id-ID")}
                        </span>
                        <span className="text-gray-500 text-sm"> /bln</span>
                      </div>
                      <Link
                        to={`/detail/${kos.id}`}
                        className="bg-[#D97706] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#78350F] transition-all transform hover:scale-105"
                      >
                        Lihat Detail <ArrowRight size={20} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Indicator dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {DUMMY_KOS.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all ${currentIndex === idx ? "w-8 bg-[#D97706]" : "w-2 bg-[#D97706]/20"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
