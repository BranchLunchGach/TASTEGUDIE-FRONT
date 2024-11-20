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
const StyledMenuButton = styled.button`
  border: none;
  border-radius: 100px;
  padding: 14px 34px;
  font-family: "LOTTERIA CHAB-Regular", Helvetica;
  font-size: 22px;
  text-align: center;
  background: #fdd83e;
  color: black;
  rotate: 9deg;
  transition: transform 0.2s;

  &:hover {
    transform: rotate(-9deg);
  }
`;
const StyledCourseButton = styled.button`
  border: none;
  border-radius: 100px;
  padding: 14px 34px;
  font-family: "LOTTERIA CHAB-Regular", Helvetica;
  font-size: 22px;
  text-align: center;
  background: black;
  color: #fdd83e;
  rotate: -9deg;
  transition: transform 0.2s ease;

  &:hover {
    transform: rotate(9deg);
  }
`;
const StyledSignInButton = styled.button`
  border: none;
  border-radius: 100px;
  padding: 14px 34px;
  font-family: "LOTTERIA CHAB-Regular", Helvetica;
  font-size: 22px;
  text-align: center;
  background: #fdd83e;
  color: black;
  rotate: 6deg;
  transition: transform 0.2s ease;

  &:hover {
    transform: rotate(-6deg);
  }
`;

const Category = () => {
  const loginFirst = () => {
    alert("로그인을 해야 이용가능합니다.");
  };
  return (
    <StyledCategory className="category">
      <Link to="/choice">
        <StyledMenuButton>Menu</StyledMenuButton>
      </Link>

      <StyledCourseButton onClick={loginFirst}>MyPage</StyledCourseButton>

      <Link to="/sign-in">
        <StyledSignInButton>Log In</StyledSignInButton>
      </Link>
    </StyledCategory>
  );
};

export default Category;
