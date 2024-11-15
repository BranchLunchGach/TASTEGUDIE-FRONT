import React from "react";
import styled from "styled-components";
import Home from "../commons/Home";
import Category from "../commons/Category";
import Category2 from "../commons/Category2";

const StyledHeader = styled.div`
  margin: 0 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header1 = ({ scrollToPage }) => {
  const token = localStorage.getItem("Authorization");

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
