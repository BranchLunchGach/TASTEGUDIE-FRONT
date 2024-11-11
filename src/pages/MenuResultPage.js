import React from "react";
import Home from "../components/commons/Home";
import BackSpace from "../components/commons/BackSpace";
import "./MenuResultPage.css";
import Retry from "../components/commons/Retry";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom"; // useLocation import 추가

const StyledPage = styled.div`
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position-y: -100px;
`;

const MenuResultPage = () => {
  const location = useLocation(); // location hook 사용
  const menuData = location.state?.menuData || []; // 전달받은 데이터

  return (
    <StyledPage className="menu-result-page">
      <Link to="/">
        <Home className="main-header" />
      </Link>
      <div className="sub-header">
        <BackSpace className="back-space" />
        <div className="title">
          <p className="main-title">메뉴 추천 결과</p>
          <p className="sub-title">식당 추천을 위해 메뉴를 선택해 주세요</p>
        </div>
      </div>

      <div className="menu-result-content">
        {menuData.length > 0 ? (
          menuData.map((menu, index) => (
            <div className="menu-result-box" key={index}>
              <img
                className="menu-image"
                src={menu.imgUrl}
                alt={menu.menuName}
              />
              <p className="menu-title">{menu.menuName}</p>
              <p className="menu-desc">{menu.recoReason[0]}</p>
              <p className="menu-desc">{menu.recoReason[1]}</p>
              <p className="menu-desc">{menu.recoReason[2]}</p>
            </div>
          ))
        ) : (
          <p>메뉴가 없습니다.</p>
        )}
      </div>
      <Retry />
    </StyledPage>
  );
};

export default MenuResultPage;
