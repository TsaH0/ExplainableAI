import ChatBar from "./Components/Chatbar";
import { useResultStore } from "./store/useResultStore";
import Navbar from "./Components/Navbar";
import ReasoningGraph from "./Components/ReasoningGraph";
import NodeDetail from "./Components/NodeDetail";
import AnswerPanel from "./Components/AnswerPanel";

function App() {
  const res = useResultStore((state) => state.res);
  const loading = useResultStore((state) => state.loading);

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden">
      <Navbar />

      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="loading-spinner" />
            <span className="text-xs uppercase tracking-widest text-white/50 font-bold">
              Generating reasoning graph...
            </span>
          </div>
        </div>
      )}

      {/* Background dot grid when no graph */}
      {!res?.reasoning_graph && (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `radial-gradient(circle at center, #111 0%, transparent 100%), radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
            backgroundSize: "100% 100%, 40px 40px",
          }}
        />
      )}

      {/* Hero text when no graph */}
      {!res?.reasoning_graph && (
        <div className="absolute top-32 left-0 right-0 text-center z-10 select-none">
          <h1 className="text-xs uppercase tracking-[0.5em] text-white/30 font-bold mb-4">
            Explainable AI
          </h1>
          <p className="text-lg text-white/60 max-w-md mx-auto font-light">
            Interactive visualization of LLM logic paths.
          </p>
        </div>
      )}

      {/* 3D Force Graph */}
      <ReasoningGraph />

      {/* Node detail panel */}
      <NodeDetail />

      {/* Answer panel */}
      <AnswerPanel />

      {/* Chat input */}
      <ChatBar />

      {/* Legend when graph is shown */}
      {res?.reasoning_graph && (
        <div className="fixed top-24 left-8 z-40 animate-fade-in">
          <div className="bg-black/60 backdrop-blur-xl border border-white/5 rounded-xl p-4">
            <span className="text-[9px] font-mono uppercase tracking-wider text-white/30 font-bold block mb-3">
              Node Types
            </span>
            <div className="flex flex-col gap-2">
              {[
                { type: "assumption", color: "#ff6b6b" },
                { type: "inference", color: "#4ecdc4" },
                { type: "calculation", color: "#ffd93d" },
                { type: "decision", color: "#6c5ce7" },
                { type: "conclusion", color: "#a8e6cf" },
              ].map(({ type, color }) => (
                <div key={type} className="flex items-center gap-2">
                  <div
                    className="size-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-[10px] font-mono text-white/40 capitalize">
                    {type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
