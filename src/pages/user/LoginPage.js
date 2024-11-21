import React from "react";
import LoginForm from "../../components/user/login/LoginForm";
import Header2 from "../../components/layouts/Header2";
import styled from "styled-components";

const StyledPage = styled.div`
  height: 100vh;
`;

const LoginPage = () => {
  return (
    <StyledPage>
      <Header2 />
      <LoginForm />
    </StyledPage>
  );
};

export default LoginPage;
