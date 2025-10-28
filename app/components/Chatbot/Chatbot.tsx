"use client";

import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { sendChatMessage } from "./ChatbotActions";
import MessageBubble from "./MessageBubble";
import { Message, UserType } from "./types";

const Chatbot = () => {
  // Generate a unique session ID for the chat session that persists across re-renders
  const sessionId = useRef<string>(uuidv4()).current;

  const [messages, setMessages] = useState<Message[]>([
    {
      type: UserType.AI,
      content: "Hello! I'm your AI assistant. How can I help you today?",
    },
  ]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const newMessage: Message = {
      type: UserType.USER,
      content: inputValue,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setIsLoading(true);

    const aiResponse = await sendChatMessage(newMessage, sessionId);
    if (aiResponse) {
      setMessages((prev) => [...prev, aiResponse]);
    }

    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="flex h-full items-center justify-center text-base-content/50">
            <p className="text-sm">Start a conversation...</p>
          </div>
        )}
        {messages.map((msg, index) => (
          <MessageBubble key={index} {...msg} />
        ))}
        {isLoading && (
          <div className="chat chat-start">
            <div className="chat-bubble">
              <span className="loading loading-dots loading-sm"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-base-300 bg-base-100 p-3">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            className="input input-bordered flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className="btn btn-primary btn-sm px-6"
            aria-label="Send message"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
