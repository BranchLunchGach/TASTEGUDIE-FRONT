import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import $ from "jquery";
import { useNavigate } from "react-router-dom";

const StyledContentBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1100px;
  margin: 0 auto;
`;
const StyledFindIDPWDBox = styled.div`
  width: 470px;
  background: white;
  padding: 60px 50px;
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
  padding: 10px 0;
  border: none;
  border-radius: 6px;
  color: white;
  background: black;
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
  font-size: 48px;
  font-weight: bold;
  text-align: left;
  margin-bottom: 20px;
`;
const StyledHr = styled.hr`
  background: lightgray;
  height: 1px;
  border: 0px;
`;

const FindIDPWDForm = () => {
  const SPRING_IP = process.env.REACT_APP_SPRING_IP;
  const [findIdResult, setFindIdResult] = useState();
  const navigator = useNavigate();
  //id 찾기
  const findId = (e) => {
    e.preventDefault();
    const name = $("#name").val();
    const phone = $("#phone").val();
    //console.log("name="+name);
    //console.log("phone="+phone);
    //백엔드의 db조사
    axios({
      url: SPRING_IP + "/findId",
      method: "POST",
      data: {
        name: name,
        phone: phone,
      },
    })
      .then((res) => {
        if (res.data === "") {
          setFindIdResult("해당하는 id가 존재하지 않습니다.");
          //색 지정
          $("#idResult").css("color", "red");
        } else {
          setFindIdResult("id는 " + res.data + " 입니다.");
          //색 지정
          $("#idResult").css("color", "blue");
        }
        //console.log("data="+res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //이메일 인증 관련 기능들
  const [emailCode, setEmailCode] = useState("");
  const [isemailCheck, setIsEmailCheck] = useState(false);
  const sendEmail = (e) => {
    e.preventDefault();

    let email = $("#userId").val();
    //console.log(email);
    let emailArray = email.split("@");
    if (emailArray.length === 2) {
      let emailArray2 = emailArray[1].split(".");
      let email1 = emailArray[0];
      let email2 = emailArray2[0];
      let email3 = emailArray2[1];
      if (
        emailArray.length !== 2 ||
        emailArray2.length !== 2 ||
        email1 === "" ||
        email2 === "" ||
        email3 === ""
      ) {
        alert("이메일 형식이 올바르지 않습니다.");
      } else {
        //console.log("url="+ SPRING_IP+"/mail")
        axios({
          url: SPRING_IP + "/mail",
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          data: email,
        }).then((res) => {
          alert("이메일을 보냈습니다.");
          //console.log(res.data);
          setEmailCode(res.data);
        });
      }
    } else {
      alert("이메일 형식이 올바르지 않습니다.");
    }
  }; // sendEmail

  //인증코드 검증
  const checkCode = (e) => {
    e.preventDefault();
    let code = $("#code").val();
    // eslint-disable-next-line eqeqeq
    if (emailCode == code) {
      alert("일치합니다.");
      setIsEmailCheck(true);
      $("#userId").attr("readOnly", true);
    } else {
      //console.log("code="+code);
      //console.log("emailCode="+emailCode);
      alert("불일치합니다.");
    }
  };

  //비밀번호 일치 여부 확인
  const [passResult, setPassResult] = useState();
  const [isPassEqual, setIsPassEqual] = useState(false);
  const checkPass = () => {
    let password = $("#password").val();
    let password2 = $("#password2").val();
    // eslint-disable-next-line eqeqeq
    if (password == password2) {
      setPassResult("비밀번호가 일치합니다.");
      $("#passResultArea").css("color", "blue");
      setIsPassEqual(true);
    } else {
      setPassResult("비밀번호가 일치하지 않습니다.");
      $("#passResultArea").css("color", "red");
      setIsPassEqual(false);
    }
  };
  //비밀번호 재설정
  const resetPassword = () => {
    let userId = $("#userId").val();
    let password = $("#password").val();
    //console.log("userId = "+userId);
    //console.log("password = "+password);
    if ( isemailCheck && isPassEqual && password !== "") {
      //검증 통과
      axios({
        url: SPRING_IP + "/users",
        method: "put",
        data: {
          userId: userId,
          password: password,
        },
      })
        .then((res) => {
          alert("비밀번호가 변경되었습니다.");
          navigator("/sign-in");
        })
        .catch((err) => {
          console.log(err);
          alert("문제가 발생했습니다.")
          //navigator("/error");
        });
    } else {
      //검증 불합격
      if (userId === "") {
        alert("이메일 인증을 진행해주세요.");
      } else {
        alert(" 비밀번호가 일치하지 않습니다.");
      }
    }
  };

  return (
    <>
      <StyledContentBox>
        <div>
          <StyledMainTitle>아이디 찾기</StyledMainTitle>
          <StyledFindIDPWDBox>
            <StyledForm>
              <StyledP>이름</StyledP>
              <StyledInput
                type="text"
                name="name"
                id="name"
                placeholder="가입 시 입력한 이름"
              />
              <StyledP>전화번호</StyledP>
              <StyledInput
                type="text"
                name="phone"
                id="phone"
                placeholder="가입 시 입력한 전화번호"
              />
            </StyledForm>

            <StyledButton type="submit" onClick={findId}>
              아이디 찾기
            </StyledButton>
            <h3 id="idResult">{findIdResult}</h3>
          </StyledFindIDPWDBox>
        </div>

        <div>
          <StyledMainTitle>비밀번호 찾기</StyledMainTitle>

          <StyledFindIDPWDBox>
            <div>
              <StyledForm>
                <StyledP>이메일 인증</StyledP>
                <StyledInput
                  type="text"
                  placeholder="가입 시 입력한 이메일"
                  name="userId"
                  id="userId"
                />
              </StyledForm>

              <StyledButton
                type="submit"
                style={{ marginBottom: "16px" }}
                onClick={sendEmail}
              >
                인증번호 보내기
              </StyledButton>
            </div>

            <div>
              <StyledForm>
                <StyledP>인증번호</StyledP>
                <StyledInput
                  type="text"
                  placeholder="메일로 받은 인증번호"
                  name="code"
                  id="code"
                ></StyledInput>
              </StyledForm>

              <StyledButton type="submit" onClick={checkCode}>
                인증하기
              </StyledButton>
            </div>

            <br />
            <br />
            <StyledHr />
            <br />
            <br />

            <div>
              <StyledForm>
                <StyledP>비밀번호 재설정</StyledP>
                <StyledInput
                  type="password"
                  placeholder="재설정 할 비밀번호"
                  name="password"
                  id="password"
                />
                <StyledP>비밀번호 확인</StyledP>
                <StyledInput
                  type="password"
                  placeholder="재설정 할 비밀번호를 다시 입력"
                  name="password2"
                  id="password2"
                  onChange={checkPass}
                />
                <h3 id="passResultArea">{passResult}</h3>
              </StyledForm>

              <StyledButton type="submit" onClick={resetPassword}>
                비밀번호 재설정
              </StyledButton>
            </div>
          </StyledFindIDPWDBox>
        </div>
      </StyledContentBox>
    </>
  );
};

export default FindIDPWDForm;
