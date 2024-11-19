import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

// TmapMarker 컴포넌트: 지도와 마커를 표시하는 기능을 가진 컴포넌트
const TmapMarker = (props) => {
  const appKey = "vztUHXBH963cLZYiCtLdJ5kQrO95WHnL5WhlSB1M"; // 본인의 Tmap 앱 키로 교체
  const { Tmapv2 } = window; // Tmapv2 객체를 가져와서 지도와 마커를 사용
  const mapRef = useRef(null); // 지도를 저장할 ref 객체를 생성해 컴포넌트가 리렌더링되어도 지도를 유지
  const [address, setAddress] = useState(""); // 도로명 주소를 저장할 상태
  const latLng = {
    // 위도, 경도 직접 입력
    lat: props.avgY, // 위도 (y)
    lng: props.avgX, // 경도 (x)
  };

  // useEffect 훅: 컴포넌트가 처음 렌더링될 때 지도를 초기화하는 함수
  useEffect(() => {
    console.log(props.avgX);
    console.log(props.avgY);

    // initMap 함수: Tmap API를 이용해 지도를 초기화하고 마커를 추가하는 함수
    const initMap = () => {
      // mapRef.current가 비어 있으면 지도 객체를 생성
      if (!mapRef.current) {
        mapRef.current = new window.Tmapv2.Map("map_div2", {
          center: new window.Tmapv2.LatLng(latLng.lat, latLng.lng), // 지도의 초기 중심 좌표 설정
          width: "100%",
          height: "100%",
          zoom: 15, // 지도의 초기 확대/축소 레벨 설정
        });
      } //if

      // 마커 생성: 지도 위에 표시할 마커를 설정
      const marker = new window.Tmapv2.Marker({
        position: new Tmapv2.LatLng(latLng.lat, latLng.lng), // 마커의 위치 좌표 설정
        // icon: "/logo512.png",
        label: "여기입니다",
        map: mapRef.current, // 마커가 표시될 지도 객체 설정
      });

      // Reverse Geocoding API 호출을 통해 도로명 주소 가져오기
      const getAddress = (latitude, longitude) => {
        axios
          .get(`https://apis.openapi.sk.com/tmap/geo/reversegeocoding`, {
            params: {
              version: 1,
              lat: latitude,
              lon: longitude,
              addressType: "A01",
            },
            headers: {
              appKey: appKey,
            },
          })
          .then((res) => {
            console.log(res.data.addressInfo.fullAddress);
            setAddress(res.data.addressInfo.fullAddress);
          })
          .catch((err) => {
            console.error("주소를 가져오는 데 실패했습니다.", err);
          });
      };

      // 마커의 좌표로 도로명 주소 가져오기
      getAddress(latLng.lat, latLng.lng);
    }; // initMap()

    // Tmap API가 이미 로드되었는지 확인
    if (window.Tmapv2) {
      // API가 로드된 경우: 지도와 마커를 초기화
      initMap();
    } else {
      // API가 로드되지 않은 경우: 스크립트를 동적으로 추가하고 로드 완료 시 initMap2 실행
      const script = document.createElement("script");
      script.src = `https://apis.openapi.sk.com/tmap/js?version=1&appKey=${appKey}`; // Tmap API 스크립트 URL
      script.async = true; // 스크립트가 비동기적으로 로드되도록 설정
      script.onload = initMap; // 스크립트 로드 후 initMap 호출
      document.head.appendChild(script); // 스크립트를 <head> 태그에 추가
    } //if-else
  }, []); // 빈 배열로 설정해 컴포넌트가 처음 렌더링될 때 한 번만 실행
  // useEffect()
  return (
    <>
      {/* 4. 받은 마커 데이터를 지도에 표시 */}
      <div id="map_div2" style={{ width: "100%", height: "400px" }}></div>
      <div style={{ marginTop: "20px", fontSize: "18px", color: "#333" }}>
        <strong>도로명 주소:</strong> {address}
      </div>
    </>
  );
};

export default TmapMarker;
