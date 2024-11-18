import React from 'react';
import { styled } from 'styled-components';
import { useNavigate } from "react-router-dom";

const CompleteDiv = styled.div`
        width: 100%;
        height: 630px;
        box-sizing: content-box;

        display: flex;
        flex-direction: row;
    `

    const CompleteIgm = styled.div`
        width: 55%;
        height: 125%;
        background-image: url("/resCompleteImg.png");
        background-size: 100%;
        background-repeat: no-repeat;
    `

    const CompleteInfo = styled.div`
        display: flex;
        flex-direction: column;

        width: 45%;
        height: 103.5%;
        margin-top: 17vh;
        background-image: url('/img-bg_main.jpg');
    `

    const CompleteTitle = styled.p`
        text-align: center;
        font-size: 5vw;
    `

    const CompleteNavi = styled.div`
        margin-top: 13vh;
        
        display: flex;
        flex-direction: column;
    `

    const CompleteButtons = styled.div`
        margin: 1vh auto;

    `

    const CompleteButton = styled.button`
        padding: 2vh 3vh;
        border: 1px solid gray;
        border-radius: 1vh;
        font-weight: bold;
    `

const ResComplete = () => {

    const navigate = useNavigate();  // useNavigate 훅을 사용하여 페이지 이동

    const goHome = () => {
        navigate("/");
    }

    const goMenu = () => {
        navigate("/choice");
    }

    return (
        <CompleteDiv>
            <CompleteIgm></CompleteIgm>
            <CompleteInfo>
                <CompleteTitle>추천 완료!!</CompleteTitle>
                <CompleteNavi>
                    <p style={{textAlign:"center", fontSize:"2vw", color:"#716C6C", fontWeight:"bold"}}>아직 저녁 메뉴를 정하지 못했다면??</p>
                    <CompleteButtons>
                        <CompleteButton style={{marginRight:"3vw", backgroundColor:"#E2DFD2"}} onClick={goHome}>홈으로</CompleteButton>
                        <CompleteButton style={{backgroundColor: "#FDD83E"}} onClick={goMenu}>메뉴 추천 받으러 가기</CompleteButton>
                    </CompleteButtons>
                </CompleteNavi>
            </CompleteInfo>
        </CompleteDiv>
    );
};

export default ResComplete;