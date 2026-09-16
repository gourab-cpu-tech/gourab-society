import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn why Gourab Society exists and how it helps Warriors grow through a stronger mind, body, and presence.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Gourab Society",
    description:
      "The story, purpose, and principles behind Gourab Society.",
    url: "/about",
    type: "website",
  },
};

const pillars = [
  {
    number: "01",
    title: "Mind",
    description:
      "Mental strength, emotional control, confidence, discipline, and the clarity to move forward.",
    href: "/knowledge/mind",
  },
  {
    number: "02",
    title: "Body",
    description:
      "Fitness, nutrition, recovery, and the physical strength that changes how you carry yourself.",
    href: "/knowledge/body",
  },
  {
    number: "03",
    title: "Style",
    description:
      "Grooming, personal style, and the details that help your presence speak before you do.",
    href: "/knowledge/style",
  },
];

export default function AboutPage() {
  return (
    <main className="about-page">
      <nav className="knowledge-nav">
        <Link className="brand" href="/">
          <span className="brand-mark">GS</span>
          <span className="brand-name">Gourab Society</span>
        </Link>

        <Link className="back-home" href="/">
          ← Back home
        </Link>
      </nav>

      <section className="about-hero">
        <p className="eyebrow">
          <span />
          The story behind the Society
        </p>

        <h1>
          No one should have to
          <em> figure it out alone.</em>
        </h1>

        <p className="about-lead">
          Gourab Society exists for Warriors who want to become stronger in
          their mind, body, and presence—without pretending that growth is
          easy.
        </p>
      </section>

      <section className="about-story">
        <div className="about-story-label">
          <p className="eyebrow">
            <span />
            From Gourab Chatterjee
          </p>
          <p>Why this matters</p>
        </div>

        <div className="about-story-content">
          <p>
            I,m Gourab Chatterjee. The founder of Gourab Society.
          </p>

          <p>  There was a time when I felt physically weak, mentally exhausted,
            and invisible in the rooms that mattered. I was underestimated,
            ignored, and often left feeling like I had missed opportunities
            simply because I was not strong enough to take them.
          </p>

          <p>
            I did not have someone to guide me through it. So I started
            searching—through YouTube, books, conversations, and years of
            learning from people who had built the qualities I wanted in
            myself.
          </p>

          <p>
            It was not a quick transformation. It took years of feeling
            lonely, broken, and uncertain before things began to change. But
            slowly, I became more confident. I started leading. Better
            opportunities came. Most importantly, I learned that strength is
            built—not gifted.
          </p>

          <p>
            When I began sharing what I had learned with friends, I realised
            something simple: a man needs more than motivation to grow. He
            needs the right knowledge, practical guidance, and a place that
            reminds him he is not alone.
          </p>
        </div>
      </section>

      <section className="about-purpose">
        <p className="eyebrow">
          <span />
          The purpose
        </p>

        <h2>Built around the three sides of real growth.</h2>

        <p>
          Your career, confidence, relationships, and future are shaped by how
          strong you are inside, outside, and in the way you show up. Gourab
          Society brings the essential tools for all three together.
        </p>
      </section>

      <section className="about-pillar-grid">
        {pillars.map((pillar) => (
          <Link className="about-pillar-card" href={pillar.href} key={pillar.title}>
            <span>{pillar.number}</span>
            <h3>{pillar.title}</h3>
            <p>{pillar.description}</p>
            <strong>
              Explore {pillar.title} <b>→</b>
            </strong>
          </Link>
        ))}
      </section>

      <section className="about-closing">
        <p className="eyebrow">
          <span />
          For every Warrior
        </p>

        <h2>You are not behind. You are building.</h2>

        <p>
          This is a space for knowledge, guidance, digital tools, and a
          community that chooses growth over excuses—one step at a time.
        </p>

        <div className="about-actions">
          <Link className="button button-primary" href="/knowledge/mind">
            Enter the Knowledge Hub <span>↗</span>
          </Link>

          <a
            className="button button-secondary"
            href="https://youtube.com/@gourab.society?si=-WaxCE7xxQr6HDJW"
            target="_blank"
            rel="noreferrer"
          >
            Watch on YouTube <span>▶</span>
          </a>
        </div>
      </section>

      <footer>
        <Link className="brand" href="/">
          <span className="brand-mark">GS</span>
          <span className="brand-name">Gourab Society</span>
        </Link>

        <div className="footer-links">
          <a
            href="https://youtube.com/@gourab.society?si=-WaxCE7xxQr6HDJW"
            target="_blank"
            rel="noreferrer"
          >
            <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8Z" />
              <path className="social-icon-cutout" d="m9.6 15.7 6.3-3.7-6.3-3.7v7.4Z" />
            </svg>
            YouTube
          </a>

          <a
            href="https://www.instagram.com/gourab.fitness?igsh=MWI5Nm54eHVtdGdoeg%3D%3D&utm_source=qr"
            target="_blank"
            rel="noreferrer"
          >
            <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
              <rect className="instagram-frame" x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
              <circle className="instagram-lens" cx="12" cy="12" r="4.1" />
              <circle className="social-icon-dot" cx="17.2" cy="6.8" r="1.15" />
            </svg>
            Instagram
          </a>
        </div>

        <p>© 2026 Gourab Society. All rights reserved.</p>
      </footer>
    </main>
  );
}