"use client";

import { useEffect, useRef, useState } from "react";
import Chatbot from "./Chatbot";

export default function FloatingChatbotButton() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        btnRef.current &&
        !btnRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  // Trap focus to the panel when opened
  useEffect(() => {
    if (open) {
      // focus the first focusable in panel or the panel itself
      const focusable = panelRef.current?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      (focusable ?? panelRef.current)?.focus?.();
    }
  }, [open]);

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[1000]">
      {/* Launcher Button */}
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="floating-chatbot-panel"
        onClick={() => setOpen((v) => !v)}
        className="btn btn-circle btn-lg pointer-events-auto bg-gradient-to-br from-primary to-secondary border-none text-primary-content shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200"
        title={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
            <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
          </svg>
        )}
        <span className="sr-only">{open ? "Close chat" : "Open chat"}</span>
      </button>

      {/* Chat Panel (kept mounted to preserve session) */}
      <div
        id="floating-chatbot-panel"
        role="dialog"
        aria-modal={open}
        aria-hidden={!open}
        ref={panelRef}
        className={`pointer-events-auto absolute bottom-16 right-0 flex h-[500px] w-[90vw] max-w-md flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-2xl outline-none ${
          open ? "" : "hidden"
        }`}
        tabIndex={-1}
      >
        <div className="flex items-center justify-between border-b border-base-300 bg-gradient-to-r from-primary to-secondary px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-primary-content/20 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-primary-content"
                >
                  <path d="M16.5 7.5h-9v9h9v-9z" />
                  <path
                    fillRule="evenodd"
                    d="M8.25 2.25A.75.75 0 019 3v.75h2.25V3a.75.75 0 011.5 0v.75H15V3a.75.75 0 011.5 0v.75h.75a3 3 0 013 3v.75H21A.75.75 0 0121 9h-.75v2.25H21a.75.75 0 010 1.5h-.75V15H21a.75.75 0 010 1.5h-.75v.75a3 3 0 01-3 3h-.75V21a.75.75 0 01-1.5 0v-.75h-2.25V21a.75.75 0 01-1.5 0v-.75H9V21a.75.75 0 01-1.5 0v-.75h-.75a3 3 0 01-3-3v-.75H3A.75.75 0 013 15h.75v-2.25H3a.75.75 0 010-1.5h.75V9H3a.75.75 0 010-1.5h.75v-.75a3 3 0 013-3h.75V3a.75.75 0 01.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full border-2 border-primary"></span>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-primary-content">
                AI Assistant
              </h2>
              <p className="text-xs text-primary-content/80">Online</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="btn btn-ghost btn-sm btn-circle text-primary-content hover:bg-primary-content/20"
            aria-label="Close chat"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="min-h-0 flex-1 bg-base-200/50">
          <Chatbot />
        </div>
      </div>
    </div>
  );
}
