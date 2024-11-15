import React, { lazy } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const StyledContentBox = styled.p`
  //width: 92vw
  width: 95%;
  margin: 5vh auto;
  border: 1px solid blue;
`;
const StyledTitle = styled.p`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid red;
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
          <StyledResName>{selectedRestaurant.restaurantName}</StyledResName>
          <ReviewInfo>
            <p style={{margin:"3px 20px"}}>별점 : {selectedRestaurant.horoscope || 0}⭐</p>
            <p style={{margin:"3px 20px"}}>블로그 리뷰 : {selectedRestaurant.blogReviewCnt}개</p>
            <p style={{margin:"3px 20px"}}>방문자 리뷰 : {selectedRestaurant.visitorReviewCnt}개</p>
          </ReviewInfo>
          <p style={lineHeightStyle}> 🏠 편의시설 ::
                {selectedRestaurant.restauranService === "0" 
                ? "편의시설 정보를 제공하지 않습니다."
                : selectedRestaurant.restauranService}</p>
          <br />
          <StyledSubTitle>매장 소개</StyledSubTitle>
          <StyledMapBox>
            <StyledInfoImg imgUrl={selectedRestaurant.mainImg}/>
            <StyledInfo>
              <p>{selectedRestaurant.restauranInfo}</p>
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
          <StyledButton>방문하기!</StyledButton>
          <br />
          <br />
          <br />
          <StyledSubTitle>대표 메뉴</StyledSubTitle>

          {/* 메뉴 리스트를 반복문으로 생성 */}
          <StyledMenuBox {...settings}>
            {selectedRestaurant.menus.map((menu, index) => {
              const [imgUrl, name, price] = menu.split("]");
              return (
                <div key={index}>
                  <StyledMenuImg 
                    src={imgUrl === "0" ? "/img-sample_nongdam.jpg" : imgUrl} 
                    alt={name} 
                  />
                  <StyledMenuName>{name}</StyledMenuName>
                  <p className="menuPrice">{price}</p>
                </div>
              );
            })}
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
