import React, { useEffect, useState } from "react";
import "./MenuRecommendOption.css";
import $ from "jquery";
import "jquery-ui/ui/widgets/draggable";
import "jquery-ui/ui/widgets/droppable";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // useNavigate import 추가

const MenuRecommendOption = () => {
  const [clickedItems, setClickedItems] = useState(Array(13).fill(false));
  const navigate = useNavigate(); // navigate hook 사용

  useEffect(() => {
    $(".draggable-item").draggable();

    $("#droppable").droppable({
      drop: function (event, ui) {
        $(this).addClass("ui-state-highlight").find("p").html("Dropped!");
      },
    });
  }, []);

  const handleClick = (index) => {
    const selectedCount = clickedItems.filter((item) => item).length;

    if (clickedItems[index] || selectedCount < 8) {
      setClickedItems((prevState) => {
        const newState = [...prevState];
        newState[index] = !newState[index];
        return newState;
      });
    }
  };

  const handleRecommendStart = async () => {
    const selectedItems = clickedItems.reduce((acc, isSelected, index) => {
      if (isSelected) {
        const element =
          document.getElementsByClassName("draggable-item")[index];
        const classList = element.className.split(" ");
        const key = classList[2];
        const value = element.getAttribute("value");

        if (key) {
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
      const response = await axios.post(
        "http://localhost:9000/menu",
        selectedItems,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        console.log(response.data); // 성공적인 서버 응답 처리
        // 서버 응답 데이터를 MenuResultPage로 이동
        navigate("/menu-result", { state: { menuData: response.data } });
      } else {
        alert("요청 실패!");
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="container">
      <div className="sub-container">
        <div className="menu-option-container">
          {/* 드래그 가능한 메뉴 항목 */}
          {[
            "한식",
            "양식",
            "중식",
            "일식",
            "면 및 만두류",
            "밥류",
            "국 및 탕류",
            "빵 및 과자류",
            "튀김류",
            "구이류",
            "술과 어울리는",
            "가벼운",
            "든든한",
            "국물있는",
          ].map((item, index) => (
            <div
              key={index}
              className={`draggable-item item-type${index < 10 ? 1 : 2}`}
              value={item}
              onClick={() => handleClick(index)}
              style={{ backgroundColor: clickedItems[index] ? "#FDD83E" : "" }}
            >
              {item}
            </div>
          ))}
        </div>

        <div id="droppable" className="menu-option-exclude-container">
          <p>제외할 카테고리</p>
        </div>
      </div>

      <button className="menu-recommend-btn" onClick={handleRecommendStart}>
        추천 시작
      </button>
    </div>
  );
};

export default MenuRecommendOption;
