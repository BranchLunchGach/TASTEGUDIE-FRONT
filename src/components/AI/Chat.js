import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import useGeolocation from "react-hook-geolocation";
import "./chat.css";
import { AiOutlineSend } from "react-icons/ai";
import { ChatGPT, isMenu, restaurant } from "./ChatGPT";
import axios from "axios";

const StyledContentBox = styled.div`
  height: 60vh;
  width: 50vw;
  margin: 5vh auto;
`;
const TextBox = styled.div`
  height: 100%; /* 높이를 고정 */
  width: 75%;
  overflow-y: auto;
  text-align: left;
  margin: 0 auto;

  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 40vw;
  max-height: 70px;
  margin: 2vh auto;
  padding: 8px;
  border: 1px solid #d1d5db; /* 연한 회색 보더 */
  border-radius: 0.5rem;
  background-color: #f9fafb; /* 연한 배경색 */
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1); /* 가벼운 그림자 */
`;

const InputBox = styled.textarea`
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  padding: 0.5rem;
  font-size: 1rem;
  color: #333;
  resize: none; /* 사용자가 크기 조정 못하게 설정 */
  overflow-y: auto; /* 넘치면 스크롤 */
  height: 50px;
  max-height: 70px; /* 최대 높이 설정 */

  &::placeholder {
    color: #9ca3af; /* 연한 회색 텍스트 */
  }

  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 8px; /* 스크롤바 너비 */
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1; /* 스크롤바 색상 */
    border-radius: 4px; /* 둥근 모서리 */
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #94a3b8; /* 호버 시 스크롤바 색상 */
  }

  &::-webkit-scrollbar-track {
    background: #f1f5f9; /* 스크롤바 배경 */
    border-radius: 4px; /* 둥근 모서리 */
  }
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin-left: 8px;
  cursor: pointer;
  color: #4b5563; /* 기본 아이콘 색 */
  display: flex;
  align-items: center;

  &:hover {
    color: #2563eb; /* 버튼 호버 색 */
  }
`;

function Chat() {
  const [displayedText, setDisplayedText] = useState(""); // 화면에 보여줄 텍스트
  const [isTyping, setIsTyping] = useState(false); // 타이핑 상태
  const [fullText, setFullText] = useState(
    "먹고싶은 메뉴의 느낌을 자유롭게 작성해주세요\n   (ex. 비도 오고 쌀쌀해서 따뜻한 음식이 먹고싶어)"
  );
  const [allText, setAlltext] = useState([{ user: "", text: "" }]);
  const [jsonResponse, setJsonResponse] = useState(null);
  const [menuResponse, setMenuResponse] = useState(null);
  const [restaurantResponse, setRestaurantResponse] = useState(null);
  const [firstResponseShown, setFirstResponseShown] = useState(false);
  const [address, setAddress] = useState("");

  const inputRef = useRef(null);
  const indexRef = useRef(0); // 타이핑할 글자의 인덱스를 추적
  const questionRef = useRef(0);
  const displayedTextRef = useRef(""); // 실제 텍스트 값 추적
  const textBoxRef = useRef(null); // TextBox를 참조하기 위한 ref
  
  const typingEffect = () => {
    displayedTextRef.current += fullText[indexRef.current]; // 현재 타이핑 중인 텍스트 추가
    setDisplayedText(displayedTextRef.current); // 화면에 보일 텍스트 업데이트
    indexRef.current += 1; // 인덱스 증가
  };
  
  useEffect(() => {
    setIsTyping(true);
  }, []);

  // 타이핑 애니메이션
  useEffect(() => {
    if (isTyping) {
      const intervalId = setInterval(() => {
        typingEffect(); // 타이핑 효과 실행
      }, 50); // 50ms마다 타이핑
      return () => clearInterval(intervalId); // 클린업
    }
  }, [isTyping]); // isTyping이 변경될 때마다 실행

  useEffect(() => {
    if (textBoxRef.current) {
      textBoxRef.current.scrollTop = textBoxRef.current.scrollHeight;
    }
    if (displayedText === fullText) {
      inputRef.current.value = "";
      setIsTyping(false); // 타이핑이 끝나면 상태 변경
    }
  }, [displayedText]);

  useEffect(() => {
    indexRef.current = 0; // 인덱스 초기화
    displayedTextRef.current = ""; // 텍스트 ref 초기화
    setIsTyping(true); // 타이핑 시작
  }, [fullText]);
  
  useEffect(() => {
    if (jsonResponse && jsonResponse.length > 0) {
      // API 응답이 있고, 응답이 비어 있지 않으면
      setFirstResponseShown(true);
      questionRef.current = 1;
      setFullText(
        `메뉴 이름 : ${jsonResponse[0].menuName}\n추천이유\n1. ${jsonResponse[0].reason[0]}\n2. ${jsonResponse[0].reason[1]}\n3. ${jsonResponse[0].reason[2]}\n\n\n\n메뉴 이름 : ${jsonResponse[1].menuName}\n추천이유\n1. ${jsonResponse[1].reason[0]}\n2. ${jsonResponse[1].reason[1]}\n3. ${jsonResponse[1].reason[2]}\n\n\n\n메뉴를 골라주세요!!!!`
      );
    } else {
      console.error("API 응답이 비어 있습니다.");
    }
  }, [jsonResponse]);
  
  useEffect(() => {
    if (menuResponse && menuResponse.select) {
      if (menuResponse.select === "없음") {
        setIsTyping(false);
        if (fullText === "메뉴를 다시 골라주세요") {
          indexRef.current = 0; // 인덱스 초기화
          displayedTextRef.current = ""; // 텍스트 ref 초기화
          setIsTyping(true); // 타이핑 시작
        } else {
          setFullText("메뉴를 다시 골라주세요");
        }
      } else {
        questionRef.current = 2;
        setFullText(
          `${menuResponse.select}을 판매하는 식당을 추천해드리겠습니다\n\n\n\n맛집 추천 받으러 가기`
        );
      }
    } else {
      console.error("API 응답이 비어 있습니다.");
    }
  }, [menuResponse]);
  
  useEffect(() => {
    if (restaurantResponse && restaurantResponse.length > 0) {
      // API 응답이 있고, 응답이 비어 있지 않으면
      questionRef.current = 3;
      setFullText(
        `식당 이름 : ${restaurantResponse[0].name}\n영업시간\n${restaurantResponse[0].time}\n메뉴\n${restaurantResponse[0].menu}\n\n\n\n식당 이름 : ${restaurantResponse[1].name}\n영업시간\n${restaurantResponse[1].time}\n메뉴\n${restaurantResponse[1].menu}\n\n\n\n식당 이름 : ${restaurantResponse[2].name}\n영업시간\n${restaurantResponse[2].time}\n메뉴\n${restaurantResponse[2].menu}\n\n\n\n메뉴를 골라주세요!!!!`
      );
    } else {
      console.error("API 응답이 비어 있습니다.");
    }
  }, [restaurantResponse]);

  const handleApiCall = async () => {
    try {
      const response = await ChatGPT(inputRef.current.value); // OpenAI API 호출
      setJsonResponse(response); // JSON 응답을 상태에 저장
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
    }
  };

  const whatMenu = async () => {
    try {
      questionRef.current = 1.5;
      const response = await isMenu(
        jsonResponse[0].menuName,
        jsonResponse[1].menuName,
        inputRef.current.value
      ); // OpenAI API 호출
      setMenuResponse(response); // JSON 응답을 상태에 저장
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
    }
  };

  // const findRestaurant = async () => {
  //   try {
  //     questionRef.current = 1.5;
  //     const response = await restaurant(menuResponse.select); // OpenAI API 호출
  //     setRestaurantResponse(response); // JSON 응답을 상태에 저장
  //   } catch (error) {
  //     console.error("API 호출 중 오류 발생:", error);
  //   }
  // };
  const getAddress = (latitude, longitude) => {
    axios
      .get(`https://apis.openapi.sk.com/tmap/geo/reversegeocoding`, {
        params: {
          version: 1,
          lat: latitude,
          lon: longitude,
          addressType: "A01",
        },
        headers: {
          appKey: process.env.REACT_APP_NAVER_API_KEY,
        },
      })
      .then((res) => {
        console.log(res.data.addressInfo.fullAddress);

        const fullAddress = res.data.addressInfo.fullAddress;
        setAddress(fullAddress); // 현재 컴포넌트의 상태 업데이트
      })
      .catch((err) => {
        console.error("주소를 가져오는 데 실패했습니다.", err);
      });
  };

  const geolocation = useGeolocation({
    enableHighAccuracy: true, // 정확도를 높임
    maximumAge: 0, // 캐시된 위치를 사용하지 않음
  });

  const startTyping = () => {
    if (questionRef.current === 2) findRestaurant();
    if (inputRef.current.value === "") return;
    if (isTyping) return; // 타이핑 중일 때는 더 이상 시작 못함
    setDisplayedText(""); // 텍스트 초기화
    setAlltext([
      ...allText,
      { user: "chat", text: fullText },
      { user: "user", text: inputRef.current.value },
    ]);
    if (questionRef.current === 0) {
      handleApiCall();
    } else if (questionRef.current === 1 || questionRef.current === 1.5) {
      whatMenu();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // 기본 엔터키 동작 방지 (폼 제출 등)
      startTyping(); // 엔터키를 눌렀을 때 startTyping 실행
    }
  };

  const handleInput = (e) => {
    e.target.style.height = `${e.target.scrollHeight}px`; // 스크롤 높이에 맞춰 자동 조절
  };

  const findRestaurant = () => {
    axios({
      url: "http://localhost:9000/ai-restaurant",
      method: "post",
      data: {
        menu: menuResponse.select,
      },
    })
    .then((res) => {
        console.log(res.data);
    })
    .catch((err)=>{
      console.error("Error sending data:", err);
    })
  };

  return (
    <StyledContentBox>
      <TextBox ref={textBoxRef}>
        {allText.map((resultText, index) =>
          resultText.text.split("\n\n\n\n").map((re, reindex) => (
            <React.Fragment key={`${re}-${index}`}>
              {firstResponseShown &&
                jsonResponse &&
                resultText.text.split("\n\n\n\n").length === 3 &&
                reindex !== 2 &&
                jsonResponse[reindex]?.imgUrl && (
                  <img
                    src={jsonResponse[reindex].imgUrl}
                    // src="/img-sample_nongdam.jpg"
                    className="chatImg"
                    alt={`추천 메뉴 이미지`}
                  />
                )}
              {resultText.user === "chat" && (
                <img
                  alt="robot"
                  src="robot.png"
                  style={{
                    width: "3vw",
                    height: "3vw",
                    float: "left",
                    clear: "both",
                  }}
                />
              )}
              <div
                className={resultText.user}
                style={{ whiteSpace: "pre-wrap" }}
              >
                {re}
              </div>
            </React.Fragment>
          ))
        )}
        {displayedText.split("\n\n\n\n").map((t, index) => (
          <React.Fragment key={`${fullText}-${index}`}>
            {firstResponseShown &&
              jsonResponse &&
              questionRef.current === 1 &&
              fullText.split("\n\n\n\n").length === 3 &&
              index !== 2 &&
              jsonResponse[index]?.imgUrl && (
                <img
                  src={jsonResponse[index].imgUrl}
                  // src="/img-sample_nongdam.jpg"
                  className="chatImg"
                  alt={`추천 메뉴 이미지`}
                />
              )}
            <img
              alt="robot"
              src="robot.png"
              style={{
                width: "3vw",
                height: "3vw",
                float: "left",
                clear: "both",
                marginRight: "0.5vw",
              }}
            />
            <div
              className="chat"
              style={{
                whiteSpace: "pre-wrap",
                cursor: t === "맛집 추천 받으러 가기" ? "pointer" : "default",
              }}
              onClick={() => {
                if (t === "맛집 추천 받으러 가기") {
                  findRestaurant(); // 클릭 시만 호출
                }
              }}
            >
              {t}
            </div>
          </React.Fragment>
        ))}
      </TextBox>
      <InputContainer>
        <InputBox
          placeholder="여기에 메시지를 작성해 주세요"
          ref={inputRef}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
        />
        <SearchButton onClick={startTyping}>
          <AiOutlineSend size={24} />
        </SearchButton>
      </InputContainer>
    </StyledContentBox>
  );
}

export default Chat;
