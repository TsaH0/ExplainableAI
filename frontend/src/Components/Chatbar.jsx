import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useResultStore } from "../store/useResultStore";

export default function ChatBar() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const { setRes } = useResultStore();

  const submitQuery = async () => {
    if (!query.trim()) {
      toast.error("Write something in the chatbox");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8000/api/ai", {
        model: "gemini-2.5-flash",
        query: query,
      });
      setRes(res.data);
      setQuery("");
      toast.success("Reasoning graph generated");
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitQuery();
    }
  };

  return (
    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 z-20">
      <div className="relative group">
        <div className="absolute inset-0 bg-white/5 blur-xl rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
        <div className="relative bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl flex items-center p-2 shadow-2xl">
          <div className="pl-4 pr-3 text-white/40">
            <span className="material-symbols-outlined text-xl">search</span>
          </div>
          <input
            className="flex-1 bg-transparent border-none text-white focus:ring-0 focus:outline-none placeholder:text-white/20 text-sm py-4"
            placeholder="Ask anything about the reasoning process..."
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            value={query}
            disabled={loading}
          />
          <div className="flex items-center gap-2 pr-3">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/10">
              <span className="text-[10px] font-mono text-white/40 uppercase">
                Enter
              </span>
            </div>
            <button
              onClick={submitQuery}
              disabled={loading}
              className="bg-white text-black p-2 rounded-xl hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-xl font-bold">
                {loading ? "progress_activity" : "arrow_upward"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
