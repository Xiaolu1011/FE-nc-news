import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getArticleById,
  getCommentsByArticleId,
  patchArticleVotes,
  postCommentByArticleId,
  deleteCommentById,
} from "../api/ncNewsApi";
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

  const [voteDelta, setVoteDelta] = useState(0);
  const [voteError, setVoteError] = useState(null);
  const [isVoting, setIsVoting] = useState(false);

  const loggedInUser = "grumpy19";

  const [newComment, setNewComment] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [postCommentError, setPostCommentError] = useState(null);

  const [deletingCommentIds, setDeletingCommentIds] = useState(new Set());
  const [deleteCommentError, setDeleteCommentError] = useState(null);

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

  function handleVote(inc) {
    setVoteError(null);
    setVoteDelta((curr) => curr + inc);
    setIsVoting(true);

    patchArticleVotes(article_id, inc)
      .catch(() => {
        setVoteDelta((curr) => curr - inc);
        setVoteError("Vote failed. Please try again.");
      })
      .finally(() => setIsVoting(false));
  }

  function handleSubmitComment(e) {
    e.preventDefault();

    const trimmed = newComment.trim();
    if (!trimmed) return;

    setIsPostingComment(true);
    setPostCommentError(null);

    const tempComment = {
      comment_id: `temp-${Date.now()}`,
      author: loggedInUser,
      body: trimmed,
      created_at: new Date().toISOString(),
      votes: 0,
      isTemp: true,
    };

    setComments((curr) => [tempComment, ...curr]);
    setNewComment("");

    postCommentByArticleId(article_id, {
      username: loggedInUser,
      body: trimmed,
    })
      .then((savedComment) => {
        setComments((curr) =>
          curr.map((c) =>
            c.comment_id === tempComment.comment_id ? savedComment : c,
          ),
        );
      })
      .catch(() => {
        setComments((curr) =>
          curr.filter((c) => c.comment_id !== tempComment.comment_id),
        );
        setNewComment(trimmed);
        setPostCommentError("Failed to post comment. Please try again.");
      })
      .finally(() => setIsPostingComment(false));
  }

  function handleDeleteComment(comment_id) {
    setDeleteCommentError(null);
    setDeletingCommentIds((curr) => new Set(curr).add(comment_id));

    deleteCommentById(comment_id)
      .then(() => {
        setComments((curr) => curr.filter((c) => c.comment_id !== comment_id));
      })
      .catch(() => {
        setDeleteCommentError("Failed to delete comment. Please try again.");
      })
      .finally(() => {
        setDeletingCommentIds((curr) => {
          const copy = new Set(curr);
          copy.delete(comment_id);
          return copy;
        });
      });
  }

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
          {}
          <div className={styles.stat}>
            <span className={styles.statLabel}>Votes:</span>

            <div className={styles.voteControls}>
              <button
                type="button"
                className={styles.voteButton}
                onClick={() => handleVote(1)}
                disabled={isVoting}
                aria-label="Upvote article"
              >
                👍
              </button>

              <span className={styles.statValue} aria-live="polite">
                {article.votes + voteDelta}
              </span>

              <button
                type="button"
                className={styles.voteButton}
                onClick={() => handleVote(-1)}
                disabled={isVoting}
                aria-label="Downvote article"
              >
                👎
              </button>
            </div>
          </div>

          {}
          <div className={styles.stat}>
            <span className={styles.statLabel}>Comments:</span>
            <span className={styles.statValue}>
              {isCommentsLoading ? "…" : comments.length}
            </span>
          </div>
        </section>

        {voteError && (
          <p className={styles.voteError} role="alert">
            {voteError}
          </p>
        )}

        <section className={styles.commentsSection} aria-label="Comments">
          <h2 className={styles.commentsTitle}>Comments</h2>

          <form className={styles.commentForm} onSubmit={handleSubmitComment}>
            <label className={styles.commentLabel} htmlFor="new-comment">
              Add a comment
            </label>

            <textarea
              id="new-comment"
              className={styles.commentTextarea}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment..."
              rows={4}
              disabled={isPostingComment}
              required
            />

            <div className={styles.commentFormActions}>
              <button
                type="submit"
                className={styles.commentSubmit}
                disabled={isPostingComment || newComment.trim().length === 0}
              >
                {isPostingComment ? "Posting..." : "Post comment"}
              </button>

              {postCommentError && (
                <p className={styles.commentError} role="alert">
                  {postCommentError}
                </p>
              )}
            </div>
          </form>

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
                {comment.author === loggedInUser && (
                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => handleDeleteComment(comment.comment_id)}
                    disabled={deletingCommentIds.has(comment.comment_id)}
                    aria-label="Delete your comment"
                  >
                    {deletingCommentIds.has(comment.comment_id)
                      ? "Deleting..."
                      : "Delete"}
                  </button>
                )}
                {deleteCommentError && (
                  <p className={styles.commentError} role="alert">
                    {deleteCommentError}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
}
