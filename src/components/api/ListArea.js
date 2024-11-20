import React, { useState } from 'react';
import useNaver from './useNaver';

function ListArea() {
    const [search, setSearch] = useState("");  // 검색어 상태
    const [query, setQuery] = useState("서울");  // 버튼 클릭 시 호출할 쿼리 상태
    const { loading, data, error } = useNaver(query);  // query가 변경될 때만 useNaver 호출
    const [selects, setSelects] = useState([]);  // 선택된 장소 목록 상태

    // 검색어 입력 시 상태 업데이트
    const changeSearch = (e) => {
        setSearch(e.target.value);
    }

    // 검색 버튼 클릭 시 query 상태를 업데이트
    const handleSearchClick = () => {
        setQuery(search);  // 검색어를 query 상태에 설정하여 useNaver 호출
    }

    // 장소 선택 시 선택된 장소 목록에 추가
    const addLoc = (itemTitle) => {
        setSelects((prevSelects) => [...prevSelects, itemTitle]);  // itemTitle만 사용
    }

    // 로딩 상태 처리
    if (loading) {
        return <ul id='storeList'><li>로딩중...</li></ul>;
    }

    // 에러 상태 처리
    if (error) {
        return <ul id='storeList'><li>에러가 발생하였습니다.</li></ul>;
    }

    // 데이터가 없는 상태 처리
    if (!data || data.length === 0) {
        return <ul id='storeList'><li>데이터를 불러오지 못하였습니다.</li></ul>;
    }

    return (
        <div style={{display: "flex", justifyContent: "space-evenly", fontSize:"1vw"}}>
            <div>
                <input 
                    type='text' 
                    placeholder='검색' 
                    value={search} 
                    onChange={changeSearch} 
                />
                <button type='button' onClick={handleSearchClick}>검색</button>
                <ul id='storeList'>
                    {data.map(item => (
                        <li key={item.title}>
                            <strong 
                                onClick={() => addLoc(item.title)} 
                                dangerouslySetInnerHTML={{ __html: item.title }}
                            ></strong>
                            <p>{item.address}</p>
                            <p>
                                <a 
                                    href={item.link} 
                                    target='_blank' 
                                    rel='noopener noreferrer'
                                >
                                    {item.link}<br/>
                                </a>
                                {item.roadAddress}
                            </p>
                        </li>    
                    ))}
                </ul>
            </div>

            {/* 선택된 장소 목록 출력 */}
            <div>
                <h3>선택된 장소</h3>
                <ol>
                    {selects.map((select, index) => (
                        <li key={index} dangerouslySetInnerHTML={{ __html: select }}></li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

export default ListArea;
