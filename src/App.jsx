import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import AllArticlesPages from "./pages/allArticlesPages";
import ArticlePage from "./pages/ArticlePage";
import TopicsPage from "./pages/topicsPage";
import TopicArticlesPage from "./pages/topicArticlesPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/articles" replace />} />
      <Route path="/articles" element={<AllArticlesPages />} />
      <Route path="/articles/:article_id" element={<ArticlePage />} />
      <Route path="*" element={<p>404 - Page not found</p>} />
      <Route path="/topics" element={<TopicsPage />} />
      <Route path="/topics/:topic_slug" element={<TopicArticlesPage />} />
    </Routes>
  );
}
