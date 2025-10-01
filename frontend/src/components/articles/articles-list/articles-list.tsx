import React from "react";
import { Article } from "@/src/types/article.type";
import { ArticleCard } from "@/src/components/articles/article-card/articles-card";
import "./articles-list.scss";

type ArticlesListProps = {
  articles: Article[];
};
export function ArticlesList({ articles }: ArticlesListProps) {
  return (
    <div className="articles-list">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
