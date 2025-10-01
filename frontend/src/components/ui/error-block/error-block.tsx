import React from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import "./error-block.scss";

type ErrorBlockProps = {
  message: string;
  onRetry: () => void;
};

export function ErrorBlock({ message, onRetry }: ErrorBlockProps) {
  return (
    <div className="error-block">
      <div className="error-block-content">
        <AlertCircle className="error-block-icon" aria-hidden="true" />
        <div className="error-block-body">
          <p className="error-block-title">Impossible de charger les articles</p>
          <p className="error-block-message">{message}</p>
          <div className="error-block-actions">
            <button onClick={onRetry} className="error-block-button">
              <Loader2 className="error-block-button-icon" aria-hidden="true" />
              Réessayer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
