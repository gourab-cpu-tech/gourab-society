import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Store",
  description:
    "The Gourab Society Store is being prepared with useful tools for your growth.",
};

export default function StorePage() {
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
          Gourab Society Store
        </p>
        <h1>Useful tools are on the way.</h1>
        <p>
          eBooks, practical resources, and digital tools to help you keep
          building are being prepared.
        </p>
        <Link className="button button-primary" href="/knowledge">
          Explore the Knowledge Hub <span>↗</span>
        </Link>
      </section>
    </main>
  );
}
