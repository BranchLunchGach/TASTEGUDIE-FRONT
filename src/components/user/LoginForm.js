import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./LoginForm.css";

//css
const StyledContentBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1000px;
  margin: 6vh auto;
  padding: 50px;
`;
const StyledLoginBox = styled.div`
  width: 410px;
  background: white;
  padding: 70px 50px;
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
  width: 54px;
  height: 54px;
  margin-bottom: 50px;
  filter: drop-shadow(0px 2px 5px lightgray);
`;
const StyledInput = styled.input`
  padding: 10px;
  margin-bottom: 16px;
  border-radius: 6px;
  border: 1px solid lightgray;
`;
const StyledP = styled.p`
  font-size: medium;
`;
const StyledMainTitle = styled.p`
  font-family: "LOTTERIA CHAB-Regular";
  font-size: 64px;
  text-align: left;
`;
const StyledSubTitle = styled.p`
  font-size: 24px;
  text-align: left;
`;

const flexRowBetweenStyle = {
  display: "flex",
  "justify-content": "space-between",
};
const flexRowEvenlyStyle = {
  display: "flex",
  "justify-content": "space-evenly",
};
const linkStyle = {
  "text-decoration": "none",
  color: "#6282F4",
}

//component
const LoginForm = () => {
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
     

    const login= (e)=>{
        e.preventDefault();
        //let id = $('#idinput').val();
        //let password = $('#passinput').val();

        let formData = new FormData();
        formData.append("username",user.username);
        formData.append("password",user.password);


        axios({
            url:"http://localhost:9000/login",
            method:"post",
            data:formData,
           
          
        })
        .then((res)=>{
            let token = res.headers.authorization;
            localStorage.setItem("Authorization",token);
            window.location.href="http://localhost:3000";
        })
        .catch((error)=>{
            alert("id와 password가 올바르지 않습니다.")
            console.log(error);
        })
    }

    const googleApi = ()=>{
        
        const googleUrl = "https://accounts.google.com/o/oauth2/v2/auth?"
            +"client_id="
            + process.env.REACT_APP_GOOGLE_LOGIN_API_KEY
            +  "&redirect_uri=" 
            + "http://localhost:3000/callback" 
            + "&response_type=code"
            + "&scope=email%20profile"
            + "%20https://www.googleapis.com/auth/user.birthday.read"
            + "%20https://www.googleapis.com/auth/user.addresses.read"
            + "%20https://www.googleapis.com/auth/user.phonenumbers.read"
            + "%20https://www.googleapis.com/auth/profile.agerange.read"
            + "%20https://www.googleapis.com/auth/user.gender.read";
            window.location.href=googleUrl;
          
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
          <h3>아이디</h3>
          <StyledInput
            type="text"
            name="id"
            id="idinput"
            placeholder="이메일 형식으로 입력"
            onChange={handleForm}
          />
          <h3>비밀번호</h3>
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
            <Link to={"/join"} style={linkStyle}>
              아이디/비밀번호 찾기
            </Link>
          </StyledP>
        </div>
        <StyledButton type="submit" onClick={login}>
          로그인
        </StyledButton>
      </StyledLoginBox>
    </StyledContentBox>
  );
};

export default LoginForm;
