import React from "react";
import Home from "../components/commons/Home";
import BackSpace from "../components/commons/BackSpace";
import ".//MenuResultPage.css";
import Retry from "../components/commons/Retry";
import styled from "styled-components";

const StyledPage = styled.div`
  width: 100%;
  height: 100vh;
  background: url("/img-bg-1.png");
  background-size: cover;
  background-position-y: -100px;
`;

const MenuResultPage = () => {
  return (
    <StyledPage className="menu-result-page">
      <Home className="main-header" />
      <div className="sub-header">
        <BackSpace className="back-space" />
        <div className="title">
          <p className="main-title">메뉴 추천 결과</p>
          <p className="sub-title">식당 추천을 위해 메뉴를 선택해 주세요</p>
        </div>
      </div>

      <div className="menu-result-content">
        <div className="menu-result-box">
          <div className="menu-image 1" />
          <p className="menu-title">메뉴 이름</p>
          <p className="menu-desc">메뉴 추천 이유설명</p>
        </div>
        <div className="menu-result-box">
          <div className="menu-image 2" />
          <p className="menu-title">메뉴 이름</p>
          <p className="menu-desc">메뉴 추천 이유설명</p>
        </div>
      </div>
      <Retry />
    </StyledPage>
  );
};

export default MenuResultPage;
