import React, { useState } from 'react';
import $ from 'jquery';
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
        formData.append("username",user.id);
        formData.append("password",user.password);


        axios({
            url:"http://localhost:9000/login",
            method:"post",
            data:formData
        })
        .then((res)=>{
            alert("성공이다.");
            console.log(res);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    const google = ()=>{
        console.log("google api key ="+process.env.REACT_APP_GOOGLE_LOGIN_API_KEY);
        const googleUrl = "https://accounts.google.com/o/oauth2/v2/auth?client_id="
        + process.env.REACT_APP_GOOGLE_LOGIN_API_KEY
        +  "&redirect_uri=" + "http://localhost:3000/menu" +
        "&response_type=code &scope=email profile";

        console.log(googleUrl);
    }
    return (
        <div>
            <form>
                <input type='text' name='id' id='idinput' placeholder='아이디' onChange={handleForm}></input>
                <input type='text' name='password' id='passinput' placeholder='비밀번호' onChange={handleForm}></input>
            </form>
            <button type='submit' onClick={login} >로그인</button> 
            <button><Link to={"/join"}> 회원가입</Link></button> 
            <br/>
            <img style={{width : "100px"}} src={구글}  alt='' onClick={google}/>
            
        </div>
    );
};

export default LoginForm;