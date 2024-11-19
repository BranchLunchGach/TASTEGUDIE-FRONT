import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

// 스타일 정의
const Form = styled.form`
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  padding: 1vw;
  font-size: 1vw;
  margin-left: 2vw;
`;

const Title = styled.h3`
  text-align: center;
  font-size: 1.4vw;
  color: #333;
  margin-bottom: 1vw;
  margin-top: 0.3vw;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 1vw;
  cursor: none;
`;

const Span = styled.span`
  font-size: 0.8vw;
  color: #666;
  margin-top: 0.3vw;
  line-height: 1.2;
`;

const highlightAnimation = keyframes`
  0% {
    background-position: right bottom;
  }
  100% {
    background-position: left bottom;
  }
`;

const HighlightText = styled.span`
  display: inline-block;
  position: relative;
  padding: 2px 5px;

  &.highlight {
    background: linear-gradient(90deg, yellow 50%, transparent 50%);
    background-size: 200% 100%;
    background-position: right bottom;
    animation: ${highlightAnimation} 0.5s forwards; /* 애니메이션 적용 */
  }
`;

const FoodForm = (props) => {
  const [selectedFoods, setSelectedFoods] = useState(props.selectedFoods, props.setSelectedFoods);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const handleFoodChange = (value, event) => {
    event.preventDefault(); // 페이지 이동 방지

    const highlightElement = event.target.closest('label').querySelector('span');
    if (highlightElement) {
      // 애니메이션 시작
      const startAnimation = () => {
        // highlightElement의 초기 위치 계산
        const initialRect = highlightElement.getBoundingClientRect();
        const initialPosition = {
          x: initialRect.left, // 오른쪽 끝 좌표
          y: initialRect.top - 60, // y 좌표 (약간의 오프셋 추가)
        };

        // transition 비활성화 및 초기 위치 설정
        if (props.highlightRef.current) {
          props.highlightRef.current.style.transition = "none";
        }

        // highlighter.png를 초기 위치로 이동
        props.setHighlightPosition(initialPosition);

        // 위치가 설정된 후에 transition 복원
        requestAnimationFrame(() => {
          if (props.highlightRef.current) {
            props.highlightRef.current.style.transition = "left 0.5s ease, top 0.5s ease";
          }
        });
      };
      
      // 좌표를 추적하는 함수
      const trackPosition = () => {
        if (highlightElement) {
          const rect = highlightElement.getBoundingClientRect();
          props.setHighlightPosition({
            x: rect.right - 10, // 오른쪽 끝 좌표
            y: rect.top - 60, // y 좌표 (약간의 오프셋 추가)
          });

          // requestAnimationFrame을 통해 애니메이션 프레임마다 호출
          if (props.isAnimating) {
            requestAnimationFrame(trackPosition);
          }
        }
      };

      // 애니메이션 종료
      const stopAnimation = () => {
        props.setIsAnimating(false);
      };

      // 실행 순서 조정
      setTimeout(() => {
        startAnimation(); // 초기 위치 계산 및 transition 설정
        props.setIsAnimating(true); // 애니메이션 시작
        trackPosition(); // 좌표 추적 시작
        setTimeout(stopAnimation, 500); // 애니메이션 끝 (500ms 후)
      }, 0);
    }

    if (value === "상관없음") {
      // '상관없음' 클릭 시, 모든 선택을 토글
      if (isAllChecked) {
        setSelectedFoods([]); // 모든 항목 해제
        setIsAllChecked(false);
      } else {
        // 모든 항목을 선택
        setSelectedFoods([
          "한식", "양식", "일식", "중식", "아시안"
        ]);
        setIsAllChecked(true);
      }
    } else {
      // "상관없음"을 제외한 선택을 처리
      setSelectedFoods((prevSelectedFoods) => {
        if (prevSelectedFoods.includes("상관없음")) {
          // "상관없음"이 선택되었을 경우, 다른 항목 클릭 시 '상관없음' 해제
          return [value];
        }
        // 선택된 항목을 토글 (추가/제거)
        return prevSelectedFoods.includes(value)
          ? prevSelectedFoods.filter((food) => food !== value)
          : [...prevSelectedFoods, value];
      });
      setIsAllChecked(false); // "상관없음" 해제
    }
  };
  
  useEffect(()=>{
    props.onFoodChange(selectedFoods);
  }, [selectedFoods]);


  return (
    <div>
      <Title> === 음식의 종류를 선택하세요 ===</Title>
      <label
        onClick={(event) => handleFoodChange("상관없음", event)}
        style={{cursor:"none", display: "block", textAlign: "right", marginRight:"30px" }}
      >
        상관없음
      </label>
      <Form>
        <div style={{display:"flex", alignItems:"center"}}>
          <img alt='aa' src='/korean.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={!props.isAnimating ? (event) => handleFoodChange("한식", event):undefined}
          >
            <HighlightText className={selectedFoods.includes("한식") ? "highlight" : ""}>
              한식
            </HighlightText>
            <Span>ex. 국밥, 김치찌개, 불고기, 한정식</Span>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center"}}>
          <img alt='aa' src='/western.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={!props.isAnimating ? (event) => handleFoodChange("양식", event):undefined}
          >
            <HighlightText className={selectedFoods.includes("양식") ? "highlight" : ""}>양식</HighlightText>
            <Span>ex. 파스타, 피자, 스테이크, 햄버거</Span>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center"}}>
          <img alt='aa' src='/japanese.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={!props.isAnimating ? (event) => handleFoodChange("일식", event):undefined}
          >
            <HighlightText className={selectedFoods.includes("일식") ? "highlight" : ""}>일식</HighlightText>
            <Span>ex. 돈까스, 라멘, 샤브샤브, 초밥</Span>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center"}}>
          <img alt='aa' src='/chinese.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={!props.isAnimating ? (event) => handleFoodChange("중식", event):undefined}
          >
            <HighlightText className={selectedFoods.includes("중식") ? "highlight" : ""}>중식</HighlightText>
            <Span>ex. 짜장면, 짬뽕, 탄탄면, 깐쇼새우</Span>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center"}}>
          <img alt='aa' src='/asian.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={!props.isAnimating ? (event) => handleFoodChange("아시안", event):undefined}
          >
            <HighlightText className={selectedFoods.includes("아시안") ? "highlight" : ""}>아시안</HighlightText>
            <Span>ex. 월남쌈, 팟타이, 쌀국수, 분짜</Span>
          </Label>
        </div>
      </Form>
    </div>
  );
};

export default FoodForm;
