import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoadingPage from "./pages/LoadingPage";
import MenuResultPage from "./pages/MenuResultPage";
import MenuRecommendPage from "./pages/MenuRecommendPage";
import Callback from "./components/user/Callback";
import LoginPage from './pages/user/LoginPage'
import JoinPage from "./pages/user/JoinPage";
import MyPage from "./pages/user/MyPage";

const Navirouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/menu" element={<MenuRecommendPage />} />
        <Route path="/menu-result" element={<MenuResultPage />} />
        <Route path="/course" element={<LoadingPage />} />
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path='/callback' element={<Callback />} />
        <Route path="/sign-up" element={<JoinPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
      
    </div>
  );
};

export default Navirouter;
