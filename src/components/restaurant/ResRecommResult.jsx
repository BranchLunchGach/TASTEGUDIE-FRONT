import React from "react";
import styled from "styled-components";
import Retry from "../commons/Retry";
import BackSpace from "../commons/BackSpace";

const StyledContentBox = styled.p`
  width: 92vw;
  margin: -3vh auto;
`;
const StyledTitle = styled.p`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const StyledMainTitle = styled.p`
  font-family: "LOTTERIA CHAB-Regular";
  font-size: 64px;
  text-align: left;
`;
const StyledSubTitle = styled.p`
  font-size: 24px;
  text-align: left;
`;
const StyledResultBox = styled.p`
  width: 70vw;
  height: 63vh;
  margin: -4vh auto 0 auto;
`;
const StyledP = styled.p`
  font-size: medium;
  margin-bottom: 8px;
`;
const StyledMenuImg = styled.img`
  width: 340px;
  height: 340px;
  margin: 0 auto;
  border-radius: 100%;
  filter: drop-shadow(0px 2px 5px lightgray);
`;
const StyledResBox = styled.div`
  display: flex;
  width: 900px;
  justify-content: space-between;
  margin: 50px auto;
`;
const StyledRes = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 100%;
  margin-bottom: 25px;
  padding: 48px 0 0 0;
  background: white;
  filter: drop-shadow(0px 2px 5px lightgray);
`;
const StyledResName = styled.h2`
  margin-bottom: 20px;
`;

const ResRecommResult = () => {
  return (
    <>
      <StyledContentBox>
        <StyledTitle>
          <BackSpace />
          <div>
            <StyledMainTitle className="mainTitle">
              식당 추천 결과
            </StyledMainTitle>
            <StyledSubTitle className="subTitle">식당 추천 결과</StyledSubTitle>
          </div>
        </StyledTitle>
        <StyledResultBox>
          <StyledMenuImg src="/img-sample_nongdam.jpg" alt="" />
          <StyledResBox>
            <div className="resItem">
              <StyledRes>
                <StyledResName>브로스</StyledResName>
                <StyledP>리뷰 갯수 1000개</StyledP>
                <StyledP>4.5⭐</StyledP>
              </StyledRes>
              <StyledP>광화문역 1번 출구에서 48m</StyledP>
            </div>
            <div className="resItem">
              <StyledRes>
                <StyledResName>브로스</StyledResName>
                <StyledP>리뷰 갯수 100개</StyledP>
                <StyledP>4.5⭐</StyledP>
              </StyledRes>
              <StyledP>광화문역 1번 출구에서 48m</StyledP>
            </div>
            <div className="resItem">
              <StyledRes>
                <StyledResName>브로스</StyledResName>
                <StyledP>리뷰 갯수 100개</StyledP>
                <StyledP>4.5⭐</StyledP>
              </StyledRes>
              <StyledP>광화문역 1번 출구에서 48m</StyledP>
            </div>
          </StyledResBox>
        </StyledResultBox>
        <Retry />
      </StyledContentBox>
    </>
  );
};

export default ResRecommResult;
