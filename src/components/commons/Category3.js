import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
  const navigator = useNavigate();
  const DeleteUser=()=>{
    const userId = localStorage.getItem("id");
    console.log("userId="+userId);
    // eslint-disable-next-line no-restricted-globals
    if(confirm("정말 삭제하시겠습니까?") ){
    axios({
      url:process.env.REACT_APP_SPRING_IP+"/users/"+userId,
      method:"delete",
    })
    .then((res)=>{
      alert("회원탈퇴가 완료되었습니다.");
      localStorage.removeItem("Authorization");
      localStorage.removeItem("id");
      navigator("/");
    })
    .catch((err)=>{
      //console.log(err);
      navigator("/error");
    })
    }
  }
  return (
    <StyledCategory className="category">
      <Link to="/chart">
        <StyledButton style={menuStyle}>My Menu</StyledButton>
      </Link>
      <Link to={"/update"}>
        <StyledButton style={courseStyle}>My Info</StyledButton>
      </Link>
        <StyledButton style={signInStyle} onClick={DeleteUser} >Sign Out</StyledButton>
    </StyledCategory>
  );
};

export default Category;
