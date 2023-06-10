import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "./api";

function SignUp() {
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    api
      .post("/auth/signup", {
        ...Object.fromEntries(new FormData(event.target as HTMLFormElement)),
      })
      .then((res) => {
        toast(res.data);
        navigate("/signin");
      })
      .catch((e) =>
        toast.error(
          e?.response?.data ?? e.request ?? e.message ?? "Something went wrong"
        )
      );
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1 style={{ marginBottom: "1rem" }}>Sign Up</h1>
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
          Full Name:
          <input
            type="text"
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
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
