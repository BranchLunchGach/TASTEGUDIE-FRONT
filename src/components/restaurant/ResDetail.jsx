import React, { lazy, useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const messages = [
  "맛있어요!!",
  "괜찮은 맛이에요",
  "괜찮은 곳 같아요. 재방문 의사가 있어요.",
  "친절한 서비스였어요",
  "분위기도 괜찮아요."
];

const StyledContentBox = styled.p`
  //width: 92vw
  width: 95%;
  margin: 5vh auto;
`;
const StyledTitle = styled.p`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const StyledMainTitle = styled.p`
  font-family: "LOTTERIA CHAB-Regular";
  font-size: 3vw;
  text-align: left;
`;
const StyledResultBox = styled.p`
  width: 60vw;
  margin: 0 auto;
`;
const StyledResName = styled.p`
  font-size: 2vw;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const ReviewInfo = styled.div`
  display: flex;
  justify-content: center;
`

const StyledSubTitle = styled.p`
  font-family: "LOTTERIA CHAB-Regular";
  font-size: 36px;
  text-align: left;
  margin-left: 30px;
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

  display: flex;

`;
const StyledMapBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 40px;
  background-color: white;
  width: 90%;
  border-radius: 8px;
  box-shadow: 0px 2px 5px 2px lightgray;
  margin-left: 30px;
  margin-bottom: 20px;
`;

const StyledInfoImg = styled.div`
  border: 1px solid gray;
  width: 50%;
  height: 400px;
  margin-left: 23px;
  background-image: url(${(props) => props.imgUrl || "/default-image.jpg"});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
`;

const StyledInfo = styled.div`
  width: 43%;

  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 400px;
  overflow: hidden;
`;

const StyledMap = styled.div`
  border: 1px solid gray;
  width: 55%;
  height: 400px;
`;
const StyledMapDesc = styled.div`
  width: 40%;
  text-align: left;
  margin-top: 5vh;
`;
const StyledMenuBox = styled(Slider)`
  display: flex;
  flex-direction: row;
  padding: 40px;
  width: 100%;

  .slick-slide {
    margin: 0 30px; /* 슬라이드 간격을 더 넓게 */
  }

  .slick-track {
    display: flex;
    align-items: center;
    width: 100%;
  }
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

// StyledReviewBox 추가
const StyledReviewBox = styled(Slider)`
  .slick-list {
    overflow: hidden; /* 슬라이드가 화면 밖으로 넘어가지 않도록 설정 */
    width: 100%;
    margin: 0 auto;
  }

  .slick-track {
    display: flex; /* 슬라이드를 가로로 배치 */
    align-items: center; /* 슬라이드가 수직으로 정렬 */
    width: 100%; /* 트랙의 너비를 화면 너비에 맞게 설정 */
  }

  .slick-slide {
    display: flex;
    justify-content: center; /* 슬라이드 개별 콘텐츠를 가로 중앙 정렬 */
    align-items: center; /* 슬라이드 개별 콘텐츠를 세로 중앙 정렬 */
    width: 90%; /* 슬라이드의 가로 크기를 줄여 화면에 맞춤 */
    height: auto;
    padding: 0 10px; /* 슬라이드 사이 여백 조정 */
  }

  width: 95%;
  padding: 40px;
`;

const StyledReview = styled.div`
  border: 1px solid lightgray;
  width: 80%;
  margin: 0 auto;
  padding: 30px 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 2px 5px lightgray;
  text-align: left;
  font-size: 1.2rem;
  line-height: 1.5;

  position: relative;
  overflow: visible; /* 인용 기호가 잘리지 않도록 설정 */
  transition: transform 0.3s ease;
  
  /* 인용 기호 */
  &::before {
    content: "“";
    font-size: 3rem;
    color: #90caf9;
    position: absolute;
    top: -5px;
    left: 4px;
  }
  
  &::after {
    content: "”";
    font-size: 3rem;
    color: #90caf9;
    position: absolute;
    bottom: -15px;
    right: 5px;
  }
`;

const settingsReview = {
  dots: true,
  infinite: true, // 무한 루프
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const StyledReviewerInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
`;

const StyledReviewerName = styled.p`
  font-weight: bold;
  font-size: 0.9rem;
  color: #333;
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
  autoplaySpeed: 3000,
  centerMode: true,
  centerPadding: "30px",
  border: "1px solid gray",
};

const ResDetail = ( {selectedRestaurant} ) => {

  return (
    <>
      <StyledContentBox>
        <StyledTitle>
          <StyledMainTitle className="mainTitle">
            식당 상세 정보
          </StyledMainTitle>
        </StyledTitle>

        <StyledResultBox>
          <div style={{textAlign:"center"}}>
            <StyledResName style={{display:"inline", marginLeft:"2vw"}}>
                {selectedRestaurant.restaurantName}
            </StyledResName>
            <span style={{marginLeft:"1vw", color:"grey", fontSize:"1.2vw"}}>{selectedRestaurant.restaurantType}</span>
          </div>
          <ReviewInfo>
            <p style={{margin:"3px 20px"}}>별점 : {selectedRestaurant.horoscope || 0}⭐</p>
            <p style={{margin:"3px 20px"}}>블로그 리뷰 : {selectedRestaurant.blogReviewCnt}개</p>
            <p style={{margin:"3px 20px"}}>방문자 리뷰 : {selectedRestaurant.visitorReviewCnt}개</p>
          </ReviewInfo>
          <p style={{textAlign: "center", lineHeight: "220%"}}> 🏠 편의시설 ::
                {selectedRestaurant.restauranService === "0" 
                ? "편의시설 정보를 제공하지 않습니다."
                : selectedRestaurant.restauranService}</p>
          <br />
          <StyledSubTitle>매장 소개</StyledSubTitle>
          <StyledMapBox>
            <StyledInfoImg imgUrl={selectedRestaurant.mainImg}/>
            <StyledInfo>
              <p>{selectedRestaurant.restauranInfo === "0" ? "정보를 제공하지 않습니다." : selectedRestaurant.restauranInfo}</p>
            </StyledInfo>
          </StyledMapBox>
          <br />
          <br />
          <StyledSubTitle>가는 길</StyledSubTitle>
          <StyledMapBox>
            <StyledMap />
            <StyledMapDesc>
              <p style={lineHeightStyle}>🚩 {selectedRestaurant.address}</p>
              <p style={lineHeightStyle}>🚉 {selectedRestaurant.subwayAddress === "0" 
                ? "정보를 제공하지 않습니다."
                : selectedRestaurant.subwayAddress}</p>
              <br />
              <hr />
              <br />
              <h3 style={lineHeightStyle}>🚶‍♀️‍➡️ 이동 거리 600m</h3>
              <h3 style={lineHeightStyle}>⏰ 이동 시간 10분</h3>
            </StyledMapDesc>
          </StyledMapBox>
          <br />
          <br />
          <br />
          <StyledSubTitle>대표 메뉴</StyledSubTitle>

          {/* 메뉴 리스트를 반복문으로 생성 */}
          <StyledMenuBox {...settings}>
            {selectedRestaurant.menus.map((menu, index) => {
              const [imgUrl, name, price] = menu.split("\\\\");
              return (
                <div key={index}>
                  <StyledMenuImg 
                    src={imgUrl === "0" ? "/img-sample_nongdam.jpg" : imgUrl} 
                    alt={name} 
                  />
                  <StyledMenuName style={{textAlign:"center"}}>{name}</StyledMenuName>
                  <p className="menuPrice" style={{textAlign:"center"}}>{price}</p>
                </div>
              );
            })}
          </StyledMenuBox>
          <br />
          <br />
          <br />

          {/* 리뷰 섹션 추가 */}
          <StyledSubTitle>고객 리뷰</StyledSubTitle>
          <StyledReviewBox {...settingsReview}>
            {selectedRestaurant.textReviews.map((review, index) => (
              <StyledReview key={index}>
                  {review === "0" || review.trim() === "" ? messages[index] : review}
              </StyledReview>
            ))}
          </StyledReviewBox>
          <br />
          <br />
          <br />
        </StyledResultBox>
      </StyledContentBox>
    </>
  );
};

export default ResDetail;
