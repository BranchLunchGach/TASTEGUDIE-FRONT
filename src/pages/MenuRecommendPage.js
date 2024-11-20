import React from "react";
import Header3 from "../components/layouts/Header3";
import MenuOption from "../components/menu/MenuOption";
import styled from "styled-components";

const StyledPage = styled.div`
background: url(menuBack.jpg);
height: 100vh;
background-repeat: no-repeat;
background-size:cover;
`

const MenuRecommendPage = () => {
  return (
    <StyledPage>
      <Header3 />
      {/* <MenuRecommendTitle /> */}
      <MenuOption />
    </StyledPage>
  );
};

export default MenuRecommendPage;
