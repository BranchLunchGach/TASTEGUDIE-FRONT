import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import styled from 'styled-components';


const StyledCanvasDiv = styled.div`
    width: 600px;
    height: 600px;
    background-color: white;
    padding: 50px;
    border: 3px solid black;
    border-radius: 30px;
  `
  const StyledFlexDiv = styled.div`
    display: flex;
    width: 1920px;
    height: 1080px;
    flex-wrap: wrap;
    justify-content: center;
  `

const MyPagehart = (props) => {
  //const chartRef = useRef(null);
  const {num:chartNum}=props;
  const chartRef = useRef(null);
  const canvasRef = useRef(null);
  
  useEffect(() => {
    
    console.log(chartNum);

    if(chartRef.current){
      chartRef.current.destroy();
    }
    //chart1 - 국가선호 비율
    if(chartNum===1){
      chartRef.current= new Chart(canvasRef.current, {
        type: 'radar', // 차트 타입을 파이로 설정
        data: {
          labels: ['한식', '양식', '중식','일식','아시안'],
          datasets: [{
            label: '국가 선호분포도',
            data: [3, 7, 4,5,2], // 각 부분에 해당하는 데이터 값
            //***************색상 수정 필요 ********************* */
           // backgroundColor: [''], // 각 섹션 색상
          }],
        },
        options: {
          maintainAspectRatio:false,
          responsive: true,
          scale:{
            ticks:{
              beginAtZero:true,
              stepSize:5,
            }
          },
        },
      });
    }//chart1
    //chart2- 가장 많이 선택한 메뉴 top5
    if(chartNum===2){
      chartRef.current= new Chart(canvasRef.current, {
        type: 'bar', // 차트 타입을 파이로 설정
        data: {
          //메뉴 이름
          labels: ['파스타', '불고기', '돈가스','국밥','떡볶이'],
          datasets: [{
            label: '내가 선택한 메뉴 TOP 5',
            //메뉴 선택 횟수
            data: [5, 4, 3, 2, 1], // 각 부분에 해당하는 데이터 값
            // ****************** 색상 수정 필요 *****************************
            backgroundColor: ['#9B5DE5'], // 각 섹션 색상
          }],
        },
        options: {
          maintainAspectRatio:false,
          responsive: true,
          scale:{
            ticks:{
              beginAtZero:true,
              stepSize:1,
            }
          },
        },
      });
    }//chart2

    //chart3
    if(chartNum===3){
      chartRef.current= new Chart(canvasRef.current, {
        type: 'bar', // 차트 타입을 파이로 설정
        data: {
          labels: ['1개월', '3개월', '1년'],
          datasets: [{
            label: '탄수화물',
            data: [23, 7, 17], // 각 부분에 해당하는 데이터 값
            backgroundColor: ['#FFD700'], // 각 섹션 색상
          },
          {
            label: '단백질',
            data: [61, 5, 25], // 각 부분에 해당하는 데이터 값
            backgroundColor: ['#4A90E2'], // 각 섹션 색상
          },
          {
            label: '지방',
            data: [19, 5, 9], // 각 부분에 해당하는 데이터 값
            backgroundColor: ['#F15BB5'], // 각 섹션 색상
          },
          ],
        },
        options: {
          maintainAspectRatio:false,
          responsive: true,
        },
      });
    }//chart3

    return ()=>{
      chartRef.current.destroy();
    }
  }, [chartNum]);

  return (
    <div>
      <StyledFlexDiv>
        <StyledCanvasDiv >
        <canvas ref={canvasRef}></canvas> 
        </StyledCanvasDiv>
      </StyledFlexDiv>
    </div>
  )
};

export default MyPagehart;