import { Link, useLocation } from "react-router-dom";

export default function NotFoundPage() {
  const location = useLocation();

  return (
    <main style={{ padding: "1rem", maxWidth: 900, margin: "0 auto" }}>
      <h1>Page not found</h1>
      <p>
        We couldn’t find <code>{location.pathname}</code>.
      </p>
      <p>
        <Link to="/articles">Go back to All Articles</Link>
      </p>
    </main>
  );
}
