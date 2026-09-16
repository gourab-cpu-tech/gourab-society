import { notFound } from "next/navigation";
import Link from "next/link";
import { connectToDatabase } from "@/lib/mongodb";
import { KNOWLEDGE_TOPICS, type KnowledgePillar } from "@/lib/knowledge";
import { Article } from "@/models/Article";

const pathContent = {
  body: {
    eyebrow: "Body / Fitness",
    title: "Build a body that carries you further.",
    description:
      "Training, nutrition, recovery, and the habits that create real physical confidence.",
    topics: KNOWLEDGE_TOPICS.body,
  },
  mind: {
    eyebrow: "Mind / Psychology",
    title: "A clearer mind changes everything.",
    description:
      "Practical knowledge for confidence, discipline, communication, and moving forward without the noise.",
    topics: KNOWLEDGE_TOPICS.mind,
  },
  style: {
    eyebrow: "Style / Grooming",
    title: "Your presence speaks before you do.",
    description:
      "The details that help you look sharper, feel prepared, and show up with confidence.",
    topics: KNOWLEDGE_TOPICS.style,
  },
};

type Pillar = KnowledgePillar;

type PublishedArticle = {
  title: string;
  slug: string;
  excerpt: string;
  topic: string;
};

export default async function KnowledgePillarPage({
  params,
  searchParams,
}: {
  params: Promise<{ pillar: string }>;
  searchParams: Promise<{ topic?: string }>;
}) {
  const { pillar } = await params;
  const { topic: requestedTopic } = await searchParams;

  if (!(pillar in pathContent)) {
    notFound();
  }

  const content = pathContent[pillar as Pillar];
  const selectedTopic = (content.topics as readonly string[]).includes(requestedTopic || "")
    ? requestedTopic
    : undefined;

  await connectToDatabase();

  const articles = (await Article.find({
    pillar,
    status: "published",
    ...(selectedTopic ? { topic: selectedTopic } : {}),
  })
    .select("title slug excerpt topic")
    .sort({ publishedAt: -1 })
    .lean()) as unknown as PublishedArticle[];

  return (
    <main className="knowledge-page">
      <nav className="knowledge-nav">
        <Link className="brand" href="/">
          <span className="brand-mark">GS</span>
          <span className="brand-name">Gourab Society</span>
        </Link>

        <Link className="back-home" href="/">
          ← Back home
        </Link>
      </nav>

      <section className="knowledge-hero">
        <p className="eyebrow">
          <span />
          {content.eyebrow}
        </p>

        <h1>{content.title}</h1>
        <p>{content.description}</p>
      </section>

      <section className="topic-section">
        <div className="topic-heading">
          <p className="eyebrow">
            <span />
            Choose a topic
          </p>
          <h2>Start where you need it most.</h2>
        </div>

        <div className="topic-grid">
          {content.topics.map((topic, index) => (
            <Link
              className={`topic-card${selectedTopic === topic ? " selected" : ""}`}
              href={`/knowledge/${pillar}?topic=${encodeURIComponent(topic)}#guides`}
              key={topic}
            >
              <span>0{index + 1}</span>
              <h3>{topic}</h3>
              <p>Explore practical guides for this topic.</p>
              <strong className="topic-status">View guides →</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="published-guides" id="guides">
        <div className="topic-heading">
          <p className="eyebrow">
            <span />
            From Gourab Society
          </p>
          <h2>{selectedTopic ? `${selectedTopic} guides.` : "Published guides."}</h2>
        </div>

        {articles.length === 0 ? (
          <p className="empty-guides">
            New knowledge is being prepared for this path.
          </p>
        ) : (
          <div className="article-grid">
            {articles.map((article) => (
              <Link
                className="public-article-card"
                href={`/knowledge/${pillar}/${article.slug}`}
                key={article.slug}
              >
                <p>{article.topic}</p>
                <h3>{article.title}</h3>
                <span>{article.excerpt}</span>
                <strong>
                  Read guide <b>→</b>
                </strong>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}