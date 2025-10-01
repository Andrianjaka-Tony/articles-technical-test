import React from "react";
import { Loader2 } from "lucide-react";
import "./loading-block.scss";

export function LoadingBlock() {
  return (
    <div className="loading-block" role="status" aria-live="polite">
      <Loader2 className="loading-block-icon" aria-hidden="true" />
      <p className="loading-block-text">Chargement…</p>
    </div>
  );
}
