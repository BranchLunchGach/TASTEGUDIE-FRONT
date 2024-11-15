import React, {useState} from "react";
import styled from "styled-components";
import Retry from "../commons/Retry";
import BackSpace from "../commons/BackSpace";
import { useLocation } from "react-router-dom";
import ResDetail from "./ResDetail";

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

// 모달 스타일
const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 1200px;
  max-height: 85vh; // 모달의 최대 높이 설정
  overflow-y: auto; // 세로 스크롤 허용
`;

const CloseButton = styled.button`
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  float: right;
  &:hover {
    background: #ff4f4f;
  }
`;

// ResItem 컴포넌트
const ResItem = ({ name, reviewCount, rating, distance, onClick }) => {
  return (
    <div className="resItem" onClick={onClick}>
      <StyledRes>
        <StyledResName>{name}</StyledResName>
        <StyledP>리뷰 갯수 {reviewCount}개</StyledP>
        <StyledP>{rating > 0 ? `${rating}⭐` : "리뷰 없음"}</StyledP>
      </StyledRes>
      <StyledP>{distance}</StyledP>
    </div>
  );
};

const ResRecommResult = () => {

  const location = useLocation();
  const menuData = location.state?.menuData; // location.state.menuData로 수정

  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const openModal = (index) => {
    setSelectedRestaurant(menuData[index]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRestaurant(null);
  };

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
            {menuData.map((data, index) => (
              <ResItem
                key={index}
                name={data.restaurantName}
                reviewCount={parseInt(data.visitorReviewCnt,10) + parseInt(data.blogReviewCnt, 10)} // 예제 데이터
                rating={data.horoscope || 0} // 평점이 없으면 0으로 처리
                distance={data.subwayAddress === "0" 
                ? "정보를 제공하지 않습니다."
                : data.subwayAddress}
                onClick={() => openModal(index)} // 클릭 시 모달 열기
              />
            ))}
          </StyledResBox>
        </StyledResultBox>

        {/* 모달 */}
        <StyledModal isOpen={isModalOpen}>
          <ModalContent>
            <CloseButton onClick={closeModal} style={{marginRight:"65px", marginTop: "80px", width: "80px"}}>닫기</CloseButton>
            {
              selectedRestaurant && <ResDetail selectedRestaurant={selectedRestaurant} />
            }
          </ModalContent>
        </StyledModal>
        <Retry />
      </StyledContentBox>
    </>
  );
};

export default ResRecommResult;
