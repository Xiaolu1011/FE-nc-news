import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export function getArticles(params = {}) {
  return ncNewsApi.get("/articles", { params }).then(({ data }) => {
    return data.articles;
  });
}

export function getArticleById(article_id) {
  return ncNewsApi.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
}

export function getCommentsByArticleId(article_id) {
  return ncNewsApi.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data.comments;
  });
}

export function patchArticleVotes(article_id, inc_votes) {
  return ncNewsApi
    .patch(`/articles/${article_id}`, { inc_votes })
    .then(({ data }) => data.article);
}

export function postCommentByArticleId(article_id, newComment) {
  return ncNewsApi
    .post(`/articles/${article_id}/comments`, newComment)
    .then(({ data }) => data.comment);
}

export function deleteCommentById(comment_id) {
  return ncNewsApi.delete(`/comments/${comment_id}`);
}
