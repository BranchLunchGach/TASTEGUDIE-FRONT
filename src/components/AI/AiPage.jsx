import React from "react";
import Header2 from "../layouts/Header2";
import Chat from "./Chat";
import styled from "styled-components";

const StyledPage = styled.div`
  height: 100vh;
`;

const AiPage = () => {
  return (
    <StyledPage>
      <Header2 />
      <Chat />
    </StyledPage>
  );
};

export default AiPage;
