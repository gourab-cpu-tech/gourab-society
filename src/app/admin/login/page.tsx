"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setMessage(data.message);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="admin-setup-page">
      <section className="admin-setup-card">
        <a className="brand" href="/">
          <span className="brand-mark">GS</span>
          <span className="brand-name">Gourab Society</span>
        </a>

        <p className="eyebrow">
          <span />
          Admin portal
        </p>

        <h1>Welcome back.</h1>

        <p className="admin-setup-copy">
          Sign in to manage the Gourab Society platform.
        </p>

        <form onSubmit={handleSubmit}>
          <label>
            Admin email
            <input name="email" type="email" required />
          </label>

          <label>
            Password
            <input name="password" type="password" required />
          </label>

          <button className="setup-button" disabled={loading} type="submit">
            {loading ? "Signing in..." : "Sign in securely"}
          </button>

          {message && <p className="setup-message">{message}</p>}
        </form>
      </section>
    </main>
  );
}