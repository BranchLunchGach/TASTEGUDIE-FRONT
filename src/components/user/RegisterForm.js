import React from "react";
import "./RegisterForm.css";
import styled from "styled-components";

const StyledContainer = styled.div`
  margin: 0 auto;
  width: 1000px;
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
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 8px;
`;
const StyledP = styled.p`
  font-size: medium;
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

const RegisterForm = () => {
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

  return (
    <StyledContainer>
      <StyledMainTitle>Sign-Up</StyledMainTitle>
      <StyledSubTitle>회원가입을 위해 정보를 입력해주세요.</StyledSubTitle>

      <div className="register-container">
        <StyledP>*는 필수입력 사항입니다.</StyledP>

        <StyledForm>
          <label>
            <StyledP>*이름</StyledP>
            <StyledInput
              type="text"
              id="name"
              name="name"
              placeholder="홍길동"
            />
          </label>

          <label>
            <StyledP>*아이디</StyledP>
            <StyledInput
              type="text"
              id="userId"
              name="userId"
              placeholder="이메일 형식으로 입력"
            />
          </label>

          <label>
            <StyledP>*비밀번호</StyledP>
            <StyledInput
              type="password"
              id="password"
              name="password"
              placeholder="비밀번호"
            />
          </label>

          <label>
            <StyledP>*비밀번호 확인</StyledP>
            <StyledInput
              type="password"
              id="password2"
              name="password2"
              placeholder="비밀번호 확인"
            />
          </label>

          <label>
            <StyledP>전화번호</StyledP>
            <StyledInput
              type="text"
              id="phone"
              name="phone"
              placeholder="숫자만 입력"
            />
          </label>

          <label>
            <p>생년월일</p>
            <div class="date-select-container">
              <select class="date-select" id="year" name="birthDate">
                <option>년(4자)</option>
                {generateYearOptions()}
              </select>

              <select class="date-select" id="month" name="birthDate">
                <option>월</option>
                {[...Array(12).keys()].map((month) => (
                  <option key={month + 1} value={month + 1}>
                    {month + 1}
                  </option>
                ))}
              </select>

              <select class="date-select" id="day" name="birthDate">
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
            <p>성별</p>
            <div class="gender-toggle">
              <StyledInput
                type="radio"
                id="male"
                name="gender"
                value="male"
                checke
              />
              <label for="male">남</label>

              <input type="radio" id="female" name="gender" value="female" />
              <label for="female">여</label>
            </div>
          </label>

          <StyledButton type="submit" id="register-button">
            회원가입
          </StyledButton>
        </StyledForm>
      </div>
    </StyledContainer>
  );
};

export default RegisterForm;
