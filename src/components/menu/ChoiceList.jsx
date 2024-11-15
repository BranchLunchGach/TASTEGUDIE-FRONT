import React from "react";
import styled from "styled-components";

const StyledContentBox = styled.div`
  width: 69vw;
  margin: 6vh auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const StyledOptionBox = styled.div`
  width: 18vw;
  height: 23vw;
  background: white;
  box-shadow: 0px 2px 5px 2px lightgray;
  border-radius: 20px;
  z-index: 6;
  position: relative;

  &:hover {
    background-color: #fdd83e;
    	-webkit-transition: .6s cubic-bezier(.47,2.02,.31,-0.36);
  transition: .6s cubic-bezier(.47,2.02,.31,-0.36);
  	transform: scale(1.1);
  }

  &:hover ~ div {
    -webkit-transform: translateY(3vh);
    transform: translateY(3vh);
    -webkit-transition: 0.3s transform ease-out;
    transition: 0.3s transform ease-out;


`;
const StyledNameBox = styled.div`
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
  display: flex;
  flex-direction: column;
`;
const StyledName = styled.div`
  font-family: "LOTTERIA CHAB-Regular";
  font-size: 3vw;
  text-align: center;
`;
const StyledBookMark = styled.div`
  height: 10.5vw;
  width: 1.3vw;
  z-index: 5;
  position: relative;
  top: -7vw;
  margin-left: 28px;
  background: #ff6b6b;
`;

const secondOptionStyle = {
  marginTop: "12vh",
};
const thirdOptionStyle = {
  marginTop: "2vh",
};
const marginTopStyle = {
  marginTop: "-22px",
};

const ChoiceList = () => {
  return (
    <StyledContentBox>
      <div>
        <StyledOptionBox>
          <StyledNameBox>
            <StyledName>메뉴 추천</StyledName>
          </StyledNameBox>
        </StyledOptionBox>
        <StyledBookMark />
      </div>
      <div>
        <StyledOptionBox style={secondOptionStyle}>
          <StyledNameBox>
            <StyledName style={marginTopStyle}>AI</StyledName>
            <StyledName>메뉴 추천</StyledName>
          </StyledNameBox>
        </StyledOptionBox>
        <StyledBookMark />
      </div>
      <div>
        <StyledOptionBox style={thirdOptionStyle}>
          <StyledNameBox>
            <StyledName style={marginTopStyle}>만남의</StyledName>
            <StyledName>장소</StyledName>
          </StyledNameBox>
        </StyledOptionBox>
        <StyledBookMark />
      </div>
    </StyledContentBox>
  );
};

export default ChoiceList;
