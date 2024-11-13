import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

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
  cursor: pointer;

`;

const MainKeywordForm = (props) => {
  const [selectedMainKeywords, setSelectedMainKeywords] = useState(props.selectedMainKeywords, props.setSelectedMainKeywords);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const handleMainChange = (value, event) => {
    event.preventDefault(); // 페이지 이동 방지

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
        style={{cursor:"pointer", display: "block", textAlign: "right", marginRight:"30px" }}
      >
        상관없음
      </label>
      <Form>
        <div style={{display:"flex", alignItems:"center", width:"80%"}}>
          <img alt='aa' src='/family.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={(event) => handleMainChange("가족모임", event)}
          >
            가족모임 &nbsp; {selectedMainKeywords.includes("가족모임")?"✅":""}
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center", width:"80%"}}>
          <img alt='aa' src='/manyPeople.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={(event) => handleMainChange("단체", event)}
          >
            단체 &nbsp; {selectedMainKeywords.includes("단체")?"✅":""}
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center", width:"80%"}}>
          <img alt='aa' src='/anny.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={(event) => handleMainChange("기념일", event)}
          >
            기념일 &nbsp; {selectedMainKeywords.includes("기념일")?"✅":""}
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center", width:"80%"}}>
          <img alt='aa' src='/money.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={(event) => handleMainChange("가성비", event)}
          >
            가성비 &nbsp; {selectedMainKeywords.includes("가성비")?"✅":""}
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center", width:"80%"}}>
          <img alt='aa' src='/person.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={(event) => handleMainChange("혼밥", event)}
          >
            혼밥 &nbsp; {selectedMainKeywords.includes("혼밥")?"✅":""}
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center", width:"80%"}}>
          <img alt='aa' src='/fat.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={(event) => handleMainChange("양많음", event)}
          >
            양많음 &nbsp; {selectedMainKeywords.includes("양많음")?"✅":""}
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center", width:"80%"}}>
          <img alt='aa' src='/hyengi.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={(event) => handleMainChange("현지맛", event)}
          >
            현지맛 &nbsp; {selectedMainKeywords.includes("현지맛")?"✅":""}
          </Label>
        </div>
      </Form>
    </div>
  );
};

export default MainKeywordForm;
