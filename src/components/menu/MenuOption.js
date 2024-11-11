import React, { useState, useEffect, useRef } from 'react';
import './MenuOption.css';
import FoodForm from './FoodForm';
import FoodCategoryForm from './FoodCategoryForm';
import MenuKeywordPage from './MenuKeywordPage';

function MenuOption() {
  const pagesRef = useRef([]);
  const [selectedFoods, setSelectedFoods] = useState([]);

  const pageContents = [
    <p>Taste <br/><br/><br/><br/>Guide!!  <br/><br/><br/><br/><p style={{fontSize: 20}}>-- 책을 넘겨 메뉴를 추천 받으세요 --</p></p>,
    <p>Menu<br/><br/><br/><br/>List</p>,
    <FoodForm selectedFoods={selectedFoods} setSelectedFoods={setSelectedFoods} />,
    <p>Category<br/><br/><br/><br/>List</p>,
    <FoodCategoryForm />,
    <MenuKeywordPage />,
    null,
    null,
    null,
    <p>Thank<br/><br/><br/><br/>You!!</p>,
  ];

  useEffect(() => {
    const pages = pagesRef.current;

    // 페이지마다 z-index를 설정하는 부분
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      if (i % 2 === 0) {
        page.style.zIndex = pages.length - i;
      }
    }

    // 페이지 클릭 이벤트 처리
    pages.forEach((page, i) => {
      page.pageNum = i + 1;
      page.onclick = function (event) {
        // 체크박스 클릭을 감지하고 전파를 막음
        if (event.target.type === 'checkbox') {
          event.stopPropagation(); // 체크박스 클릭 이벤트는 페이지 전환을 막도록 함
          return;
        }

        // 페이지 전환 처리
        event.preventDefault(); // 페이지 전환 기본 동작 막기

        if (this.pageNum % 2 === 0) {
          this.classList.remove('flipped');
          this.previousElementSibling.classList.remove('flipped');
        } else {
          this.classList.add('flipped');
          this.nextElementSibling.classList.add('flipped');
        }
      };
    });
  }, []);

  return (
    <div className="book">
      <div id="pages" className="pages">
        {/* 페이지를 짝수와 홀수로 나눠서 렌더링 */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={`page ${i % 2 === 0 ? 'left' : 'right'}`} // 홀수 페이지는 left, 짝수 페이지는 right
            ref={(el) => (pagesRef.current[i] = el)}
          >
            {/* 페이지 내용 출력 (JSX 컴포넌트 가져오기) */}
            {pageContents[i] && pageContents[i]}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuOption;
