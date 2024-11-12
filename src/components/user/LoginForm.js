import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import 구글 from '../../images/구글.png'

const LoginForm = () => {
    const [user,setUser]= useState({
        username:"",
        password:""
    })

    const handleForm = (e)=>{
        setUser({
            ...user,[e.target.name]:e.target.value
        });
    }

    const login= (e)=>{
        e.preventDefault();
        //let id = $('#idinput').val();
        //let password = $('#passinput').val();

        let formData = new FormData();
        formData.append("username",user.username);
        formData.append("password",user.password);
        console.log("username= "+ formData.get("username"));
        console.log("password= "+ formData.get("password"));

        axios({
            url:"http://localhost:9000/login",
            method:"post",
            data:formData,
           // console.log('formData=>'+formData);
          
        })
        .then((res)=>{
            alert("성공이다.");
            console.log(res);
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
            + "&scope=email%20profile";

            window.location.href=googleUrl;
    }
    
    return (
        <div>
            <form>
                <input type='text' name='username' id='idinput' placeholder='아이디' onChange={handleForm}></input>
                <input type='text' name='password' id='passinput' placeholder='비밀번호' onChange={handleForm}></input>
            </form>
            <button type='submit' onClick={login} >로그인</button> 
            <button><Link to={"/sign-up"}> 회원가입</Link></button> 
            <br/>
            <img style={{width : "100px"}} src={구글}  alt='' onClick={googleApi} />
            
        </div>
    );
};

export default LoginForm;