import Header1 from "../components/layouts/Header1";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import "./MainPage.css";

const StyledPage = styled.div`
  position: relative; /* Allow absolute positioning of children */
  height: 100vh;
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
          //console.log("현재 1페이지, down");
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(2);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          //console.log("현재 2페이지, down");
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(3);
        } else {
          // 현재 3페이지
          //console.log("현재 3페이지, down");
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
          //console.log("현재 1페이지, up");
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          //console.log("현재 2페이지, up");
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(1);
        } else {
          // 현재 3페이지
          //console.log("현재 3페이지, up");
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
      <div className="header">
        <Header1 scrollToPage={scrollToPage} />
      </div>

      <div className="outer" ref={outerDivRef}>
        {/* warning 발생해서 div 특성값 currentPage => currentpage 로 변경 */}
        <div currentpage={currentPage} />
        <img className="bg-behind" src="/bg-img.jpg" alt="Background" />
        <img className="bg-front" src="/Exclude.png" alt="Foreground" />
        <div className="comment">
          <p>Find Your Taste</p>
          <p />
          <p>With Taste Guide</p>
        </div>

        <div className="divider"></div>

        <div className="inner"></div>
        <div className="divider" />
      </div>
    </>
  );
};
export default MainPage;
