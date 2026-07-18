const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-2.0-flash-lite";

type ExtractResult = {
  company: string;
  position: string;
  workType: string;
  salaryMin: number | null;
  salaryMax: number | null;
  skills: string[];
};

export async function extractFromJobDescription(
  jd: string,
): Promise<ExtractResult> {
  if (!API_KEY) throw new Error("GEMINI_API_KEY not set");

  const prompt = `Extract structured info from this job description. Return ONLY valid JSON (no markdown, no backticks):
{
  "company": string,
  "position": string,
  "workType": "ONSITE" | "HYBRID" | "REMOTE",
  "salaryMin": number | null,
  "salaryMax": number | null,
  "skills": string[]
}

Job description:
${jd}`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.1 },
      }),
    },
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini API error (${res.status}): ${err}`);
  }

  const data = await res.json();
  const text: string =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

  const cleaned = text.replace(/```(?:json)?/gi, "").trim();
  return JSON.parse(cleaned) as ExtractResult;
}

export function computeMatchScore(
  userSkills: string[],
  jobSkills: string[],
): { score: number; matched: string[]; missing: string[] } {
  const u = userSkills.map((s) => s.toLowerCase().trim());
  const j = jobSkills.map((s) => s.toLowerCase().trim());
  const matched = j.filter((s) => u.includes(s));
  const missing = j.filter((s) => !u.includes(s));
  const score = j.length > 0 ? Math.round((matched.length / j.length) * 100) : 0;
  return { score, matched, missing };
}
