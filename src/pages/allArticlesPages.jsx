// import { useEffect, useState } from "react";
// import { getArticles } from "../api/ncNewsApi";
// import ArticlesList from "../components/articlesList";

// export default function ArticlesPage() {
//   const [articles, setArticles] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     setIsLoading(true);
//     setError(null);

//     getArticles()
//       .then((articlesFromApi) => {
//         console.log("articlesFromApi:", articlesFromApi);
//         setArticles(articlesFromApi);
//       })
//       .catch((err) => {
//         setError(err);
//       })
//       .finally(() => setIsLoading(false));
//   }, []);

//   if (isLoading) return <p role="status">Loading articles...</p>;
//   if (error)
//     return (
//       <p role="alert">
//         {error?.response?.data?.msg || "Failed to load articles"}
//       </p>
//     );

//   return (
//     <main>
//       <h1>All Articles</h1>
//       <ArticlesList articles={articles} />
//     </main>
//   );
// }
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getArticles } from "../api/ncNewsApi";
import ArticlesList from "../components/articlesList";

export default function AllArticlesPages() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    getArticles({ sort_by: sortBy, order })
      .then((articlesFromApi) => {
        setArticles(articlesFromApi);
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [sortBy, order]);

  function handleSortByChange(e) {
    const newSortBy = e.target.value;
    const next = new URLSearchParams(searchParams);
    next.set("sort_by", newSortBy);
    setSearchParams(next);
  }

  function handleToggleOrder() {
    const nextOrder = order === "asc" ? "desc" : "asc";
    const next = new URLSearchParams(searchParams);
    next.set("order", nextOrder);
    setSearchParams(next);
  }

  if (isLoading) return <p role="status">Loading articles...</p>;

  if (error)
    return (
      <p role="alert">
        {error?.response?.data?.msg || "Failed to load articles"}
      </p>
    );

  return (
    <main style={{ padding: "1rem", maxWidth: 900, margin: "0 auto" }}>
      <h1>All Articles</h1>
      <section
        aria-label="Sort controls"
        style={{
          display: "flex",
          gap: "0.75rem",
          alignItems: "center",
          flexWrap: "wrap",
          margin: "1rem 0",
        }}
      >
        <label>
          Sort by{" "}
          <select value={sortBy} onChange={handleSortByChange}>
            <option value="created_at">Date</option>
            <option value="comment_count">Comment count</option>
            <option value="votes">Votes</option>
          </select>
        </label>

        <button
          type="button"
          onClick={handleToggleOrder}
          aria-label="Toggle sort order"
        >
          Order: {order === "asc" ? "Ascending" : "Descending"}
        </button>
      </section>

      <ArticlesList articles={articles} />
    </main>
  );
}
