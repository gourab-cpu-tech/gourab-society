"use client";

import Link from "next/link";
import { useState } from "react";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mobile-menu">
      <button
        className="mobile-menu-toggle"
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>

      {isOpen && (
        <div className="mobile-menu-panel">
          <Link href="#paths" onClick={() => setIsOpen(false)}>
            Paths
          </Link>
          <Link href="/knowledge" onClick={() => setIsOpen(false)}>
            Knowledge Hub
          </Link>
          <Link href="/store" onClick={() => setIsOpen(false)}>
            Store
          </Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>
            About
          </Link>
          <div className="mobile-menu-divider" />
          <a
            href="https://youtube.com/@gourab.society?si=-WaxCE7xxQr6HDJW"
            target="_blank"
            rel="noreferrer"
          >
            YouTube ↗
          </a>
          <a
            href="https://www.instagram.com/gourab.fitness?igsh=MWI5Nm54eHVtdGdoeg%3D%3D&utm_source=qr"
            target="_blank"
            rel="noreferrer"
          >
            Instagram ↗
          </a>
        </div>
      )}
    </div>
  );
}