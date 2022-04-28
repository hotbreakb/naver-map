import React, { useEffect, useState } from "react";

type Location = {
  latitude: number;
  longitude: number;
};

const NaverMap = () => {
  // 초기 위치: 건국대학교 동물병원
  const [userLocation, setUserLocation] = useState<Location>({
    latitude: 37.5390908,
    longitude: 127.0747238,
  });

  useEffect(() => {
    // 현재 위치 반영
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }

    // userLocation으로 이동
    new naver.maps.Map("map", {
      center: new naver.maps.LatLng(
        userLocation.latitude,
        userLocation.longitude
      ),
      zoom: 14,
      zoomControl: true,
    });
  }, [userLocation]);

  const mapStyle = {
    width: "80%",
    height: "600px",
  };

  return (
    <section>
      <h1>네이버 지도</h1>
      <div id="map" style={mapStyle}></div>
    </section>
  );
};

export default NaverMap;
