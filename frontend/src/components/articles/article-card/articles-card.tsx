import React from "react";
import { Article } from "@/src/types/article.type";
import { formatDate } from "@/src/utils/format.util";
import "./article-card.scss";

type ArticleCardProps = {
  article: Article;
};
export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="article-card">
      <p className="article-card-date">{formatDate(article.date)}</p>
      <h3 className="article-card-title">{article.title}</h3>
      <p className="article-card-summary">{article.summary}</p>
    </div>
  );
}
