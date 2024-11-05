import React, { useEffect, useState, useCallback } from 'react';
import './MenuRecommendOption.css';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/droppable';
import axios from 'axios';
import {Link, NavLink} from 'react-router-dom'

const MenuRecommendOption = () => {

    // 각 draggable-item 요소의 클릭 상태를 관리하는 배열 상태
    const [clickedItems, setClickedItems] = useState(Array(13).fill(false));

    useEffect(() => {
        // 모든 'draggable-item' 클래스에 draggable 설정
        $(".draggable-item").draggable();
        
        $("#droppable").droppable({
            drop: function(event, ui) {
                $(this).addClass("ui-state-highlight").find("p").html("Dropped!");
            }
        });
    }, []);

    const handleClick = (index) => {
        const selectedCount = clickedItems.filter(item => item).length; // 현재 선택된 항목 수

        // 이미 선택된 항목을 해제하거나, 선택된 항목이 4개 미만일 경우에만 토글
        if (clickedItems[index] || selectedCount < 8) {
            setClickedItems(prevState => {
                const newState = [...prevState];
                newState[index] = !newState[index]; // 클릭 상태 토글
                return newState;
            });
        }
    };

    const handleRecommendStart = async () => {
        // 클릭된 항목의 클래스 이름과 value를 매칭
        const selectedItems = clickedItems
            .reduce((acc, isSelected, index) => {
                if (isSelected) {
                    const element = document.getElementsByClassName('draggable-item')[index];
                    const classList = element.className.split(' ');
                    const key = classList[2]; // 세 번째 클래스 이름을 key로 사용
                    const value = element.getAttribute('value');
                    
                    if (key) {
                        // 동일한 키가 이미 존재하면 해당 key의 value에 현재 value를 추가
                        if (acc[key]) {
                            acc[key] += `, ${value}`;
                        } else {
                            acc[key] = value;
                        }
                    }
                }
                return acc;
            }, {});
    
            try {
                // 기본 post 형식을 사용하여 config 없이 data 전송
                const response = await axios.post(
                    'http://localhost:9000/menu',
                    selectedItems,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true, // 필요 시 추가하여 CORS 관련 문제 해결
                    }
                );

                if (response.status === 201) {
                    console.log(response.data); // 성공적인 서버 응답 처리
                } else {
                    alert("요청 실패!");
                }
            } catch (error) {
                console.error('Error sending data:', error);
            }
            
    };

    return (
        <div className='container'>
            <div className='sub-container'>
                <div className='menu-option-container'>
                    <div className='draggable-item item-type1 nation' value="한식" onClick={() => handleClick(0)} style={{ backgroundColor: clickedItems[0] ? '#FDD83E' : '' }}>한식</div>
                    <div className='draggable-item item-type1 nation' value="양식" onClick={() => handleClick(1)} style={{ backgroundColor: clickedItems[1] ? '#FDD83E' : '' }}>양식</div>
                    <div className='draggable-item item-type1 nation' value="중식" onClick={() => handleClick(2)} style={{ backgroundColor: clickedItems[2] ? '#FDD83E' : '' }}>중식</div>
                    <div className='draggable-item item-type1 nation' value="일식" onClick={() => handleClick(3)} style={{ backgroundColor: clickedItems[3] ? '#FDD83E' : '' }}>일식</div>
                    <div className='draggable-item item-type1 category' value="면 및 만두류" onClick={() => handleClick(4)} style={{ backgroundColor: clickedItems[4] ? '#FDD83E' : '' }}>면</div>
                    <div className='draggable-item item-type1 category' value="밥류" onClick={() => handleClick(5)} style={{ backgroundColor: clickedItems[5] ? '#FDD83E' : '' }}>밥</div>
                    <div className='draggable-item item-type1 category' value="국 및 탕류" onClick={() => handleClick(6)} style={{ backgroundColor: clickedItems[6] ? '#FDD83E' : '' }}>탕</div>
                    <div className='draggable-item item-type1 category' value="빵 및 과자류" onClick={() => handleClick(7)} style={{ backgroundColor: clickedItems[7] ? '#FDD83E' : '' }}>빵</div>
                    <div className='draggable-item item-type1 category' value="튀김류" onClick={() => handleClick(8)} style={{ backgroundColor: clickedItems[8] ? '#FDD83E' : '' }}>튀김</div>
                    <div className='draggable-item item-type1 category' value="구이류" onClick={() => handleClick(9)} style={{ backgroundColor: clickedItems[9] ? '#FDD83E' : '' }}>구이</div>
                    <div className='draggable-item item-type2 keyword' value="술과 어울리는" onClick={() => handleClick(10)} style={{ backgroundColor: clickedItems[10] ? '#FDD83E' : '' }}>술과 어울리는</div>
                    <div className='draggable-item item-type2 keyword' value="가벼운" onClick={() => handleClick(11)} style={{ backgroundColor: clickedItems[11] ? '#FDD83E' : '' }}>가벼운</div>
                    <div className='draggable-item item-type2 keyword' value="든든한" onClick={() => handleClick(12)} style={{ backgroundColor: clickedItems[12] ? '#FDD83E' : '' }}>든든한</div>
                    <div className='draggable-item item-type2 soup' value="true" onClick={() => handleClick(13)} style={{ backgroundColor: clickedItems[13] ? '#FDD83E' : '' }}>국물있는</div>
                </div>

                <div id="droppable" className='menu-option-exclude-container'>
                    <p>제외할 카테고리</p>
                </div>
            </div>

            <Link to="/menu-result"><button className='menu-recommend-btn' onClick={handleRecommendStart}>추천 시작</button></Link>

        </div>
    );
};

export default MenuRecommendOption;
