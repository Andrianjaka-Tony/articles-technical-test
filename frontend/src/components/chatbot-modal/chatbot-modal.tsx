"use client";

import React, { useEffect, useRef, useState } from "react";
import { X, Send, MessageSquare, Loader2 } from "lucide-react";
import "./chatbot-modal.scss";

type ChatResponse = { answer: string; sources: string[] };

type ChatbotModalProps = {
  open: boolean;
  onClose: () => void;
};

const API_URL = process.env.NEXT_PUBLIC_CHATBOT_API_URL || "http://localhost:8001/chat";

export function ChatbotModal({ open, onClose }: ChatbotModalProps) {
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [sources, setSources] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [open, onClose]);

  const ask = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setError(null);
    setAnswer(null);
    setSources(null);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `HTTP ${res.status}`);
      }
      const data = (await res.json()) as ChatResponse;
      setAnswer(data.answer);
      setSources(data.sources);
    } catch (e: any) {
      setError(e?.message ?? "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    ask();
  };

  if (!open) return null;

  return (
    <div
      className="chatbot-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="chatbot-modal-title"
    >
      <div className="chatbot-modal-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="chatbot-modal-card" role="document">
        <div className="chatbot-modal-header">
          <div className="chatbot-modal-titlewrap">
            <MessageSquare className="chatbot-modal-title-icon" aria-hidden="true" />
            <h2 id="chatbot-modal-title" className="chatbot-modal-title">
              Assistant Finance
            </h2>
          </div>
          <button
            ref={closeBtnRef}
            className="chatbot-modal-close"
            onClick={onClose}
            aria-label="Fermer"
          >
            <X className="chatbot-modal-close-icon" aria-hidden="true" />
          </button>
        </div>

        <div className="chatbot-modal-body">
          <form onSubmit={onSubmit} className="chatbot-modal-form">
            <input
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder='Pose ta question (ex: "Qu’est-ce que l’EBITDA ?")'
              className="chatbot-modal-input"
              disabled={loading}
            />
            <button
              type="submit"
              className="chatbot-modal-send"
              disabled={loading || !message.trim()}
            >
              {loading ? (
                <Loader2 className="chatbot-modal-send-icon chatbot-modal-send-icon--spin" />
              ) : (
                <Send className="chatbot-modal-send-icon" />
              )}
              <span className="chatbot-modal-send-text">Envoyer</span>
            </button>
          </form>

          <div className="chatbot-modal-output" aria-live="polite" aria-atomic="true">
            {error && (
              <div className="chatbot-modal-error">
                <p className="chatbot-modal-error-text">Erreur : {error}</p>
                <button className="chatbot-modal-error-retry" onClick={ask}>
                  Réessayer
                </button>
              </div>
            )}

            {answer && (
              <div className="chatbot-modal-answer">
                <p className="chatbot-modal-answer-text">{answer}</p>
                {!!sources?.length && (
                  <p className="chatbot-modal-answer-sources">Sources : {sources.join(", ")}</p>
                )}
              </div>
            )}

            {!answer && !error && (
              <div className="chatbot-modal-hint">
                <p className="chatbot-modal-hint-text">
                  Exemples : “Qu’est-ce que la marge brute ?”, “Différence OPEX vs CAPEX ?”
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
