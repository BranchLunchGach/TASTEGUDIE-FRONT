import React, { useEffect, useState } from 'react';
import './RegisterForm.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import $ from 'jquery';
import styled from 'styled-components';


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

const MyPageForm2 = () => {
    const SPRING_IP = process.env.REACT_APP_SPRING_IP;
    //db에서 회원 정보 받아오기
    useEffect(()=>{
        let id = localStorage.getItem("id");
        if(id !== null){
            axios({
                url:SPRING_IP+"/users/"+id,
                method:"get"
            })
            .then((res)=>{
                console.log(res.data);
                let birth = res.data.birthDate;
                if(birth !== null){ //기존 생년월일 존재
                    const birthDataArray = res.data.birthDate.split("-");
                    setBirthDay({
                        ...birthDay,year:birthDataArray[0],month:birthDataArray[1],day:birthDataArray[2]
                    });
                    $('#year').attr("disabled",true);
                    $('#month').attr("disabled",true);
                    $('#day').attr("disabled",true);

                }
                let gender = res.data.gender;
                if(gender !== null){
                    if(gender === "WOMAN"){
                        $('#male').attr("checked",false);
                        $('#female').attr("checked",true);
                    }else if(gender === "MAN"){
                        $('#male').attr("checked",true);
                        $('#female').attr("checked",false);
                    }
                }else{
                    $('#male').attr("checked",true);
                }
                setUser({
                    ...res.data
                })
                
            })
            .catch((err)=>{
                
            })
        }
    },[]) //useEffect



    // 현재 연도 계산
    const currentYear = new Date().getFullYear();

    // 1960년부터 현재 연도까지의 옵션을 생성하는 함수
    const generateYearOptions = () => {
        const years = [];
        for (let year = 1960; year <= currentYear; year++) {
            years.push(<option key={year} value={year}>{year}</option>);
        }
        return years;
    };

    //user 상태값 적용
    const [user, setUser] = useState({
        userNo:0,
        userId: "",
        password: "",
        name: "",
        address: "",
        phone:"",
        birthDate:"",
        gender:"MAN"
      });
      //birthDay 상태값 적용
    const [birthDay,setBirthDay] = useState({
        year:"",
        month:"",
        day:""

    });
    
    //생년월일 값 변경 시
    const changeBirth = (e) => {    
        setBirthDay({ ...birthDay, [e.target.name]: e.target.value }); 
        console.log("name = "+e.target.name);
        console.log("value = "+e.target.value);
        
    }

    useEffect(()=>{
        if(birthDay.year !== ""){
            setUser({...user,birthDate:birthDay.year+"-"+birthDay.month+"-"+birthDay.day});
        }
        },[birthDay])
    
    //각 text 박스에 값이 변경되었을 때-생년월일 제외
    const changeValue = (e) => {    
        setUser({ ...user, [e.target.name]: e.target.value }); 
        //console.log("name = "+e.target.name);
        //console.log("value = "+e.target.value);
    };

    //비밀번호 일치여부 확인
    const [checkResult, setCheckResult] = useState("");
    const checkEqual = (e)=>{
        let pass1 = $('#password').val();
        let pass2 = e.target.value;
    
        if(pass1 === pass2){
            setCheckResult("비밀번호가 일치합니다.");
            $('#checkPassResult').css("color","blue");
        }else{
            setCheckResult("비밀번호가 일치하지 않습니다.");
            $('#checkPassResult').css("color","red");
        }
    };
    
    const navigator = useNavigate();
    
    //회원정보수정
    const submitUpdate = (e)=>{
        e.preventDefault();
        console.log(user);
        
        let phonearray = $('#phone').val().split("-");
        console.log("phonearray= "+phonearray);
        //입력된 값 유효성 검사
        if(user.birthDate !== null){ //생일 값이 입력되었다면
            console.log("birthDate="+user.birthDate);
            if(birthDay.year ==="" | birthDay.year==="년(4자)"){
                alert("연도를 선택해주세요");
                $('#year').focus();
                return;
            }else if(birthDay.month ==="" | birthDay.month==="월"){
                alert("월을 선택해주세요");
                $('#month').focus();
                return;
            }else if(birthDay.day ==="" | birthDay.day==="년(4자)"){
                alert("일을 선택해주세요");
                $('#day').focus();
                return;
            }
        };
        if(phonearray.length === 3 ){
            //console.log("[0]="+phonearray[0]);
            //console.log("[1]="+phonearray[1].length);
            //console.log("[2]="+phonearray[2].length);
            
            if(phonearray[0].length<3 |  phonearray[1].length < 3| phonearray[2].length <4 
                | phonearray[0].length>3 | phonearray[1].length < 4 | phonearray[2].length < 4){
                alert("알맞은 번호를 입력해주세요.");
                return;
            }
        }
        //값이 입력되었는지 확인 후 회원가입 요청
       if( $('#password').val() !== "" &&checkResult !=="비밀번호가 일치합니다."){
        alert("비밀번호가 일치하지 않습니다.");
        $('#password2').focus();
       }else if($('#phone').val() === "" || phonearray.length !== 3  ){
            alert("전화번호를 010-1111-1111 형식으로 넣어주세요.")
            $('#phone').focus();
       }
       else{
        alert("성공")
        console.log(user);
        //회원정보 수정 요청
        /*
            axios({
                method:"PUT",
                url : SPRING_IP+"/users",
                data : user,
            })
            .then((res)=>{
                navigator("/");
            })//then
            .catch((err)=>{
                console.log(err);
            }); 
            */
        }//else
        
    };// 정보수정하기 완료

    

    return (
        <div className='container'>
            <h2 className='register-title'>My Page</h2>

            <p className='register-info'>추가 정보를 입력하고 맞춤 추천을 받으세요!!
            모든 정보를 입력할 필요는 없습니다.
            </p>
            <p className='register-info'></p>

            <div className='register-container'>
                <div className='register-sub-container'>

                    <form className='register-form'> 
                        <label>
                            <span>이름</span>
                            <input type='text' id="name" name="name" placeholder='홍길동' value={user.name} readOnly onChange={changeValue}/>
                        </label>

                        <label>
                            <span>아이디</span>
                            <input type='text' id="userId" name="userId" placeholder='abc@google.com'value={user.userId} readOnly onChange={changeValue}/>
                        </label>
                        
                        

                        

                        <label>
                            <span>비밀번호(선택)</span>
                            <input type='password' id="password" name="password" placeholder='비밀번호' onChange={changeValue}/>
                        </label>

                        <label>
                            <span>비밀번호 확인(선택)</span>
                            <input type='password' id="password2" name="password2" placeholder='비밀번호 확인' onChange={checkEqual}/>
                        </label>

                        <div id="checkPassResult">{checkResult}</div>

                        

                        <label>
                            <span>*전화번호</span>
                            <input type='text' id="phone" name="phone" placeholder='010-1111-1111'  value={user.phone !== null ? user.phone : ""}  onChange={changeValue}/>
                        </label>

                        <label>
                            <span>생년월일</span>
                            <div className="date-select-container">
                                <select className="date-select" id="year" name="year" readOnly onChange={changeBirth}>
                                    <option selected>{ birthDay.year !== "" ?birthDay.year : "년(4자"}</option>
                                    {generateYearOptions()}
                                </select>
                                
                                <select className="date-select" id="month" name="month" readOnly onChange={changeBirth}>
                                    <option selected>{ birthDay.month !== "" ?birthDay.month : "월"}</option>
                                    {[...Array(12).keys()].map(month => (
                                        <option key={month + 1} value={month <10 ? "0"+month+1 : month+1}>
                                            {month + 1}
                                        </option>
                                    ))}
                                </select>
                                
                                <select className="date-select" id="day" name="day" onChange= {changeBirth}>
                                    <option selected>{ birthDay.day !== "" ?birthDay.day : "일"}</option>
                                    {[...Array(31).keys()].map(day => (
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
                                <input type="radio" id="male" name="gender" value="MAN" onChange={changeValue}/>
                                <label for="male">남</label>
                                
                                <input type="radio" id="female" name="gender" value="WOMAN"/>
                                <label for="female">여</label>
                            </div>
                        </label>

                        <StyledButton type='submit' id="register-button" onClick={submitUpdate}>수정 완료</StyledButton>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MyPageForm2;