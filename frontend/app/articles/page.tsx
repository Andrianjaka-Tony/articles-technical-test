"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Order } from "@/src/dtos/order.dto";
import { ArticlesList } from "@/src/components/articles/articles-list/articles-list";
import { articleApi } from "@/src/api/article.api";
import { ArticleNavigation } from "@/src/components/articles/article-navigation/article-navigation";
import { ArticleHeader } from "@/src/components/articles/article-header/article-header";
import { LoadingBlock } from "@/src/components/ui/loading-block/loading-block";
import { EmptyBlock } from "@/src/components/ui/empty-block/empty-block";
import { ErrorBlock } from "@/src/components/ui/error-block/error-block";
import { ChatbotModal } from "@/src/components/chatbot-modal/chatbot-modal";
import { MessageCircle } from "lucide-react";
import "./page.scss";

export default function Page() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [order, setOrder] = useState<Order>("desc");
  const [isChatOpen, setIsChatOpen] = useState<boolean>(true);

  const { articles, isLoading, isError, error } = articleApi.useFindAll(searchQuery, order);

  const count = articles?.length ?? 0;
  const hasNoResult = !isLoading && !isError && count === 0;

  const subtitle = useMemo(() => {
    if (isLoading) return "Chargement des articles…";
    if (isError) return "Un problème est survenu.";
    if (hasNoResult && searchQuery) return `Aucun résultat pour « ${searchQuery} ».`;
    return count > 0 ? `${count} article${count > 1 ? "s" : ""}` : "Aucun article";
  }, [isLoading, isError, hasNoResult, count, searchQuery]);

  const onRetry = () => {
    router.refresh();
  };

  const onClearFilters = () => {
    setSearchQuery("");
    setOrder("desc");
    router.refresh();
  };

  return (
    <div className="p-4 md:p-6 space-y-4">
      <ArticleHeader subtitle={subtitle} />
      <ArticleNavigation
        search={{
          state: searchQuery,
          setState: isLoading ? () => {} : setSearchQuery,
        }}
        order={{
          state: order,
          setState: isLoading ? () => {} : setOrder,
        }}
      />

      {isLoading && <LoadingBlock />}
      {isError && (
        <ErrorBlock
          message={error instanceof Error ? error.message : "Erreur inconnue"}
          onRetry={onRetry}
        />
      )}

      {hasNoResult && <EmptyBlock onClear={onClearFilters} query={searchQuery} />}
      {!isLoading && !isError && count > 0 && <ArticlesList articles={articles} />}

      <button
        onClick={() => setIsChatOpen(true)}
        className="chatbot-modal-trigger"
        aria-haspopup="dialog"
        aria-controls="chatbot-modal"
        aria-expanded={isChatOpen}
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        <span>Chat</span>
      </button>
      <ChatbotModal open={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}
