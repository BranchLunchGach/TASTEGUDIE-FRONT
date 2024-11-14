import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

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

const Span = styled.span`
  font-size: 0.8vw;
  color: #666;
  margin-top: 0.3vw;
  line-height: 1.2;
`;

const CoreKeywordForm = (props) => {
  const [selectedCoreKeywords, setSelectedCoreKeywords] = useState(props.selectedCoreKeywords, props.setSelectedCoreKeywords);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const handleCoreChange = (value, event) => {
    event.preventDefault(); // 페이지 이동 방지

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
            onClick={(event) => handleCoreChange("콜키지 가능", event)}
          >
            콜키지 가능 &nbsp; {selectedCoreKeywords.includes("콜키지 가능")?"✅":""}
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center"}}>
          <img alt='aa' src='/parking.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={(event) => handleCoreChange("주차 가능", event)}
          >
            주차 가능 &nbsp; {selectedCoreKeywords.includes("주차 가능")?"✅":""}
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center"}}>
          <img alt='aa' src='/vegan.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={(event) => handleCoreChange("비건 메뉴", event)}
          >
            비건 메뉴 &nbsp; {selectedCoreKeywords.includes("비건 메뉴")?"✅":""}
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center"}}>
          <img alt='aa' src='/pet.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={(event) => handleCoreChange("반려 동물 동반", event)}
          >
            반려 동물 동반 &nbsp; {selectedCoreKeywords.includes("반려 동물 동반")?"✅":""}
          </Label>
        </div>
      </Form>
    </div>
  );
};

export default CoreKeywordForm;
