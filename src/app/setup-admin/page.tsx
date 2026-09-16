"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function SetupAdminPage() {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/admin/setup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        setupToken: formData.get("setupToken"),
      }),
    });

    const data = await response.json();

    setLoading(false);
    setSuccess(response.ok);
    setMessage(data.message);
  }

  return (
    <main className="admin-setup-page">
      <section className="admin-setup-card">
        <Link className="brand" href="/">
          <span className="brand-mark">GS</span>
          <span className="brand-name">Gourab Society</span>
        </Link>

        <p className="eyebrow">
          <span />
          Private setup
        </p>

        <h1>Create the first Admin account.</h1>

        <p className="admin-setup-copy">
          This account controls articles, eBooks, orders, and the future
          Gourab Society Admin Portal.
        </p>

        {success ? (
          <div className="setup-success">
            <strong>Admin account created.</strong>
            <p>You can now continue with the Admin Portal.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>
              Your name
              <input name="name" placeholder="Gourab Chatterjee" required />
            </label>

            <label>
              Admin email
              <input
                name="email"
                type="email"
                defaultValue="official.gourabchatterjee@gmail.com"
                required
              />
            </label>

            <label>
              Create a strong Admin password
              <input
                name="password"
                type="password"
                minLength={12}
                placeholder="At least 12 characters"
                required
              />
            </label>

            <label>
              Private setup token
              <input
                name="setupToken"
                type="password"
                placeholder="Paste the token from .env.local"
                required
              />
            </label>

            <button className="setup-button" disabled={loading} type="submit">
              {loading ? "Creating account..." : "Create Admin account"}
            </button>

            {message && <p className="setup-message">{message}</p>}
          </form>
        )}
      </section>
    </main>
  );
}