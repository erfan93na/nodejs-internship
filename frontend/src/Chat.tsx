import React, { useEffect, useState } from "react";
import { api } from "./api";

interface User {
  id: number;
  username: string;
}

interface Message {
  id: number;
  sender: string;
  content: string;
}

function Chat() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    api.get("/users").then((res) => setUsers(res.data));
  }, []);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    // Fetch messages for selected user here
    setMessages([
      { id: 1, sender: "Alice", content: "Hi Bob, how are you?" },
      { id: 2, sender: "Bob", content: "I'm good, thanks for asking!" },
      { id: 3, sender: "Alice", content: "That's great to hear." },
    ]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
      <div
        style={{
          flex: 1,
          backgroundColor: "#f0f0f0",
          padding: "1rem",
          overflowY: "scroll",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>Users</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {users.map((user) => (
            <li key={user.id} style={{ marginBottom: "0.5rem" }}>
              <button
                onClick={() => handleUserClick(user)}
                style={{
                  padding: "0.5rem",
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor:
                    selectedUser?.id === user.id ? "blue" : "white",
                  color: selectedUser?.id === user.id ? "white" : "black",
                  cursor: "pointer",
                }}
              >
                {user.username}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div
        style={{
          flex: 3,
          backgroundColor: "#fff",
          padding: "1rem",
          overflowY: "scroll",
        }}
      >
        {selectedUser ? (
          <>
            <h2 style={{ marginBottom: "1rem" }}>{selectedUser.username}</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {messages.map((message) => (
                <li key={message.id} style={{ marginBottom: "0.5rem" }}>
                  <strong>{message.sender}:</strong> {message.content}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>Select a user to start chatting!</p>
        )}
      </div>
    </div>
  );
}

export default Chat;
