import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledHome = styled.img`
  width: 130px;
  float: left;
`;

const Home = ({ scrollToPage }) => {
  return (
    <>
      <div onClick={() => scrollToPage(1)}>
        <StyledHome src="/logo.png" />
      </div>
    </>
  );
};

export default Home;
