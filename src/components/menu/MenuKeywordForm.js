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
  font-size: 1.4vw;
  color: #333;
  margin-bottom: 1vw;
  margin-left: 2vw;
  border-bottom: 1px solid;
  width: 80%;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 0.5vw;
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

const MenuKeywordForm = (props) => {
  const [selectedFoodKeywords, setSelectedFoodKeywords] = useState(props.selectedFoodKeywords, props.setSelectedFoodKeywords);
  const [selectedSoup, setSelectedSoup] = useState(props.selectedFoodKeywords, props.setSelectedFoodKeywords);
  const [isKewordAllChecked, setIsKewordAllChecked] = useState(false);
  const [isSoupAllChecked, setIsSoupAllChecked] = useState(false);

  const handleFoodChange = (value, event) => {
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
      if (isKewordAllChecked) {
        setSelectedFoodKeywords([]); // 모든 항목 해제
        setIsKewordAllChecked(false);
      } else {
        // 모든 항목을 선택
        setSelectedFoodKeywords([
          "가벼운", "든든한", "술과 어울리는"
        ]);
        setIsKewordAllChecked(true);
      }
    } else {
      // "상관없음"을 제외한 선택을 처리
      setSelectedFoodKeywords((prevSelectedFoodCategorys) => {
        if (prevSelectedFoodCategorys.includes("상관없음")) {
          // "상관없음"이 선택되었을 경우, 다른 항목 클릭 시 '상관없음' 해제
          return [value];
        }
        // 선택된 항목을 토글 (추가/제거)
        return prevSelectedFoodCategorys.includes(value)
          ? prevSelectedFoodCategorys.filter((food) => food !== value)
          : [...prevSelectedFoodCategorys, value];
      });
      setIsKewordAllChecked(false); // "상관없음" 해제
    }
  };

  const handleSoupChange = (value, event) => {
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
      if (isSoupAllChecked) {
        setSelectedSoup([]); // 모든 항목 해제
        setIsSoupAllChecked(false);
      } else {
        // 모든 항목을 선택
        setSelectedSoup([
          "있음", "없음"
        ]);
        setIsSoupAllChecked(true);
      }
    } else {
      // "상관없음"을 제외한 선택을 처리
      setSelectedSoup((prevSelectedSoup) => {
        if (prevSelectedSoup.includes("상관없음")) {
          // "상관없음"이 선택되었을 경우, 다른 항목 클릭 시 '상관없음' 해제
          return [value];
        }
        // 선택된 항목을 토글 (추가/제거)
        return prevSelectedSoup.includes(value)
          ? prevSelectedSoup.filter((food) => food !== value)
          : [...prevSelectedSoup, value];
      });
      setIsSoupAllChecked(false); // "상관없음" 해제
    }
  };

  useEffect(()=>{
    props.onFoodChange(selectedFoodKeywords);
  }, [selectedFoodKeywords])

  useEffect(()=>{
    props.onSoupChange(selectedSoup);
  }, [selectedSoup])

  return (
    <div>
      <Title style={{marginTop:"0.3vw"}}>키워드</Title>
      <label
        onClick={(event) => handleFoodChange("상관없음", event)}
        style={{cursor:"none", display: "block", textAlign: "right", marginRight:"30px" }}
      >
        상관없음
      </label>
      <Form>
      <div style={{display:"flex", alignItems:"center"}}>
          <img alt='aa' src='/light.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={!props.isAnimating ? (event) => handleFoodChange("가벼운", event):undefined}
          >
            <HighlightText className={selectedFoodKeywords.includes("가벼운") ? "highlight" : ""}>
              가벼운
            </HighlightText>
            <Span>ex. 샐러드, 샌드위치, 브런치</Span>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center"}}>
          <img alt='aa' src='/heavy.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={!props.isAnimating ? (event) => handleFoodChange("든든한", event):undefined}
          >
            <HighlightText className={selectedFoodKeywords.includes("든든한") ? "highlight" : ""}>
              든든한
            </HighlightText>
            <Span>ex. 치킨, 피자</Span>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center"}}>
          <img alt='aa' src='/alcohol.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={!props.isAnimating ? (event) => handleFoodChange("술과 어울리는", event):undefined}
          >
            <HighlightText className={selectedFoodKeywords.includes("술과 어울리는") ? "highlight" : ""}>
              술과 어울리는
            </HighlightText>
            <Span>ex. 국밥, 치킨, 곱창, 삼겹살</Span>
          </Label>
        </div>
      </Form>
      <Title>국물 여부</Title>
      <label
        onClick={(event) => handleSoupChange("상관없음", event)}
        style={{cursor:"none", display: "block", textAlign: "right", marginRight:"30px" }}
      >
        상관없음
      </label>
      <Form>
        <div style={{display:"flex", alignItems:"center"}}>
          <img alt='aa' src='/soupYes.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={!props.isAnimating ? (event) => handleSoupChange("있음", event):undefined}
          >
            <HighlightText className={selectedSoup.includes("있음") ? "highlight" : ""}>
              있음
            </HighlightText>
            <Span>ex. 짬뽕, 잔치국수, 쌀국수</Span>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center"}}>
          <img alt='aa' src='/soupNo.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={!props.isAnimating ? (event) => handleSoupChange("없음", event):undefined}
          >
            <HighlightText className={selectedSoup.includes("없음") ? "highlight" : ""}>
              없음
            </HighlightText>
            <Span>ex. 치킨, 피자</Span>
          </Label>
        </div>
      </Form>
    </div>
  );
};

export default MenuKeywordForm;
