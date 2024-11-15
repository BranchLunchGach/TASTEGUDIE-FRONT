import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Callback = () => {
    const navigator = useNavigate();
    const SPRING_IP = process.env.REACT_APP_SPRING_IP;
    const FRONT_IP = process.env.REACT_APP_FRONT_IP; 
    useEffect(()=>{
        console.log("callback page start");
        console.log("url = "+ window.location);
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        console.log("code= "+code );
        
        axios({
            url: SPRING_IP+"/auth/google/code?code="+code,
            method:"get",
        })
        .then((res)=>{
            console.log(res.data); 
            const user = res.data;
            user.password= "1111";
            console.log("user = "+user);

             if( user.userNo === 0 ){//db에 정보가 없다면 회원가입 진행
                 //이 사이에 추가 정보 입력받으러 간다.
                   // window.location.href = "http://localhost:3000/extra";
                //일단은 그냥 회원가입 진행
                axios({
                    url:SPRING_IP+"/users",
                    method:"POST",
                    data:user,
                })
                .then((res)=>{
                    console.log(res.data);
                    user.userNo=res.data.userNo;
                })
            }

                axios({
                    url: SPRING_IP+"/auth/google/token",
                    method: "POST",
                    data:user,
                })
                .then((res)=>{
                    let token = res.headers.authorization;
                    localStorage.setItem("Authorization",token);
                    localStorage.setItem("id",res.data.userId);
                    navigator("/");
                    
                })
            
        })
        .catch((error)=>{
            console.log(error);
            navigator("/error");
            
        })
            
    },[])
    return (
        <div>
           
        </div>
    );
};

export default Callback;