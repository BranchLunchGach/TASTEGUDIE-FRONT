import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// 스타일 정의
const Form = styled.form`
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  padding: 1vw;
  font-size: 1vw;
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

const Span = styled.span`
  font-size: 0.8vw;
  color: #666;
  margin-top: 0.3vw;
  line-height: 1.2;
`;

const FoodForm = (props) => {
  const [selectedFoods, setSelectedFoods] = useState(props.selectedFoods, props.setSelectedFoods);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const handleFoodChange = (value, event) => {
    event.preventDefault(); // 페이지 이동 방지

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
  }, [selectedFoods])

  return (
    <div>
      <Title> === 음식의 종류를 선택하세요 ===</Title>
      <label
        onClick={(event) => handleFoodChange("상관없음", event)}
        style={{cursor:"pointer", display: "block", textAlign: "right", marginRight:"30px" }}
      >
        상관없음
      </label>
      <Form>
        <div style={{display:"flex", alignItems:"center"}}>
          <img alt='aa' src='/icon_naver-login.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={(event) => handleFoodChange("한식", event)}
          >
            한식 &nbsp; {selectedFoods.includes("한식")?"✅":""}<br />
            <Span>ex. 국밥, 김치찌개, 불고기, 한정식</Span>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center"}}>
          <img alt='aa' src='/icon_naver-login.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={(event) => handleFoodChange("양식", event)}
          >
            양식 &nbsp; {selectedFoods.includes("양식")?"✅":""}<br />
            <Span>ex. 파스타, 피자, 스테이크, 햄버거</Span>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center"}}>
          <img alt='aa' src='/icon_naver-login.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={(event) => handleFoodChange("일식", event)}
          >
            일식 &nbsp; {selectedFoods.includes("일식")?"✅":""}<br />
            <Span>ex. 돈까스, 라멘, 샤브샤브, 초밥</Span>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center"}}>
          <img alt='aa' src='/icon_naver-login.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={(event) => handleFoodChange("중식", event)}
          >
            중식 &nbsp; {selectedFoods.includes("중식")?"✅":""}<br />
            <Span>ex. 짜장면, 짬뽕, 탄탄면, 깐쇼새우</Span>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center"}}>
          <img alt='aa' src='/icon_naver-login.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={(event) => handleFoodChange("아시안", event)}
          >
            아시안 음식 &nbsp; {selectedFoods.includes("아시안")?"✅":""}<br />
            <Span>ex. 월남쌈, 팟타이, 쌀국수, 분짜</Span>
          </Label>
        </div>
      </Form>
    </div>
  );
};

export default FoodForm;
