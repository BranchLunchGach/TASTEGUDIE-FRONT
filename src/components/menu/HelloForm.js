import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { styled } from 'styled-components';
import useNaver from '../api/useNaver';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { HelloContext } from '../../context/HelloContext';
import LodingPage2 from '../../pages/LodingPage2';

// 준비된 이미지 배열
const images = [
    '/smiling.png',
    '/Grinning_face.png',
    '/sunglasses.png',
    '/stonished_face.png',
    '/happy_face.png',
];

const FirstContainer = styled.div`
    display: flex;
    align-items: center;
`

const HelloTitle = styled.div`
    font-size: 64px;
    font-family: "LOTTERIA CHAB-Regular", Helvetica;
    text-align: left;
    margin-left: 4vw;
`

const SearchContainer = styled.div`
    padding: 20px;
    margin-left: 30px;

    display: flex;
    flex-direction: column;
    align-items: center;
`

const MenuSearchContainer = styled.div`
    height: 140px;

    display: flex;
    flex-direction: column;
    justify-content: center;
`

const MenuSearchInput = styled.input`
    width: 350px;
    margin-top: 20px;
    margin-left: 65px;
    padding: 13px;
    border: 1px solid #ccc;
    border-radius: 10px;
`

const MenuSearchBtn = styled.button`
    margin-left: 20px;
    padding: 13px 20px;
    border: 1px solid black;
    border-radius: 15px;
    font-size: 14px;
    font-weight: bold;
    color: white;
    background-color: black;
`

const LocationSubTitle = styled.span`
    text-align: left;
    margin-left: 10px;
    font-size: 19px;
`

const LocationSearchDiv = styled.div`
    margin-top: 20px;
`

const LocationSearchInput = styled.input`
    width: 300px;
    height: 40px;
    padding: 2vw;
    border: 1px solid #ccc;
    border-radius: 25px;
`

const LocationAddBtn = styled.button`
    margin-left: -1vw;
    padding: 2vh 6vw;
    border-radius: 10px;
    background-color: black;
    color: white;
    font-weight: bold;
`

const LocationSearchBtn = styled.button`
    margin-left: 1vw;
    padding: 0.8vw;
    border-radius: 10px;
    background-color: black;
    color: white;
    font-weight: bold;
`

const SecondContainer = styled.div`
    width: 100vw;
    height: 60vh;
    margin-top: 100px;

    display: flex;
    align-items: center;
`

const UserLocation = styled.div`
    width: 68vw;
    height: 90%;
    border: 2px solid #ccc;
    border-radius: 20px;
    margin-left: 130px;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    overflow-x: auto; /* 가로 스크롤 적용 */
`

const UserDiv = styled.div`
    /* width: 25%; */
    min-width: 28%;
    height: 95%;
    border: 1px solid black;
    border-radius: 20px;
    background-color: white;
    margin-left: 2vw; /* 각 UserDiv 간의 간격 */
    margin-right: 2vw; /* 각 UserDiv 간의 간격 */

    display: flex;
    flex-direction: column;
    align-items: center;
`

const ImgDiv = styled.div`
    width: 50%;
    height: 50%;
    margin-top: 3vh;

    background-image: ${({ imgUrl }) => `url(${imgUrl})`};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
`

const Span = styled.span`
    margin-top: 30px;
    font-size: 20px;
    font-family: "LOTTERIA CHAB-Regular", Helvetica;
`

const GoBtn = styled.button`
    width: 14vw;
    height: 50%;
    border-radius: 200px;
    margin-left: 5vw;
    color: white;
    background-color: black;
`

const LocationSearchResult = styled.div`

`

const HelloForm = () => {

    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

    const [locations, setLocations] = useState([]); // 위치 리스트 관리
    const [inputValue, setInputValue] = useState(''); // 입력값 관리

    const [search, setSearch] = useState("");  // 검색어 상태
    const [query, setQuery] = useState("");  // 버튼 클릭 시 호출할 쿼리 상태
    const { data } = useNaver(query);  // query가 변경될 때만 useNaver 호출

    const [show, setShow] = useState(false);

    const [selectedAddress, setSelectedAddress] = useState(null); // 선택된 주소 상태
    const [selectedMenu, setSelectedMenu] = useState(""); // 선택된 메뉴 상태
    const [menuInput, setMenuInput] = useState(""); // 메뉴 입력값 상태

    const [geocode, setGeocode] = useState([]);

    //api keys
    const clientId = process.env.REACT_APP_CLIENTID;
    const clientSecret = process.env.REACT_APP_CLIENTSECRET;

    const { contextData, setContextData } = useContext(HelloContext);

    const navigate = useNavigate();  // useNavigate 훅을 사용하여 페이지 이동

    useEffect(() => {
        console.log("현재 위치 저장 값 >>", locations);
    }, [locations]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const handleAddLocation = () => {
    //     if (selectedAddress && locations.length < 5) {
    //         setLocations([...locations, selectedAddress]); // 선택한 위치 추가
    //         setInputValue(selectedAddress); // inputValue를 선택한 주소로 설정
    //         setSelectedAddress(null); // 선택 초기화
    //         console.log("현재 위치 저장 값 > " + locations);
    //         handleClose(); // 모달 닫기
    //     }
    // };
    const handleAddLocation = () => {
        if (selectedAddress && locations.length < 5) {
            setLocations((prevLocations) => {
                const updatedLocations = [...prevLocations, selectedAddress];
                console.log("현재 위치 저장 값 >", updatedLocations);
                return updatedLocations;
            });
            setInputValue(selectedAddress); // inputValue를 선택한 주소로 설정
            setSelectedAddress(null); // 선택 초기화
            handleClose(); // 모달 닫기
        }
    };

    // 검색어 입력 시 상태 업데이트
    const changeSearch = (e) => {
        setSearch(e.target.value);
    }

     // 검색 버튼 클릭 시 query 상태를 업데이트
     const handleSearchClick = () => {
        setQuery(search);  // 검색어를 query 상태에 설정하여 useNaver 호출
    }

    // 특정 위치 제거 함수
    const handleRemoveLocation = (index) => {
        setLocations(locations.filter((_, i) => i !== index));
    };

    // HTML 태그를 제거하는 함수
    const stripHTML = (html) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        return tempDiv.textContent || tempDiv.innerText || "";
    };

    // 메뉴 선택하기 버튼 클릭 시 호출되는 함수
    const handleMenuSelect = () => {
        setSelectedMenu(menuInput); // 선택된 메뉴를 업데이트
        console.log("현재 선택된 음식 >> " + menuInput);
    };
    
    // 도로명 주소를 위도 경도로 변경해주는 함수
    const fetchGeocode = async (address) => {

        console.log("address >> " + address);

        try {
            const res = await axios.get(
                "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=" +
                  encodeURIComponent(address),
                {
                  params : { // params API 키 설정
                    "X-NCP-APIGW-API-KEY-ID": process.env.REACT_APP_CLIENTID,
                    "X-NCP-APIGW-API-KEY": process.env.REACT_APP_CLIENTSECRET,
                  },
                }
            );
    
            const result = res.data.addresses[0];

            if (result) {
                return {
                    roadAddress: result.roadAddress,
                    latitude: parseFloat(result.y),
                    longitude: parseFloat(result.x),
                    jibunAddress: result.jibunAddress,
                };
            } else {
                console.log("해당 주소의 결과를 찾을 수 없습니다.");
                return null;
            }
        } catch (err) {
            console.log("API 호출 에러:", err);
            return null;
        }
    };

    const handleStart = async () => {

        setIsLoading(true); // 로딩 상태 활성화

        // 모든 주소에 대해 fetchGeocode를 호출하고 결과를 기다립니다.
        const geocodeResults = await Promise.all(
            locations.map((location) => fetchGeocode(location?.address))
        );

        // 유효한 결과만 필터링합니다.
        const validResults = geocodeResults.filter(result => result && result.longitude && result.latitude);

        if (validResults.length === 0) {
            console.log("유효한 좌표 데이터를 찾을 수 없습니다.");
            alert("유효한 좌표 데이터를 찾을 수 없습니다.");
            return;
        }

        console.log(validResults);

        // x, y 좌표 평균을 계산합니다.
        const avgX = validResults.reduce((sum, item) => sum + item.longitude, 0) / validResults.length;
        const avgY = validResults.reduce((sum, item) => sum + item.latitude, 0) / validResults.length;

        // geocode 상태를 업데이트합니다.
        setGeocode(validResults);

        setContextData({ menu: selectedMenu, avgX: avgX, avgY: avgY}); // 예시 데이터 설정

        console.log("페이지 이동 전 메뉴 데이터", selectedMenu);
        console.log("페이지 이동 전 X 값 데이터", avgX);
        console.log("페이지 이동 전 Y 값 데이터", avgY);

        recommand(avgX, avgY);
    };

    const recommand = (x, y) => {
        axios({
          url: process.env.REACT_APP_SPRING_IP+"/hello-restaurant",
          method: "post",
          data: {
            menu: selectedMenu,
            avgX: x,
            avgY: y,
          },
        })
        .then((res) => {
            console.log(res.data);
            navigate("/hello/result", { state: { 
                menuData: res.data,
                menu: selectedMenu,
                avgX: x,
                avgY: y,
            },
         });
        })
        .catch((err)=>{
          console.error("Error sending data:", err);
        })
        .finally(() => {
            setIsLoading(false); // 로딩 상태 비활성화 (필요한 경우)
          });
     }    

    if (isLoading) {
        return <LodingPage2 />; // 로딩 페이지 표시
    }      

    return (
        <div>
            <FirstContainer>
                <HelloTitle>만남의 장소</HelloTitle>
                <div style={{display:"flex", border: "3px solid #ccc", borderRadius:"20px",marginLeft:"2vw"}}>
                    <SearchContainer>
                        <LocationSubTitle>인원을 추가하여 위치를 입력하세요.</LocationSubTitle>
                        <LocationSearchDiv>                    
                            <LocationAddBtn variant="primary" onClick={handleShow}>인원 추가하기</LocationAddBtn> 
                        </LocationSearchDiv>
                    </SearchContainer>
                    <MenuSearchContainer>
                        {/* 선택된 메뉴 표시 */}
                        <span style={{
                            fontSize: "19px",
                            color: selectedMenu ? "red" : "black", // 선택된 메뉴가 있을 때 빨간색으로 변경
                            fontWeight: selectedMenu ? "bold" : "nomal",
                            marginLeft: "65px",

                        }}>
                            {selectedMenu ? `선택한 메뉴 : ${selectedMenu}` : "메뉴를 선택해주세요!"}
                        </span>
                        <div style={{marginRight:"2vw"}}>
                            <MenuSearchInput type="text" 
                                placeholder="메뉴를 입력하세요." 
                                value={menuInput} 
                                onChange={(e) => setMenuInput(e.target.value)}  />
                            <MenuSearchBtn onClick={handleMenuSelect}>선택하기</MenuSearchBtn>
                        </div>
                    </MenuSearchContainer>
                </div>        
            </FirstContainer>

            <Modal show={show} onHide={handleClose} centered >
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LocationSearchDiv style={{marginLeft:"40px"}}>
                        <LocationSearchInput 
                            type="text" 
                            placeholder='어디서 출발하시나요?'
                            value={search} 
                            onChange={changeSearch} />
                        <LocationSearchBtn onClick={handleSearchClick}>검색하기</LocationSearchBtn> 
                    </LocationSearchDiv>
                    <LocationSearchResult>
                        {(data !== null && data.length) > 0 ? (
                            <ul>
                                {data.map(item => (
                                    <li key={item.title} 
                                        onClick={() => setSelectedAddress({ title: stripHTML(item.title), address: item.address })}
                                        style={{marginTop:"50px", 
                                                padding:"10px", 
                                                borderRadius:"20px",
                                                backgroundColor: selectedAddress?.address === item.address ? "#FDD83E" : "white",
                                                cursor: "pointer"}} >
                                        <strong>{stripHTML(item.title)}</strong>
                                        <p style={{fontSize:"20px", textAlign:"left", marginTop:"10px"}}>{item.address}</p>
                                    </li>    
                                ))}
                            </ul>
                        ) : (
                            <p style={{fontSize:"20px", marginTop:"50px",  marginBottom:"40px", textAlign: "center", color:"gray"}}>데이터가 없습니다</p>
                        )}
                    </LocationSearchResult>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>닫기</Button>
                    <Button variant="primary" onClick={handleAddLocation}>추가하기</Button>
                </Modal.Footer>
            </Modal>

            <SecondContainer>
                <UserLocation>
                     {locations.length === 0 ? ( <p style={{ fontSize: "30px", color: "gray", textAlign: "center" }}>인원을 추가해주세요!</p> ) : (
                        locations.map((location, index) => (
                            <UserDiv key={index}>
                                <ImgDiv  imgUrl={images[index]} /> {/* 이미지 배열의 인덱스에 따라 동적 배치 */}
                                <Span>{location.title}</Span>
                                <span style={{ color: "gray", marginBottom: "5px" }}>{location.address}</span>
                                <button 
                                    onClick={() => handleRemoveLocation(index)}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        color: "red",
                                        fontWeight: "bold",
                                        fontSize: "16px",
                                        cursor: "pointer",
                                        marginLeft: "0.6vw",
                                        marginTop: "1vh",
                                    }}> 삭제 </button>
                            </UserDiv>
                        ))
                    )}
                </UserLocation>
                <GoBtn onClick={handleStart}>
                    <span style={{fontSize:"35px", fontFamily:"LOTTERIA CHAB-Regular"} }>출발</span>
                    <br/><span style={{fontSize:"35px"}}>=====&gt;</span>
                </GoBtn>
            </SecondContainer>
        </div>
    );
};

export default HelloForm;