import React from "react";
import styled from "styled-components";
import Home from "../commons/Home";
import Category from "../commons/Category";

const StyledHeader = styled.div`
  margin: 0 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header1 = ({ scrollToPage }) => {
  return (
    <StyledHeader>
      <Home onClick={() => scrollToPage(1)} />
      <Category />
    </StyledHeader>
  );
};

export default Header1;
