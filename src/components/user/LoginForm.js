import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledContentBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 53vw;
  margin: 3vh auto;
  padding: 5vh;
  // border: 1px solid gray;
`;
const StyledLoginBox = styled.div`
  width: 46%;
  background: white;
  padding: 7.5% 5.6%;
  box-shadow: 0px 2px 5px 2px lightgray;
  border-radius: 8px;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 8px;
`;
const StyledButton = styled.button`
  width: 100%;
  font-size: medium;
  font-weight: bold;
  margin-top: 50px;
  padding: 10px 0;
  border: none;
  border-radius: 6px;
  color: white;
  background: black;
`;
const StyledImg = styled.img`
  width: 2.8vw;
  height: 2.8vw;
  margin-bottom: 5.3vh;
  filter: drop-shadow(0px 2px 5px lightgray);
`;
const StyledInput = styled.input`
  padding: 10px;
  margin-bottom: 16px;
  border-radius: 6px;
  border: 1px solid lightgray;

  &::placeholder {
    font-size: medium;
    color: lightgray;
  }
`;
const StyledP = styled.p`
  font-size: medium;
`;
const StyledMainTitle = styled.p`
  font-family: "LOTTERIA CHAB-Regular";
  font-size: 4vw;
  text-align: left;
`;
const StyledSubTitle = styled.p`
  font-size: 1.2vw;
  text-align: left;
`;

const flexRowBetweenStyle = {
  display: "flex",
  justifyContent: "space-between",
};
const flexRowEvenlyStyle = {
  display: "flex",
  justifyContent: "space-evenly",
};
const linkStyle = {
  textDecoration: "none",
  color: "#6282F4",
};

//component
const LoginForm = () => {
  const navigator = useNavigate();
  const SPRING_IP = process.env.REACT_APP_SPRING_IP;
  const FRONT_IP = process.env.REACT_APP_FRONT_IP;
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleForm = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const Login = (e) => {
    e.preventDefault();

    //let id = $('#idinput').val();
    //let password = $('#passinput').val();

    let formData = new FormData();
    formData.append("username", user.username);
    formData.append("password", user.password);
    //console.log("token="+token);
    //console.log("url="+process.env.REACT_APP_BACK_IP+"/login");
    axios({
      url: SPRING_IP + "/login",
      method: "post",
      data: formData,
    })
      .then((res) => {
        let token = res.headers.authorization;
        localStorage.setItem("Authorization", token);
        localStorage.setItem("id", res.data.userId);
        navigator("/");
      })
      .catch((error) => {
        alert("id와 password가 올바르지 않습니다.");
        console.log(error);
        navigator("/error");
      });
  };

  const googleApi = () => {
    const googleUrl =
      "https://accounts.google.com/o/oauth2/v2/auth?" +
      "client_id=" +
      process.env.REACT_APP_GOOGLE_LOGIN_API_KEY +
      "&redirect_uri=" +
      FRONT_IP +
      "/callback" +
      "&response_type=code" +
      "&scope=email%20profile" +
      "%20https://www.googleapis.com/auth/user.birthday.read" +
      "%20https://www.googleapis.com/auth/user.addresses.read" +
      "%20https://www.googleapis.com/auth/user.phonenumbers.read" +
      "%20https://www.googleapis.com/auth/profile.agerange.read" +
      "%20https://www.googleapis.com/auth/user.gender.read";
    window.location.href = googleUrl;
  };

  return (
    <StyledContentBox>
      <div>
        <StyledMainTitle>Sign In</StyledMainTitle>
        <StyledSubTitle>더 나은 추천을 위해 로그인 해 주세요</StyledSubTitle>
      </div>
      <StyledLoginBox>
        <div style={flexRowEvenlyStyle}>
          <StyledImg src="/icon_naver-login.png" alt="" />
          <StyledImg src="/icon_kakao-login.png" alt="" />
          <StyledImg src="/icon_google-login.png" alt="" onClick={googleApi} />
        </div>
        <StyledForm>
          <h5>아이디</h5>
          <StyledInput
            type="text"
            name="username"
            id="idinput"
            placeholder="이메일 형식으로 입력"
            onChange={handleForm}
          />
          <h5>비밀번호</h5>
          <StyledInput
            type="text"
            name="password"
            id="passinput"
            placeholder="비밀번호"
            onChange={handleForm}
          ></StyledInput>
        </StyledForm>

        <div style={flexRowBetweenStyle}>
          <StyledP>
            <Link to={"/sign-up"} style={linkStyle}>
              회원가입
            </Link>
          </StyledP>
          <StyledP>
            <Link to={"/find"} style={linkStyle}>
              아이디/비밀번호 찾기
            </Link>
          </StyledP>
        </div>
        <StyledButton type="submit" onClick={Login}>
          로그인
        </StyledButton>
      </StyledLoginBox>
    </StyledContentBox>
  );
};

export default LoginForm;
