import React, { useEffect, useState } from "react";
import "./RegisterForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import styled from "styled-components";

const StyledContainer = styled.div`
  width: 45%;
  padding: 100px;
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

  //라디오 버튼 숨기기
  &[type="radio"] {
    display: none;
  }

  //선택된 상태
  &[type="radio"]:checked + label {
    color: white;
    background-color: black;
  }
`;

const RegisterForm = () => {
  const SPRING_IP = process.env.REACT_APP_SPRING_IP;

  // 현재 연도 계산
  const currentYear = new Date().getFullYear();

  // 1960년부터 현재 연도까지의 옵션을 생성하는 함수
  const generateYearOptions = () => {
    const years = [];
    for (let year = 1960; year <= currentYear; year++) {
      years.push(
        <option key={year} value={year}>
          {year}
        </option>
      );
    }
    return years;
  };
  const [user, setUser] = useState({
    userNo: 0,
    userId: "",
    password: "",
    name: "",
    address: "",
    phone: "",
    birthDate: "",
    gender: "MAN",
  });
  const [birthDay, setBirthDate] = useState({
    year: "",
    month: "",
    day: "",
  });

  // 중복체크 결과 값을 저장 할 idCheckResult
  const [idCheckResult, setIdCheckResult] = useState("");

  // 아이디 중복여부에 따른 css 를 적용하기 위해 상태 변수
  const [isCheckResult, setIsCheckResult] = useState(false);
  // 비밀번호 일치여부에 따른 css 를 적용하기 위해 상태 변수
  const [isPassCheckResult, setIsPassCheckResult] = useState(false);

  //생년월일 값 변경 시
  const changeBirth = (e) => {
    setBirthDate({ ...birthDay, [e.target.name]: e.target.value });
    console.log("name = " + e.target.name);
    console.log("value = " + e.target.value);
  };
  useEffect(() => {
    if (birthDay.year !== "") {
      setUser({
        ...user,
        birthDate: birthDay.year + "-" + birthDay.month + "-" + birthDay.day,
      });
    }
  }, [birthDay]);
  //각 text 박스에 값이 변경되었을 때-생년월일 제외
  const changeValue = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    //console.log("name = "+e.target.name);
    //console.log("value = "+e.target.value);
    //id 입력박스에 값이 입력될때마다 axios를 이용해서 비동기통신 - 중복여부 체크
    if (e.target.name === "userId" && e.target.value !== "") {
      //console.log("url="+process.env.REACT_APP_SPRING_IP +"/users/" +e.target.value);
      axios({
        method: "GET",
        url: SPRING_IP + "/users/" + e.target.value,
        // data : {"id" : e.target.value},
      })
        .then((res) => {
          //console.log("data= "+res.data)

          if (res.data !== "") {
            setIdCheckResult("중복입니다.");
            setIsCheckResult(true);
          } else {
            setIdCheckResult("사용 가능합니다.");
            setIsCheckResult(false);
          }
        })
        .catch((err) => {
          //실패
          let errMessage = err.response.data.type + "\n";
          errMessage += err.response.data.title + "\n";
          errMessage += err.response.data.detail + "\n";

          errMessage += err.response.data.status + "\n";
          errMessage += err.response.data.instance + "\n";
          errMessage += err.response.data.timestamp;
          alert(errMessage);
        });
    }
  };
  //비밀번호 일치여부 확인
  const [checkResult, setCheckResult] = useState("");
  const checkEqual = (e) => {
    let pass1 = $("#password").val();
    let pass2 = e.target.value;

    if (pass1 === pass2) {
      setCheckResult("비밀번호가 일치합니다.");
      setIsPassCheckResult(true);
    } else {
      setCheckResult("비밀번호가 일치하지 않습니다.");
      setIsPassCheckResult(false);
    }
  };

  const navigator = useNavigate();

  //가입하기
  const submitJoin = (e) => {
    e.preventDefault();
    console.log(user);
    let phonearray = $("#phone").val().split("-");
    console.log("phonearray= " + phonearray);
    //입력된 값 유효성 검사
    if (user.birthDate !== "") {
      //생일 값이 입력되었다면
      console.log("birthDate=" + user.birthDate);
      if ((birthDay.year === "") | (birthDay.year === "년(4자)")) {
        alert("연도를 선택해주세요");
        $("#year").focus();
      } else if ((birthDay.month === "") | (birthDay.month === "월")) {
        alert("월을 선택해주세요");
        $("#month").focus();
      } else if ((birthDay.day === "") | (birthDay.day === "년(4자)")) {
        alert("일을 선택해주세요");
        $("#day").focus();
      }
    }
    if (phonearray.length === 3) {
      console.log("[0]=" + phonearray[0]);
      console.log("[1]=" + phonearray[1].length);
      console.log("[2]=" + phonearray[2].length);

      if ((phonearray[1].length < 3) | (phonearray[2].length < 4)) {
        alert("알맞은 번호를 입력해주세요.");
      }
    }
    //값이 입력되었는지 확인 후 회원가입 요청
    if (user.name === "") {
      alert("이름을 입력해주세요.");
      $(`#name`).focus();
    } else if (user.userId === "") {
      alert("아이디를 입력해주세요.");
      $(`#userId`).focus();
    } else if (user.password === "") {
      alert("비밀번호를 입력해주세요.");
      $(`#password`).focus();
    } else if ($(`#password2`).val() === "") {
      alert("비밀번호 확인을 입력해주세요.");
      $(`#password2`).focus();
    } else if (idCheckResult !== "사용 가능합니다.") {
      alert("id가 중복입니다. 다시 확인해주세요.");
      $("#userId").focus();
    } else if (checkResult !== "비밀번호가 일치합니다.") {
      alert("비밀번호가 일치하지 않습니다.");
      $("#password2").focus();
    } else if ($("#phone").val() === "" || phonearray.length !== 3) {
      alert("전화번호를 010-1111-1111 형식으로 넣어주세요.");
      $("#phone").focus();
    } else if (!isemailCheck) {
      alert("이메일 인증을 진행해주세요.");
      $("#emailbtn").focus();
    } else {
      //회원가입 요청
      axios({
        method: "POST",
        url: SPRING_IP + "/users",
        data: user,
      })
        .then((res) => {
          //성공시 로그인 요청
          let formData = new FormData();
          formData.append("username", user.userId);
          formData.append("password", user.password);
          console.log(res);
          axios({
            url: SPRING_IP + "/login",
            method: "POST",
            data: formData,
          })
            .then((res) => {
              //성공시 토큰 로컬스토리지에 저장 후 메인페이지 이동
              let token = res.headers.authorization;
              localStorage.setItem("Authorization", token);
              navigator("/");
            })
            .catch((error) => {
              alert("id와 password가 올바르지 않습니다.");
              console.log(error);
            });
        }) //then
        .catch((err) => {
          console.log(err);
          let errMessage = err.response.data.type + "\n";
          errMessage += err.response.data.title + "\n";
          errMessage += err.response.data.detail + "\n";
          errMessage += err.response.data.status + "\n";
          errMessage += err.response.data.instance + "\n";
          errMessage += err.response.data.timestamp;
          alert(errMessage);
        });
    } //else
  }; // 가입하기 완료

  //이메일 인증 관련 기능들
  const [emailCode, setEmailCode] = useState("");
  const [isemailCheck, setIsEmailCheck] = useState(false);
  const sendEmail = (e) => {
    e.preventDefault();
    if (idCheckResult === "사용 가능합니다.") {
      let email = $("#userId").val();
      console.log(email);
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
          console.log("url=" + SPRING_IP + "/mail");
          axios({
            url: SPRING_IP + "/mail",
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            data: email,
          }).then((res) => {
            alert("이메일을 보냈습니다.");
            console.log(res.data);
            setEmailCode(res.data);
          });
        }
      } else {
        alert("이메일 형식이 올바르지 않습니다.");
      }
    } else {
      alert("아이디 중복을 확인해주세요.");
    }
  }; // sendEmail
  const checkCode = (e) => {
    e.preventDefault();
    let code = $("#code").val();
    if (emailCode == code) {
      alert("일치합니다.");
      setIsEmailCheck(true);
      $("#userId").attr("readOnly", true);
    } else {
      console.log("code=" + code);
      console.log("emailCode=" + emailCode);
      alert("불일치합니다.");
    }
  };

  return (
    <StyledContainer>
      <h2 className="register-title">Sign-UP</h2>

      <p className="register-info">회원가입을 위해 정보를 입력해주세요.</p>

      <div className="register-container">
        <div className="register-sub-container">
          <p>*는 필수입력 사항입니다.</p>

          <form className="register-form">
            <label>
              <span>*이름</span>
              <StyledInput
                type="text"
                id="name"
                name="name"
                placeholder="홍길동"
                onChange={changeValue}
              />
            </label>

            <label>
              <span>*아이디</span>
              <StyledInput
                type="text"
                id="userId"
                name="userId"
                placeholder="abc@google.com"
                onChange={changeValue}
              />
              <StyledButton id="emailbtn" onClick={sendEmail}>
                인증번호 보내기
              </StyledButton>
            </label>

            <label>
              <span>*인증 코드</span>
              <StyledInput type="text" id="code" name="code" />
              <StyledButton id="codetbn" onClick={checkCode}>
                인증하기
              </StyledButton>
            </label>

            <label>
              <div style={isCheckResult ? { color: "red" } : { color: "blue" }}>
                {" "}
                {idCheckResult}
              </div>
            </label>

            <label>
              <span>*비밀번호</span>
              <StyledInput
                type="password"
                id="password"
                name="password"
                placeholder="비밀번호"
                onChange={changeValue}
              />
            </label>

            <label>
              <span>*비밀번호 확인</span>
              <StyledInput
                type="password"
                id="password2"
                name="password2"
                placeholder="비밀번호 확인"
                onChange={checkEqual}
              />
            </label>

            <label>
              <div
                style={isPassCheckResult ? { color: "blue" } : { color: "red" }}
                id="checkResult"
              >
                {checkResult}
              </div>
            </label>

            <label>
              <span>*전화번호</span>
              <StyledInput
                type="text"
                id="phone"
                name="phone"
                placeholder="010-1111-1111"
                onChange={changeValue}
              />
            </label>

            <label>
              <span>생년월일</span>
              <div className="date-select-container">
                <select
                  className="date-select"
                  id="year"
                  name="year"
                  onChange={changeBirth}
                >
                  <option>년(4자)</option>
                  {generateYearOptions()}
                </select>

                <select
                  className="date-select"
                  id="month"
                  name="month"
                  onChange={changeBirth}
                >
                  <option>월</option>
                  {[...Array(12).keys()].map((month) => (
                    <option key={month + 1} value={month + 1}>
                      {month + 1}
                    </option>
                  ))}
                </select>

                <select
                  className="date-select"
                  id="day"
                  name="day"
                  onChange={changeBirth}
                >
                  <option>일</option>
                  {[...Array(31).keys()].map((day) => (
                    <option key={day + 1} value={day + 1}>
                      {day + 1}
                    </option>
                  ))}
                </select>
              </div>
            </label>

            <label>
              <span>성별</span>
              <div className="gender-toggle">
                <StyledInput
                  type="radio"
                  id="male"
                  name="gender"
                  value="MAN"
                  checked={true}
                  onChange={changeValue}
                />
                <label for="male">남</label>

                <StyledInput
                  type="radio"
                  id="female"
                  name="gender"
                  value="WOMAN"
                />
                <label for="female">여</label>
              </div>
            </label>

            <StyledButton
              type="submit"
              id="register-button"
              onClick={submitJoin}
            >
              회원가입
            </StyledButton>
          </form>
        </div>
      </div>
    </StyledContainer>
  );
};

export default RegisterForm;
