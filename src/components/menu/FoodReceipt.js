import React from 'react';

const FoodReceipt = ({ food }) => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}.${today.getMonth() + 1}.${today.getDate()}`;

    // 메뉴 항목을 정의합니다.
    const menuItems = [
        { category: "Menu List", items: ["한식", "양식", "일식", "중식", "아시안"] },
        { category: "Category List", items: ["튀김류", "조림 및 찜류", "찌개 및 전골류", "부침류", "무침 및 절임류", "빵류", "볶음류", "밥류", "면류", "국 및 탕류", "구이류"] },
        { category: "Keyword List", items: ["가벼운", "든든한", "술과 어울리는"] },
        { category: "Soup List", items: ["있음", "없음"] },
    ];

    const count = menuItems.reduce((count, section) => {
        return count + section.items.filter(item => food.includes(item)).length;
    }, 0);

    return (
        <div style={{ width: '300px', height:"650px", marginTop:"3vh", border: '1px solid', backgroundColor: "white" }}>
            <h2 style={{ textAlign: 'center', margin: '10px 0' }}>TASTE GUIDE<br/>menu</h2>
            <div style={{ width:"90%", margin:"auto", display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
                <span>{formattedDate}</span>
                <span>No.1</span>
            </div>
            <table border="1" style={{ width: '90%', margin:"auto", borderCollapse: 'collapse', textAlign: 'center' }}>
                <thead>
                    <tr>
                        <th>카테고리</th>
                        <th>세부</th>
                        <th>체크</th>
                    </tr>
                </thead>
                <tbody>
                    {menuItems.map((section, index) => (
                        <React.Fragment key={index}>
                            <tr>
                                <td rowSpan={section.items.length + 1} style={{ width:"40%" ,fontWeight: 'bold', textAlign: 'center', backgroundColor: 'lightgray' }}>
                                    {section.category}
                                </td>
                            </tr>
                            {section.items.map((item, i) => (
                                <tr key={i}>
                                    <td>{item}</td>
                                    <td>{food.includes(item) ? "∨" : ""}</td>
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

export default FoodReceipt;
