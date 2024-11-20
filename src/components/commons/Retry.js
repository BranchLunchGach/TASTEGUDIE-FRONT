import React from "react";
import styled from "styled-components";

const StyledRetry = styled.img`
  width: 3.6vw;
  height: 3.6vw;
  float: right;
  cursor: pointer;
  margin-top: -1vh;
`;

const Retry = (onClick) => {
  return (
    <div>
      <StyledRetry src="/icon-retry.png" />
    </div>
  );
};

export default Retry;
