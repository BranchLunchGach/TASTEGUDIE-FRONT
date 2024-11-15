import React, { useEffect, useState } from "react";
import "./MenuRecommendOption.css";
import $ from "jquery";
import "jquery-ui/ui/widgets/draggable";
import "jquery-ui/ui/widgets/droppable";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // useNavigate import 추가
import styled from "styled-components";

const StyledContainer = styled.div`
  width: 1600px;
  margin: auto;
`;
const StyledSubContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;
const StyledDiv = styled.div`
  width: 700px;
  height: 400px;
  border: 1px solid lightgray;
  border-radius: 5%;

  display: flex;
  justify-content: space-around;
`;

const menuOptionBoxStyle = {
  backgroundColor: "white",

  display: "flex",
  flexWrap: "wrap",
};
const menuOptionExcludeBoxStyle = {
  backgroundColor: "#c0b2ea",
  border: "1px solid black",
  display: "flex",
  alignItems: "center" /* 수직 중앙 정렬 */,
  justifyContent: "center" /* 수평 중앙 정렬 */,
  fontSize: "35px",
  color: "gray",
};

const MenuRecommendOption = () => {
  const [clickedItems, setClickedItems] = useState(Array(13).fill(false));
  const navigate = useNavigate(); // navigate hook 사용
  const [weather, setWeather] = useState("");

  useEffect(() => {
    $(".draggable-item").draggable();

    $("#droppable").droppable({
      drop: function (event, ui) {
        $(this).addClass("ui-state-highlight").find("p").html("Dropped!");
      },
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
          const id = data.weather[0].id;
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

  const handleClick = (index) => {
    const selectedCount = clickedItems.filter((item) => item).length;

    if (clickedItems[index] || selectedCount < 8) {
      setClickedItems((prevState) => {
        const newState = [...prevState];
        newState[index] = !newState[index];
        return newState;
      });
    }
  };

  const handleRecommendStart = async () => {
    const selectedItems = clickedItems.reduce((acc, isSelected, index) => {
      if (isSelected) {
        const element =
          document.getElementsByClassName("draggable-item")[index];
        const classList = element.className.split(" ");
        const key = classList[2];
        const value = element.getAttribute("value");

        if (key) {
          if (acc[key]) {
            acc[key] += `, ${value}`;
          } else {
            acc[key] = value;
          }
        }
      }
      return acc;
    }, {});

    selectedItems.weather = weather;

    try {
      const response = await axios.post(
        process.env.REACT_APP_SPRING_IP+"/menu",
        selectedItems,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        console.log("response.data=" + response.data[0].menuName); // 성공적인 서버 응답 처리
        // 서버 응답 데이터를 MenuResultPage로 이동
        navigate("/menu-result", { state: { menuData: response.data } });
      } else {
        alert("요청 실패!");
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <StyledContainer>
      <StyledSubContainer>
        <StyledDiv style={menuOptionBoxStyle}>
          <div
            className="draggable-item item-type1 nation"
            value="한식"
            onClick={() => handleClick(0)}
            style={{ backgroundColor: clickedItems[0] ? "#FDD83E" : "" }}
          >
            한식
          </div>
          <div
            className="draggable-item item-type1 nation"
            value="양식"
            onClick={() => handleClick(1)}
            style={{ backgroundColor: clickedItems[1] ? "#FDD83E" : "" }}
          >
            양식
          </div>
          <div
            className="draggable-item item-type1 nation"
            value="중식"
            onClick={() => handleClick(2)}
            style={{ backgroundColor: clickedItems[2] ? "#FDD83E" : "" }}
          >
            중식
          </div>
          <div
            className="draggable-item item-type1 nation"
            value="일식"
            onClick={() => handleClick(3)}
            style={{ backgroundColor: clickedItems[3] ? "#FDD83E" : "" }}
          >
            일식
          </div>
          <div
            className="draggable-item item-type1 category"
            value="면 및 만두류"
            onClick={() => handleClick(4)}
            style={{ backgroundColor: clickedItems[4] ? "#FDD83E" : "" }}
          >
            면
          </div>
          <div
            className="draggable-item item-type1 category"
            value="밥류"
            onClick={() => handleClick(5)}
            style={{ backgroundColor: clickedItems[5] ? "#FDD83E" : "" }}
          >
            밥
          </div>
          <div
            className="draggable-item item-type1 category"
            value="국 및 탕류"
            onClick={() => handleClick(6)}
            style={{ backgroundColor: clickedItems[6] ? "#FDD83E" : "" }}
          >
            탕
          </div>
          <div
            className="draggable-item item-type1 category"
            value="빵 및 과자류"
            onClick={() => handleClick(7)}
            style={{ backgroundColor: clickedItems[7] ? "#FDD83E" : "" }}
          >
            빵
          </div>
          <div
            className="draggable-item item-type1 category"
            value="튀김류"
            onClick={() => handleClick(8)}
            style={{ backgroundColor: clickedItems[8] ? "#FDD83E" : "" }}
          >
            튀김
          </div>
          <div
            className="draggable-item item-type1 category"
            value="구이류"
            onClick={() => handleClick(9)}
            style={{ backgroundColor: clickedItems[9] ? "#FDD83E" : "" }}
          >
            구이
          </div>
          <div
            className="draggable-item item-type2 keyword"
            value="술과 어울리는"
            onClick={() => handleClick(10)}
            style={{ backgroundColor: clickedItems[10] ? "#FDD83E" : "" }}
          >
            술과 어울리는
          </div>
          <div
            className="draggable-item item-type2 keyword"
            value="가벼운"
            onClick={() => handleClick(11)}
            style={{ backgroundColor: clickedItems[11] ? "#FDD83E" : "" }}
          >
            가벼운
          </div>
          <div
            className="draggable-item item-type2 keyword"
            value="든든한"
            onClick={() => handleClick(12)}
            style={{ backgroundColor: clickedItems[12] ? "#FDD83E" : "" }}
          >
            든든한
          </div>
          <div
            className="draggable-item item-type2 soup"
            value="true"
            onClick={() => handleClick(13)}
            style={{ backgroundColor: clickedItems[13] ? "#FDD83E" : "" }}
          >
            국물있는
          </div>
        </StyledDiv>
        <StyledDiv style={menuOptionExcludeBoxStyle} id="droppable">
          <p>제외할 카테고리</p>
        </StyledDiv>
      </StyledSubContainer>
      <button className="menu-recommend-btn" onClick={handleRecommendStart}>
        추천 시작
      </button>
    </StyledContainer>
  );
};

export default MenuRecommendOption;
