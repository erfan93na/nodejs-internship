import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "./api";

function SignIn() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    api
      .post("/auth/signin", {
        ...Object.fromEntries(new FormData(event.target as HTMLFormElement)),
      })
      .then((res) => {
        if (res.status === 200) {
          const { token } = res.data;
          localStorage.setItem("token", token);
          navigate("/");
        }
      })
      .catch((e) =>
        toast.error(
          e?.response?.data ?? e.request ?? e.message ?? "Something went wrong"
        )
      );
  };
  const navigate = useNavigate();
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1 style={{ marginBottom: "1rem" }}>Sign In</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <label style={{ marginBottom: "0.5rem" }}>
          Username:
          <input
            type="username"
            name="username"
            required
            style={{
              marginLeft: "0.5rem",
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid gray",
            }}
          />
        </label>
        <label style={{ marginBottom: "0.5rem" }}>
          Password:
          <input
            type="password"
            name="password"
            required
            style={{
              marginLeft: "0.5rem",
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid gray",
            }}
          />
        </label>
        <button
          type="submit"
          style={{
            marginTop: "1rem",
            padding: "0.5rem",
            borderRadius: "4px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
          }}
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignIn;
