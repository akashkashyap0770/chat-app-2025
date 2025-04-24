import React, { useEffect, useRef } from "react";

function ChatRoom({ chats, user }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  return (
    <div className="flex flex-col gap-y-4 px-2 py-4 overflow-y-auto overflow-x-hidden max-h-[calc(100vh-160px)] md:px-4">
      {chats.map((chat, index) => {
        const isSender = chat.user === user.name;

        return (
          <div
            key={index}
            className={`flex items-start w-full ${
              isSender ? "justify-end" : "justify-start"
            }`}
          >
            {!isSender && (
              <img
                src={chat.avatar}
                alt="avatar"
                className="h-8 w-8 rounded-full border border-purple-500 mr-2 shrink-0"
              />
            )}

            <div className="flex flex-col gap-1 max-w-[75%]">
              {!isSender && (
                <span className="text-xs text-white font-medium ml-1">
                  {chat.user}
                </span>
              )}

              <div
                className={`p-3 rounded-2xl text-white shadow-md break-words whitespace-pre-wrap w-fit ${
                  isSender
                    ? "bg-green-500 rounded-bl-none self-end"
                    : "bg-purple-600 rounded-br-none self-start"
                }`}
              >
                {chat.message}
              </div>

              <span className="text-[11px] sm:text-xs text-white opacity-60 mt-1">
                {chat.time}
              </span>
            </div>

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
      <div ref={scrollRef} />
    </div>
  );
}

export default ChatRoom; // Default export
