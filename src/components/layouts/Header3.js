import React from "react";
import styled from "styled-components";
import Home from "../commons/Home";
import { Link } from "react-router-dom";

const StyledHeader = styled.div`
  margin: 0 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header3 = () => {

  return (
    <StyledHeader>
      <Link to="/">
        <Home />
      </Link>
    </StyledHeader>
  );
};

export default Header3;
