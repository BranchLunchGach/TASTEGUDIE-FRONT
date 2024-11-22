import React from "react";
import styled from "styled-components";
import Home from "../commons/Home";
import { Link } from "react-router-dom";
import Category3 from "../commons/Category3"

const StyledHeader = styled.div`
  margin: 0 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header3 = () => {
  const token = localStorage.getItem("Authorization");

  return (
    <StyledHeader>
      <Link to="/">
        <Home />
      </Link>
      <Category3/>
    </StyledHeader>
  );
};

export default Header3;
