import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledIcon = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 30px;
`;

const BackSpace = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); //뒤로가기
  };

  return <StyledIcon onClick={handleBack} src="/icon-backspace.png" />;
};

export default BackSpace;
