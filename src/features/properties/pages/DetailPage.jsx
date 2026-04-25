import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  MapPin,
  Star,
  Wind,
  Wifi,
  Square,
  Calendar,
  Zap,
  MessageCircle,
  Phone,
  Loader2,
} from "lucide-react";
import { usePropertyDetail } from '@/features/properties/hooks/usePropertyDetail';
import MapComponent from '@/features/map/components/MapComponent';

export const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { kos, loading, error } = usePropertyDetail(id);
  const [activeImage, setActiveImage] = useState(0);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFBEB]">
        <Loader2 className="w-12 h-12 text-[#D97706] animate-spin mb-4" />
        <p className="text-[#78350F] font-medium text-lg">Memuat detail properti...</p>
      </div>
    );
  }

  if (error || !kos) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFBEB] p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-red-100 text-center max-w-md">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="text-red-500 w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-[#78350F] mb-2">Properti Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-6">
            {error || "Maaf, properti yang Anda cari tidak tersedia atau telah dihapus."}
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-[#78350F] text-white py-3 rounded-xl font-bold hover:bg-[#5d290b] transition-colors"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  const images = kos.images && kos.images.length > 0 ? kos.images : [kos.image];
  const whatsappMessage = encodeURIComponent(
    `Halo ${kos.owner?.name || "Pemilik"}, saya tertarik dengan kos "${kos.name}" yang saya lihat di Kosku. Apakah masih tersedia?`
  );
  const whatsappUrl = `https://wa.me/${kos.owner?.phone?.replace(/\D/g, "") || "628123456789"}?text=${whatsappMessage}`;

  return (
    <div className="bg-[#FFFBEB] min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#78350F] font-bold mb-6 hover:translate-x-[-4px] transition-transform"
        >
          <ChevronLeft /> Kembali
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Photos & Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <div className="h-96 w-full rounded-2xl overflow-hidden shadow-xl border border-[#D97706]/10 relative">
                <img
                  src={images[activeImage]}
                  alt={kos.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`relative flex-shrink-0 w-24 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImage === idx ? "border-[#D97706] scale-105" : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt={`${kos.name} ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#D97706]/10 text-left">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-extrabold text-[#78350F] mb-2">
                    {kos.name}
                  </h1>
                  <p className="flex items-center gap-1 text-gray-500">
                    <MapPin size={18} /> {kos.address}
                  </p>
                </div>
                <div className="bg-[#FFFBEB] border border-[#D97706]/20 p-2 rounded-xl text-center min-w-[100px]">
                  <p className="text-xs text-gray-500 uppercase font-bold">
                    Rating
                  </p>
                  <p className="text-2xl font-black text-[#D97706] flex items-center justify-center gap-1">
                    <Star fill="#D97706" /> {kos.rating || "4.5"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-gray-100 my-6">
                <div className="flex flex-col items-center p-3 bg-orange-50 rounded-xl">
                  <Wind className="text-[#D97706] mb-1" />
                  <span className="text-[10px] text-gray-500 uppercase font-bold">
                    Tipe
                  </span>
                  <span className="text-xs font-bold text-[#78350F]">
                    {kos.type || "Campur"}
                  </span>
                </div>
                <div className="flex flex-col items-center p-3 bg-orange-50 rounded-xl">
                  <Wifi className="text-[#D97706] mb-1" />
                  <span className="text-[10px] text-gray-500 uppercase font-bold">
                    Internet
                  </span>
                  <span className="text-xs font-bold text-[#78350F]">
                    WiFi Gratis
                  </span>
                </div>
                <div className="flex flex-col items-center p-3 bg-orange-50 rounded-xl">
                  <Square className="text-[#D97706] mb-1" />
                  <span className="text-[10px] text-gray-500 uppercase font-bold">
                    Ukuran
                  </span>
                  <span className="text-xs font-bold text-[#78350F]">
                    {kos.sqft ? `${kos.sqft} m²` : "3x4 Meter"}
                  </span>
                </div>
                <div className="flex flex-col items-center p-3 bg-orange-50 rounded-xl">
                  <Calendar className="text-[#D97706] mb-1" />
                  <span className="text-[10px] text-gray-500 uppercase font-bold">
                    Sistem
                  </span>
                  <span className="text-xs font-bold text-[#78350F]">
                    Bulanan
                  </span>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#78350F] mb-3">Deskripsi</h3>
                <p className="text-gray-600 leading-relaxed">
                  {kos.description || "Tidak ada deskripsi untuk properti ini."}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#78350F] mb-4">
                  Semua Fasilitas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {kos.facilities && kos.facilities.length > 0 ? (
                    kos.facilities.map((f, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 font-medium"
                      >
                        {f}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">Fasilitas tidak disebutkan</p>
                  )}
                </div>
              </div>

              {/* Lokasi Map Section */}
              <div className="mt-10 pt-10 border-t border-gray-100">
                <h3 className="text-xl font-bold text-[#78350F] mb-4 flex items-center gap-2">
                  <MapPin className="text-[#D97706]" /> Lokasi Properti
                </h3>
                <p className="text-gray-600 mb-6">{kos.address}</p>
                <div className="w-full h-80 rounded-2xl overflow-hidden shadow-inner border border-[#D97706]/10 relative">
                  {kos.latitude && kos.longitude ? (
                    <MapComponent 
                      lat={kos.latitude} 
                      lng={kos.longitude} 
                      address={kos.name} 
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                        <MapPin className="text-gray-300 w-8 h-8" />
                      </div>
                      <h4 className="text-[#78350F] font-bold text-lg mb-2">Lokasi Tersembunyi</h4>
                      <p className="text-gray-500 max-w-xs mx-auto">
                        Silakan <span className="font-bold text-[#D97706]">Login</span> untuk melihat lokasi tepat atau hubungi pemilik untuk detail lebih lanjut.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Booking & Owner Info */}
          <div className="space-y-6">
            <div className="bg-[#78350F] p-8 rounded-2xl shadow-xl text-white sticky top-24">
              <p className="text-gray-300 mb-1">Mulai Dari</p>
              <h2 className="text-4xl font-black mb-6">
                Rp {kos.price?.toLocaleString("id-ID")}
                <span className="text-lg font-normal opacity-60">/bln</span>
              </h2>

              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#D97706] hover:bg-orange-500 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg mb-4 flex items-center justify-center gap-2"
              >
                <Zap fill="white" size={20} /> Booking Sekarang
              </a>

              <div className="pt-6 border-t border-white/10 mt-6">
                <div className="flex items-center gap-4 mb-4 text-left">
                  <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center font-bold text-xl uppercase">
                    {kos.owner?.name ? kos.owner.name.charAt(0) : "P"}
                  </div>
                  <div>
                    <p className="text-xs opacity-60 uppercase font-bold tracking-wider">
                      Pemilik Kos
                    </p>
                    <p className="text-lg font-bold">
                      {kos.owner?.name || "Pemilik"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-white/10 hover:bg-white/20 p-3 rounded-lg flex items-center justify-center transition-all"
                    title="WhatsApp"
                  >
                    <MessageCircle size={20} />
                  </a>
                  <a
                    href={`tel:${kos.owner?.phone || ""}`}
                    className="flex-1 bg-white/10 hover:bg-white/20 p-3 rounded-lg flex items-center justify-center transition-all"
                    title="Telepon"
                  >
                    <Phone size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
