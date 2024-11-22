import React from 'react';
import { useLocation } from "react-router-dom";

const HelloResultCompleteForm = () => {
    const location = useLocation();
    const menuData = location.state?.menuData; // location.state.menuData로 수정

    // console.log("menuData: ", menuData);

    return (
        <div>
            {menuData && menuData.map((item, index) => (
                <div key={index} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd' }}>
                    <h3>{item.restaurantName}</h3>
                    <p>Type: {item.restaurantType}</p>
                    <p>Day Off: {item.dayOff}</p>
                    <p>Address: {item.address}</p>
                    <p>Subway Address: {item.subwayAddress}</p>
                    <p>Menus: {item.menus}</p>
                    <p>Horoscope: {item.horoscope}</p>
                    <p>Visitor Review Count: {item.visitorReviewCnt}</p>
                    <p>Blog Review Count: {item.blogReviewCnt}</p>
                    <p>Keyword Reviews: {item.keywordReviews}</p>
                    <p>Info: {item.restauranInfo}</p>
                    <p>Service: {item.restauranService}</p>
                    <p>Distance: {item.restauranDistance}</p>
                    <p>Score: {item.score}</p>
                </div>
            ))}
        </div>
    );
};

export default HelloResultCompleteForm;
