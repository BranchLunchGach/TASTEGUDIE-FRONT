import { useState } from "react";
import { Button, InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import $ from 'jquery';



const JoinForm = () => {
  //
  const [user, setUser] = useState({
    userId: "",
    password: "",
    name: "",
    address: "",
    phone:"",
    birthDate:"",
    gender:""
  });

  // 중복체크 결과 값을 저장 할 idCheckResult
 const [idCheckResult , setIdCheckResult] = useState("");

// 아이디 중복여부에 따른 css 를 적용하기 위해 상태 변수
 const [isCheckResult , setIsCheckResult] = useState(false);


  //각 text 박스에 값이 변경되었을 때
  const changeValue = (e) => {    
    setUser({ ...user, [e.target.name]: e.target.value }); 
      
    //id 입력박스에 값이 입력될때마다 axios를 이용해서 비동기통신 - 중복여부 체크
    if (e.target.name === "id" && e.target.value !== "") {
      axios({
        method: "GET",
        url: "http://localhost:9000/users/" + e.target.value,
        // data : {"id" : e.target.value},
      })
        .then((res) => {
          //console.log(res);
          setIdCheckResult(res.data);
           res.data==="중복입니다." ? setIsCheckResult(true) : setIsCheckResult(false); 
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
  const [checkResult, setCheckResult] = useState("");
  const checkEqual = (e)=>{
    let pass1 = $('#password').val();
    let pass2 = e.target.value;

    if(pass1 == pass2){
        setCheckResult("비밀번호가 일치합니다.");
    }else{
        setCheckResult("비밀번호가 일치하지 않습니다.");
    }
  };


  const navigator = useNavigate();

  //가입하기
  const submitJoin = (e)=>{
      axios({
      method:"POST",
      url : "http://localhost:9000/users",
      data : user,
      })
      .then((res)=>{
      console.log(res);
       navigator("/")
      })
      .catch((err)=>{
        console.log(err)
        let errMessage = err.response.data.type +"\n";
        errMessage += err.response.data.title +"\n";
        errMessage += err.response.data.detail +"\n";
        errMessage += err.response.data.status +"\n";
        errMessage += err.response.data.instance +"\n";
        errMessage += err.response.data.timestamp;
        alert(errMessage);
      }); 
  };

  return (
    <>
      <h2 style={{ padding: "20px", color: "red" }}>회원가입</h2>
      <Form>
        <Form.Label htmlFor="userId">아이디</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control type="text" id="userId" name="userId" onChange={changeValue} />
          <InputGroup.Text style={ isCheckResult ? {color: "red"} : {color: "blue" } } >
               {idCheckResult}
          </InputGroup.Text>
        </InputGroup>
        <Form.Label htmlFor="pwd">비밀번호</Form.Label>
        <Form.Control
          type="password"
          id="password"
          name="password"
          onChange={changeValue}
        /><br/>
        <Form.Label htmlFor="pwd">비밀번호 확인</Form.Label>
        <Form.Control
          type="password"
          id="password2"
          name="password2"
          onChange={checkEqual}
        />
        <div id="checkResult">{checkResult}</div>
        <Form.Label htmlFor="name">이름</Form.Label>
        <Form.Control
          type="text"
          id="name"
          name="name"
          onChange={changeValue}
        /><br/>
        <Form.Label htmlFor="address">주소</Form.Label>
        <Form.Control
          type="text"
          id="address"
          name="address"
          onChange={changeValue}
        /><br/>
        <Form.Label htmlFor="phone">전화번호</Form.Label>
        <Form.Control
          type="text"
          id="phone"
          name="phone"
          onChange={changeValue}
        /><br/>
        <Form.Label htmlFor="birthDate">생년월일</Form.Label>
        <Form.Control
          type="text"
          id="birthDate"
          name="birthDate"
          onChange={changeValue}
        /> <br/>
        <Form.Label htmlFor="gender">성별</Form.Label>
        <Form.Control
          type="text"
          id="gender"
          name="gender"
          onChange={changeValue}
        />
        <p>
          <Button variant="primary" onClick={submitJoin}>
            회원가입
          </Button>
        </p>
      </Form>
    </>
  );
};
export default JoinForm;
