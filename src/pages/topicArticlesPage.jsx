import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticles } from "../api/ncNewsApi";
import ArticlesList from "../components/articlesList";

export default function TopicArticlesPage() {
  const { topic_slug } = useParams();

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    getArticles({ topic: topic_slug, sort_by: "created_at", order: "desc" })
      .then((articlesFromApi) => setArticles(articlesFromApi))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [topic_slug]);

  if (isLoading) return <p role="status">Loading articles...</p>;

  if (error)
    return (
      <p role="alert">
        {error?.response?.data?.msg || "Failed to load articles"}
      </p>
    );

  return (
    <main style={{ padding: "1rem", maxWidth: 900, margin: "0 auto" }}>
      <p style={{ margin: 0 }}>
        <Link to="/topics">← Back to topics</Link>
      </p>

      <h1 style={{ marginTop: "0.5rem" }}>Topic: {topic_slug}</h1>

      {articles.length === 0 ? (
        <p>No articles found for this topic.</p>
      ) : (
        <ArticlesList articles={articles} />
      )}
    </main>
  );
}
