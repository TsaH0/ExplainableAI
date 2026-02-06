export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex items-center pointer-events-none">
      <div className="flex items-center gap-3 pointer-events-auto">
        <div className="size-6 border border-white flex items-center justify-center">
          <span className="material-symbols-outlined text-[14px]">
            account_tree
          </span>
        </div>
        <span className="text-sm font-bold tracking-widest uppercase">
          Explainable AI
        </span>
      </div>
    </header>
  );
}
