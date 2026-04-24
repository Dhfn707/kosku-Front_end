import { Search, ShieldCheck, Zap } from "lucide-react";

export const FeatureSection = () => {
  const features = [
    {
      title: "Pencarian Mudah",
      desc: "Cari berdasarkan lokasi, harga, dan fasilitas.",
      icon: <Search className="text-white" />,
    },
    {
      title: "Terpercaya",
      desc: "Verifikasi pemilik kos untuk keamanan Anda.",
      icon: <ShieldCheck className="text-white" />,
    },
    {
      title: "Booking Instan",
      desc: "Pesan kamar langsung melalui aplikasi.",
      icon: <Zap className="text-white" />,
    },
  ];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="text-center">
          <h2 className="text-base text-[#D97706] font-semibold tracking-wide uppercase font-sans">
            Fitur Unggulan
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl font-sans text-center">
            Kenapa Memilih KosKu?
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-[#FFFBEB] p-6 rounded-xl border border-[#D97706]/10 hover:border-[#D97706]/30 transition-all shadow-sm group"
              >
                <div className="h-12 w-12 bg-[#D97706] text-white rounded-lg flex items-center justify-center mb-4 font-bold text-xl font-sans group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-[#78350F] mb-2 font-sans">
                  {f.title}
                </h3>
                <p className="text-gray-600 font-sans">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
