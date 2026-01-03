import React, { useState } from "react";
import { IoSend } from "react-icons/io5";

function InputText({ addMessage }) {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!message.trim()) return;

    addMessage({ message: message.trim() });
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-blue-100 p-3 flex gap-2 shadow-md">
      <textarea
        rows={1}
        value={message}
        placeholder="Type a message..."
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 resize-none p-2 rounded border border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <button
        onClick={sendMessage}
        disabled={!message.trim()}
        className="bg-purple-600 disabled:bg-purple-300 text-white p-3 rounded-full"
      >
        <IoSend />
      </button>
    </div>
  );
}

export default InputText;
