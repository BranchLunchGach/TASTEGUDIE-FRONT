import React, { useContext } from 'react';
import { styled } from 'styled-components';
import { HelloContext } from '../../context/HelloContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const FirstContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    border: 1px solid black;
`

const HelloTitle = styled.div`
    font-size: 64px;
    font-family: "LOTTERIA CHAB-Regular", Helvetica;
    text-align: left;
    margin-left: 4vw;
`

const HelloSpan = styled.span`
    margin-left: 4vw;
    font-size: 25px;
`

const SecondContainer = styled.div`
    width: 1920px;
    height: 400px;
    border: 1px solid black;
    margin-top: 100px;

    display: flex;
    align-items: center;
`

const LocationMap = styled.div`
    width: 600px;
    height: 90%;
    border: 2px solid black;
    border-radius: 20px;
    margin-left: 450px;
`

const GoBtn = styled.button`
    width: 240px;
    height: 60%;
    border-radius: 200px;
    margin-left: 200px;
    color: white;
    background-color: black;
`

const HelloResultForm = () => {

    const navigate = useNavigate();  // useNavigate 훅을 사용하여 페이지 이동
    const { contextData } = useContext(HelloContext);

    const recommand = () => {
        axios({
          url: process.env.REACT_APP_SPRING_IP+"/hello-restaurant",
          method: "post",
          data: {
            menu: contextData.menu,
            avgX: contextData.avgX,
            avgY: contextData.avgY,
          },
        })
        .then((res) => {
            console.log(res.data);
            navigate("/hello/result/complete", { state: { menuData: res.data } });
        })
        .catch((err)=>{
          console.error("Error sending data:", err);
        });
      }

    return (
        <div>
            <FirstContainer>
                <HelloTitle>만남의 장소 추천 결과</HelloTitle>
                <HelloSpan>여기서 만나는건 어떠세요?</HelloSpan>
            </FirstContainer>

            <SecondContainer>
                <LocationMap>
                    <h1>결과</h1>
                    <p>{contextData.menu}</p>
                    <p>{contextData.avgX}</p>
                    <p>{contextData.avgY}</p>
                </LocationMap>
                <GoBtn onClick={recommand}>
                    <span style={{fontSize:"35px", fontFamily:"LOTTERIA CHAB-Regular"} }>식당추천</span>
                    <br/><span style={{fontSize:"35px"}}>=====&gt;</span>
                </GoBtn>
            </SecondContainer>
        </div>
    );
};

export default HelloResultForm;