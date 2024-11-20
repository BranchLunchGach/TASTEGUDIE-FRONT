import React from "react";
import LoadingBar from "../components/commons/LoadingBar";
import Header2 from "../components/layouts/Header2";
import styled from "styled-components";

const StyledPage = styled.div`
  background: white;
  height: 100vh;
`;

const LoadingPage = () => {
  return (
    <StyledPage>
      <Header2 />
      <LoadingBar />
    </StyledPage>
  );
};

export default LoadingPage;
