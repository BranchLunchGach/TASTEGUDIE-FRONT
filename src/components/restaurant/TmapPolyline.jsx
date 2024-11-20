import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const flexStyle = {
  display: "flex",
};

const TmapPolyline = (props) => {
  const appKey = "vztUHXBH963cLZYiCtLdJ5kQrO95WHnL5WhlSB1M"; // 본인의 Tmap 앱 키로 교체
  const { Tmapv2 } = window; // Tmapv2 객체를 가져와서 지도와 마커를 사용
  const mapRef = useRef(null); // 지도를 저장할 ref 객체를 생성해 컴포넌트가 리렌더링되어도 지도를 유지
  const [route, setRoute] = useState(null); // 경로 데이터를 저장할 상태
  const polylineRef = useRef(null); // 폴리라인을 저장할 ref
  const startLatLng = {
    // 출발지 위도, 경도 직접 입력
    lat: props.startY, // 위도 (y)
    lng: props.startX, // 경도 (x)
  };
  const endLatLng = {
    // 도착지 위도, 경도 직접 입력
    lat: props.endY, // 위도 (y)
    lng: props.endX, // 경도 (x)
  };
  const [totalDistance, setTotalDistance] = useState(null); // 경로 데이터를 저장할 상태
  const [totalTime, setTotalTime] = useState(null); // 경로 데이터를 저장할 상태

  // 1. 경로 데이터를 요청하는 함수 : fetchWalkingRoute() -> 서버에서 api 호출
  const fetchWalkingRoute = () => {
    // POST 요청으로 보행자 경로 데이터를 요청
    axios
      .get(
        "https://apis.openapi.sk.com/tmap/routes/pedestrian",
        {
          params: {
            startX: startLatLng.lng,
            startY: startLatLng.lat,
            endX: endLatLng.lng,
            endY: endLatLng.lat,
            startName: "출발지",
            endName: "도착지",
            appKey: appKey,
          },
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json", // 요청 헤더에 JSON 설정
          },
        }
      )
      .then((res) => {
        const routeData = res.data;
        const totalDistanceData = res.data.features[0].properties.totalDistance;
        const totalTimeData = res.data.features[0].properties.totalTime;

        console.log(routeData); // 콘솔에서 응답 확인
        setRoute(routeData); // 응답 데이터를 상태에 저장

        if (totalDistanceData >= 1000) {
          setTotalDistance((totalDistanceData / 1000).toFixed(2) + "km");
        } else {
          setTotalDistance(totalDistanceData + "m");
        }

        const hours = Math.floor(totalTimeData / 3600);
        const minutes = Math.floor((totalTimeData % 3600) / 60);
        const secs = totalTimeData % 60;

        hours !== 0
          ? setTotalTime(hours + "시간 " + minutes + "분 " + secs + "초")
          : minutes !== 0
          ? setTotalTime(minutes + "분 " + secs + "초")
          : setTotalTime(minutes + "분 " + secs + "초");
      })
      .catch((err) => {
        console.error(err);
      });
  }; // fetchWalkingRoute()

  useEffect(() => {
    fetchWalkingRoute(); // fetchWalkingRoute 호출
  }, []); // 컴포넌트 마운트 시 실행
  

  // 2. 지도 초기화 및 경로 그리기 : useEffect()
  useEffect(() => {
    console.log("[TmapPolyline] startY >> " + props.startX);
    console.log("[TmapPolyline] startX >> " + props.startY);
    console.log("[TmapPolyline] endX >> " + props.endX);
    console.log("[TmapPolyline] endY >> " + props.endY);

    console.log("totalDistance >> " + totalDistance);
    console.log("totalTime >> " + totalTime);

    // 상위 컴포넌트로 데이터 전달
    props.onDataReady({ totalDistance, totalTime });

    // 지도 초기화 및 경로 그리기 함수 : initMap()
    const initMap = () => {
      // 지도 객체가 없으면 지도를 생성
      if (!mapRef.current) {
        mapRef.current = new window.Tmapv2.Map("map_div", {
          center: new window.Tmapv2.LatLng(startLatLng.lat, startLatLng.lng),
          width: "540px",
          height: "500px",
          zoom: 16,
        });
      } //if

      // 기존의 폴리라인이 있다면 지도에서 제거
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
      } //if

      // 경로 데이터가 있을 때만 폴리라인 생성
      if (route && route.features) {
        const path = route.features
          .filter((feature) => feature.geometry.type === "LineString")
          .flatMap((feature) =>
            feature.geometry.coordinates.map(
              (coord) => new window.Tmapv2.LatLng(coord[1], coord[0])
            )
          );

        // 경로를 폴리라인으로 지도에 그리기
        polylineRef.current = new window.Tmapv2.Polyline({
          path: path,
          strokeColor: "#FF0000",
          strokeWeight: 6,
          map: mapRef.current,
        });
      } //if

      // 마커 생성: 지도 위에 표시할 마커를 설정
      // 출발지 마커
      const startMarker = new window.Tmapv2.Marker({
        position: new Tmapv2.LatLng(startLatLng.lat, startLatLng.lng), // 마커의 위치 좌표 설정
        // icon: "/icon_end.png",
        label: "출발지",
        title: "출발",
        map: mapRef.current, // 마커가 표시될 지도 객체 설정
      });
      // 도착지 마커
      const endMarker = new window.Tmapv2.Marker({
        position: new Tmapv2.LatLng(endLatLng.lat, endLatLng.lng), // 마커의 위치 좌표 설정
        // icon: "/icon_start.png",
        label: "도착지",
        title: "도착",
        map: mapRef.current, // 마커가 표시될 지도 객체 설정
      });
    }; // initMap()

    // Tmap API가 로드된 후 initMap 호출
    if (window.Tmapv2) {
      initMap();
    } else {
      const script = document.createElement("script");
      script.src = `https://apis.openapi.sk.com/tmap/js?version=1&appKey=${appKey}`;
      script.async = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } //if-else
  }, [totalDistance, totalTime]);
  // useEffect() : route가 업데이트될 때마다 initMap 실행
  return (
    <div style={flexStyle}>
      <div>
        <div id="map_div" style={{ width: "100%", height: "400px" }}></div>
      </div>
    </div>
  );
};

export default TmapPolyline;
