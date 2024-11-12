import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Callback = () => {
    useEffect(()=>{
        console.log("callback page start");
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        console.log("token= "+code );
        
        axios({
            url:"http://localhost:9000/auth/google/code?code="+code,
            method:"get",
        })
        .then((res)=>{
            let token = res.headers.authorization;
            localStorage.setItem("authorization",token)
            window.location.href="http://localhost:3000/";
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