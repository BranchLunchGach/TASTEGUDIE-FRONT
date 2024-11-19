import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

// 스타일 정의
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  padding: 1vw;
  font-size: 1vw;
  max-height: 25vw;
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
  width: 80%;
  padding: 1vw;
  cursor: none;

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

const MainKeywordForm = (props) => {
  const [selectedMainKeywords, setSelectedMainKeywords] = useState(props.selectedMainKeywords, props.setSelectedMainKeywords);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const handleMainChange = (value, event) => {
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
        setSelectedMainKeywords([]); // 모든 항목 해제
        setIsAllChecked(false);
      } else {
        // 모든 항목을 선택
        setSelectedMainKeywords([
          "가족모임", "단체", "기념일", "가성비", "혼밥", "양많음", "현지맛"
        ]);
        setIsAllChecked(true);
      }
    } else {
      // "상관없음"을 제외한 선택을 처리
      setSelectedMainKeywords((prevSelectedMain) => {
        if (prevSelectedMain.includes("상관없음")) {
          // "상관없음"이 선택되었을 경우, 다른 항목 클릭 시 '상관없음' 해제
          return [value];
        }
        // 선택된 항목을 토글 (추가/제거)
        return prevSelectedMain.includes(value)
          ? prevSelectedMain.filter((food) => food !== value)
          : [...prevSelectedMain, value];
      });
      setIsAllChecked(false); // "상관없음" 해제
    }
  };
  
  useEffect(()=>{
    props.onRestaurantChange(selectedMainKeywords);
  }, [selectedMainKeywords])

  return (
    <div>
      <Title> === Main Keyword ===</Title>
      <label
        onClick={(event) => handleMainChange("상관없음", event)}
        style={{cursor:"none", display: "block", textAlign: "right", marginRight:"30px" }}
      >
        상관없음
      </label>
      <Form>
        <div style={{display:"flex", alignItems:"center", width:"80%"}}>
          <img alt='aa' src='/family.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={!props.isAnimating ? (event) => handleMainChange("가족모임", event):undefined}
          >
            <HighlightText className={selectedMainKeywords.includes("가족모임") ? "highlight" : ""}>
              가족모임
            </HighlightText>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center", width:"80%"}}>
          <img alt='aa' src='/manyPeople.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={!props.isAnimating ? (event) => handleMainChange("단체", event):undefined}
          >
            <HighlightText className={selectedMainKeywords.includes("단체") ? "highlight" : ""}>
              단체
            </HighlightText>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center", width:"80%"}}>
          <img alt='aa' src='/anny.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={!props.isAnimating ? (event) => handleMainChange("기념일", event):undefined}
          >
            <HighlightText className={selectedMainKeywords.includes("기념일") ? "highlight" : ""}>
              기념일
            </HighlightText>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center", width:"80%"}}>
          <img alt='aa' src='/money.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={!props.isAnimating ? (event) => handleMainChange("가성비", event):undefined}
          >
            <HighlightText className={selectedMainKeywords.includes("가성비") ? "highlight" : ""}>
              가성비
            </HighlightText>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center", width:"80%"}}>
          <img alt='aa' src='/person.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={!props.isAnimating ? (event) => handleMainChange("혼밥", event):undefined}
          >
            <HighlightText className={selectedMainKeywords.includes("혼밥") ? "highlight" : ""}>
              혼밥
            </HighlightText>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center", width:"80%"}}>
          <img alt='aa' src='/fat.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={!props.isAnimating ? (event) => handleMainChange("양많음", event):undefined}
          >
            <HighlightText className={selectedMainKeywords.includes("양많음") ? "highlight" : ""}>
              양많음
            </HighlightText>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center", width:"80%"}}>
          <img alt='aa' src='/hyengi.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={!props.isAnimating ? (event) => handleMainChange("현지맛", event):undefined}
          >
            <HighlightText className={selectedMainKeywords.includes("현지맛") ? "highlight" : ""}>
              현지맛
            </HighlightText>
          </Label>
        </div>
      </Form>
    </div>
  );
};

export default MainKeywordForm;
