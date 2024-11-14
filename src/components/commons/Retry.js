import React from "react";
import styled from "styled-components";

const StyledRetry = styled.img`
  width: 70px;
  height: 70px;
  float: right;
`;

const Retry = () => {
  return (
    <div>
      <StyledRetry src="/icon-retry.png" />
    </div>
  );
};

export default Retry;
