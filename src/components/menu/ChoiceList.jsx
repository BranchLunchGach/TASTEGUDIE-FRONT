import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./ChoiceList.css";

const StyledContentBox = styled.div`
  width: 69vw;
  margin: 10vh auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const StyledOptionBox = styled.div`
  width: 16.5vw;
  height: 20vw;
  z-index: 6;
  position: static;
  cursor: pointer;

  &:hover ~ div {
    -webkit-transform: translateY(3vh);
    transform: translateY(3vh);
    -webkit-transition: 0.3s transform ease-out;
    transition: 0.3s transform ease-out;
  }

  &:hover .kr {
    opacity: 1;
    transition: 0.3s;
  }

   &:hover .en {
    opacity: 0;
    transition: 0.3s;
`;
const StyledNameBox = styled.div`
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
  display: flex;
  flex-direction: column;
  z-index: 10;
  justify-content: space-between;
  align-items: center;
`;
const StyledName = styled.div`
  font-family: "LOTTERIA CHAB-Regular";
  font-style: italic;
  font-size: 5vw;
  text-align: center;
  position: relative;
  z-index: 11;
`;

const ChoiceList = () => {
  const navigator = useNavigate();
  return (
    <>
      {/* <div className="staticDiv"></div> */}
      <StyledContentBox>
        <div>
          <StyledOptionBox
            onClick={() => {
              navigator("/menu");
            }}
          >
            <StyledNameBox>
              <div className="en">
                <StyledName>MENU</StyledName>
              </div>
              <div className="kr">
                <StyledName>메뉴</StyledName>
                <br />
                <StyledName>추천</StyledName>
              </div>
            </StyledNameBox>
          </StyledOptionBox>
          {/* <StyledBookMark /> */}
        </div>
        <div>
          <StyledOptionBox
            onClick={() => {
              navigator("/ai");
            }}
          >
            <StyledNameBox>
              <div className="en">
                <StyledName>AI</StyledName>
              </div>
              <div className="kr" style={{ top: "-100%" }}>
                <StyledName>AI</StyledName>
                <StyledName>메뉴</StyledName>
                <StyledName>추천</StyledName>
              </div>
            </StyledNameBox>
          </StyledOptionBox>
          {/* <StyledBookMark /> */}
        </div>
        <div>
          <StyledOptionBox
            onClick={() => {
              navigator("/hello");
            }}
          >
            <StyledNameBox>
              <div className="en">
                <StyledName>PLACE</StyledName>
              </div>
              <div className="kr">
                <StyledName>만남의</StyledName>
                <br />
                <StyledName>장소</StyledName>
              </div>
            </StyledNameBox>
          </StyledOptionBox>
          {/* <StyledBookMark /> */}
        </div>
      </StyledContentBox>
    </>
  );
};

export default ChoiceList;
