import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Knowledge Hub",
  description:
    "Explore practical guides for building a stronger mind, body, and presence.",
};

const pillars = [
  {
    number: "01",
    title: "Mind",
    description:
      "Confidence, discipline, psychology, communication, and emotional strength.",
  },
  {
    number: "02",
    title: "Body",
    description:
      "Training, nutrition, recovery, and the physical strength to carry you further.",
  },
  {
    number: "03",
    title: "Style",
    description:
      "Grooming, personal style, and the details that shape your presence.",
  },
];

export default function KnowledgeHubPage() {
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
          Knowledge Hub
        </p>
        <h1>Start building where it matters most.</h1>
        <p>
          Choose a path and explore practical knowledge for your mind, body,
          and presence.
        </p>
      </section>

      <section className="topic-section">
        <div className="topic-grid">
          {pillars.map((pillar) => (
            <Link
              className="topic-card"
              href={`/knowledge/${pillar.title.toLowerCase()}`}
              key={pillar.title}
            >
              <span>{pillar.number}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
              <p className="topic-status">Explore this path →</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
