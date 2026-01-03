import React, { useEffect, useState, useRef } from "react";
import ChatRoom from "./ChatRoom";
import InputText from "./InputText";
import UserLogin from "./UserLogin";
import socketIoClient from "socket.io-client";

function ChatContainer() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [chats, setChats] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = socketIoClient(
      import.meta.env.VITE_SOCKET_URL
    );

    socketRef.current.on("chat", (receivedChats) => {
      setChats(receivedChats);
    });

    return () => socketRef.current.disconnect();
  }, []);

  const addMessage = (chat) => {
    const newChat = {
      message: chat.message,
      user: user.name,
      avatar: user.avatar,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    socketRef.current.emit("message", newChat);
  };

  const Logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="w-full min-h-screen bg-blue-400 overflow-hidden flex flex-col">
      {user ? (
        <>
          <div className="flex justify-between items-center p-4 bg-blue-300">
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                className="w-8 h-8 rounded-full"
              />
              <h1 className="font-semibold">
                {user.name.toUpperCase()}
              </h1>
            </div>

            <button
              onClick={Logout}
              className="px-4 py-2 bg-purple-600 text-white rounded"
            >
              Logout
            </button>
          </div>

          <ChatRoom chats={chats} user={user} />
          <InputText addMessage={addMessage} />
        </>
      ) : (
        <UserLogin setUser={setUser} />
      )}
    </div>
  );
}

export default ChatContainer;
