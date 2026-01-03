import React, { useState } from "react";
import { BsWechat } from "react-icons/bs";
import _ from "lodash";

function UserLogin({ setUser }) {
  const [username, setUserName] = useState("");

  const handleUser = () => {
    if (!username) return;

    const userData = {
      name: username,
      avatar: `https://api.dicebear.com/8.x/adventurer/svg?seed=${_.random(1, 1000)}`
    };

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    existingUsers.push(userData);
    localStorage.setItem("users", JSON.stringify(existingUsers));
    localStorage.setItem("user", JSON.stringify(userData)); // Save user as JSON

    setUser(userData);
  };

  return (
    <div className="h-screen flex justify-center items-center p-5">
      <div className="w-full max-w-md sm:max-w-xl bg-amber-200 p-6 sm:p-10 flex flex-col gap-6 rounded-md shadow-lg">
        <div className="flex justify-center items-center gap-2 text-2xl sm:text-3xl font-semibold">
          <BsWechat className="text-purple-600" />
          <h1>Chap-App</h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Enter a unique name"
            value={username}
            className="py-2 px-4 text-purple-600 bg-purple-200 outline-none shadow-inner rounded-md w-full"
            onChange={(e) => setUserName(e.target.value)}
          />
          <button
            className="py-2 px-6 text-white bg-purple-600 rounded-md w-full sm:w-auto"
            onClick={handleUser}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
