import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative bg-[#FFFBEB] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-[#FFFBEB] sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl font-sans">
                <span className="block xl:inline">Temukan Kos Impianmu</span>{" "}
                <span className="block text-[#D97706] xl:inline">
                  Tanpa Ribet
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 leading-relaxed font-sans text-left">
                KosKu membantu ribuan pencari kos menemukan hunian yang nyaman,
                strategis, dan sesuai dengan budget. Mulai pencarianmu hari ini!
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link
                    to="/cari"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#D97706] hover:bg-[#78350F] md:py-4 md:text-lg md:px-10 transition-all transform hover:scale-105 font-sans"
                  >
                    Mulai Mencari
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link
                    to="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-[#D97706] text-base font-medium rounded-md text-[#D97706] bg-white hover:bg-orange-50 md:py-4 md:text-lg md:px-10 transition-all transform hover:scale-105 font-sans"
                  >
                    Promosikan Kos (Pemilik)
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-[#78350F]/10 flex items-center justify-center p-8">
        <div className="w-full h-64 lg:h-full bg-white rounded-2xl flex flex-col items-center justify-center border border-[#D97706]/20 shadow-xl p-8 transform rotate-1">
          <Home size={64} className="text-[#D97706] mb-4" />
          <p className="text-xl font-bold text-[#78350F]">
            Kost Nyaman & Modern
          </p>
          <p className="text-gray-500 text-center mt-2">
            Ribuan pilihan properti menunggu Anda.
          </p>
        </div>
      </div>
    </div>
  );
};
