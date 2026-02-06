export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 sm:py-6 flex items-center pointer-events-none">
      <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
        <img
          src="/Logo.gif"
          alt="Logo"
          className="h-6 w-6 sm:h-8 sm:w-8 rounded object-contain"
        />
        <span className="text-xs sm:text-sm font-bold tracking-wider sm:tracking-widest uppercase">
          Explainable AI
        </span>
      </div>
    </header>
  );
}
