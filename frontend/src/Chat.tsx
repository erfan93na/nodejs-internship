import React, { SyntheticEvent, useContext, useEffect, useState } from "react";
import { api } from "./api";
import { AppContext } from "./AppContextProvider";

interface User {
  id: string;
  username: string;
}

interface Message {
  sender_id: string;
  text: string;
  id: number;
}

function Chat() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const { username: loginedUserUsername, setUsername } =
    useContext(AppContext) ?? {};
  const loginedUserId = users.find(
    (user) => user.username === loginedUserUsername
  )?.id;
  useEffect(() => {
    api.get("/users").then((res) => setUsers(res.data));
  }, []);
  useEffect(() => {
    setUsername?.(JSON.parse(localStorage.getItem("user") ?? "null").username);
  }, []);
  const handleUserClick = async (user: User) => {
    setSelectedUser(user);
    // Fetch messages for selected user here
    const resp = await api.get(`/message/${user.id}/${loginedUserId}`);
    setMessages(resp.data);
  };
  const getUserNameById = (id: string) => users.find((user) => user.id === id);
  const handleSendMessage = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    api.post("/message/", {
      sender_id: loginedUserId,
      receiver_id: selectedUser?.id,
      text: data.get("message"),
    });
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
          {users
            .filter(({ id }) => id !== loginedUserId)
            .map((user) => (
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
                  <strong>
                    <>
                      {getUserNameById(message.sender_id)?.username}
                      {": "}
                    </>
                  </strong>
                  {message.text}
                </li>
              ))}
            </ul>
            <form onSubmit={handleSendMessage}>
              <input name="message" />
              <input type="submit" />
            </form>
          </>
        ) : (
          <p>Select a user to start chatting!</p>
        )}
      </div>
    </div>
  );
}

export default Chat;
