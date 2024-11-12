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

const MenuKeywordPage = (props) => {
  const [selectedFoodKeywords, setSelectedFoodKeywords] = useState(props.selectedFoodKeywords, props.setSelectedFoodKeywords);
  const [selectedSoup, setSelectedSoup] = useState(props.selectedFoodKeywords, props.setSelectedFoodKeywords);
  const [isKewordAllChecked, setIsKewordAllChecked] = useState(false);
  const [isSoupAllChecked, setIsSoupAllChecked] = useState(false);

  const handleFoodChange = (value, event) => {
    event.preventDefault(); // 페이지 이동 방지

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
      <div>
        <Title> === 음식의 키워드를 선택하세요 ===</Title>
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
              onClick={(event) => handleFoodChange("가벼운", event)}
            >
              가벼운 &nbsp; {selectedFoodKeywords.includes("가벼운")?"✅":""}<br/>
              <Span>ex. 샐러드, 샌드위치, 브런치</Span>
            </Label>
          </div>
          <div style={{display:"flex", alignItems:"center"}}>
            <img alt='aa' src='/icon_naver-login.png' style={{width:"2vw", height:"2vw"}}/>
            <Label
              onClick={(event) => handleFoodChange("든든한", event)}
            >
              든든한 &nbsp; {selectedFoodKeywords.includes("든든한")?"✅":""}<br/>
              <Span>ex. 치킨, 피자</Span>
            </Label>
          </div>
          <div style={{display:"flex", alignItems:"center"}}>
            <img alt='aa' src='/icon_naver-login.png' style={{width:"2vw", height:"2vw"}}/>
            <Label
              onClick={(event) => handleFoodChange("술과 어울리는", event)}
            >
              술과 어울리는 &nbsp; {selectedFoodKeywords.includes("술과 어울리는")?"✅":""}<br/>
              <Span>ex. 국밥, 치킨, 곱창, 삼겹살</Span>
            </Label>
          </div>
        </Form>
      </div>
      <div>
        <Title> === 국물 유무를 선택하세요 ===</Title>
        <Form>
          <div style={{display:"flex", alignItems:"center"}}>
            <img alt='aa' src='/icon_naver-login.png' style={{width:"2vw", height:"2vw"}}/>
            <Label
              onClick={(event) => handleSoupChange("있음", event)}
            >
              있음 &nbsp; {selectedFoodKeywords.includes("있음")?"✅":""}<br/>
              <Span>ex. 짬뽕, 잔치국수, 쌀국수</Span>
            </Label>
          </div>
          <div style={{display:"flex", alignItems:"center"}}>
            <img alt='aa' src='/icon_naver-login.png' style={{width:"2vw", height:"2vw"}}/>
            <Label
              onClick={(event) => handleSoupChange("없음", event)}
            >
              없음 &nbsp; {selectedFoodKeywords.includes("없음")?"✅":""}<br/>
              <Span>ex. 치킨, 피자</Span>
            </Label>
          </div>
          <Label
            onClick={(event) => handleSoupChange("상관없음", event)}
          >
            상관없음
          </Label>
        </Form>
      </div>
    </div>
  );
};

export default MenuKeywordPage;
