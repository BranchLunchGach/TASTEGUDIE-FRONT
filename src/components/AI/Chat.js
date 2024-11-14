import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import './chat.css'
import { AiOutlineSend } from 'react-icons/ai';
import { ChatGPT, isMenu } from './ChatGPT';

const TextBox = styled.div`
  max-height: 35vw; /* 높이를 고정 */
  width: 32vw;
  position:absolute;
  bottom:0px;
  overflow-y: auto;
  text-align: left;
  
  -ms-overflow-style: none;

  &::-webkit-scrollbar{
    display:none;
  }
`

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 1vw auto;
  padding: 8px;
  border: 1px solid #d1d5db; /* 연한 회색 보더 */
  border-radius: 0.5rem;
  background-color: #f9fafb; /* 연한 배경색 */
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1); /* 가벼운 그림자 */
`;

const InputBox = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  padding: 0.5rem;
  font-size: 1rem;
  color: #333;
  
  &::placeholder {
    color: #9ca3af; /* 연한 회색 텍스트 */
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
  const [displayedText, setDisplayedText] = useState(''); // 화면에 보여줄 텍스트
  const [isTyping, setIsTyping] = useState(false); // 타이핑 상태
  const [fullText, setFullText] = useState('먹고싶은 메뉴의 느낌을 자유롭게 작성해주세요\n   (ex. 비도 오고 쌀쌀해서 따뜻한 음식이 먹고싶어)');
  const [allText, setAlltext] = useState([{user:"", text:""}]);
  const inputRef = useRef(null);
  const indexRef = useRef(0); // 타이핑할 글자의 인덱스를 추적
  const questionRef = useRef(0);
  const displayedTextRef = useRef(''); // 실제 텍스트 값 추적
  const textBoxRef = useRef(null); // TextBox를 참조하기 위한 ref
  const [jsonResponse, setJsonResponse] = useState(null);
  const [menuResponse, setMenuResponse] = useState(null);

  const typingEffect = () => {
    displayedTextRef.current += fullText[indexRef.current]; // 현재 타이핑 중인 텍스트 추가
    setDisplayedText(displayedTextRef.current); // 화면에 보일 텍스트 업데이트
    indexRef.current += 1; // 인덱스 증가
  };

  useEffect(()=>{
    setIsTyping(true);
  },[])

  // 타이핑 애니메이션
  useEffect(() => {
    if (isTyping) {
      const intervalId = setInterval(() => {
        typingEffect(); // 타이핑 효과 실행
      }, 50); // 150ms마다 타이핑
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
  
  useEffect(()=>{
    indexRef.current = 0; // 인덱스 초기화
    displayedTextRef.current = ''; // 텍스트 ref 초기화
    setIsTyping(true); // 타이핑 시작
  }, [fullText]);

  useEffect(()=>{
    if (jsonResponse && jsonResponse.length > 0) {
      // API 응답이 있고, 응답이 비어 있지 않으면
      questionRef.current = 1;
      setFullText(`메뉴 이름 : ${jsonResponse[0].menuName}\n추천이유\n1. ${jsonResponse[0].reason[0]}\n2. ${jsonResponse[0].reason[1]}\n3. ${jsonResponse[0].reason[2]}\n\n\n\n메뉴 이름 : ${jsonResponse[1].menuName}\n추천이유\n1. ${jsonResponse[1].reason[0]}\n2. ${jsonResponse[1].reason[1]}\n3. ${jsonResponse[1].reason[2]}\n\n\n\n메뉴를 골라주세요!!!!`);
    } else {
      console.error("API 응답이 비어 있습니다.");
    }
  }, [jsonResponse]);

  useEffect(()=>{
    if (menuResponse && menuResponse.select) {
      if(menuResponse.select==="없음"){
        setFullText(`메뉴를 다시 골라주세요`);
      } else{
        // 단일 메뉴 응답 (예: {"select": "갈비찜"})
        questionRef.current = 2;
        setFullText(`${menuResponse.select}을 판매하는 식당을 추천해드리겠습니다\n\n\n\n맛집 추천 받으러 가기`); // 단일 메뉴 이름만 보여주기
      }
    } else {
      console.error("API 응답이 비어 있습니다.");
    }
  }, [menuResponse]);
  
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
      const response = await isMenu(jsonResponse[0].menuName, jsonResponse[1].menuName, inputRef.current.value); // OpenAI API 호출
      setMenuResponse(response); // JSON 응답을 상태에 저장
    } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
    }
  };

  const startTyping = () => {
    if(inputRef.current.value==="") return;
    if (isTyping) return; // 타이핑 중일 때는 더 이상 시작 못함
    setDisplayedText(''); // 텍스트 초기화
    setAlltext([...allText, {user:"chat", text:fullText}, {user:"user", text:inputRef.current.value}]);
    if(questionRef.current === 0){
      handleApiCall();
    } else if(questionRef.current === 1){
      whatMenu();
    }
  };
  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // 기본 엔터키 동작 방지 (폼 제출 등)
      startTyping(); // 엔터키를 눌렀을 때 startTyping 실행
    }
  };

  const findRestaurant = (event) => {
    console.log("갑니다~~~");
  };

  return (
    <div>
      <div style={{height:"35vw", width:"32vw", margin:"auto", position:"relative"}}>
        <TextBox ref={textBoxRef}>
          {allText.map((resultText, index)=>(
            resultText.text.split("\n\n\n\n").map((re, reindex)=>(
              <div key={`${re}-${index}`} className={resultText.user} style={{ whiteSpace: 'pre-wrap' }}>{re}</div>
            ))
          ))}
          {displayedText.split("\n\n\n\n").map((t, index)=>(
            <div className='chat' style={{ whiteSpace: 'pre-wrap',cursor: t === "맛집 추천 받으러 가기" ? 'pointer' : 'default' }} onClick={() => {
              if (t === "맛집 추천 받으러 가기") {
                findRestaurant(); // 클릭 시만 호출
              }
            }}>{t}</div>
          ))}
        </TextBox>
      </div>
      <InputContainer>
        <InputBox placeholder="Type your message here..." ref={inputRef} onKeyDown={handleKeyDown} />
        <SearchButton onClick={startTyping}>
          <AiOutlineSend size={24} />
        </SearchButton>
      </InputContainer>
    </div>
  );
}

export default Chat;
