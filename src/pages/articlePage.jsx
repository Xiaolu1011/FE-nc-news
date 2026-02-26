import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getCommentsByArticleId } from "../api/ncNewsApi";
import styles from "./articlePage.module.css";

function formatDate(iso) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(d);
}

export default function ArticlePage() {
  const { article_id } = useParams();

  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [comments, setComments] = useState([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);
  const [commentsError, setCommentsError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setIsCommentsLoading(true);
    setCommentsError(null);

    Promise.all([
      getArticleById(article_id),
      getCommentsByArticleId(article_id),
    ])
      .then(([articleFromApi, commentsFromApi]) => {
        setArticle(articleFromApi);
        setComments(commentsFromApi);
      })
      .catch((err) => {
        if (err?.response?.status === 404) {
          setError(err);
        } else {
          setError(err);
        }
      })
      .finally(() => {
        setIsLoading(false);
        setIsCommentsLoading(false);
      });
  }, [article_id]);

  if (isLoading) return <p role="status">Loading article...</p>;

  if (error) {
    const msg = error?.response?.data?.msg || "Failed to load article";
    return <p role="alert">{msg}</p>;
  }

  if (!article) return <p role="alert">Article not found</p>;

  return (
    <main className={styles.page}>
      <article className={styles.article}>
        <header className={styles.header}>
          <h1 className={styles.title}>{article.title}</h1>

          <div className={styles.metaRow}>
            <span className={styles.metaItem}>
              <span className={styles.metaLabel}>Topic:</span> {article.topic}
            </span>
            <span className={styles.metaDot}>•</span>
            <span className={styles.metaItem}>
              <span className={styles.metaLabel}>Author:</span> {article.author}
            </span>
            <span className={styles.metaDot}>•</span>
            <span className={styles.metaItem}>
              <span className={styles.metaLabel}>Published:</span>{" "}
              <time dateTime={article.created_at}>
                {formatDate(article.created_at)}
              </time>
            </span>
          </div>
        </header>

        {article.article_img_url && (
          <img
            className={styles.image}
            src={article.article_img_url}
            alt={`Image for ${article.title}`}
          />
        )}

        <p className={styles.body}>{article.body}</p>

        <section className={styles.stats} aria-label="Article stats">
          <div className={styles.stat}>
            <span className={styles.statLabel}>Votes:</span>
            <span className={styles.statValue}>{article.votes}</span>
          </div>

          <div className={styles.stat}>
            <span className={styles.statLabel}>Comments:</span>
            <span className={styles.statValue}>
              {isCommentsLoading ? "…" : comments.length}
            </span>
          </div>
        </section>

        <section className={styles.commentsSection} aria-label="Comments">
          <h2 className={styles.commentsTitle}>Comments</h2>

          {isCommentsLoading && <p>Loading comments...</p>}

          {commentsError && (
            <p role="alert">
              {commentsError?.response?.data?.msg || "Failed to load comments"}
            </p>
          )}

          {!isCommentsLoading && !commentsError && comments.length === 0 && (
            <p>No comments yet.</p>
          )}

          <ul className={styles.commentsList}>
            {comments.map((comment) => (
              <li key={comment.comment_id} className={styles.commentCard}>
                <p className={styles.commentBody}>{comment.body}</p>
                <p className={styles.commentMeta}>
                  <strong>{comment.author}</strong> ·{" "}
                  <time dateTime={comment.created_at}>
                    {formatDate(comment.created_at)}
                  </time>
                  {" · "}
                  <span className={styles.commentVotes}>
                    <strong>Votes:</strong> {comment.votes}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
}
