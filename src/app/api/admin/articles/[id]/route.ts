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

async function requireAdmin() {
  const admin = await getAdminSession();

  if (!admin) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  return null;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  await connectToDatabase();

  const article = await Article.findById(id).lean();

  if (!article) {
    return NextResponse.json({ message: "Article not found." }, { status: 404 });
  }

  return NextResponse.json({ article });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const unauthorized = await requireAdmin();
    if (unauthorized) return unauthorized;

    const { id } = await params;
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

    const normalizedStatus = status === "published" ? "published" : "draft";
    const slug = makeSlug(String(title));

    await connectToDatabase();

    const existingArticle = await Article.findOne({
      slug,
      _id: { $ne: id },
    });

    if (existingArticle) {
      return NextResponse.json(
        { message: "An article with this title already exists." },
        { status: 409 },
      );
    }

    const article = await Article.findByIdAndUpdate(
      id,
      {
        title,
        slug,
        excerpt,
        content,
        pillar,
        topic,
        tags: normalizeTags(tags),
        status: normalizedStatus,
        publishedAt:
          normalizedStatus === "published" ? new Date() : null,
      },
      { new: true, runValidators: true },
    ).lean();

    if (!article) {
      return NextResponse.json({ message: "Article not found." }, { status: 404 });
    }

    return NextResponse.json({ status: "ok", article });
  } catch {
    return NextResponse.json(
      { message: "Could not update the article." },
      { status: 500 },
    );
  }
}
