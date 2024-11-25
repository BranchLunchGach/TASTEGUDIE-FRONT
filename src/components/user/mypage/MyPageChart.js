import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';
import styled from 'styled-components';
import ChartDataLabels from 'chartjs-plugin-datalabels';


const StyledCanvasDiv = styled.div`
    width: 45%;
    margin: 0px 10px

  `
  const StyledFlexDiv = styled.div`
    width: 60vw;
    height: 60vh;
    background-color: white;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  `
  //글자 강조
  const StyledFont = styled.span`
    font-weight: bold;
  `


const MyPagehart = (props) => {
  //const chartRef = useRef(null);
  const {num:chartNum}=props;
  const chartRef1 = useRef(null);
  const canvasRef1 = useRef(null);
  const chartRef2 = useRef(null);
  const canvasRef2 = useRef(null);
  const [description,setDescription] =useState("1231");
  const [chartTitle,setChartTitle] =useState("123");
  useEffect(() => {
    
    console.log(chartNum);
    if(chartRef1.current && chartRef2.current){
      chartRef1.current.destroy();
      chartRef2.current.destroy();
    }
    //---------------------------------------------------------------------------------------------------------------------------------------
    //chart1 - 국가선호 비율
    if(chartNum===1){
      //title 설정
      setChartTitle(<font><StyledFont >김믿음</StyledFont>님의 메뉴별 선호도입니다.</font>);


      //왼쪽 차트-3개월 이내
      chartRef1.current = new Chart(canvasRef1.current, {
        type: "doughnut",
        data: {
          labels: ['국밥', '치킨', '피자', '짜장면', '초밥'],
          datasets: [{
            label: '',
            data: [10, 3, 4, 5, 2], // 각 부분에 해당하는 데이터 값
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'], // 각 섹션 색상
          }],
        },
        options: {
          plugins: {
            datalabels: {
              formatter: (value, context) => {
                const dataset = context.chart.data.datasets[0];
                const total = dataset.data.reduce((acc, cur) => acc + cur, 0);
                const percentage = ((value / total) * 100).toFixed(1) + '%';
                const label = context.chart.data.labels[context.dataIndex];
                return `${label}\n${percentage}`; // 메뉴 이름 + 퍼센트
              },
              color: '#fff', // 텍스트 색상
              font: {
                size: 14, // 텍스트 크기
              },
              align: 'center',
              anchor: 'center',
            },
            title:{
              display:true,
              text:"최근 1개월",
              font:{
                size:18
              },
              padding:{
                top:10,
                bottom:10,
              }
            },
            legend:{
              display:false,
            }
          },
        },
        plugins: [ChartDataLabels], // 플러그인 등록
      });
      // 오른쪽 차트-3개월 이전
      chartRef2.current = new Chart(canvasRef2.current, {
        type: "doughnut",
        data: {
          labels: ['스테이크', '돼지갈비', '탕수육', '회', '소불고기'],
          datasets: [{
            label: '김믿음님의 국가별 선호도입니다.',
            data: [11, 7, 10, 5, 2], // 각 부분에 해당하는 데이터 값
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'], // 각 섹션 색상
          }],
        },
        options: {
          plugins: {
            datalabels: {
              formatter: (value, context) => {
                const dataset = context.chart.data.datasets[0];
                const total = dataset.data.reduce((acc, cur) => acc + cur, 0);
                const percentage = ((value / total) * 100).toFixed(1) + '%';
                const label = context.chart.data.labels[context.dataIndex];
                return `${label}\n${percentage}`; // 나라 이름 + 퍼센트
              },
              color: '#fff', // 텍스트 색상
              font: {
                size: 14, // 텍스트 크기
              },
              align: 'center',
              anchor: 'center',
            },
            title:{
              display:true,
              text:"3개월 이전",
              font:{
                size:18
              },
              padding:{
                top:10,
                bottom:10,
              }
            },
            legend:{
              display:false,
            }
          },
        },
        plugins: [ChartDataLabels], // 플러그인 등록
      });

      //text 설정 
      setDescription(<font><StyledFont>김믿음</StyledFont>님은 최근 1개월은 <StyledFont>국밥</StyledFont>을 가장 많이 선택했고, 3개월 이전은 <StyledFont>스테이크</StyledFont>을 가장 많이 선택했습니다.</font>);

    }//chart1
//-------------------------------------------------------------------------------------------------------------------------
    //chart2- 날짜 휴일별 국가 선호도
    if(chartNum===2){
      //title 설정
      setChartTitle(<font><StyledFont >김믿음</StyledFont>님의 날씨/휴일별 음식종류 선호도입니다.</font>);

      //왼쪽 차트
      chartRef1.current= new Chart(canvasRef1.current, {
        type: 'bar', // 차트 타입을 파이로 설정
        data: {
          //메뉴 이름
          labels: ['국밥', '치킨', '피자','짜장면','초밥'],
          datasets: [{
            label: '비 오는 날',
            //메뉴 선택 횟수
            data: [3, 1, 2, 9, 1], // 각 부분에 해당하는 데이터 값
            // ****************** 색상 수정 필요 *****************************
            backgroundColor: ['#4A90E2'], // 각 섹션 색상
          },
          {
            label: '맑은 날',
            //메뉴 선택 횟수
            data: [10, 2, 3, 1, 2], // 각 부분에 해당하는 데이터 값
            // ****************** 색상 수정 필요 *****************************
            backgroundColor: ["#F5D547"], // 각 섹션 색상
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
          plugins:{
            title:{
              display:true,
              text:"날씨별 메뉴 선호도",
              font:{
                size:18
              },
              padding:{
                top:10,
                bottom:10,
              }
            },
          }
        },
      });
      //오른쪽 차트
      chartRef2.current= new Chart(canvasRef2.current, {
        type: 'bar', // 차트 타입을 파이로 설정
        data: {
          //메뉴 이름
          labels: ['국밥', '치킨', '피자','짜장면','초밥'],
          datasets: [{
            label: '평일',
            //메뉴 선택 횟수
            data: [9, 1, 2, 2, 1], // 각 부분에 해당하는 데이터 값
            // ****************** 색상 수정 필요 *****************************
            backgroundColor: ['#AAB7C4'], // 각 섹션 색상
          },
          {
            label: '휴일',
            //메뉴 선택 횟수
            data: [1, 1, 1, 5, 1], // 각 부분에 해당하는 데이터 값
            // ****************** 색상 수정 필요 *****************************
            backgroundColor: ["#7DCEA0"], // 각 섹션 색상
          },
          ],
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
          plugins:{
            title:{
              display:true,
              text:"휴일별 메뉴 선호도",
              font:{
                size:18
              },
              padding:{
                top:10,
                bottom:10,
              }
            },
          }
        },
      });

//text 설정 
setDescription(<font>비 오는 날에는 <StyledFont>짜장면</StyledFont>을, <br/>
    맑은 날에는 <StyledFont>국밥</StyledFont>을,<br/>
    평일에는 <StyledFont>국밥</StyledFont>을 , <br/>
    휴일에는 <StyledFont>짜장면</StyledFont>을 주로 선택했습니다. </font>);

    }//chart2
//-------------------------------------------------------------------------------------------------------------------------------------

//chart3
    if(chartNum===3){
      //title 설정
      setChartTitle(<font><StyledFont >김믿음</StyledFont>님의 주메뉴의 1일 권장 섭취량 대비 영양소입니다.</font>);
      //왼쪽 차트
      chartRef1.current= new Chart(canvasRef1.current, {
        type: 'radar', // 차트 타입을 파이로 설정
        data: {
          labels: ['탄수화물', '단백질', '지방'],
          datasets: [{
            label: '',
            data: [30, 52, 76], // 각 부분에 해당하는 데이터 값
            backgroundColor: ['rgba(255,215,0,0.5)'], // 각 섹션 색상
          },
          ],
        },
        options: {
          maintainAspectRatio:false,
          responsive: true,
          plugins:{
            title:{
              display:true,
              text:"국밥",
              font:{
                size:18
              },
              padding:{
                top:10,
                bottom:10,
              }
            },
            datalabels:{
              display:true,
              color:"#000",
              font:{
                size:12,
                weight:"bold"
              },
              formatter: function(value, context){
                return value+"%";
              }
            }
          },
          scales:{
            r:{
              min:0,
              ticks:{
                stepSize:5,
                display:false,
              }
            }
          }
          
        },
        plugins:[ChartDataLabels],
      });
      //오른쪽 차트
      chartRef2.current= new Chart(canvasRef2.current, {
        type: 'radar', // 차트 타입을 파이로 설정
        data: {
          labels: ['탄수화물', '단백질', '지방'],
          datasets: [{
            label: '',
            data: [65, 40, 20], // 각 부분에 해당하는 데이터 값
            backgroundColor: ['rgba(255,215,0,0.5)'], // 각 섹션 색상
          },
          ],
        },
        options: {
          maintainAspectRatio:false,
          responsive: true,
          plugins:{
            title:{
              display:true,
              text:"닭가슴살 고구마 샐러드",
              font:{
                size:18
              },
              padding:{
                top:10,
                bottom:10,
              }
            },
            datalabels:{
              display:true,
              color:"#000",
              font:{
                size:12,
                weight:"bold"
              },
              formatter: function(value, context){
                return value;
              }
            }
          },
          scales:{
            r:{
              min:0,
              max: 100,
              ticks:{
                stepSize:5,
                display:false,
              }
            }
          }
          
        },
        plugins:[ChartDataLabels],
      });
      //text 설정 
      setDescription(<font> 부족한 탄수화물을 보충하기 위해서 <StyledFont>닭가슴살 고구마 샐러드</StyledFont>의 섭취를 권장합니다</font>);
    }//chart3
//-------------------------------------------------------------------------------------------------------------------------------
    return ()=>{
      chartRef1.current.destroy();
    }
  }, [chartNum]);

  return (
    <div style={{textAlign:'center', fontSize:"20px" }}>
      <div style={{background:"white"}}>
        {chartTitle}
        <StyledFlexDiv>
          <StyledCanvasDiv >
          <canvas ref={canvasRef1}></canvas> 
          </StyledCanvasDiv>
          <StyledCanvasDiv >
          <canvas ref={canvasRef2}></canvas> 
          </StyledCanvasDiv>
        </StyledFlexDiv>
        {description}
      </div>
    </div>
  )
};

export default MyPagehart;