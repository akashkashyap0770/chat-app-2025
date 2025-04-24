import React, { useEffect, useState, useRef } from "react";
import ChatRoom from "./ChatRoom"; // Default import for ChatRoom
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
    socketRef.current = socketIoClient("http://localhost:3001");

    socketRef.current.on("chat", (receivedChats) => {
      setChats(receivedChats);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendToSocket = (chatList) => {
    socketRef.current.emit("chat", chatList);
  };

  const addMessage = (chat) => {
    const newChat = {
      ...chat,
      user: user.name,
      avatar: user.avatar,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updatedChats = [...chats, newChat];
    setChats(updatedChats);
    sendToSocket(updatedChats);
  };

  const Logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="w-full min-h-screen bg-blue-400 overflow-hidden flex flex-col">
  {user ? (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 p-4 bg-blue-300 shadow">
        <div className="flex items-center gap-3">
          <img
            src={user.avatar}
            alt="Avatar"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-purple-600"
          />
          <h1 className="text-base sm:text-lg md:text-xl">
            Username: <span className="font-semibold text-purple-600">{user.name.toUpperCase()}</span>
          </h1>
        </div>
        <button
          className="py-2 px-4 sm:px-6 text-sm sm:text-base text-white bg-purple-600 hover:bg-purple-700 rounded-md"
          onClick={Logout}
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
