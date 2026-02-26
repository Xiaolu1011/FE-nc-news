import styles from "./articleCard.module.css";

function formatDate(iso) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(d);
}

export default function ArticleCard({ article }) {
  const {
    title,
    author,
    topic,
    created_at,
    votes,
    comment_count,
    article_img_url,
  } = article;

  return (
    <article className={styles.card}>
      {article_img_url ? (
        <img
          className={styles.image}
          src={article_img_url}
          alt={`Thumbnail for ${title}`}
          loading="lazy"
        />
      ) : (
        <div className={styles.imageFallback} aria-hidden="true" />
      )}

      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>

        <p className={styles.meta}>
          <span>
            <strong>Author:</strong> {author}
          </span>{" "}
          ·{" "}
          <span>
            <strong>Topic:</strong> {topic}
          </span>
        </p>

        <p className={styles.meta}>
          <span>
            <strong>Votes:</strong> {votes}
          </span>{" "}
          ·{" "}
          <span>
            <strong>Comments:</strong> {comment_count}
          </span>
        </p>

        <p className={styles.meta}>
          <strong>Published:</strong> {formatDate(created_at)}
        </p>
      </div>
    </article>
  );
}
