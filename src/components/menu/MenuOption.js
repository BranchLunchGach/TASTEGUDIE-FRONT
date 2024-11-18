import React, { useState, useEffect, useRef } from "react";
import "./MenuOption.css";
import FoodForm from "./FoodForm";
import FoodCategoryForm from "./FoodCategoryForm";
import MenuKeywordPage from "./MenuKeywordPage";
import FoodReceipt from "./FoodReceipt";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RestaurantReceipt from "./RestaurantReceipt";
import CoreKeywordForm from "./CoreKeywordForm";
import MainKeywordForm from "./MainKeywordForm";
import CopyRight from "./CopyRight";

const Title = styled.span`
  border: 1px solid;
  background-color: darkgray;
  width: 15vw;
  height: 5vw;
  font-size: 2vw;
  display: block;
  text-align: center;
  margin: auto;
  border-radius: 1vw;

  span {
    margin-top: 0.7vw;
    display: block;
  }
`;
const GoBtn = styled.button`
  width: 10.5vw;
  height: 10.5vw;
  margin-top: 1.5vw;
  border-radius: 200px;
  color: white;
  background: black;
`;
const StyledP = styled.p`
  margin-top: 8vw;
  text-align: center;
  font-size: 5vw;
  color: #000000;
`;
const StyledArrow = styled.img`
  width: 7.3vw;
  margin: 0.2vw 0;
`;

function MenuOption() {
  const pagesRef = useRef([]);
  const navigate = useNavigate(); // navigate hook 사용
  const [weather, setWeather] = useState("");

  const [foods, setFoods] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [selectedFoodCategorys, setSelectedFoodCategorys] = useState([]);
  const [selectedFoodKeywords, setSelectedFoodKeywords] = useState([]);
  const [selectedSoup, setSelectedSoup] = useState([]);

  const [restaurant, setRestaurant] = useState([]);
  const [selectedCoreKeywords, setSelectedCoreKeywords] = useState([]);
  const [selectedMainKeywords, setSelectedMainKeywords] = useState([]);

  const handleFoodChange = (food) => {
    setSelectedFoods(food);
  };

  const handleFoodCategoryChange = (food) => {
    setSelectedFoodCategorys(food);
  };

  const handleFoodKeywordChange = (food) => {
    setSelectedFoodKeywords(food);
  };

  const handleSoupChange = (food) => {
    setSelectedSoup(food);
  };

  const handleCoreChange = (core) => {
    setSelectedCoreKeywords(core);
  };

  const handleMainChange = (main) => {
    setSelectedMainKeywords(main);
  };

  useEffect(() => {
    setFoods([
      ...selectedFoods,
      ...selectedFoodCategorys,
      ...selectedFoodKeywords,
      ...selectedSoup,
    ]);
  }, [
    selectedFoods,
    selectedFoodCategorys,
    selectedFoodKeywords,
    selectedSoup,
  ]);

  useEffect(() => {
    setRestaurant([...selectedCoreKeywords, ...selectedMainKeywords]);
  }, [selectedCoreKeywords, selectedMainKeywords]);

  // 받아온 날씨 값을 우리 db에 맞게 변환
  useEffect(() => {
    if (weather === "") {
      console.log("왜 빈값이라도 안 넣으면 안돌아가지??...");
    } else {
      if (
        weather === "Rain" ||
        weather === "Thunderstorm" ||
        weather === "Drizzle" ||
        weather === "Squall"
      ) {
        setWeather("비");
      } else if (weather === "Snow") {
        setWeather("눈");
      } else if (weather === "Clear") {
        setWeather("맑음");
      }
      console.log("처리 마무리 weather = " + weather);
    }
  }, [weather]);

  // 날씨받아오는 api(1. 위치값 받아서 2. 날씨값 받음)
  const getWeather = () => {
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    function onGeoOk(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      console.log("lat= " + latitude + "long= " + longitude);

      // 날씨 API 요청
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      )
        .then((response) => response.json())
        .then((data) => {
          // 날씨 정보 출력
          //const id = data.weather[0].id;
          setWeather(data.weather[0].main);
        })
        .catch((error) => {
          console.error("날씨 정보를 가져오는 중 오류가 발생했습니다.", error);
        });
    }

    function onGeoError() {
      alert("위치를 찾을 수 없습니다. 날씨 정보를 불러올 수 없습니다.");
    }

    // 사용자의 위치를 가져옴
    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
  };

  const recommand = () => {
    axios({
      url: process.env.REACT_APP_SPRING_IP+"/menu",
      method: "post",
      data: {
        nation: selectedFoods.join(","),
        category: selectedFoodCategorys.join(","),
        keyword: selectedFoodKeywords.join(","),
        soup: selectedSoup.join(","),
        weather: weather,
      },
    })
      .then((res) => {
        console.log("gggg", res.data);
        navigate("/menu-result", {
          state: {
            menuData: res.data,
            coreKeyword: selectedCoreKeywords,
            mainKeyword: selectedMainKeywords,
          },
        });
      })
      .catch((err) => {
        console.error("Error sending data:", err);
      });
  };

  const pageContents = [
    <StyledP>
      <Title>
        <span>Taste</span>
        <span>Guide</span>
      </Title>
      <br />
      <span style={{ fontSize: 20 }}>-- 책을 넘겨 메뉴를 추천 받으세요 --</span>
    </StyledP>,
    <StyledP>
      Menu <br />
      <img
        alt="menu"
        src="menu.png"
        style={{ width: "10vw", height: "10vw" }}
      />{" "}
    </StyledP>,
    <FoodForm
      selectedFoods={selectedFoods}
      setSelectedFoods={setSelectedFoods}
      onFoodChange={handleFoodChange}
    />,
    <FoodCategoryForm
      selectedFoodCategorys={selectedFoodCategorys}
      setSelectedFoodCategorys={setSelectedFoodCategorys}
      onFoodChange={handleFoodCategoryChange}
    />,
    <MenuKeywordPage
      selectedFoodKeywords={selectedFoodKeywords}
      setSelectedFoodKeywords={setSelectedFoodKeywords}
      onFoodChange={handleFoodKeywordChange}
      selectedSoup={selectedSoup}
      setSelectedSoup={setSelectedSoup}
      onSoupChange={handleSoupChange}
    />,
    <StyledP>
      식당 <br />
      <img
        alt="menu"
        src="restaurant.png"
        style={{ width: "10vw", height: "10vw" }}
      />
    </StyledP>,
    <MainKeywordForm
      selectedMainKeywords={selectedMainKeywords}
      setSelectedMainKeywords={setSelectedMainKeywords}
      onRestaurantChange={handleMainChange}
    />,
    <CoreKeywordForm
      selectedCoreKeywords={selectedCoreKeywords}
      setSelectedCoreKeywords={setSelectedCoreKeywords}
      onRestaurantChange={handleCoreChange}
    />,
    <CopyRight />,
    <StyledP>
      Thank
      <br />
      You!!
    </StyledP>,
  ];

  useEffect(() => {
    const pages = pagesRef.current;

    // 페이지마다 z-index를 설정하는 부분
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      if (i % 2 === 0) {
        page.style.zIndex = pages.length - i;
      }
    }

    // 페이지 클릭 이벤트 처리
    pages.forEach((page, i) => {
      page.pageNum = i + 1;
      page.onclick = function (event) {
        if (!["LABEL", "SPAN", "A"].includes(event.target.tagName)) {
          // 페이지 전환 처리
          event.preventDefault(); // 페이지 전환 기본 동작 막기

          if (this.pageNum % 2 === 0) {
            this.classList.remove("flipped");
            this.previousElementSibling.classList.remove("flipped");
          } else {
            this.classList.add("flipped");
            this.nextElementSibling.classList.add("flipped");
          }
        }
      };
    });

    getWeather();
  }, []);

  // 받아온 날씨 값을 우리 db에 맞게 변환
  useEffect(() => {
    if (weather === "") {
      console.log("왜 빈값이라도 안 넣으면 안돌아가지??...");
    } else {
      if (
        weather === "Rain" ||
        weather === "Thunderstorm" ||
        weather === "Drizzle" ||
        weather === "Squall"
      ) {
        setWeather("비");
      } else if (weather === "Snow") {
        setWeather("눈");
      } else if (weather === "Clear") {
        setWeather("맑음");
      }
      console.log("처리 마무리 weather = " + weather);
    }
  }, [weather]);

  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <div className="book">
        <div id="pages" className="pages">
          {/* 페이지를 짝수와 홀수로 나눠서 렌더링 */}
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className={`page ${i % 2 === 0 ? "left" : "right"}`} // 홀수 페이지는 left, 짝수 페이지는 right
              ref={(el) => (pagesRef.current[i] = el)}
            >
              {/* 페이지 내용 출력 (JSX 컴포넌트 가져오기) */}
              {pageContents[i] && pageContents[i]}
            </div>
          ))}
        </div>
      </div>
      <FoodReceipt food={foods} />
      <div>
        <RestaurantReceipt restaurant={restaurant} />
        <GoBtn onClick={recommand}>
          <div
            style={{ fontSize: "2.6vw", fontFamily: "LOTTERIA CHAB-Regular" }}
          >
            주문
          </div>
          <StyledArrow className="arrow" src="/img_arrow.png" alt="" />
        </GoBtn>
      </div>
    </div>
  );
}

export default MenuOption;
