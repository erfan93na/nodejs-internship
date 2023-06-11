import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Chat from "./Chat";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { ToastContainer } from "react-toastify";
import { AppContextProvider } from "./AppContextProvider";

function App() {
  return (
    <AppContextProvider>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </AppContextProvider>
  );
}

export default App;
