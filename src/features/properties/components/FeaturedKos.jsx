import { Link } from "react-router-dom";
import { ArrowRight, Star, MapPin, Loader2 } from "lucide-react";
import { useFeaturedProperties } from '@/features/properties/hooks/useFeaturedProperties';

export const FeaturedKos = () => {
  const { kosData, loading, error } = useFeaturedProperties();

  if (loading) {
    return (
      <div className="py-16 bg-[#FFFBEB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-10 h-10 text-[#D97706] animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 bg-[#FFFBEB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-[#FFFBEB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 font-sans">
              Kos Terpopuler
            </h2>
            <p className="mt-2 text-gray-600 font-sans">
              Pilihan terbaik di berbagai kota besar di Indonesia.
            </p>
          </div>
          <Link
            to="/cari"
            className="hidden sm:flex items-center gap-2 text-[#D97706] font-bold hover:underline font-sans"
          >
            Lihat Semua <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {kosData.slice(0, 6).map((kos) => (
            <div
              key={kos.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-[#D97706]/10 hover:shadow-2xl transition-all group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={kos.image}
                  alt={kos.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#78350F] shadow-sm">
                  {kos.type}
                </div>
                <div className="absolute top-4 right-4 bg-[#D97706] text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
                  <Star size={12} fill="white" /> {kos.rating}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-1 text-[#D97706] text-sm font-bold mb-2">
                  <MapPin size={14} /> {kos.city}
                </div>
                <h3 className="text-xl font-bold text-[#78350F] mb-2 line-clamp-1">
                  {kos.name}
                </h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {kos.address}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {kos.facilities?.slice(0, 3).map((f, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-gray-600 text-[10px] px-2 py-1 rounded-md font-medium"
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                  <div>
                    <span className="text-lg font-bold text-[#D97706]">
                      Rp {kos.price?.toLocaleString("id-ID")}
                    </span>
                    <span className="text-gray-400 text-xs font-sans">
                      {" "}
                      /bln
                    </span>
                  </div>
                  <Link
                    to={`/detail/${kos.id}`}
                    className="text-xs font-bold text-[#78350F] hover:text-[#D97706] transition-colors flex items-center gap-1 font-sans"
                  >
                    Detail <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center sm:hidden">
          <Link
            to="/cari"
            className="w-full bg-white border-2 border-[#D97706] text-[#D97706] py-3 rounded-xl font-bold flex items-center justify-center gap-2"
          >
            Lihat Semua Kos <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};
