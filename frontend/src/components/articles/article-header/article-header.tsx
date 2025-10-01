import React from "react";
import "./article-header.scss";

type ArticleHeaderProps = {
  subtitle: string;
};
export function ArticleHeader({ subtitle }: ArticleHeaderProps) {
  return (
    <div className="article-header">
      <h1 className="article-header-title">Articles</h1>
      <p className="article-header-subtitle">{subtitle}</p>
    </div>
  );
}
