import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export function getArticles(params = {}) {
  return ncNewsApi.get("/articles", { params }).then(({ data }) => {
    return data.articles;
  });
}
