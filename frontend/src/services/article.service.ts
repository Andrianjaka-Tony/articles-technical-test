import articles from "@/public/data/articles.json";
import { Article } from "@/src/types/article.type";
import { Order } from "@/src/dtos/order.dto";

function applySearchOnArticles(articles: Article[], searchParams: string): Article[] {
  searchParams = searchParams.toLowerCase();
  return articles.filter((article) => {
    return (
      article.title.toLowerCase().includes(searchParams) ||
      article.summary.toLowerCase().includes(searchParams)
    );
  });
}

function orderArticlesByDate(articles: Article[], order: Order): Article[] {
  console.log("Order:", order);

  return [...articles].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    return order === "asc" ? dateA - dateB : dateB - dateA;
  });
}

function findAll(searchParams: string, order: Order) {
  let data = articles.map(
    (article) =>
      ({
        id: article.id,
        title: article.title,
        date: new Date(article.date),
        summary: article.summary,
      } as Article)
  );
  data = applySearchOnArticles(data, searchParams);
  data = orderArticlesByDate(data, order);

  return data;
}

export const articleService = { findAll };
