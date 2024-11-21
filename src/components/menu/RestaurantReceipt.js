import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const StyledRestaurantReceipt = styled.div`
    width: 15vw;
    height:37vw; 
    border: 1px solid; 
    background-color: white;
    margin: auto;
    overflow-y: scroll;
    -ms-overflow-style: none;

    &::-webkit-scrollbar{
        display:none;
    }
`

const StyledTable = styled.table`
    border: 1px solid black;
    width: 90%;
    margin: auto;
    border-collapse: collapse;
    text-align: center;

    tr, td, th{
        border: 1px solid black;
    }
`

const GlobalFontFace = createGlobalStyle`
    @font-face {
        font-family: 'yg-jalnan';
        src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.2/JalnanOTF00.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }

`;

const OrderButton = styled.span`
    display: block;
    font-size: 3vw;
    margin-top: 3vw;
    text-align: center;
    font-family: 'yg-jalnan', sans-serif; /* 특정 컴포넌트에만 적용 */
    cursor: pointer;
    transition: transform 0.1s ease-in;

    &:hover{
        transform: scale(1.1);
    }
`

const RestaurantReceipt = ({ restaurant, goButtonClick }) => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}.${today.getMonth() + 1}.${today.getDate()}`;

    // 메뉴 항목을 정의합니다.
    const menuItems = [
        { category: "Main Keyword", name:"목적", items: ["가족모임", "단체", "기념일", "가성비", "혼밥", "양많음", "현지맛"] },
        { category: "Core Keyword", name:"시설ㆍ서비스", items: ["콜키지 가능", "주차 가능", "비건 메뉴", "반려 동물 동반"] },
    ];

    const count = menuItems.reduce((count, section) => {
        return count + section.items.filter(item => restaurant.includes(item)).length;
    }, 0);

    const recommend = (()=>{
        goButtonClick();
    });

    return (
        <StyledRestaurantReceipt>
            <GlobalFontFace />
            <h2 style={{ textAlign: 'center', margin: '10px 0 0 0', fontSize:"1vw" }}>TASTE GUIDE<br/>restaurant</h2>
            <div style={{ width:"90%", margin:"auto", display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
                <span>{formattedDate}</span>
                <span>No.2</span>
            </div>
            <StyledTable>
                <thead>
                    <tr>
                        <th>카테고리</th>
                        <th>세부</th>
                        <th>체크</th>
                    </tr>
                </thead>
                <tbody style={{border:"1px solid"}}>
                    {menuItems.map((section, index) => (
                        <React.Fragment key={index}>
                            <tr>
                                <td rowSpan={section.items.length + 1} style={{ width:"40%",fontWeight: 'bold', textAlign: 'center', backgroundColor: 'lightgray' }}>
                                    {section.name}
                                </td>
                            </tr>
                            {section.items.map((item, i) => (
                                <tr key={i}>
                                    <td>{item}</td>
                                    <td>{restaurant.includes(item) ? "∨" : ""}</td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                    <tr>
                        <td colSpan="2" style={{ fontWeight: 'bold' }}>합계</td>
                        <td>{count===0 ? "" : count}</td>
                    </tr>
                </tbody>
            </StyledTable>
            <OrderButton onClick={recommend}>ORDER</OrderButton>
        </StyledRestaurantReceipt>
    );
};

export default RestaurantReceipt;
