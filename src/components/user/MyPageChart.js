import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';

const MyPagehart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      new Chart(chartRef.current, {
        type: 'pie', // 차트 타입을 파이로 설정
        data: {
          labels: ['Red', 'Blue', 'Yellow'],
          datasets: [{
            label: 'My Dataset',
            data: [10, 20, 30], // 각 부분에 해당하는 데이터 값
            backgroundColor: ['red', 'blue', 'yellow'], // 각 섹션 색상
          }],
        },
        options: {
          responsive: true,
        },
      });
    }
  }, []);

  return <canvas ref={chartRef}></canvas>;
};

export default MyPagehart;