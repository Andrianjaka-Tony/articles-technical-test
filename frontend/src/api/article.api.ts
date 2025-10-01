import { api } from "@/src/api/base.api";
import { Order } from "@/src/dtos/order.dto";
import { Article } from "@/src/types/article.type";
import { useQuery } from "@tanstack/react-query";

async function findAll(searchQuery: string, order: Order) {
  let url = "/api/articles?";
  if (searchQuery.trim() !== "") {
    url += `query=${searchQuery}&`;
  }
  if (order === "asc") {
    url += `sort=${order}`;
  }

  const response = await api<Article[]>(url);
  return response.data;
}

export const articleApi = {
  useFindAll: (searchQuery: string, order: Order) => {
    const {
      data = [],
      isLoading,
      isError,
      error,
    } = useQuery({
      queryKey: ["articles", searchQuery, order],
      queryFn: () => findAll(searchQuery, order),
    });

    return { articles: data, isLoading, isError, error };
  },
};
