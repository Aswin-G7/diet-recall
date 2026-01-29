const Footer = () => {
  return (
    <footer className="py-12 px-8 border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-xl font-black text-emerald-600 italic">
            NutriTrack
          </span>
          <span className="text-slate-400 text-sm">
            © 2025 NutriTrack | Major Project
          </span>
        </div>

        <div className="flex gap-8 text-sm font-medium text-slate-500">
          <a href="#" className="hover:text-emerald-600 transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-emerald-600 transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-emerald-600 transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
