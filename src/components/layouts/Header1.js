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
      <div onClick={() => scrollToPage(1)}>
        <Home />
      </div>
      <Category />
    </StyledHeader>
  );
};

export default Header1;
