import React from 'react';
import styled from 'styled-components';

const StyledFlexUl = styled.ul`
    width: 30vw;
    display: flex;
    list-style-type: none;
    justify-content: space-around;
`
const StyledList = styled.li`
    background-color: white;
    width: 150px;
    text-align: center;
    border: 2px solid black;
    border-radius: 30px;
    padding: 10px;
    margin: 20px 20px;
`

const ChartNav = (props) => {
    const setChartNum = props.set;
   
    return (
        <div className='nav'>
            <StyledFlexUl>
                <StyledList onClick={(e)=>{ setChartNum(1) }}>차트1</StyledList>
                <StyledList onClick={(e)=>{ setChartNum(2) }}>차트2</StyledList>
                <StyledList onClick={(e)=>{ setChartNum(3) }}>차트3</StyledList>
            </StyledFlexUl>
        </div>
    );
};

export default ChartNav;