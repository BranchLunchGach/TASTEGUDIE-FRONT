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
  cursor: pointer;
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


const CoreKeywordForm = (props) => {
  const [selectedCoreKeywords, setSelectedCoreKeywords] = useState(props.selectedCoreKeywords, props.setSelectedCoreKeywords);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const handleCoreChange = (value, event) => {
    event.preventDefault(); // 페이지 이동 방지

    const highlightElement = event.target.closest('label').querySelector('span');
    if (highlightElement) {
      // highlightElement의 초기 위치 계산
      const initialRect = highlightElement.getBoundingClientRect();
      const initialPosition = {
        x: initialRect.left - 10, // 오른쪽 끝 좌표
        y: initialRect.top - 60,  // y 좌표 (약간의 오프셋 추가)
      };

      // highlighter.png를 초기 위치로 이동
      props.setHighlightPosition(initialPosition);

      // 애니메이션 시작
      setTimeout(() => {
        props.setIsAnimating(true); // 애니메이션 시작
      }, 0);

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

      // 애니메이션 중에 좌표 추적
      trackPosition();

      setTimeout(() => {
        props.setIsAnimating(false); // 애니메이션 끝
      }, 500); // 애니메이션 시간과 맞춰줌
    }
    
    if (value === "상관없음") {
      // '상관없음' 클릭 시, 모든 선택을 토글
      if (isAllChecked) {
        setSelectedCoreKeywords([]); // 모든 항목 해제
        setIsAllChecked(false);
      } else {
        // 모든 항목을 선택
        setSelectedCoreKeywords([
          "콜키지 가능", "주차 가능", "비건 메뉴", "반려 동물 동반"
        ]);
        setIsAllChecked(true);
      }
    } else {
      // "상관없음"을 제외한 선택을 처리
      setSelectedCoreKeywords((prevSelectedCoreKeywords) => {
        if (prevSelectedCoreKeywords.includes("상관없음")) {
          // "상관없음"이 선택되었을 경우, 다른 항목 클릭 시 '상관없음' 해제
          return [value];
        }
        // 선택된 항목을 토글 (추가/제거)
        return prevSelectedCoreKeywords.includes(value)
        ? prevSelectedCoreKeywords.filter((core) => core !== value)
        : [...prevSelectedCoreKeywords, value];
      });
      setIsAllChecked(false); // "상관없음" 해제
    }
  };
  
  useEffect(()=>{
    props.onRestaurantChange(selectedCoreKeywords);
  }, [selectedCoreKeywords])

  return (
    <div>
      <Title> === coreKeyword ===</Title>
      <label
        onClick={(event) => handleCoreChange("상관없음", event)}
        style={{cursor:"pointer", display: "block", textAlign: "right", marginRight:"30px" }}
      >
        상관없음
      </label>
      <Form>
        <div style={{display:"flex", alignItems:"center"}}>
          <img alt='aa' src='/corkage.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={!props.isAnimating ? (event) => handleCoreChange("콜키지 가능", event):undefined}
          >
            <HighlightText className={selectedCoreKeywords.includes("콜키지 가능") ? "highlight" : ""}>
              콜키지 가능
            </HighlightText>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center"}}>
          <img alt='aa' src='/parking.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={!props.isAnimating ? (event) => handleCoreChange("주차 가능", event):undefined}
          >
            <HighlightText className={selectedCoreKeywords.includes("주차 가능") ? "highlight" : ""}>
              주차 가능
            </HighlightText>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center"}}>
          <img alt='aa' src='/vegan.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={!props.isAnimating ? (event) => handleCoreChange("비건 메뉴", event):undefined}
          >
            <HighlightText className={selectedCoreKeywords.includes("비건 메뉴") ? "highlight" : ""}>
              비건 메뉴
            </HighlightText>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center"}}>
          <img alt='aa' src='/pet.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={!props.isAnimating ? (event) => handleCoreChange("반려 동물 동반", event):undefined}
          >
            <HighlightText className={selectedCoreKeywords.includes("반려 동물 동반") ? "highlight" : ""}>
              반려 동물 동반
            </HighlightText>
          </Label>
        </div>
      </Form>
    </div>
  );
};

export default CoreKeywordForm;
