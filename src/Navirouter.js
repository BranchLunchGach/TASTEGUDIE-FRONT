import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/commons/Home";
import MainPage from "./pages/MainPage";
import Header from "./components/layouts/Header";
import LoadingPage from "./pages/LoadingPage";

const Navirouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/menu" element={<LoadingPage />} />
        <Route path="/course" element={<LoadingPage />} />
        <Route path="/sign-in" element={<LoadingPage />} />
      </Routes>
    </div>
  );
};

export default Navirouter;
