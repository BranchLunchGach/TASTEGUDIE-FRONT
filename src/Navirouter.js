import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoadingPage from "./pages/LoadingPage";
import MenuResultPage from "./pages/MenuResultPage";
import MenuRecommendPage from "./pages/MenuRecommendPage";
import Callback from "./components/user/Callback";
import LoginPage from "./pages/user/LoginPage";
import JoinPage from "./pages/user/JoinPage";
import FindIDPWDPage from "./pages/user/FindIDPWDPage";

import Hello from "./pages/Hello";
import ListArea from "./components/api/ListArea"
import HelloResultPage from "./pages/HelloResultPage";
import ResRecommResultPage from "./pages/restaurent/ResRecommResultPage";
import ChoiceListPage from "./pages/ChoiceListPage";
import MyPage from "./pages/user/MyPage";
import AiPage from "./components/AI/AiPage";
import ResDetail from "./components/restaurant/ResDetail";
import ChartPage from "./pages/user/ChartPage";
import ResCompletePage from "./pages/restaurent/ResCompletePage";
import LodingPage2 from "./pages/LodingPage2";

const Navirouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/menu" element={<MenuRecommendPage />} />
        <Route path="/choice" element={<ChoiceListPage />} />
        <Route path="/menu-result" element={<MenuResultPage />} />
        <Route path="/course" element={<LoadingPage />} />
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/sign-up" element={<JoinPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/hello" element={<Hello />} />
        <Route path="/naverapitest" element={<ListArea />} />
        <Route path="/hello/result" element={<ResRecommResultPage />} />
        <Route path="/find" element={<FindIDPWDPage />} />
        <Route path="/ai" element={<AiPage />} />
        <Route path="/chart" element={<ChartPage />} />
        <Route path="/hello/complete" element={<ResCompletePage/>} />
        <Route path="/test" element={<LodingPage2/>} />
      </Routes>
    </div>
  );
};

export default Navirouter;
