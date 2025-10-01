import React from "react";
import { Inbox } from "lucide-react";
import "./empty-block.scss";

type EmptyBlockProps = {
  query?: string;
  onClear: () => void;
};
export function EmptyBlock({ query, onClear }: EmptyBlockProps) {
  return (
    <div className="empty-block">
      <Inbox className="empty-block-icon" aria-hidden="true" />
      <p className="empty-block-title">Rien à afficher</p>
      <p className="empty-block-text">
        {query ? (
          <>
            Aucun article ne correspond à <span className="empty-block-query">“{query}”</span>.
          </>
        ) : (
          "Aucun article disponible pour le moment."
        )}
      </p>
      <div className="empty-block-actions">
        <button onClick={onClear} className="empty-block-button">
          Réinitialiser les filtres
        </button>
      </div>
    </div>
  );
}
