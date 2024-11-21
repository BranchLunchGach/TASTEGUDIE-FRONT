import React, {useState, useContext, useEffect} from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import ResDetail from "./ResDetail";
import { HelloContext } from '../../context/HelloContext';
import axios from 'axios';
import TmapMarker from "./TmapMarker";

const StyledContentBox = styled.p`
  width: 92vw;
  height: 100vh;
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
  margin-left: 4vw;
`;

const StyledResultBox = styled.p`
  width: 90vw;
  height: 80vh;
  margin: -4vh -2vw 0 auto;
  position: relative;
  z-index: 0;

  display: flex;
`;

const ResultLeftBox = styled.div`
  width: 50vw;
  margin-top: 4vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const SubTitle = styled.div`
  width: 80%;
  padding: 1.5vw 1.5vw 1.0vw 1.5vw;
  text-align: center;
  border: 3px solid #ccc;
  border-radius: 30px;
`

const LocationMap = styled.div`
    width: 80%;
    height: 70%;
    border: 1px solid black;
    margin: 5vh auto;
`
const StyledSpan = styled.span`
  font-size: small;
  margin-bottom: 0.5vw;
  margin-left: 2vw;
  color: ${({ isSelected }) => (isSelected ? "white" : "black")};
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
  flex-direction: column;

  width: 60vw;
  height: 95%;
  justify-content: space-between;
  margin: 7vh auto;
`;
const StyledRes = styled.div`
  width: 40vw;
  background: ${({ isSelected }) => (isSelected ? "#FDD83E" : "white")};
  border: 2px solid ${({ isSelected }) => (isSelected ? "black" : "transparent")};

  margin-left: 5vw;
  padding: 20px;
  border-radius: 10px;
  filter: drop-shadow(0px 2px 5px lightgray);

  display: flex;
  cursor: pointer;
`;

const StyledResLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`

const StyledResRight = styled.div`
  margin-left: 0.5vw;

  display: flex;
  align-items: center;
`

const ResRightBtn = styled.button`
  padding: 1vw 1.5vw;
  border: 1px solid black;
  border-radius: 10px;
  font-size: 13px;
  font-weight: bold;
  color: white;
  background-color: #022ED2;
`

const StyledResName = styled.h2`
  font-size: 20px;
  margin-left: 1vw;;
  color: ${({ isSelected }) => (isSelected ? "white" : "black")};

`;

const StyledResSpan = styled.span`
  font-size: 15px;
  color: ${({ isSelected }) => (isSelected ? "white" : "gray")};
  margin-left: 0.5vw;
`

const Buttons = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-left: 2vw;
`

const Button = styled.button`
  width: 8vw;
  padding: 13px;
  border-radius: 15px;
`

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
const ResItem = ({ name, restaurantType, reviewCount, rating, distance, isSelected, onClickDetail, onClickSelect }) => {
  return (
    <div className="resItem">
      <StyledRes onClick={onClickSelect} isSelected={isSelected}>
        <StyledResLeft>
          <div style={{marginBottom:"2vh"}}>
            <StyledResName style={{display:"inline"}} isSelected={isSelected}>{name}</StyledResName>
            <StyledResSpan isSelected={isSelected}>{restaurantType}</StyledResSpan>
          </div>
          <StyledSpan isSelected={isSelected}>- 리뷰 갯수 {reviewCount}개  / {rating > 0 ? `${rating}⭐` : "별점 없음"}</StyledSpan>
          <StyledSpan isSelected={isSelected}>- {distance}</StyledSpan>
        </StyledResLeft>
        <StyledResRight>
            <ResRightBtn onClick={onClickDetail}>상세 정보</ResRightBtn>
        </StyledResRight>
      </StyledRes>
    </div>
  );
};

const ResRecommResult = () => {

  const navigate = useNavigate();  // useNavigate 훅을 사용하여 페이지 이동

  const location = useLocation();

  const menu = location.state?.menu || []; // 전달받은 데이터
  const x = location.state?.avgX || []; // 전달받은 데이터(시작 위도)
  const y = location.state?.avgY || []; // 전달받은 데이터(시작 경도)

  const { menuData } = location.state || {}; // state에서 menuData를 안전하게 가져오기
  const [displayedData, setDisplayedData] = useState([]); // 현재 보여지는 3개의 데이터

  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const [selectedIndex, setSelectedIndex] = useState(null); // 선택된 요소를 관리하는 상태 추가

  const [address, setAddress] = useState("");

  //api keys
  const clientId = process.env.REACT_APP_clientId;
  const clientSecret = process.env.REACT_APP_clientSecret;

  useEffect(() => {
    console.log("menu >> " + menu);
    console.log("x >> " + x);
    console.log("y >> " + y);
    if (menuData && menuData.length > 0) {
      setDisplayedData(menuData.slice(0, 3)); // 처음 3개만 표시
    }
  }, [menuData]);

  const handleRecom = () => {
    if (menuData && menuData.length > 3) {
      const nextData = menuData.slice(3, 6); // 4번째부터 6번째까지
      setDisplayedData(nextData); // 기존 데이터 삭제 후, 새로 추천된 3개 데이터만 설정
    }
  };

  const openModal = (index) => {
    setSelectedRestaurant(displayedData[index]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRestaurant(null);
  };

  const resComplete = () => {
    navigate("/");
  }

  return (
    <>
      <StyledContentBox>
        <StyledTitle>
            <StyledMainTitle className="mainTitle">
              식당 추천 결과
            </StyledMainTitle>
        </StyledTitle>
        <StyledResultBox>
          <ResultLeftBox>
            <SubTitle>
              <p>오늘 우리가 만날 곳은 "{address}" 입니다.</p>
              <p>그 주변 "{menu}" 관련 음식점 세 곳을 추천드립니다.</p>
            </SubTitle>
            <LocationMap>
              <TmapMarker avgX={x} avgY={y} onAddressChange={setAddress} />
            </LocationMap>
          </ResultLeftBox>
          <StyledResBox>
            {displayedData.map((data, index) => (
              <ResItem
                key={index}
                name={data.restaurantName}
                restaurantType = {data.restaurantType}
                reviewCount={parseInt(data.visitorReviewCnt,10) + parseInt(data.blogReviewCnt, 10)} // 예제 데이터
                rating={data.horoscope || 0} // 평점이 없으면 0으로 처리
                distance={data.subwayAddress === "0" 
                ? "정보를 제공하지 않습니다."
                : data.subwayAddress}
                onClickDetail={() => openModal(index)} // 클릭 시 모달 열기
                onClickSelect={() => setSelectedIndex(index)} // 클릭 시 선택 상태 업데이트
                isSelected={selectedIndex === index} // 선택된 인덱스인지 확인
              />
            ))}
            <Buttons>
              <div style={{
                    display:"flex", 
                    flexDirection:"column", 
                    alignItems:"center"}}>
                <Button style={{backgroundColor: "#FDD83E", fontWeight:"bold"}} onClick={handleRecom}>식당 재추천</Button>
                <span style={{color:"red", fontSize:"0.8vw", fontWeight:"bold"}}>1회한하여 재추천이 가능합니다!</span>
              </div>
              <Button style={{height:"70%", backgroundColor:"#F68A91", color:"white", fontWeight:"bold"}} onClick={resComplete}>홈으로</Button>
            </Buttons>
          </StyledResBox>
        </StyledResultBox>

        {/* 모달 */}
        <StyledModal isOpen={isModalOpen}>
          <ModalContent>
            <CloseButton onClick={closeModal} style={{marginRight:"65px", marginTop: "80px", width: "80px"}}>닫기</CloseButton>
            {
              selectedRestaurant && <ResDetail selectedRestaurant={selectedRestaurant} startX={x} startY={y}/>
            }
          </ModalContent>
        </StyledModal>
      </StyledContentBox>
    </>
  );
};

export default ResRecommResult;
