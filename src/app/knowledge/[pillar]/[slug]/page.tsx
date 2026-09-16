import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import { Article } from "@/models/Article";

type ArticlePageData = {
  title: string;
  excerpt: string;
  content: string;
  topic: string;
  tags: string[];
};

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ pillar: string; slug: string }>;
}) {
  const { pillar, slug } = await params;

  await connectToDatabase();

  const article = (await Article.findOne({
    pillar,
    slug,
    status: "published",
  })
    .select("title excerpt content topic tags")
    .lean()) as unknown as ArticlePageData | null;

  if (!article) {
    notFound();
  }

  const paragraphs = article.content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <main className="article-page">
      <nav className="knowledge-nav">
        <a className="brand" href="/">
          <span className="brand-mark">GS</span>
          <span className="brand-name">Gourab Society</span>
        </a>

        <a className="back-home" href={`/knowledge/${pillar}`}>
          ← Back to {pillar}
        </a>
      </nav>

      <article className="article-reading-view">
        <p className="eyebrow">
          <span />
          {article.topic}
        </p>

        <h1>{article.title}</h1>

        <p className="article-excerpt">{article.excerpt}</p>

        <div className="article-tags">
          {article.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <div className="article-body">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}