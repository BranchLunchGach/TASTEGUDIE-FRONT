import React from "react";
import styled from "styled-components";

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
  return (
    <>
      <StyledContentBox>
        <div>
          <StyledMainTitle>아이디 찾기</StyledMainTitle>
          <StyledFindIDPWDBox>
            <StyledForm>
              <StyledP>이름</StyledP>
              <StyledInput type="text" placeholder="가입 시 입력한 이름" />
              <StyledP>전화번호</StyledP>
              <StyledInput type="text" placeholder="가입 시 입력한 전화번호" />
            </StyledForm>

            <StyledButton type="submit">아이디 찾기</StyledButton>
          </StyledFindIDPWDBox>
        </div>

        <div>
          <StyledMainTitle>비밀번호 찾기</StyledMainTitle>

          <StyledFindIDPWDBox>
            <div>
              <StyledForm>
                <StyledP>이메일 인증</StyledP>
                <StyledInput type="text" placeholder="가입 시 입력한 이메일" />
              </StyledForm>

              <StyledButton type="submit" style={{ marginBottom: "16px" }}>
                인증번호 보내기
              </StyledButton>
            </div>

            <div>
              <StyledForm>
                <StyledP>인증번호</StyledP>
                <StyledInput
                  type="text"
                  placeholder="메일로 받은 인증번호"
                ></StyledInput>
              </StyledForm>

              <StyledButton type="submit">인증하기</StyledButton>
            </div>

            <br />
            <br />
            <StyledHr />
            <br />
            <br />

            <div>
              <StyledForm>
                <StyledP>비밀번호 재설정</StyledP>
                <StyledInput type="text" placeholder="재설정 할 비밀번호" />
                <StyledP>비밀번호 확인</StyledP>
                <StyledInput
                  type="text"
                  placeholder="재설정 할 비밀번호를 다시 입력"
                />
              </StyledForm>

              <StyledButton type="submit">비밀번호 재설정</StyledButton>
            </div>
          </StyledFindIDPWDBox>
        </div>
      </StyledContentBox>
    </>
  );
};

export default FindIDPWDForm;
