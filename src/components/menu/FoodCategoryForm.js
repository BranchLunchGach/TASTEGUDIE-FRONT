import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
  padding: 1vw;
  cursor: pointer;
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
  text-align: center;
  font-size: 1.4vw;
  color: #333;
  margin-bottom: 1vw;
  margin-top: 0.3vw;
`;

const Span = styled.span`
  font-size: 0.8vw;
  color: #666;
  margin-top: 0.3vw;
  line-height: 1.2;
`;

const FoodCategoryForm = (props) => {
  const [selectedFoodCategorys, setSelectedFoodCategorys] = useState(props.selectedFoodCategorys, props.setSelectedFoodCategorys);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const handleFoodChange = (value, event) => {
    event.preventDefault(); // 페이지 이동 방지

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
      <Title>=== 카테고리를 선택하세요 ===</Title>
      <label
        onClick={(event) => handleFoodChange("상관없음", event)}
        style={{cursor:"pointer", display: "block", textAlign: "right", marginRight:"30px" }}
      >
        상관없음
      </label>
      <Form>
        <div style={{display:"flex", alignItems:"center", width:"80%"}}>
          <img alt='aa' src='/fry.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={(event) => handleFoodChange("튀김류", event)}
          >
            튀김류 &nbsp; {selectedFoodCategorys.includes("튀김류")?"✅":""}<br/>
            <Span>ex. 돈가스, 탕수육, 깐쇼새우</Span>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center", width:"80%"}}>
          <img alt='aa' src='/jorim.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={(event) => handleFoodChange("조림 및 찜류", event)}
          >
            조림 및 찜류 &nbsp; {selectedFoodCategorys.includes("조림 및 찜류")?"✅":""}<br/>
            <Span>ex. 족발, 보쌈, 갈비찜</Span>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center", width:"80%"}}>
          <img alt='aa' src='/soup.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={(event) => handleFoodChange("찌개 및 전골류", event)}
          >
            찌개 및 전골류 &nbsp; {selectedFoodCategorys.includes("찌개 및 전골류")?"✅":""}<br/>
            <Span>ex. 샤브샤브, 나베, 만두전골</Span>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center", width:"80%"}}>
          <img alt='aa' src='/buchim.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={(event) => handleFoodChange("부침류", event)}
          >
            부침류 &nbsp; {selectedFoodCategorys.includes("부침류")?"✅":""}<br/>
            <Span>ex. 김치전, 감자전, 부추전</Span>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center", width:"80%"}}>
          <img alt='aa' src='/muchim.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={(event) => handleFoodChange("무침 및 절임류", event)}
          >
            무침 및 절임류 &nbsp; {selectedFoodCategorys.includes("무침 및 절임류")?"✅":""}<br/>
            <Span>ex. 골뱅이무침, 육회, 샐러드</Span>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center", width:"80%"}}>
          <img alt='aa' src='/bbang.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={(event) => handleFoodChange("빵류", event)}
          >
            빵류 &nbsp; {selectedFoodCategorys.includes("빵류")?"✅":""}<br/>
            <Span>ex. 피자, 핫도그, 햄버거</Span>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center", width:"80%"}}>
          <img alt='aa' src='/bokkeum.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={(event) => handleFoodChange("볶음류", event)}
          >
            볶음류 &nbsp; {selectedFoodCategorys.includes("볶음류")?"✅":""}<br/>
            <Span>ex. 제육볶음, 떡볶이, 팔보채</Span>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center", width:"80%"}}>
          <img alt='aa' src='/rice.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={(event) => handleFoodChange("밥류", event)}
          >
            밥류 &nbsp; {selectedFoodCategorys.includes("밥류")?"✅":""}<br/>
            <Span>ex. 초밥, 오므라이스, 김밥</Span>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center", width:"80%"}}>
          <img alt='aa' src='/noodle.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={(event) => handleFoodChange("면류", event)}
          >
            면류 &nbsp; {selectedFoodCategorys.includes("면류")?"✅":""}<br/>
            <Span>ex. 콩국수, 라멘, 짬뽕</Span>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center", width:"80%"}}>
          <img alt='aa' src='/guk.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={(event) => handleFoodChange("국 및 탕류", event)}
          >
            국 및 탕류 &nbsp; {selectedFoodCategorys.includes("국 및 탕류")?"✅":""}<br/>
            <Span>ex. 곰탕, 설렁탕, 육개장</Span>
          </Label>
        </div>
        <div style={{display:"flex", alignItems:"center", width:"80%"}}>
          <img alt='aa' src='/gu2.png' style={{width:"2vw", height:"2vw"}}/>
          <Label
            onClick={(event) => handleFoodChange("구이류", event)}
          >
            구이류 &nbsp; {selectedFoodCategorys.includes("구이류")?"✅":""}<br/>
            <Span>ex. 삼겹살, 떡갈비, 스테이크</Span>
          </Label>
        </div>
      </Form>
      <Title>스크롤을 내려주세요</Title>
    </div>
  );
};

export default FoodCategoryForm;
