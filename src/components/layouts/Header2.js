import React from "react";
import styled from "styled-components";
import Home from "../commons/Home";
import Category from "../commons/Category";
import { Link } from "react-router-dom";
import Category2 from "../commons/Category2";

const StyledHeader = styled.div`
  margin: 0 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header2 = () => {
  const token = localStorage.getItem("Authorization");
  return (
    <StyledHeader>
      <Link to="/">
        <Home />
      </Link>
      { token === null ? <Category /> : <Category2/>}
    </StyledHeader>
  );
};

export default Header2;
