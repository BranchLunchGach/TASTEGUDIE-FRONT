import Header1 from "../components/layouts/Header1";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const StyledOuter = styled.div`
  height: 100vh;
  overflow-y: auto;
  position: relative;
  //스크롤 바 숨기기
  &::-webkit-scrollbar {
    display: none;
  }
`;
const StyledInner = styled.div`
  height: 100vh;
  position: relative;
  z-index: 1.5; /* Lower z-index */
`;
const StyledHeaderBox = styled.div`
  position: absolute; /* Absolute positioning for the header */
  top: 0; /* Position it at the top */
  left: 0; /* Align it to the left */
  width: 100%; /* Full width */
  z-index: 4; /* Highest z-index to ensure it's on top */
`;
const StyledBGBehind = styled.img`
  position: sticky; /* Positioned behind */
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1; /* Lower z-index */
`;
const StyledBGFront = styled.img`
  position: absolute; /* Positioned in front */
  /* top: -6%; */
  left: 0;
  width: 100%;
  height: 100vh; /* Maintain aspect ratio */
  z-index: 2; /* Higher than bg-behind */
`;
const StyledComment = styled.div`
  position: absolute; /* Positioned in front */
  bottom: -90vh;
  left: 5%;
  z-index: 2; /* Higher than bg-behind */
  width: 929px;
  display: flex;
  flex-direction: column;
  align-items: baseline;

  & p {
    font-family: "LOTTERIA CHAB-Regular", Hevetica;
    font-weight: 400;
    color: #fdd83e;
    font-size: 96px;
  }
`;

const MainPage = () => {
  const DIVIDER_HEIGHT = 5;
  const outerDivRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);

  const pageHeight = window.innerHeight;

  const scrollToPage = (pageNumber) => {
    const topPosition =
      (pageNumber - 1) * pageHeight + DIVIDER_HEIGHT * (pageNumber - 1);
    outerDivRef.current.scrollTo({
      top: topPosition,
      left: 0,
      behavior: "smooth",
    });
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
      const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.

      if (deltaY > 0) {
        // 스크롤 내릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          console.log("현재 1페이지, down");
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(2);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          console.log("현재 2페이지, down");
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(3);
        } else {
          // 현재 3페이지
          console.log("현재 3페이지, down");
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
        }
      } else {
        // 스크롤 올릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          console.log("현재 1페이지, up");
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          console.log("현재 2페이지, up");
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(1);
        } else {
          // 현재 3페이지
          console.log("현재 3페이지, up");
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(2);
        }
      }
    };
    const outerDivRefCurrent = outerDivRef.current;
    outerDivRefCurrent.addEventListener("wheel", wheelHandler);
    return () => {
      outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
    };
  }, []);

  return (
    <>
      <StyledHeaderBox>
        <Header1 scrollToPage={scrollToPage} />
      </StyledHeaderBox>

      <StyledOuter ref={outerDivRef}>
        {/* warning 발생해서 div 특성값 currentPage => currentpage 로 변경 */}
        <div currentpage={currentPage} />
        <StyledBGBehind src="/bg-img.jpg" alt="Background" />
        <StyledBGFront src="/Exclude.png" alt="Foreground" />
        <StyledComment>
          <p>Find Your Taste</p>
          <p />
          <p>With Taste Guide</p>
        </StyledComment>

        <div className="divider"></div>

        <StyledInner />
        <div className="divider" />
      </StyledOuter>
    </>
  );
};
export default MainPage;
