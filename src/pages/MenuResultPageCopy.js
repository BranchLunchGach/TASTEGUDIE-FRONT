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
  font-size: 64px;
  text-align: left;
`;
const StyledSubTitle = styled.p`
  font-size: 24px;
  text-align: left;
`;
const StyledResultBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 53vw;
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
  margin-top: 1.3vh;
`;
const StyledImg = styled.img`
  width: 20vw;
  height: 20vw;
  border-radius: 100%;
  background-color: lightgray;
`;
const StyledMenuDescBox = styled.p`
  margin-top: 1.5vh;
`;
const StyledMenuDesc = styled.p`
  font-size: 1.4vw;
  margin-bottom: 0.2vw;
`;

const MenuResultPageCopy = () => {
  // const location = useLocation(); // location hook 사용
  // const menuData = location.state?.menuData || []; // 전달받은 데이터

  // //재추천 알고리즘 로컬스토리지 저장
  // const [menName, setMenName] = useState("");
  // const [menu, SetMenu] = useState(menuData);

  // function local(men) {
  //   let get = localStorage.getItem("selectMenuName");
  //   console.log("get=" + get);
  //   console.log("menu=" + men[0].menuName + "," + men[1].menuName);
  //   if (get === null || get === "") {
  //     console.log("null이다");
  //     setMenName(men[0].menuName + "," + men[1].menuName);
  //   } else {
  //     setMenName(get + "," + men[0].menuName + "," + men[1].menuName);
  //   }
  // }

  // useEffect(() => {
  //   local(menu);
  //   console.log(location.state.coreKeyword);
  //   console.log(location.state.mainKeyword);

  //   /*
  //   if(localStorage.getItem("selectMenuName")===null){
  //     localStorage.setItem("selectMenuName",menuData[0].menuName + "," + menuData[1].menuName);
  //   }else{
  //     localStorage.setItem("selectMenuName",localStorage.getItem("selectMenuName") + "," + menuData[0].menuName + "," + menuData[1].menuName);
  //   }
  //     */
  // }, []);
  // useEffect(() => {
  //   localStorage.setItem("selectMenuName", menName);
  // }, [menName]);

  // const reRecommand = () => {
  //   console.log(menu[0].selectNation);
  //   console.log(menu[0].selectCategory);
  //   console.log(menu[0].selectKeyword);
  //   console.log(menu[0].selectSoup);
  //   axios({
  //     url: "http://localhost:9000/menu",
  //     method: "post",
  //     data: {
  //       nation: menu[0].selectNation,
  //       category: menu[0].selectCategory,
  //       keyword: menu[0].selectKeyword,
  //       soup: menu[0].selectSoup,
  //       selectName: localStorage.getItem("selectMenuName"),
  //     },
  //   }).then((res) => {
  //     SetMenu(res.data);
  //     console.log(res.data[0].menuName);
  //     local(res.data);
  //   });
  // };

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
          <div>
            <StyledMainTitle>식당 추천 결과</StyledMainTitle>
            <StyledSubTitle>식당 추천 결과</StyledSubTitle>
          </div>
        </StyledTitle>

        <StyledResultBox>
          {/* {menu.length > 0 ? (
          menu.map((m, index) => ( */}

          {/* 추천음식 1 */}
          <StyledResultItem>
            <StyledImg src="/img-sample_nongdam.jpg" alt="메뉴이름" />
            <StyledMenuTitle>
              짜장면
              <hr />
            </StyledMenuTitle>
            <StyledMenuDescBox>
              <StyledMenuDesc>맛있어요</StyledMenuDesc>
              <StyledMenuDesc>든든해요</StyledMenuDesc>
              <StyledMenuDesc>메뉴추천이유3</StyledMenuDesc>
            </StyledMenuDescBox>
          </StyledResultItem>

          {/* 추천음식 2 */}
          <StyledResultItem>
            <StyledImg src="/img-sample_nongdam.jpg" alt="메뉴이름" />
            <StyledMenuTitle>
              진짜 맛있는 돈까스
              <hr />
            </StyledMenuTitle>
            <StyledMenuDescBox>
              <StyledMenuDesc>메뉴추천이유1</StyledMenuDesc>
              <StyledMenuDesc>메뉴추천이유2</StyledMenuDesc>
              <StyledMenuDesc>메뉴추천이유3</StyledMenuDesc>
            </StyledMenuDescBox>
          </StyledResultItem>

          {/* ))
        ) : (
          <p>메뉴가 없습니다.</p>
        )} */}
        </StyledResultBox>
        <Retry />
      </StyledContentBox>
    </StyledPage>
  );
};

export default MenuResultPageCopy;
