import ArticleCard from "./articleCard";
import styles from "./articlesList.module.css";

export default function ArticlesList({ articles = [] }) {
  return (
    <section className={styles.list} aria-label="Articles">
      {articles.map((article) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
    </section>
  );
}
