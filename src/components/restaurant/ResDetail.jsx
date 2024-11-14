import React, { lazy } from "react";
import styled from "styled-components";
import BackSpace from "../commons/BackSpace";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
const StyledResultBox = styled.p`
  width: 60vw;
  margin: 0 auto;
`;
const StyledResName = styled.p`
  font-size: 64px;
  font-weight: bold;
  margin-bottom: 20px;
`;
const StyledSubTitle = styled.p`
  font-family: "LOTTERIA CHAB-Regular";
  font-size: 36px;
  text-align: left;
  margin-bottom: 12px;
`;
const StyledButton = styled.button`
  font-size: medium;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  color: white;
  background: black;
`;
const StyledMapBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 40px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 2px 5px 2px lightgray;
  margin-bottom: 20px;
`;
const StyledMap = styled.div`
  border: 1px solid gray;
  width: 64%;
  height: 400px;
`;
const StyledMapDesc = styled.div`
  width: 32%;
  text-align: left;
`;
const StyledMenuBox = styled(Slider)`
  display: flex;
  flex-direction: row;
  padding: 40px;
  width: 100%;
`;
const StyledMenuImg = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 100%;
  filter: drop-shadow(0px 2px 5px lightgray);
  margin: 0 auto 10px auto;
`;
const StyledMenuName = styled.h3`
  margin-bottom: 5px;
`;

const lineHeightStyle = {
  lineHeight: "220%",
};

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  centerMode: true,
  centerPadding: "30px",
  border: "1px solid gray",
};

const ResDetail = () => {
  return (
    <>
      <StyledContentBox>
        <StyledTitle>
          <BackSpace />
          <StyledMainTitle className="mainTitle">
            식당 상세 정보
          </StyledMainTitle>
        </StyledTitle>

        <StyledResultBox>
          <StyledResName>익선취향</StyledResName>
          <br />
          <StyledSubTitle>가는 길</StyledSubTitle>
          <StyledMapBox>
            <StyledMap />
            <StyledMapDesc>
              <p style={lineHeightStyle}>🚩 서울 종로구 수표로28길 17-32 1층</p>
              <p style={lineHeightStyle}>🚉 종로3가역 4번 출구에서 139m</p>
              <br />
              <hr />
              <br />
              <h3 style={lineHeightStyle}>🚶‍♀️‍➡️ 이동 거리 600m</h3>
              <h3 style={lineHeightStyle}>⏰ 이동 시간 10분</h3>
              <br />
              <hr />
              <br />
              <h3 style={lineHeightStyle}>🏠 편의시설</h3>
              <p style={lineHeightStyle}>포장, 예약, 무선 인터넷</p>
            </StyledMapDesc>
          </StyledMapBox>
          <StyledButton>방문하기!</StyledButton>
          <br />
          <br />
          <br />
          <StyledSubTitle>대표 메뉴</StyledSubTitle>
          <StyledMenuBox {...settings}>
            <div>
              <StyledMenuImg src="/img-sample_nongdam.jpg" alt="" />
              <StyledMenuName>메뉴이름</StyledMenuName>
              <p className="menuPrice">10,000원</p>
            </div>
            <div>
              <StyledMenuImg src="/img-sample_nongdam.jpg" alt="" />
              <StyledMenuName>메뉴이름</StyledMenuName>
              <p className="menuPrice">10,000원</p>
            </div>
            <div>
              <StyledMenuImg src="/img-sample_nongdam.jpg" alt="" />
              <h3>메뉴이름</h3>
              <p className="menuPrice">10,000원</p>
            </div>
            <div>
              <StyledMenuImg src="/img-sample_nongdam.jpg" alt="" />
              <h3>메뉴이름</h3>
              <p className="menuPrice">10,000원</p>
            </div>
            <div>
              <StyledMenuImg src="/img-sample_nongdam.jpg" alt="" />
              <h3>메뉴이름</h3>
              <p className="menuPrice">10,000원</p>
            </div>
          </StyledMenuBox>
          <br />
          <br />
          <br />
        </StyledResultBox>
      </StyledContentBox>
    </>
  );
};

export default ResDetail;
