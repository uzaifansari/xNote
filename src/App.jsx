import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; //Routes used for navigating to different pages and components.
// Pages
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
