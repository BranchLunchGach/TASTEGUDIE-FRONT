import React from "react";
import styled from "styled-components";

const StyledHome = styled.img`
  width: 130px;
  float: left;
  cursor: pointer;
`;

const Home = () => {
  return <StyledHome src="/logo.png" />;
};

export default Home;
