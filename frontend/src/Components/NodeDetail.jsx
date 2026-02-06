import { useResultStore } from "../store/useResultStore";

const TYPE_COLORS = {
  assumption: "#ff6b6b",
  inference: "#4ecdc4",
  calculation: "#ffd93d",
  decision: "#6c5ce7",
  conclusion: "#a8e6cf",
};

export default function NodeDetail() {
  const selectedNode = useResultStore((state) => state.selectedNode);
  const clearSelectedNode = useResultStore((state) => state.clearSelectedNode);

  if (!selectedNode) return null;

  const color = TYPE_COLORS[selectedNode.type] || "#ffffff";

  return (
    <div className="fixed top-16 sm:top-24 left-2 right-2 sm:left-auto sm:right-8 z-40 animate-fade-in sm:w-80">
      <div className="bg-black/80 backdrop-blur-2xl border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-2xl">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2">
            <div
              className="size-2 sm:size-2.5 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span
              className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider font-bold"
              style={{ color }}
            >
              {selectedNode.type}
            </span>
          </div>
          <button
            onClick={clearSelectedNode}
            className="text-white/30 hover:text-white transition-colors p-1 -m-1"
          >
            <span className="material-symbols-outlined text-base sm:text-lg">
              close
            </span>
          </button>
        </div>
        <h3 className="text-xs sm:text-sm font-semibold text-white mb-1.5 sm:mb-2">
          {selectedNode.title}
        </h3>
        <p className="text-[11px] sm:text-xs text-white/50 leading-relaxed max-h-24 sm:max-h-32 overflow-y-auto">
          {selectedNode.description}
        </p>
      </div>
    </div>
  );
}
