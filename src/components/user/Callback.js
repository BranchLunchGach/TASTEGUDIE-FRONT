import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Callback = () => {
    
    useEffect(()=>{
        console.log("callback page start");
        console.log("url = "+ window.location);
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        console.log("code= "+code );
        
        axios({
            url:"http://localhost:9000/auth/google/code?code="+code,
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
                alert("userNo== 0 axios 시작");
                axios({
                    url:"http://localhost:9000/users",
                    method:"POST",
                    data:user,
                })
                .then((res)=>{
                    console.log(res.data);
                    user.userNo=res.data.userNo;
                })
            }

                axios({
                    url:"http://localhost:9000/auth/google/token",
                    method: "POST",
                    data:user,
                })
                .then((res)=>{
                    let token = res.headers.authorization;
                    localStorage.setItem("Authorization",token);
                    window.location.href="http://localhost:3000";
                })
            
        })
        .catch((error)=>{
            console.log(error);
            window.location.href="http://localhost:3000/Error";
        })
            
    },[])
    return (
        <div>
           
        </div>
    );
};

export default Callback;