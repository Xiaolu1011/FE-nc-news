import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import AllArticlesPages from "./pages/allArticlesPages";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/articles" replace />} />
      <Route path="/articles" element={<AllArticlesPages />} />
    </Routes>
  );
}
