export const Footer = () => {
  return (
    <footer className="bg-[#78350F] text-[#FFFBEB] py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-4 font-sans text-center">KosKu</h2>
        <p className="mb-6 opacity-80 font-sans text-center">
          Solusi Hunian Nyaman dan Terpercaya di Seluruh Indonesia.
        </p>
        <div className="flex justify-center flex-wrap gap-6 mb-8">
          <a
            href="#"
            className="hover:text-[#D97706] transition-colors font-sans"
          >
            Syarat & Ketentuan
          </a>
          <a
            href="#"
            className="hover:text-[#D97706] transition-colors font-sans"
          >
            Kebijakan Privasi
          </a>
          <a
            href="#"
            className="hover:text-[#D97706] transition-colors font-sans font-sans"
          >
            Hubungi Kami
          </a>
        </div>
        <p className="text-sm opacity-50 font-sans text-center">
          &copy; 2026 KosKu. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
