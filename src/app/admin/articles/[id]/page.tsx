"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { KNOWLEDGE_TOPICS, type KnowledgePillar } from "@/lib/knowledge";

type Article = {
  title: string;
  excerpt: string;
  content: string;
  pillar: "body" | "mind" | "style";
  topic: string;
  tags: string[];
  status: "draft" | "published";
};

export default function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [articleId, setArticleId] = useState("");
  const [article, setArticle] = useState<Article | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [pillar, setPillar] = useState<KnowledgePillar>("mind");
  const [topic, setTopic] = useState<string>(KNOWLEDGE_TOPICS.mind[0]);

  useEffect(() => {
    async function loadArticle() {
      const { id } = await params;
      setArticleId(id);

      const response = await fetch(`/api/admin/articles/${id}`);
      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Could not load the article.");
        return;
      }

      const loadedPillar = data.article.pillar as KnowledgePillar;
      const loadedTopic = String(data.article.topic);

      setArticle({
        ...data.article,
        tags: data.article.tags || [],
      });
      setPillar(loadedPillar);
      setTopic(
        (KNOWLEDGE_TOPICS[loadedPillar] as readonly string[]).includes(loadedTopic)
          ? loadedTopic
          : KNOWLEDGE_TOPICS[loadedPillar][0],
      );
    }

    loadArticle();
  }, [params]);

  async function saveArticle(status: "draft" | "published") {
    const form = formRef.current;

    if (!form || !form.reportValidity() || !articleId) {
      return;
    }

    setLoading(true);
    setMessage("");
    const formData = new FormData(form);

    const response = await fetch(`/api/admin/articles/${articleId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
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
      setMessage(data.message || "Could not update the article.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  function handleDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    saveArticle("draft");
  }

  if (!article) {
    return (
      <main className="admin-editor-page">
        <header className="editor-header">
          <Link className="brand" href="/admin">
            <span className="brand-mark">GS</span>
            <span className="brand-name">Gourab Society Admin</span>
          </Link>
          <Link className="back-home" href="/admin">
            ← Back to dashboard
          </Link>
        </header>
        <p className="setup-message">{message || "Loading article..."}</p>
      </main>
    );
  }

  return (
    <main className="admin-editor-page">
      <header className="editor-header">
        <Link className="brand" href="/admin">
          <span className="brand-mark">GS</span>
          <span className="brand-name">Gourab Society Admin</span>
        </Link>
        <Link className="back-home" href="/admin">
          ← Back to dashboard
        </Link>
      </header>

      <section className="editor-intro">
        <p className="eyebrow">
          <span />
          Knowledge Hub
        </p>
        <h1>Edit this article.</h1>
        <p>Update the article and publish the latest version for Warriors.</p>
      </section>

      <form ref={formRef} className="article-editor" onSubmit={handleDraft}>
        <label className="editor-field full-width">
          Article title
          <input name="title" defaultValue={article.title} required />
        </label>

        <label className="editor-field full-width">
          Short introduction
          <textarea name="excerpt" rows={3} defaultValue={article.excerpt} required />
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
              {KNOWLEDGE_TOPICS[pillar].map((cardTopic) => (
                <option key={cardTopic} value={cardTopic}>
                  {cardTopic}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="editor-field full-width">
          Tags
          <input name="tags" defaultValue={article.tags.join(", ")} />
        </label>

        <label className="editor-field full-width">
          Full article
          <textarea
            className="article-content-input"
            name="content"
            rows={16}
            defaultValue={article.content}
            required
          />
        </label>

        <div className="editor-actions">
          <button className="editor-draft-button" disabled={loading} type="submit">
            {loading ? "Saving..." : "Save as draft"}
          </button>
          <button
            className="setup-button"
            disabled={loading}
            onClick={() => saveArticle("published")}
            type="button"
          >
            {loading ? "Publishing..." : "Publish changes"}
          </button>
        </div>

        {message && <p className="setup-message">{message}</p>}
      </form>
    </main>
  );
}
