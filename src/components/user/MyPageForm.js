import React from 'react';
import './MyPageForm.css';
import { styled } from 'styled-components';

const Home = styled.span`
    display: flex;
    flex-direction: row;
    justify-content: center;

    width: 100%;
    margin-top: 60px;
    border: 1px solid red;;
`

const Button = styled.button`
    margin: 10px;
    padding: 12px 45px;
    border: 1px solid black;
    border-radius: 20px;
    font-weight: bold;
`

const MyPageForm = () => {

    return (
        <div className='container'>
            <h2 className='mypage-title'>My Page</h2>

            <p className='mypage-info'>추가 정보를 입력하고 맞춤 추천을 받으세요!!</p>

            <div className='mypage-container'>
                <div className='mypage-sub-container'>
                    <div className='mypage-form'> 
                        <span className='name-gender'>
                            <div id='name-div'>
                                <span>이름</span>
                                <input type="text" id="name" value={"홍길동"}/>
                            </div>

                            <div id='gender-div'>
                                <span>성별</span>
                                <input type="text" id="gender" value={"남"}/>
                            </div>
                        </span>

                        <div>
                            <span>생년월일</span>
                            <div>
                                <input type="text" id="date" value={"2000년 08월 23일"}/>
                                <button>변경</button>
                            </div>
                        </div>

                        <div>
                            <span>phone</span>
                            <div>
                                <input type="text" id="phone" value={"010-9965-2976"}/>   
                                <button>변경</button> 
                            </div>
                        </div>

                        <div>
                            <span>e-mail</span>
                            <div>
                                <input type="text" id="email" value={"qorehgus0823@naver.com"}/>
                                <button>변경</button> 
                            </div>
                        </div>

                        <Home>
                            <Button style={{backgroundColor:"#FDD83E"}}>홈으로</Button>
                            <Button style={{backgroundColor:"red"}}>회원탈퇴</Button>
                        </Home>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPageForm;