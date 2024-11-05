import React from "react";
import styled from "styled-components";

const StyledRetry = styled.img`
  width: 80px;
  height: 80px;
  position: absolute;
  right: 0;
  margin: 0 70px;
`;

const Retry = () => {
  return (
    <div>
      <StyledRetry src="/icon-retry.png" />
    </div>
  );
};

export default Retry;
