import React, { useEffect, useState } from "react";
import Home from "../components/commons/Home";
import BackSpace from "../components/commons/BackSpace";
import Retry from "../components/commons/Retry";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom"; // useLocation import 추가
import axios from "axios";
import useGeolocation from "react-hook-geolocation";
import LodingPage2 from "./LodingPage2";

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
  const coreK = location.state?.coreKeyword || []; // 전달받은 데이터
  const mainK = location.state?.mainKeyword || []; // 전달받은 데이터
  
  //api keys
  const clientId = process.env.REACT_APP_CLIENTID;
  const clientSecret = process.env.REACT_APP_CLIENTSECRET;

  //재추천 알고리즘 로컬스토리지 저장
  const [menName, setMenName] = useState("");
  const [menu, SetMenu] = useState(menuData);

  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  const navigate = useNavigate();  // useNavigate 훅을 사용하여 페이지 이동

  function local(men) {
    let get = localStorage.getItem("selectMenuName");
    // console.log("get=" + get);
    // console.log("menu=" + men[0].menuName + "," + men[1].menuName);
    if (get === null || get === "") {
      // console.log("null이다");
      setMenName(men[0].menuName + "," + men[1].menuName);
    } else {
      setMenName(get + "," + men[0].menuName + "," + men[1].menuName);
    }
  }

  useEffect(() => {
    local(menu);
    // console.log(coreK);
    // console.log(mainK);
  }, []);
  
  useEffect(() => {
    localStorage.setItem("selectMenuName", menName);
  }, [menName]);

  const reRecommand = () => {
    // console.log(menu[0].selectNation);
    // console.log(menu[0].selectCategory);
    // console.log(menu[0].selectKeyword);
    // console.log(menu[0].selectSoup);
    axios({
      url: process.env.REACT_APP_SPRING_IP + "/menu",
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
      // console.log(res.data[0].menuName);
      local(res.data);
    });
  };

  const geolocation = useGeolocation({
    enableHighAccuracy: true, // 정확도를 높임
    maximumAge: 0, // 캐시된 위치를 사용하지 않음
  });

  const handleStart = async (props) => {

      setIsLoading(true); // 로딩 상태 활성화
      
      const coreKeyword = coreK.join(',');
      const mainKeyword = mainK.join(',')

      recommand(props, geolocation.longitude, geolocation.latitude, coreKeyword, mainKeyword);
  };

  const recommand = (menu, x, y, core, main) => {
    axios({
      url: process.env.REACT_APP_SPRING_IP+"/restaurant",
      method: "post",
      timeout: 300000, // 타임아웃 설정: 300,000ms = 5분
      data: {
        menu: menu,
        avgX: x,
        avgY: y,
        coreKeyword: core,
        mainKeyword: main,
      },
    })
    .then((res) => {
        // console.log(res.data);
        navigate("/hello/result", { 
          state: { 
            menuData: res.data,
            menu: menu,
            avgX: x,
            avgY: y,
          },
        });
    })
    .catch((err)=>{
      console.error("Error sending data:", err);
    })
    .finally(() => {
        setIsLoading(false); // 로딩 상태 비활성화 (필요한 경우)
      });
  }    

  if (isLoading) {
      return <LodingPage2 />; // 로딩 페이지 표시
  }      

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
                <StyledImgContainer onClick={() =>handleStart(m.menuName)}>
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

        <span onClick={reRecommand}>
          <Retry>재추천</Retry>
        </span>
      </StyledContentBox>
    </StyledPage>
  );
};

export default MenuResultPage;
