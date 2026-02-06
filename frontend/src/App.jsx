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
        <div className="absolute top-24 sm:top-32 left-0 right-0 text-center z-10 select-none px-4">
          <h1 className="text-xs uppercase tracking-[0.3em] sm:tracking-[0.5em] text-white/30 font-bold mb-4">
            Explainable AI
          </h1>
          <p className="text-base sm:text-lg text-white/60 max-w-md mx-auto font-light">
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
    </div>
  );
}

export default App;
