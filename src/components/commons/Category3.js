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
      <Link to="/chart">
        <StyledButton style={menuStyle}>나의 추천 기록</StyledButton>
      </Link>
      <Link to={"/update"}>
        <StyledButton style={courseStyle}>회원정보수정</StyledButton>
      </Link>
        <StyledButton style={signInStyle} onClick={()=>{alert("안 돼 못 해") }}>회원탈퇴</StyledButton>
    </StyledCategory>
  );
};

export default Category;
