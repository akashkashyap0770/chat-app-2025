import React, { useEffect, useRef } from "react";

function ChatRoom({ chats, user }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  return (
    <div className="flex flex-col gap-y-4 px-4 py-4 overflow-y-auto overflow-x-hidden max-h-[calc(100vh-160px)]">
      {chats.map((chat, index) => {
        const isSender = chat.user === user.name;

        return (
          <div
            key={index}
            className={`flex items-start w-full ${
              isSender ? "justify-end" : "justify-start"
            }`}
          >
            {/* Avatar for other users */}
            {!isSender && (
              <img
                src={chat.avatar}
                alt="avatar"
                className="h-8 w-8 rounded-full border border-purple-500 mr-2 shrink-0"
              />
            )}

            <div className="flex flex-col gap-1 max-w-[70%] sm:max-w-[75%]">
              {/* User name for other users */}
              {!isSender && (
                <span className="text-xs text-white font-medium ml-1">
                  {chat.user}
                </span>
              )}

              {/* Message bubble */}
              <div
                className={`p-2 sm:p-3 rounded-xl text-white shadow-md break-words whitespace-pre-wrap ${
                  isSender
                    ? "bg-green-500 rounded-bl-none"
                    : "bg-purple-600 rounded-br-none"
                }`}
              >
                {chat.message}
              </div>

              {/* Message time */}
              <span className="text-[10px] sm:text-xs text-white opacity-60 mt-1">
                {chat.time}
              </span>
            </div>

            {/* Avatar for the sender */}
            {isSender && (
              <img
                src={chat.avatar}
                alt="avatar"
                className="h-8 w-8 rounded-full border border-green-500 ml-2 shrink-0"
              />
            )}
          </div>
        );
      })}
      {/* Scroll to the latest message */}
      <div ref={scrollRef} />
    </div>
  );
}

export default ChatRoom; // Default export
