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
} from "lucide-react";
import { DUMMY_KOS } from "../data";

export const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const kos = DUMMY_KOS.find((k) => k.id === parseInt(id));

  if (!kos) return <div className="p-20 text-center">Kos tidak ditemukan</div>;

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
            <div className="h-96 w-full rounded-2xl overflow-hidden shadow-xl border border-[#D97706]/10">
              <img
                src={kos.image}
                alt={kos.name}
                className="w-full h-full object-cover"
              />
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
                    <Star fill="#D97706" /> {kos.rating}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-gray-100 my-6">
                <div className="flex flex-col items-center p-3 bg-orange-50 rounded-xl">
                  <Wind className="text-[#D97706] mb-1" />
                  <span className="text-[10px] text-gray-500 uppercase font-bold">
                    Fasilitas
                  </span>
                  <span className="text-xs font-bold text-[#78350F]">
                    Full AC
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
                    3x4 Meter
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

              <div>
                <h3 className="text-xl font-bold text-[#78350F] mb-4">
                  Semua Fasilitas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {kos.facilities.map((f, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 font-medium"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Lokasi Map Section */}
              <div className="mt-10 pt-10 border-t border-gray-100">
                <h3 className="text-xl font-bold text-[#78350F] mb-4 flex items-center gap-2">
                  <MapPin className="text-[#D97706]" /> Lokasi Properti
                </h3>
                <p className="text-gray-600 mb-6">{kos.address}</p>
                <div className="w-full h-80 rounded-2xl overflow-hidden shadow-inner border border-[#D97706]/10">
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(
                      kos.address + " " + kos.city,
                    )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* Booking & Owner Info */}
          <div className="space-y-6">
            <div className="bg-[#78350F] p-8 rounded-2xl shadow-xl text-white sticky top-24">
              <p className="text-gray-300 mb-1">Mulai Dari</p>
              <h2 className="text-4xl font-black mb-6">
                Rp {kos.price.toLocaleString("id-ID")}
                <span className="text-lg font-normal opacity-60">/bln</span>
              </h2>

              <button className="w-full bg-[#D97706] hover:bg-orange-500 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg mb-4 flex items-center justify-center gap-2">
                <Zap fill="white" size={20} /> Booking Sekarang
              </button>

              <div className="pt-6 border-t border-white/10 mt-6">
                <div className="flex items-center gap-4 mb-4 text-left">
                  <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center font-bold text-xl uppercase">
                    {kos.owner.name ? kos.owner.name.charAt(0) : "P"}
                  </div>
                  <div>
                    <p className="text-xs opacity-60 uppercase font-bold tracking-wider">
                      Pemilik Kos
                    </p>
                    <p className="text-lg font-bold">
                      {kos.owner.name || kos.owner}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`https://wa.me/628123456789?text=${encodeURIComponent(
                      `Halo ${kos.owner.name || kos.owner}, saya tertarik dengan kos "${kos.name}" di ${kos.city}. Apakah masih tersedia?`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-white/10 hover:bg-white/20 p-3 rounded-lg flex items-center justify-center transition-all"
                  >
                    <MessageCircle size={20} />
                  </a>
                  <a
                    href={`mailto:owner@kosku.com?subject=Tanya Kos: ${kos.name}&body=${encodeURIComponent(
                      `Halo ${kos.owner.name || kos.owner}, saya ingin menanyakan lebih lanjut mengenai kos "${kos.name}".`,
                    )}`}
                    className="flex-1 bg-white/10 hover:bg-white/20 p-3 rounded-lg flex items-center justify-center transition-all"
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
