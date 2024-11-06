import React, { useEffect, useState } from "react";
import Home from "../components/commons/Home";
import BackSpace from "../components/commons/BackSpace";
import "./MenuResultPage.css";
import Retry from "../components/commons/Retry";
import styled from "styled-components";
import { useLocation } from "react-router-dom"; // useLocation import 추가
import axios from "axios";

const StyledPage = styled.div`
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position-y: -100px;
`;



const MenuResultPage = () => {
  const location = useLocation(); // location hook 사용
  const menuData = location.state?.menuData || []; // 전달받은 데이터

  //재추천 알고리즘 로컬스토리지 저장
  const [menName,setMenName] = useState("");
  const [menu, SetMenu] = useState(menuData);

  function local(men) {
    let get = localStorage.getItem("selectMenuName");
    console.log("get="+get);
    console.log("menu="+men[0].menuName + "," + men[1].menuName);
    if(get === null||get===""){
      console.log("null이다")
      setMenName(men[0].menuName + "," + men[1].menuName) ;
    }else{
      setMenName(get+ ","+ men[0].menuName + "," + men[1].menuName );
    }
  }

  useEffect(()=>{
    local(menu);
  
/*
    if(localStorage.getItem("selectMenuName")===null){
      localStorage.setItem("selectMenuName",menuData[0].menuName + "," + menuData[1].menuName);
    }else{
      localStorage.setItem("selectMenuName",localStorage.getItem("selectMenuName") + "," + menuData[0].menuName + "," + menuData[1].menuName);
    }
      */
  },[]);
  useEffect(()=>{
    localStorage.setItem("selectMenuName",menName);
  },[menName])

  const reRecommand = ()=>{
    console.log(menu[0].selectNation);
    console.log(menu[0].selectCategory);
    console.log(menu[0].selectKeyword);
    console.log(menu[0].selectSoup);
    axios({
      url:"http://localhost:9000/menu",
      method:"post",
      data:{
        nation:menu[0].selectNation,
        category:menu[0].selectCategory,
        keyword:menu[0].selectKeyword,
        soup:menu[0].selectSoup,
        selectName:localStorage.getItem("selectMenuName")
      },
    })
    .then((res)=>{
      SetMenu(res.data);
      console.log(res.data[0].menuName);
      local(res.data);
    })
  }


  return (
    <StyledPage className="menu-result-page">
      <Home className="main-header" />
      <div className="sub-header">
        <BackSpace className="back-space" />
        <div className="title">
          <p className="main-title">메뉴 추천 결과</p>
          <p className="sub-title">식당 추천을 위해 메뉴를 선택해 주세요</p>
        </div>
      </div>

      <div className="menu-result-content">
        {menu.length > 0 ? (
          menu.map((m, index) => (
            <div className="menu-result-box" key={index}>
              <img
                className="menu-image"
                src={m.imgUrl}
                alt={m.menuName}
              />
              <p className="menu-title">{m.menuName}</p>
              <p className="menu-desc">{m.recoReason[0]}</p>
              <p className="menu-desc">{m.recoReason[1]}</p>
              <p className="menu-desc">{m.recoReason[2]}</p>
            </div>
          ))
        ) : (
          <p>메뉴가 없습니다.</p>
        )}
        <br/>
        <button onClick={reRecommand}>재추천</button>
      </div>
      <Retry />
    </StyledPage>
  );
};

export default MenuResultPage;
