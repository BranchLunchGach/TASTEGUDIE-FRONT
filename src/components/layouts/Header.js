import React from "react";
import styled from "styled-components";
import Home from "../commons/Home";
import Category from "../commons/Category";

const StyledHeader = styled.div`
  width: 100%;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header = ({ scrollToPage }) => {
  return (
    <StyledHeader>
      <Home scrollToPage={scrollToPage} />
      <Category />
    </StyledHeader>
  );
};

export default Header;
