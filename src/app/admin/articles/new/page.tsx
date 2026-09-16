"use client";

import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { KNOWLEDGE_TOPICS, type KnowledgePillar } from "@/lib/knowledge";

export default function NewArticlePage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [pillar, setPillar] = useState<KnowledgePillar>("mind");
  const [topic, setTopic] = useState<string>(KNOWLEDGE_TOPICS.mind[0]);

  async function saveArticle(status: "draft" | "published") {
    const form = formRef.current;

    if (!form || !form.reportValidity()) {
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData(form);

    const response = await fetch("/api/admin/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: formData.get("title"),
        excerpt: formData.get("excerpt"),
        content: formData.get("content"),
        pillar: formData.get("pillar"),
        topic: formData.get("topic"),
        tags: formData.get("tags"),
        status,
      }),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setMessage(data.message || "Something went wrong.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  function handleDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    saveArticle("draft");
  }

  return (
    <main className="admin-editor-page">
      <header className="editor-header">
        <a className="brand" href="/admin">
          <span className="brand-mark">GS</span>
          <span className="brand-name">Gourab Society Admin</span>
        </a>

        <a className="back-home" href="/admin">
          ← Back to dashboard
        </a>
      </header>

      <section className="editor-intro">
        <p className="eyebrow">
          <span />
          Knowledge Hub
        </p>

        <h1>Write something valuable.</h1>

        <p>
          This article will appear in the correct Body, Mind, or Style section
          after you publish it.
        </p>
      </section>

      <form
        ref={formRef}
        className="article-editor"
        onSubmit={handleDraft}
      >
        <label className="editor-field full-width">
          Article title
          <input
            name="title"
            placeholder="Example: How to build confidence step by step"
            required
          />
        </label>

        <label className="editor-field full-width">
          Short introduction
          <textarea
            name="excerpt"
            placeholder="Write a short summary people will see before opening the article."
            rows={3}
            required
          />
        </label>

        <div className="editor-two-columns">
          <label className="editor-field">
            Main path
            <select
              name="pillar"
              value={pillar}
              onChange={(event) => {
                const nextPillar = event.target.value as KnowledgePillar;
                setPillar(nextPillar);
                setTopic(KNOWLEDGE_TOPICS[nextPillar][0]);
              }}
              required
            >
              <option value="body">Body / Fitness</option>
              <option value="mind">Mind / Psychology</option>
              <option value="style">Style / Grooming</option>
            </select>
          </label>

          <label className="editor-field">
            Choose the card
            <select
              name="topic"
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              required
            >
              {KNOWLEDGE_TOPICS[pillar].map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="editor-field full-width">
          Tags
          <input
            name="tags"
            placeholder="Example: confidence, discipline, self-improvement"
          />
        </label>

        <label className="editor-field full-width">
          Full article
          <textarea
            className="article-content-input"
            name="content"
            placeholder="Write the full article here..."
            rows={16}
            required
          />
        </label>

        <div className="editor-actions">
          <button
            className="editor-draft-button"
            disabled={loading}
            type="submit"
          >
            {loading ? "Saving..." : "Save as draft"}
          </button>

          <button
            className="setup-button"
            disabled={loading}
            onClick={() => saveArticle("published")}
            type="button"
          >
            {loading ? "Publishing..." : "Publish article"}
          </button>
        </div>

        {message && <p className="setup-message">{message}</p>}
      </form>
    </main>
  );
}