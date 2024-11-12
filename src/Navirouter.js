import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoadingPage from "./pages/LoadingPage";
import MenuResultPage from "./pages/MenuResultPage";
import MenuRecommendPage from "./pages/MenuRecommendPage";
import LoginPage from "./pages/user/LoginPage";
import JoinPage from "./pages/user/JoinPage";
import MyPage from "./pages/user/MyPage";

// merge conflict 해결
// =======
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import MainPage from "./pages/MainPage";
// import LoginPage from "./pages/user/LoginPage";
// import JoinPage from "./pages/user/JoinPage";
// import MenuRecommendPage from "./pages/MenuRecommendPage";
// import MenuResultPage from "./pages/MenuResultPage";
// >>>>>>> 494bd93984936dc09e1e2974348fc548bfd6b641
//import Callback from "./components/user/Callback";

const Navirouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/menu" element={<MenuRecommendPage />} />
        <Route path="/menu-result" element={<MenuResultPage />} />
        <Route path="/course" element={<LoadingPage />} />
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<JoinPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
      {/* merge conflict 해결 */}
      {/* 
          <Route path='/' element={<MainPage />} />
          { <Route path='/login' element={<LoginPage />} /> } 
          { <Route path='/join' element={<JoinPage />} /> } 
          <Route path='menu' element={<MenuRecommendPage />} />
          <Route path='/menu-result' element={<MenuResultPage />} />
          <Route path='/callback' element={<Callback />} />
        </Routes> */}
    </div>
  );
};

export default Navirouter;
