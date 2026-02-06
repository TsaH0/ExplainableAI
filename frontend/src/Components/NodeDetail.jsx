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
    <div className="fixed top-24 right-8 z-40 w-80 animate-fade-in">
      <div className="bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-2xl">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <div
              className="size-2.5 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span
              className="text-[10px] font-mono uppercase tracking-wider font-bold"
              style={{ color }}
            >
              {selectedNode.type}
            </span>
          </div>
          <button
            onClick={clearSelectedNode}
            className="text-white/30 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>
        <h3 className="text-sm font-semibold text-white mb-2">
          {selectedNode.title}
        </h3>
        <p className="text-xs text-white/50 leading-relaxed">
          {selectedNode.description}
        </p>
      </div>
    </div>
  );
}
