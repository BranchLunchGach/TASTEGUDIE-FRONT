import React from 'react';

const RestaurantReceipt = ({ restaurant }) => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}.${today.getMonth() + 1}.${today.getDate()}`;

    // 메뉴 항목을 정의합니다.
    const menuItems = [
        { category: "Core Keyword", items: ["콜키지 가능", "주차 가능", "비건 메뉴", "반려 동물 동반"] },
        { category: "Main Keyword", items: ["가족모임", "단체", "기념일", "가성비", "혼밥", "양많음", "현지맛"] },
    ];

    const count = menuItems.reduce((count, section) => {
        return count + section.items.filter(item => restaurant.includes(item)).length;
    }, 0);

    return (
        <div style={{ width: '300px', height:"430px", marginTop:"3vh", border: '1px solid', backgroundColor: "white" }}>
            <h2 style={{ textAlign: 'center', margin: '10px 0' }}>TASTE GUIDE<br/>restaurant</h2>
            <div style={{ width:"90%", margin:"auto", display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
                <span>{formattedDate}</span>
                <span>No.2</span>
            </div>
            <table style={{ border:"1px solid", width: '90%', margin:"auto", borderCollapse: 'collapse', textAlign: 'center' }}>
                <thead>
                    <tr>
                        <th>카테고리</th>
                        <th>세부</th>
                        <th>체크</th>
                    </tr>
                </thead>
                <tbody style={{border:"1px solid"}}>
                    {menuItems.map((section, index) => (
                        <React.Fragment key={index}>
                            <tr>
                                <td rowSpan={section.items.length + 1} style={{ width:"40%",fontWeight: 'bold', textAlign: 'center', backgroundColor: 'lightgray' }}>
                                    {section.category}
                                </td>
                            </tr>
                            {section.items.map((item, i) => (
                                <tr key={i}>
                                    <td>{item}</td>
                                    <td>{restaurant.includes(item) ? "∨" : ""}</td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                    <tr>
                        <td colSpan="2" style={{ fontWeight: 'bold' }}>합계</td>
                        <td>{count===0 ? "" : count}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default RestaurantReceipt;
