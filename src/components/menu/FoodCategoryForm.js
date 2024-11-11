import React, { useState } from 'react';
import styled from 'styled-components';

const FoodCategoryFormWrapper = styled.div`
  .food-category-form {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5vw;
    padding: 1vw;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    font-size: 1vw;
    max-height: 32vw;
    overflow-y: auto;
    width: 100%;
    box-sizing: border-box;
  }

  h3 {
    text-align: center;
    font-size: 1.4vw;
    color: #333;
    margin-bottom: 1vw;
  }

  label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 38%;
    padding: 1vw;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #ffffff;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
    margin-bottom: 1vw;
    height: 5.5vw;
    box-sizing: border-box;
    word-wrap: break-word;
    min-height: 7vw;
  }

  label:hover {
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.15);
  }

  input[type="checkbox"] {
    margin-right: 0.6vw;
    width: 1.2vw;
    height: 1.2vw;
    cursor: pointer;
  }

  label[style] {
    color: gray;
  }
`;

const FoodCategoryForm = () => {
  const [selectedFoodCategorys, setSelectedFoodCategorys] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const handleFoodChange = (event) => {
    const value = event.target.value;

    if (value === "상관없음") {
      if (event.target.checked) {
        setSelectedFoodCategorys(["한식", "양식", "일식", "중식", "아시안", "상관없음"]);
        setIsAllChecked(true);
      } else {
        setSelectedFoodCategorys([]);
        setIsAllChecked(false);
      }
    } else {
      setSelectedFoodCategorys((prevSelectedFoods) =>
        event.target.checked
          ? [...prevSelectedFoods, value]
          : prevSelectedFoods.filter((food) => food !== value)
      );
    }
  };

  return (
    <FoodCategoryFormWrapper>
      <h3> === 메뉴의 카테고리를 선택하세요 ===</h3>
      <form className='food-category-form'>
        <label>
          <input
            type="checkbox"
            value="한식"
            checked={selectedFoodCategorys.includes("한식")}
            onChange={handleFoodChange}
            disabled={isAllChecked && selectedFoodCategorys.includes("한식")}
          />
          면류
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="양식"
            checked={selectedFoodCategorys.includes("양식")}
            onChange={handleFoodChange}
            disabled={isAllChecked && selectedFoodCategorys.includes("양식")}
          />
          빵류
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="일식"
            checked={selectedFoodCategorys.includes("일식")}
            onChange={handleFoodChange}
            disabled={isAllChecked && selectedFoodCategorys.includes("일식")}
          />
          볶음류
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="중식"
            checked={selectedFoodCategorys.includes("중식")}
            onChange={handleFoodChange}
            disabled={isAllChecked && selectedFoodCategorys.includes("중식")}
          />
          밥류
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="아시안"
            checked={selectedFoodCategorys.includes("아시안")}
            onChange={handleFoodChange}
            disabled={isAllChecked && selectedFoodCategorys.includes("아시안")}
          />
          튀김류
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="아시안"
            checked={selectedFoodCategorys.includes("아시안")}
            onChange={handleFoodChange}
            disabled={isAllChecked && selectedFoodCategorys.includes("아시안")}
          />
          구이류
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="아시안"
            checked={selectedFoodCategorys.includes("아시안")}
            onChange={handleFoodChange}
            disabled={isAllChecked && selectedFoodCategorys.includes("아시안")}
          />
          찌개 및 전골류
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="아시안"
            checked={selectedFoodCategorys.includes("아시안")}
            onChange={handleFoodChange}
            disabled={isAllChecked && selectedFoodCategorys.includes("아시안")}
          />
          찜류
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="아시안"
            checked={selectedFoodCategorys.includes("아시안")}
            onChange={handleFoodChange}
            disabled={isAllChecked && selectedFoodCategorys.includes("아시안")}
          />
          죽 및 스프류
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="아시안"
            checked={selectedFoodCategorys.includes("아시안")}
            onChange={handleFoodChange}
            disabled={isAllChecked && selectedFoodCategorys.includes("아시안")}
          />
          조림류
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="아시안"
            checked={selectedFoodCategorys.includes("아시안")}
            onChange={handleFoodChange}
            disabled={isAllChecked && selectedFoodCategorys.includes("아시안")}
          />
          전 및 부침류
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="아시안"
            checked={selectedFoodCategorys.includes("아시안")}
            onChange={handleFoodChange}
            disabled={isAllChecked && selectedFoodCategorys.includes("아시안")}
          />
          국 및 탕류
        </label>
        <br />
        <label style={{ color: "gray" }}>
          <input
            type="checkbox"
            value="상관없음"
            checked={selectedFoodCategorys.includes("상관없음")}
            onChange={handleFoodChange}            
          />
          상관없음
        </label>
      </form>
    </FoodCategoryFormWrapper>
  );
};

export default FoodCategoryForm;
