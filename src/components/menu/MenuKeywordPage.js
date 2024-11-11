import React, { useState } from 'react';
import styled from 'styled-components';

// 스타일 정의
const Form = styled.form`
  display: flex;
  flex-direction: column; /* 요소들을 수직으로 정렬 */
  gap: 1.5vw;
  padding: 1vw;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  font-size: 1vw;
`;

const Title = styled.h3`
  text-align: center;
  font-size: 1.4vw;
  color: #333;
  margin-bottom: 1vw;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%; /* 너비를 100%로 설정하여 꽉 채움 */
  padding: 1vw;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

const Checkbox = styled.input`
  margin-right: 0.6vw;
  width: 1.2vw;
  height: 1.2vw;
  cursor: pointer;
`;

const Span = styled.span`
  font-size: 0.8vw;
  color: #666;
  margin-top: 0.3vw;
  line-height: 1.2;
`;

const MenuKeywordPage = () => {
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const handleFoodChange = (event) => {
    const value = event.target.value;

    if (value === "상관없음") {
      if (event.target.checked) {
        setSelectedFoods(["한식", "양식", "일식", "중식", "아시안", "상관없음"]);
        setIsAllChecked(true);
      } else {
        setSelectedFoods([]);
        setIsAllChecked(false);
      }
    } else {
      setSelectedFoods((prevSelectedFoods) =>
        event.target.checked
          ? [...prevSelectedFoods, value]
          : prevSelectedFoods.filter((food) => food !== value)
      );
    }
  };

  return (
    <div>
      <Title> === 음식의 키워드를 선택하세요 ===</Title>
      <Form>
        <Label>
          <Checkbox
            type="checkbox"
            value="한식"
            checked={selectedFoods.includes("한식")}
            onChange={handleFoodChange}
            disabled={isAllChecked && selectedFoods.includes("한식")}
          />
          가벼운<br/><Span>ex. 샐러드, 파스타, 샌드위치, 브런치</Span>
        </Label>
        <Label>
          <Checkbox
            type="checkbox"
            value="양식"
            checked={selectedFoods.includes("양식")}
            onChange={handleFoodChange}
            disabled={isAllChecked && selectedFoods.includes("양식")}
          />
          든든한<br/><Span>ex. 치킨, 피자</Span>
        </Label>
        <Label>
          <Checkbox
            type="checkbox"
            value="일식"
            checked={selectedFoods.includes("일식")}
            onChange={handleFoodChange}
            disabled={isAllChecked && selectedFoods.includes("일식")}
          />
          술과 어울리는<br/><Span>ex. 국밥, 치킨, 곱창, 삼겹살</Span>
        </Label>
        <Label>
          <Checkbox
            type="checkbox"
            value="상관없음"
            checked={selectedFoods.includes("상관없음")}
            onChange={handleFoodChange}
          />
          상관없음<br/><Span>ex. 모두 선택</Span>
        </Label>
      </Form>
    </div>
  );
};

export default MenuKeywordPage;
