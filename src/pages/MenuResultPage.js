import React, { useEffect, useState } from "react";
import Home from "../components/commons/Home";
import BackSpace from "../components/commons/BackSpace";
import Retry from "../components/commons/Retry";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom"; // useLocation import 추가
import axios from "axios";

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  height: 100vh;
`;
const StyledContentBox = styled.p`
  width: 92vw;
  margin: -3vh auto;
`;
const StyledTitle = styled.p`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const StyledMainTitle = styled.p`
  font-family: "LOTTERIA CHAB-Regular";
  font-size: 3.3vw;
  text-align: left;
`;
const StyledSubTitle = styled.p`
  font-size: 24px;
  text-align: left;
`;
const StyledResultBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 52vw;
  margin: -1vh auto;
`;
const StyledResultItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledMenuTitle = styled.p`
  font-weight: bold;
  font-size: 2.4vw;
  margin-top: 2vh;
  border-bottom: 1px solid gray;
  padding: 0 1vw;
`;
const StyledImgContainer = styled.div`
  position: relative;
  width: 19vw;
  height: 19vw;
  overflow: hidden;
  border-radius: 100%;
  cursor: pointer;
`;
const StyledImg = styled.img`
  width: 95%;
  height: 95%;
  top: 2.5%;
  left: 2.5%;
  position: absolute;
  border-radius: 100%;
  background-color: lightgray;
  filter: drop-shadow(0px 2px 5px lightgray);
  transition: transform 0.2s;

  ${StyledImgContainer}:hover & {
    transform: scale(1.02);
    filter: blur(3px);
    -webkit-filter: blur(2px);
  }
`;
const StyledTextOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 2vw;
  font-weight: bold;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  border-radius: 100%;

  /* 마우스를 이미지 위에 올리면 텍스트가 나타남 */
  ${StyledImgContainer}:hover & {
    opacity: 1;
  }
`;
const StyledMenuDescBox = styled.p`
  margin-top: 1.6vh;
`;
const StyledMenuDesc = styled.p`
  font-size: 1.3vw;
  margin-bottom: 0.2vw;
`;

const MenuResultPage = () => {
  const location = useLocation(); // location hook 사용
  const menuData = location.state?.menuData || []; // 전달받은 데이터

  //재추천 알고리즘 로컬스토리지 저장
  const [menName, setMenName] = useState("");
  const [menu, SetMenu] = useState(menuData);

  function local(men) {
    let get = localStorage.getItem("selectMenuName");
    console.log("get=" + get);
    console.log("menu=" + men[0].menuName + "," + men[1].menuName);
    if (get === null || get === "") {
      console.log("null이다");
      setMenName(men[0].menuName + "," + men[1].menuName);
    } else {
      setMenName(get + "," + men[0].menuName + "," + men[1].menuName);
    }
  }

  useEffect(() => {
    local(menu);
    console.log(location.state.coreKeyword);
    console.log(location.state.mainKeyword);

    /*
    if(localStorage.getItem("selectMenuName")===null){
      localStorage.setItem("selectMenuName",menuData[0].menuName + "," + menuData[1].menuName);
    }else{
      localStorage.setItem("selectMenuName",localStorage.getItem("selectMenuName") + "," + menuData[0].menuName + "," + menuData[1].menuName);
    }
      */
  }, []);
  useEffect(() => {
    localStorage.setItem("selectMenuName", menName);
  }, [menName]);

  const reRecommand = () => {
    console.log(menu[0].selectNation);
    console.log(menu[0].selectCategory);
    console.log(menu[0].selectKeyword);
    console.log(menu[0].selectSoup);
    axios({
      url: "http://localhost:9000/menu",
      method: "post",
      data: {
        nation: menu[0].selectNation,
        category: menu[0].selectCategory,
        keyword: menu[0].selectKeyword,
        soup: menu[0].selectSoup,
        selectName: localStorage.getItem("selectMenuName"),
      },
    }).then((res) => {
      SetMenu(res.data);
      console.log(res.data[0].menuName);
      local(res.data);
    });
  };

  return (
    <StyledPage>
      {/* 헤더 (홈 버튼만 있는) */}
      <Link to="/">
        <Home />
      </Link>

      {/* 타이틀 */}
      <StyledContentBox>
        <StyledTitle>
          <BackSpace />
          <StyledMainTitle>메뉴 추천 결과</StyledMainTitle>
        </StyledTitle>

        <StyledResultBox>
          {menu.length > 0 ? (
            menu.map((m, index) => (
              <StyledResultItem key={index}>
                <StyledImgContainer>
                  <StyledImg src={m.imgUrl} alt={m.menuName} />
                  <StyledTextOverlay>식당 추천받기</StyledTextOverlay>
                </StyledImgContainer>
                <StyledMenuTitle>{m.menuName}</StyledMenuTitle>
                <StyledMenuDescBox>
                  <StyledMenuDesc>{m.recoReason[0]}</StyledMenuDesc>
                  <StyledMenuDesc>{m.recoReason[1]}</StyledMenuDesc>
                  <StyledMenuDesc>{m.recoReason[2]}</StyledMenuDesc>
                </StyledMenuDescBox>
              </StyledResultItem>
            ))
          ) : (
            <p>메뉴가 없습니다.</p>
          )}
        </StyledResultBox>

        {/* 재추천 버튼 */}
        <div onClick={reRecommand}>
          <Retry />
        </div>
      </StyledContentBox>
    </StyledPage>
  );
};

export default MenuResultPage;
