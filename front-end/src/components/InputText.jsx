import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";

function InputText({ addMessage }) {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (!message.trim()) return;
    addMessage({ message });
    setMessage('');
  };

  return (
    <div className="w-full fixed bottom-0 left-0 bg-blue-100 px-4 sm:px-10 md:px-20 py-2 sm:py-3 flex items-center gap-2 md:gap-4 shadow-inner z-10">
    <textarea
      rows="1"
      value={message}
      placeholder="Type your message..."
      className="flex-1 h-12 resize-none rounded-md px-4 py-2 text-black border border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
    />
    <button
      className="h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white rounded-full"
      onClick={sendMessage}
    >
      <IoSend className="text-lg sm:text-xl" />
    </button>
  </div>  
  );
}

export default InputText;
