import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { isKnowledgeTopic } from "@/lib/knowledge";
import { connectToDatabase } from "@/lib/mongodb";
import { Article } from "@/models/Article";

function makeSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function normalizeTags(tags: unknown) {
  return String(tags || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export async function GET() {
  const admin = await getAdminSession();

  if (!admin) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  await connectToDatabase();

  const articles = await Article.find().sort({ createdAt: -1 }).lean();

  return NextResponse.json({ articles });
}

export async function POST(request: Request) {
  try {
    const admin = await getAdminSession();

    if (!admin) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const { title, excerpt, content, pillar, topic, tags, status } =
      await request.json();

    if (!title || !excerpt || !content || !pillar || !topic) {
      return NextResponse.json(
        { message: "Please complete all required fields." },
        { status: 400 },
      );
    }

    if (!isKnowledgeTopic(pillar, topic)) {
      return NextResponse.json(
        { message: "Please choose a valid card for this path." },
        { status: 400 },
      );
    }

    await connectToDatabase();

    const slug = makeSlug(title);
    const existingArticle = await Article.exists({ slug });

    if (existingArticle) {
      return NextResponse.json(
        { message: "An article with this title already exists." },
        { status: 409 },
      );
    }

    const article = await Article.create({
      title,
      slug,
      excerpt,
      content,
      pillar,
      topic,
      tags: normalizeTags(tags),
      status: status === "published" ? "published" : "draft",
      publishedAt: status === "published" ? new Date() : null,
    });

    return NextResponse.json({
      status: "ok",
      article,
    });
  } catch {
    return NextResponse.json(
      { message: "Could not create the article." },
      { status: 500 },
    );
  }
}
