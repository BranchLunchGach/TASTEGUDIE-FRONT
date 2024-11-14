import React from "react";
import Header2 from "../components/layouts/Header2";
import ChoiceList from "../components/menu/ChoiceList";
import styled from "styled-components";

const StyledPage = styled.div`
  height: 100vh;
`;

const ChoiceListPage = () => {
  return (
    <StyledPage>
      <Header2 />
      <ChoiceList />
    </StyledPage>
  );
};

export default ChoiceListPage;
