import { redirect } from "next/navigation";
import Link from "next/link";
import { getAdminSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { Article } from "@/models/Article";

type AdminArticle = {
  _id: string;
  title: string;
  pillar: string;
  topic: string;
  status: "draft" | "published";
  createdAt: Date;
};

export default async function AdminDashboardPage() {
  const admin = await getAdminSession();

  if (!admin) {
    redirect("/admin/login");
  }

  await connectToDatabase();

  const [publishedCount, draftCount, recentArticles] = await Promise.all([
    Article.countDocuments({ status: "published" }),
    Article.countDocuments({ status: "draft" }),
    Article.find()
      .select("title pillar topic status createdAt")
      .sort({ createdAt: -1 })
      .limit(6)
      .lean(),
  ]);

  const articles = recentArticles as unknown as AdminArticle[];

  return (
    <main className="admin-dashboard">
      <aside className="admin-sidebar">
        <Link className="brand" href="/">
          <span className="brand-mark">GS</span>
          <span className="brand-name">Gourab Society</span>
        </Link>

        <div className="admin-sidebar-label">Control room</div>

        <nav>
          <span className="admin-active-link">Overview</span>
          <Link href="/admin/articles/new">Write an article</Link>
          <span>eBook Store — coming soon</span>
          <span>Orders — coming soon</span>
          <span>Warriors — coming soon</span>
        </nav>
      </aside>

      <section className="admin-main">
        <div className="admin-title-row">
          <div>
            <p className="eyebrow">
              <span />
              Admin portal
            </p>

            <h1>Welcome, {admin.name}.</h1>

            <p className="admin-intro">
              Manage everything your Warriors see on Gourab Society.
            </p>
          </div>

          <Link className="setup-button admin-create-button" href="/admin/articles/new">
            Write new article
          </Link>
        </div>

        <div className="admin-overview-grid">
          <article>
            <span>Published knowledge</span>
            <strong>{publishedCount}</strong>
            <p>Articles visible to Warriors</p>
          </article>

          <article>
            <span>Drafts</span>
            <strong>{draftCount}</strong>
            <p>Articles still being prepared</p>
          </article>

          <article>
            <span>Warriors</span>
            <strong>1</strong>
            <p>Admin account active</p>
          </article>
        </div>

        <section className="admin-articles-section">
          <div className="admin-section-title">
            <div>
              <p className="eyebrow">
                <span />
                Knowledge Hub
              </p>
              <h2>Recent articles</h2>
            </div>

            <Link href="/admin/articles/new">Write another →</Link>
          </div>

          {articles.length === 0 ? (
            <div className="admin-empty-state">
              <p>No articles yet.</p>
              <Link href="/admin/articles/new">Write your first article →</Link>
            </div>
          ) : (
            <div className="admin-article-list">
              {articles.map((article) => (
                <Link
                  className="admin-article-row"
                  href={`/admin/articles/${article._id}`}
                  key={article._id}
                >
                  <div>
                    <span className={`status-badge ${article.status}`}>
                      {article.status}
                    </span>
                    <h3>{article.title}</h3>
                    <p>
                      {article.pillar} / {article.topic}
                    </p>
                  </div>

                  <time>
                    {new Intl.DateTimeFormat("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }).format(new Date(article.createdAt))}
                  </time>
                  <span className="admin-article-edit-label">Edit →</span>
                </Link>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}