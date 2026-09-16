import Link from "next/link";
import MobileMenu from "./MobileMenu";

const paths = [
  {
    number: "01",
    title: "Body",
    label: "Fitness & Performance",
    description:
      "Build strength, energy, discipline, and a body that supports the life you want to live.",
    topics: ["Training", "Nutrition", "Recovery"],
  },
  {
    number: "02",
    title: "Mind",
    label: "Psychology & Confidence",
    description:
      "Understand yourself better, build confidence, and move through life with a clearer mind.",
    topics: ["Confidence", "Discipline", "Communication"],
  },
  {
    number: "03",
    title: "Style",
    label: "Grooming & Presence",
    description:
      "Upgrade how you present yourself—from grooming and style to the details people remember.",
    topics: ["Hair", "Skincare", "Personal Style"],
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-orb hero-orb-one" aria-hidden="true" />
        <div className="hero-orb hero-orb-two" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />

        <nav className="navbar" aria-label="Main navigation">
          <MobileMenu />
            <Link className="brand" href="/" aria-label="Gourab Society home">
            <span className="brand-mark">GS</span>
            <span className="brand-name">Gourab Society</span>
            </Link>

          <div className="nav-links">
            <a href="#paths">Paths</a>
            <Link href="/knowledge">Knowledge Hub</Link>
            <a href="/store">Store</a>
            <a href="/about">About</a>
          </div>

          <a className="nav-cta" href="#paths">
            Enter the Society
          </a>
        </nav>

        <div className="hero-content">
          <p className="eyebrow">
            <span />
            Built for Warriors.
          </p>

          <h1>
            Become hard
            <br />
            <em>to replace.</em>
          </h1>

          <p className="hero-copy">
            For the ones who refuse to stay average. Learn, build confidence,
            and level up—together.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#paths">
              Start your journey
              <span aria-hidden="true">↗</span>
            </a>

            <a
              className="button button-secondary"
              href="https://youtube.com/@gourab.society?si=-WaxCE7xxQr6HDJW"
              target="_blank"
              rel="noreferrer"
            >
              Watch on YouTube
              <span aria-hidden="true">▶</span>
            </a>
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="art-ring ring-one" />
          <div className="art-ring ring-two" />
          <div className="art-core">
            <span>GS</span>
          </div>
          <div className="art-card card-top">BUILD</div>
          <div className="art-card card-bottom">BELONG</div>
        </div>

        <div className="hero-bottom">
          <span>Official platform of Gourab Society</span>
          <a href="#paths">
            Scroll to begin <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <section className="paths-section" id="paths">
        <div className="section-heading">
          <p className="eyebrow">
            <span />
            Find your direction
          </p>
          <h2>Choose your path.</h2>
          <p>
            Real-world knowledge for every part of the Warrior&apos;s journey.
          </p>
        </div>

        <div className="path-grid">
  {paths.map((path) => (
    <Link
      className="path-card"
      href={`/knowledge/${path.title.toLowerCase()}`}
      key={path.title}
    >
      <span className="path-number">{path.number}</span>
      <p className="path-label">{path.label}</p>
      <h3>{path.title}</h3>
      <p className="path-description">{path.description}</p>

      <ul>
        {path.topics.map((topic) => (
          <li key={topic}>{topic}</li>
        ))}
      </ul>

      <span className="path-link">
        Explore this path <span aria-hidden="true">→</span>
      </span>
    </Link>
  ))}
</div>
      </section>

      <section className="home-preview-section">
        <div className="home-preview-card">
          <p className="eyebrow">
            <span />
            About
          </p>
          <h3>Built for clarity, discipline, and real transformation.</h3>
          <p>
            Gourab Society is a personal platform for people who want better habits,
            stronger presence, and a sharper way of living.
          </p>
          <Link href="/about">Learn our story →</Link>
        </div>

        <div className="home-preview-card accent-card">
          <p className="eyebrow">
            <span />
            Store
          </p>
          <h3>Tools, systems, and support designed to keep momentum.</h3>
          <p>
            A focused space for practical resources, digital guides, and future
            offerings built for the next level of your routine.
          </p>
          <Link href="/store">Explore the store →</Link>
        </div>
      </section>

      <section className="coming-soon" id="coming-soon">
        <p>Gourab Society is being built with intention.</p>
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