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
          <div className="mobile-menu-header">Menu</div>
          <Link className="mobile-menu-item" href="#paths" onClick={() => setIsOpen(false)}>
            <span>Paths</span>
            <span aria-hidden="true">↗</span>
          </Link>
          <Link className="mobile-menu-item" href="/knowledge" onClick={() => setIsOpen(false)}>
            <span>Knowledge Hub</span>
            <span aria-hidden="true">↗</span>
          </Link>
          <Link className="mobile-menu-item" href="/store" onClick={() => setIsOpen(false)}>
            <span>Store</span>
            <span aria-hidden="true">↗</span>
          </Link>
          <Link className="mobile-menu-item" href="/about" onClick={() => setIsOpen(false)}>
            <span>About</span>
            <span aria-hidden="true">↗</span>
          </Link>

          <div className="mobile-menu-divider" />

          <a
            className="mobile-menu-item social-item"
            href="https://youtube.com/@gourab.society?si=-WaxCE7xxQr6HDJW"
            target="_blank"
            rel="noreferrer"
          >
            <span>YouTube</span>
            <span aria-hidden="true">↗</span>
          </a>
          <a
            className="mobile-menu-item social-item"
            href="https://www.instagram.com/gourab.fitness?igsh=MWI5Nm54eHVtdGdoeg%3D%3D&utm_source=qr"
            target="_blank"
            rel="noreferrer"
          >
            <span>Instagram</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      )}
    </div>
  );
}