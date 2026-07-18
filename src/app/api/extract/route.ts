import { NextRequest, NextResponse } from "next/server";
import { extractFromJobDescription } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const { jobDescription } = await req.json();
    if (!jobDescription || jobDescription.length < 20) {
      return NextResponse.json(
        { error: "Job description too short" },
        { status: 400 },
      );
    }

    const result = await extractFromJobDescription(jobDescription);
    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message ?? "Extraction failed" },
      { status: 500 },
    );
  }
}
