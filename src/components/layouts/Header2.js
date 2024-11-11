import React from "react";
import styled from "styled-components";
import Home from "../commons/Home";
import Category from "../commons/Category";
import { Link } from "react-router-dom";

const StyledHeader = styled.div`
  margin: 0 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header2 = () => {
  return (
    <StyledHeader>
      <Link to="/">
        <Home />
      </Link>
      <Category />
    </StyledHeader>
  );
};

export default Header2;
