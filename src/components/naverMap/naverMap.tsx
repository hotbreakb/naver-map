import React, { useEffect, useState } from "react";
import { ReactComponent as Marker } from "assets/zoopi-marker.svg";
import ZoopiMarker from "../../assets/zoopi-marker.svg";

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
  }, []);

  useEffect(() => {
    // userLocation으로 이동
    const map = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(
        userLocation.latitude,
        userLocation.longitude
      ),
      zoom: 14,
      zoomControl: true,
    });

    // 마커로 위치 표시
    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(
        userLocation.latitude,
        userLocation.longitude
      ),
      map,
      icon: {
        url: ZoopiMarker,
        // size: new naver.maps.Size(25, 34),
        // scaledSize: new naver.maps.Size(25, 34),
        // origin: new naver.maps.Point(0, 0),
        // anchor: new naver.maps.Point(12, 34),
      },
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
