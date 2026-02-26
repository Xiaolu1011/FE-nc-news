import { useEffect, useState } from "react";
import { getArticles } from "../api/ncNewsApi";
import ArticlesList from "../components/articlesList";

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    getArticles()
      .then((articlesFromApi) => {
        console.log("articlesFromApi:", articlesFromApi);
        setArticles(articlesFromApi);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <p role="status">Loading articles...</p>;
  if (error)
    return (
      <p role="alert">
        {error?.response?.data?.msg || "Failed to load articles"}
      </p>
    );

  return (
    <main>
      <h1>All Articles</h1>
      <ArticlesList articles={articles} />
    </main>
  );
}
