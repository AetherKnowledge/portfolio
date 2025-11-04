import ReactMarkdown from "react-markdown";
import { Message, UserType } from "./types";

const MessageBubble = ({
  message,
  loading,
}: {
  message: Message;
  loading: boolean;
}) => {
  const isUser = message.type === UserType.USER;
  const chatPosition = isUser ? "chat chat-end" : "chat chat-start";
  const bubbleColor = isUser ? "chat-bubble-primary" : "chat-bubble";

  return (
    <div className={chatPosition}>
      <div className="chat-image avatar">
        <div className="w-8 h-8 rounded-full bg-base-300 flex">
          {isUser ? (
            <div className="flex items-center justify-center w-full h-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-base-content"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-primary"
              >
                <path d="M16.5 7.5h-9v9h9v-9z" />
                <path
                  fillRule="evenodd"
                  d="M8.25 2.25A.75.75 0 019 3v.75h2.25V3a.75.75 0 011.5 0v.75H15V3a.75.75 0 011.5 0v.75h.75a3 3 0 013 3v.75H21A.75.75 0 0121 9h-.75v2.25H21a.75.75 0 010 1.5h-.75V15H21a.75.75 0 010 1.5h-.75v.75a3 3 0 01-3 3h-.75V21a.75.75 0 01-1.5 0v-.75h-2.25V21a.75.75 0 01-1.5 0v-.75H9V21a.75.75 0 01-1.5 0v-.75h-.75a3 3 0 01-3-3v-.75H3A.75.75 0 013 15h.75v-2.25H3a.75.75 0 010-1.5h.75V9H3a.75.75 0 010-1.5h.75v-.75a3 3 0 013-3h.75V3a.75.75 0 01.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
      <div
        className={`chat-bubble ${bubbleColor} prose prose-sm max-w-xs break-words`}
      >
        {loading ? (
          <span className="loading loading-dots loading-sm"></span>
        ) : (
          <ReactMarkdown>{message.content}</ReactMarkdown>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
