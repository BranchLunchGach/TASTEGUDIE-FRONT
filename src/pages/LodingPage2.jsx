import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframes 정의
const aniCycle = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const animate = keyframes`
  0% {
    transform: rotate(45deg);
  }
  100% {
    transform: rotate(405deg);
  }
`;

// Styled-components 정의
const Body = styled.div`
  margin: 0;
  padding: 0;
  /* background: #262626; */
  background-image: url('/img-bg_main.jpg');
  font-family: sans-serif;
  font-size: 20px;
  height: 100vh; /* Full-screen height */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

const Ring = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  border: 3px solid black;
  border-radius: 50%;
  background-color: #262626;
  text-align: center;
  font-weight: bold;
  line-height: 150px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #fff000;
  text-shadow: 0 0 15px #fff000;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);

  &:before {
    content: '';
    display: block;
    position: absolute;
    top: -3px;
    left: -3px;
    width: 100%;
    height: 100%;
    border: 3px solid transparent;
    border-top: 3px solid #fff000;
    border-left: 3px solid transparent;
    border-right: 3px solid #fff000;
    border-radius: 50%;
    animation: ${aniCycle} 2s linear infinite;
  }
`;

const Span = styled.span`
  position: absolute;
  width: 50%;
  height: 4px;
  display: block;
  top: calc(50% - 2px);
  left: 50%;
  background: none;
  animation: ${animate} 2s linear infinite;
  transform-origin: left;

  &:after {
    content: '';
    width: 16px;
    height: 16px;
    background: #fff000;
    border-radius: 50%;
    box-shadow: 0 0 20px #fff000;
    position: absolute;
    right: -8px;
    top: calc(50% - 8px);
  }
`;

const Message = styled.p`
  margin-top: 20px;
  /* color: #fff; */
  color: black;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  white-space: pre-line; /* \n을 줄바꿈으로 렌더링 */

`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;


const LodingPage2 = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    '약 1분 정도 소요됩니다. \n잠시만 기다려주세요.',
    '점심 메뉴만 고민하지 않았어도 대머리가 되지는 않았을 텐데... \n- 머리를 지켜주는 Taste Guide -',
    '최적의 맛집을 찾기 위해 분석 중입니다.\n잠시만 기다려주세요.',
    '어떤 음식을 먹을지 고민하는 것은 엄마가 좋아? 아빠가 좋아? 의 고민과 같다.\n - Taste Guide -'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 5000); // 5초마다 메시지 변경
    return () => clearInterval(interval); // Cleanup
  }, []);

  return (
    <Body>
      <ContentWrapper>
        <Ring aria-label="페이지 로딩 중입니다.">
          분석중..
          <Span></Span>
        </Ring>
        <Message>{messages[messageIndex]}</Message>
      </ContentWrapper>
    </Body>
  );
  
};

export default LodingPage2;
