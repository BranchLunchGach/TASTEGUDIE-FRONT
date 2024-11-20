import React, { useEffect, useState } from 'react';
import MyPageChart from '../../components/user/mypage/MyPageChart.js'

import Header3 from '../../components/layouts/Header3';
import ChartNav from '../../components/user/mypage/ChartNav.js';
import styled from 'styled-components';

const StyledFlexDiv = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
`

const ChartPage = () => {
    
    const [chartNum,setChartNum] = useState(1);
    useEffect(()=>{
        console.log(chartNum);
    },[chartNum])
    return (
        <div>
            <Header3/>
            <StyledFlexDiv>
                <ChartNav set={setChartNum}/>
            </StyledFlexDiv>
            <StyledFlexDiv>
                <MyPageChart num={chartNum}/>
            </StyledFlexDiv>
        </div>
    );          
};

export default ChartPage;