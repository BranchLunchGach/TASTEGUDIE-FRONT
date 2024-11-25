import React from 'react';
import styled from 'styled-components';

const StyledFlexUl = styled.ul`
    width: 50vw;
    display: flex;
    list-style-type: none;
    justify-content: space-around;
    align-items: center;
`
const StyledList = styled.li`
    background-color: white;
    width: 10vw;
    height: 4vw;
    text-align: center;
    border: 2px solid black;
    border-radius: 30px;
    padding: 10px;
    margin: 0px 20px;
`

const ChartNav = (props) => {
    const setChartNum = props.set;
   
    return (
        <div className='nav'>
            <StyledFlexUl>
                <StyledList onClick={(e)=>{ setChartNum(1) }}>메뉴별 선호도</StyledList>
                <StyledList onClick={(e)=>{ setChartNum(2) }}>날씨/휴일별 <br/> 메뉴 선호도</StyledList>
                <StyledList onClick={(e)=>{ setChartNum(3) }}>필요 영양소<br/> 분석 및 추천</StyledList>
            </StyledFlexUl>
        </div>
    );
};

export default ChartNav;