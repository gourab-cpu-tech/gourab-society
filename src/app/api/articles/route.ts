import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Article } from "@/models/Article";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const pillar = request.nextUrl.searchParams.get("pillar");

    const filter = {
      status: "published",
      ...(pillar ? { pillar } : {}),
    };

    const articles = await Article.find(filter)
      .sort({ publishedAt: -1 })
      .lean();

    return NextResponse.json({
      status: "ok",
      articles,
    });
  } catch {
    return NextResponse.json(
      {
        status: "error",
        message: "Could not load articles.",
      },
      { status: 500 },
    );
  }
}