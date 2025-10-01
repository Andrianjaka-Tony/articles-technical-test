import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Search, SortDesc, SortAsc } from "lucide-react";
import { Order } from "@/src/dtos/order.dto";
import "./article-navigation.scss";

type ArticleNavigationProps = {
  search: {
    state: string;
    setState: Dispatch<SetStateAction<string>>;
  };
  order: {
    state: string;
    setState: Dispatch<SetStateAction<Order>>;
  };
};
export function ArticleNavigation({ search, order }: ArticleNavigationProps) {
  const handleOrdersClick = (newOrder: Order) => {
    if (order.state === newOrder) return;
    order.setState(newOrder);
  };

  return (
    <div className="article-navigation">
      <div className="article-navigation-search-bar">
        <Search />
        <input
          type="text"
          placeholder="Effectuer une recherche"
          value={search.state}
          onChange={(event: ChangeEvent<HTMLInputElement>) => search.setState(event.target.value)}
        />
      </div>

      <button
        data-active={order.state === "desc"}
        className="article-navigation-sort-btn"
        onClick={() => handleOrdersClick("desc")}
      >
        <SortDesc />
      </button>
      <button
        data-active={order.state === "asc"}
        className="article-navigation-sort-btn"
        onClick={() => handleOrdersClick("asc")}
      >
        <SortAsc />
      </button>
    </div>
  );
}
