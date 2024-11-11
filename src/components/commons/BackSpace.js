import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledIcon = styled.img`
  width: 67px;
  height: 68px;
  margin: 70px;
`;

const BackSpace = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); //뒤로가기
  };

  return <StyledIcon onClick={handleBack} src="/icon-backspace.png" />;
};

export default BackSpace;
