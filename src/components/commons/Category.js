import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledCategory = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  margin-right: 30px;
  float: right;
  gap: 1vw;
`;
const StyledButton = styled.button`
  border: none;
  border-radius: 100px;
  padding: 14px 34px;
  font-family: "LOTTERIA CHAB-Regular", Helvetica;
  font-size: 22px;
  text-align: center;
`;
const menuStyle = {
  background: "#fdd83e",
  color: "black",
  rotate: "9deg",
};
const courseStyle = {
  background: "black",
  color: "#fdd83e",
  rotate: "-9deg",
};
const signInStyle = {
  background: "#fdd83e",
  color: "black",
  rotate: "6deg",
};

const Category = () => {
  return (
    <StyledCategory className="category">
      <Link to="/menu">
        <StyledButton style={menuStyle}>MENU</StyledButton>
      </Link>
      <Link to="/course">
        <StyledButton style={courseStyle}>COURSE</StyledButton>
      </Link>
      <Link to="/sign-in">
        <StyledButton style={signInStyle}>SIGN IN</StyledButton>
      </Link>
    </StyledCategory>
  );
};

export default Category;
