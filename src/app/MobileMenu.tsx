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

      <div className={`mobile-menu-layer${isOpen ? " is-open" : ""}`}>
        <button
          className="mobile-menu-backdrop"
          type="button"
          aria-label="Close menu"
          tabIndex={isOpen ? 0 : -1}
          onClick={() => setIsOpen(false)}
        />

        <div className="mobile-menu-panel" aria-hidden={!isOpen}>
          <div className="mobile-menu-topline">
            <div>
              <p className="mobile-menu-kicker">Gourab Society</p>
              <div className="mobile-menu-header">Explore</div>
            </div>
            <button
              className="mobile-menu-close"
              type="button"
              aria-label="Close menu"
              tabIndex={isOpen ? 0 : -1}
              onClick={() => setIsOpen(false)}
            >
              <span />
              <span />
            </button>
          </div>

          <div className="mobile-menu-links">
            <Link className="mobile-menu-item" href="#paths" onClick={() => setIsOpen(false)} tabIndex={isOpen ? 0 : -1}>
              <span>Paths</span>
              <span className="mobile-menu-arrow" aria-hidden="true" />
            </Link>
            <Link className="mobile-menu-item" href="/knowledge" onClick={() => setIsOpen(false)} tabIndex={isOpen ? 0 : -1}>
              <span>Knowledge Hub</span>
              <span className="mobile-menu-arrow" aria-hidden="true" />
            </Link>
            <Link className="mobile-menu-item" href="/store" onClick={() => setIsOpen(false)} tabIndex={isOpen ? 0 : -1}>
              <span>Store</span>
              <span className="mobile-menu-arrow" aria-hidden="true" />
            </Link>
            <Link className="mobile-menu-item" href="/about" onClick={() => setIsOpen(false)} tabIndex={isOpen ? 0 : -1}>
              <span>About</span>
              <span className="mobile-menu-arrow" aria-hidden="true" />
            </Link>

            <div className="mobile-menu-divider" />

            <a
              className="mobile-menu-item social-item"
              href="https://youtube.com/@gourab.society?si=-WaxCE7xxQr6HDJW"
              target="_blank"
              rel="noreferrer"
              tabIndex={isOpen ? 0 : -1}
            >
              <span>YouTube</span>
              <span className="mobile-menu-arrow" aria-hidden="true" />
            </a>
            <a
              className="mobile-menu-item social-item"
              href="https://www.instagram.com/gourab.fitness?igsh=MWI5Nm54eHVtdGdoeg%3D%3D&utm_source=qr"
              target="_blank"
              rel="noreferrer"
              tabIndex={isOpen ? 0 : -1}
            >
              <span>Instagram</span>
              <span className="mobile-menu-arrow" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}