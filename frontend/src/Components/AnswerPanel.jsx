import { useResultStore } from "../store/useResultStore";

export default function AnswerPanel() {
  const res = useResultStore((state) => state.res);

  if (!res) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-32 left-1/2 -translate-x-1/2 w-full max-w-2xl px-3 sm:px-6 z-10 animate-slide-up">
      <div className="bg-black/60 backdrop-blur-xl border border-white/5 rounded-lg sm:rounded-xl p-3 sm:p-4 max-h-32 sm:max-h-48 overflow-y-auto">
        <div className="flex items-center gap-2 mb-2">
          <div className="size-1.5 rounded-full bg-emerald-400" />
          <span className="text-[9px] font-mono uppercase tracking-wider text-white/40 font-bold">
            Final Answer
          </span>
        </div>
        <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
          {res.final_answer}
        </p>
        {res.confidence_notes && (
          <div className="mt-2 sm:mt-3 pt-2 border-t border-white/5">
            <span className="text-[8px] sm:text-[9px] font-mono text-white/20 uppercase tracking-wider">
              Confidence: {res.confidence_notes}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
