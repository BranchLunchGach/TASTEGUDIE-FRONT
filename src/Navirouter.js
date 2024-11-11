import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/user/LoginPage";
import JoinPage from "./pages/user/JoinPage";
import MenuRecommendPage from "./pages/MenuRecommendPage";
import MenuResultPage from "./pages/MenuResultPage";
import Callback from "./components/user/Callback";

const Navirouter = () => {
  return (
    <div>
      <Routes>
          <Route path='/' element={<MainPage />} />
          { <Route path='/login' element={<LoginPage />} /> } 
          { <Route path='/join' element={<JoinPage />} /> } 
          <Route path='menu' element={<MenuRecommendPage />} />
          <Route path='/menu-result' element={<MenuResultPage />} />
          <Route path='/callback' element={<Callback />} />
        </Routes>
    </div>
  );
};

export default Navirouter;
