import { computeMatchScore } from "@/lib/ai";

export function MatchScore({
  userSkills,
  jobSkills,
}: {
  userSkills: string[];
  jobSkills: string[];
}) {
  if (!jobSkills.length) return null;

  const { score, matched, missing } = computeMatchScore(userSkills, jobSkills);

  const color =
    score >= 80
      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
      : score >= 50
      ? "text-amber-700 bg-amber-50 border-amber-200"
      : "text-rose-700 bg-rose-50 border-rose-200";

  return (
    <div className={`rounded-md border p-4 ${color}`}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">Skill match</p>
        <span className="text-lg font-bold font-mono">{score}%</span>
      </div>
      {matched.length > 0 && (
        <div className="mt-2">
          <p className="text-xs font-semibold uppercase tracking-wider opacity-70">Matched</p>
          <div className="mt-1 flex flex-wrap gap-1">
            {matched.map((s) => (
              <span key={s} className="rounded-full bg-white/60 px-2 py-0.5 text-xs font-medium">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
      {missing.length > 0 && (
        <div className="mt-2">
          <p className="text-xs font-semibold uppercase tracking-wider opacity-70">Missing</p>
          <div className="mt-1 flex flex-wrap gap-1">
            {missing.map((s) => (
              <span key={s} className="rounded-full bg-white/40 px-2 py-0.5 text-xs font-medium line-through opacity-70">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
