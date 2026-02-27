import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../api/ncNewsApi";

export default function TopicsPage() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    getTopics()
      .then((topicsFromApi) => setTopics(topicsFromApi))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <p role="status">Loading topics...</p>;
  if (error)
    return (
      <p role="alert">
        {error?.response?.data?.msg || "Failed to load topics"}
      </p>
    );

  return (
    <main style={{ padding: "1rem", maxWidth: 900, margin: "0 auto" }}>
      <h1>Topics</h1>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: "1rem 0",
          display: "grid",
          gap: "0.75rem",
        }}
      >
        {topics.map((topic) => (
          <li
            key={topic.slug}
            style={{
              border: "1px solid #e5e5e5",
              borderRadius: 12,
              padding: "0.75rem 1rem",
            }}
          >
            <Link
              to={`/topics/${topic.slug}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <strong>{topic.slug}</strong>
              <p style={{ margin: "0.25rem 0 0", color: "#555" }}>
                {topic.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
