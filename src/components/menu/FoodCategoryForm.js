import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { HiChevronDoubleDown } from "react-icons/hi";

const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
  padding: 1vw;
  cursor: none;
  `;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  padding: 1vw;
  font-size: 1vw;
  max-height: 25vw;
  margin-left: 2vw;
  overflow-y: scroll;
  -ms-overflow-style: none;

  &::-webkit-scrollbar{
    display:none;
  }
  `;

const Title = styled.h3`
  font-size: 1.4vw;
  color: #333;
  margin-bottom: 1vw;
  margin-top: 0.3vw;
  margin-left: 2vw;
  border-bottom: 1px solid;
  width: 80%;
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

const FoodCategoryForm = (props) => {
  const [selectedFoodCategorys, setSelectedFoodCategorys] = useState(props.selectedFoodCategorys, props.setSelectedFoodCategorys);
  const [isAllChecked, setIsAllChecked] = useState(false);

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
      if (isAllChecked) {
        setSelectedFoodCategorys([]); // 모든 항목 해제
        setIsAllChecked(false);
      } else {
        // 모든 항목을 선택
        setSelectedFoodCategorys([
          "튀김류", "조림 및 찜류", "찌개 및 전골류", "부침류", "무침 및 절임류", "빵류", "볶음류", "밥류", "면류", "국 및 탕류", "구이류"
        ]);
        setIsAllChecked(true);
      }
    } else {
      // "상관없음"을 제외한 선택을 처리
      setSelectedFoodCategorys((prevSelectedFoodCategorys) => {
        if (prevSelectedFoodCategorys.includes("상관없음")) {
          // "상관없음"이 선택되었을 경우, 다른 항목 클릭 시 '상관없음' 해제
          return [value];
        }
        // 선택된 항목을 토글 (추가/제거)
        return prevSelectedFoodCategorys.includes(value)
          ? prevSelectedFoodCategorys.filter((food) => food !== value)
          : [...prevSelectedFoodCategorys, value];
      });
      setIsAllChecked(false); // "상관없음" 해제
    }
  };

  useEffect(()=>{
    props.onFoodChange(selectedFoodCategorys);
  }, [selectedFoodCategorys])

  return (
    <div>
      <Title>음식종류</Title>
      <label
        onClick={(event) => handleFoodChange("상관없음", event)}
        style={{cursor:"none", display: "block", textAlign: "right", marginRight:"30px" }}
      >
        상관없음
      </label>
      <Form>
        <div style={{display:"flex", alignItems:"center", width:"80%"}}>
          <img alt='aa' src='/fry.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={!props.isAnimating ? (event) => handleFoodChange("튀김류", event):undefined}
          >
            <HighlightText className={selectedFoodCategorys.includes("튀김류") ? "highlight" : ""}>
              튀김류
            </HighlightText>
            <Span>ex. 돈가스, 탕수육, 깐쇼새우</Span>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center", width:"80%"}}>
          <img alt='aa' src='/jorim.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={!props.isAnimating ? (event) => handleFoodChange("조림 및 찜류", event):undefined}
          >
            <HighlightText className={selectedFoodCategorys.includes("조림 및 찜류") ? "highlight" : ""}>
              조림 및 찜류
            </HighlightText>
            <Span>ex. 족발, 보쌈, 갈비찜</Span>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center", width:"80%"}}>
          <img alt='aa' src='/soup.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={!props.isAnimating ? (event) => handleFoodChange("찌개 및 전골류", event):undefined}
          >
            <HighlightText className={selectedFoodCategorys.includes("찌개 및 전골류") ? "highlight" : ""}>
              찌개 및 전골류
            </HighlightText>
            <Span>ex. 샤브샤브, 나베, 만두전골</Span>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center", width:"80%"}}>
          <img alt='aa' src='/buchim.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={!props.isAnimating ? (event) => handleFoodChange("부침류", event):undefined}
          >
            <HighlightText className={selectedFoodCategorys.includes("부침류") ? "highlight" : ""}>
              부침류
            </HighlightText>
            <Span>ex. 김치전, 감자전, 부추전</Span>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center", width:"80%"}}>
          <img alt='aa' src='/muchim.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={!props.isAnimating ? (event) => handleFoodChange("무침 및 절임류", event):undefined}
          >
            <HighlightText className={selectedFoodCategorys.includes("무침 및 절임류") ? "highlight" : ""}>
              무침 및 절임류
            </HighlightText>
            <Span>ex. 골뱅이무침, 육회, 샐러드</Span>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center", width:"80%"}}>
          <img alt='aa' src='/bbang.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={!props.isAnimating ? (event) => handleFoodChange("빵류", event):undefined}
          >
            <HighlightText className={selectedFoodCategorys.includes("빵류") ? "highlight" : ""}>
              빵류
            </HighlightText>
            <Span>ex. 피자, 핫도그, 햄버거</Span>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center", width:"80%"}}>
          <img alt='aa' src='/bokkeum.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={!props.isAnimating ? (event) => handleFoodChange("볶음류", event):undefined}
          >
            <HighlightText className={selectedFoodCategorys.includes("볶음류") ? "highlight" : ""}>
              볶음류
            </HighlightText>
            <Span>ex. 제육볶음, 떡볶이, 팔보채</Span>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center", width:"80%"}}>
          <img alt='aa' src='/rice.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={!props.isAnimating ? (event) => handleFoodChange("밥류", event):undefined}
          >
            <HighlightText className={selectedFoodCategorys.includes("밥류") ? "highlight" : ""}>
              밥류
            </HighlightText>
            <Span>ex. 초밥, 오므라이스, 김밥</Span>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center", width:"80%"}}>
          <img alt='aa' src='/noodle.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={!props.isAnimating ? (event) => handleFoodChange("면류", event):undefined}
          >
            <HighlightText className={selectedFoodCategorys.includes("면류") ? "highlight" : ""}>
              면류
            </HighlightText>
            <Span>ex. 콩국수, 라멘, 짬뽕</Span>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center", width:"80%"}}>
          <img alt='aa' src='/guk.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={!props.isAnimating ? (event) => handleFoodChange("국 및 탕류", event):undefined}
          >
            <HighlightText className={selectedFoodCategorys.includes("국 및 탕류") ? "highlight" : ""}>
              국 및 탕류
            </HighlightText>
            <Span>ex. 곰탕, 설렁탕, 육개장</Span>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center", width:"80%"}}>
          <img alt='aa' src='/gu2.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={!props.isAnimating ? (event) => handleFoodChange("구이류", event):undefined}
          >
              <HighlightText className={selectedFoodCategorys.includes("구이류") ? "highlight" : ""}>
                구이류
            </HighlightText>
            <Span>ex. 삼겹살, 떡갈비, 스테이크</Span>
          </Label>
        </div>
      </Form>
      <HiChevronDoubleDown style={{ width:"3vw", height:"3vw", marginLeft:"9vw"}}/>
    </div>
  );
};

export default FoodCategoryForm;
