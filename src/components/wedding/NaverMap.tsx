'use client';

import React, { useEffect, useRef } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    naver: any;
  }
}

interface NaverMapProps {
  clientId: string;
}

const NaverMap = ({ clientId }: NaverMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  const initMap = () => {
    if (!mapRef.current || !window.naver) return;

    // 강동 루벨 좌표
    const lat = 37.5372056;
    const lng = 127.1320500;
    const venueLocation = new window.naver.maps.LatLng(lat, lng);

    const mapOptions = {
      center: venueLocation,
      zoom: 14,
      minZoom: 10,
      zoomControl: true,
      zoomControlOptions: {
        position: window.naver.maps.Position.TOP_RIGHT
      },
      mapTypeControl: false
    };

    const map = new window.naver.maps.Map(mapRef.current, mapOptions);

    const marker = new window.naver.maps.Marker({
      position: venueLocation,
      map: map,
      icon: {
        content: `
          <div style="position:relative; cursor:pointer;">
            <div style="background:#8BA48B; padding:8px 16px; border-radius:20px; color:white; font-size:13px; font-weight:bold; white-space:nowrap; box-shadow:0 4px 15px rgba(0,0,0,0.2); border:2px solid white; transform:translateY(-100%) translateX(-50%); margin-top:-15px; font-family: 'Pretendard', sans-serif;">
              루벨 강동
            </div>
            <div style="width:14px; height:14px; background:#8BA48B; border:3px solid white; border-radius:50%; position:absolute; top:-7px; left:-7px; box-shadow:0 2px 5px rgba(0,0,0,0.3);"></div>
          </div>
        `,
        anchor: new window.naver.maps.Point(0, 0),
      }
    });

    const infoWindow = new window.naver.maps.InfoWindow({
      content: `
        <div style="padding:20px; min-width:240px; font-size:14px; line-height:1.6; color:#4A4A4A; font-family:serif; border-radius:15px; background:white;">
          <strong style="font-size:16px; color:#5C6E5C; display:block; margin-bottom:8px;">루벨 강동 (LUVEL)</strong>
          <span style="color:#8C7B6C; font-size:13px;">서울특별시 강동구 천호대로 1077<br/>이스트센트럴타워 35층</span>
          <div style="margin-top:12px; padding-top:12px; border-top:1px solid #F0EBE3;">
            <a href="https://map.naver.com/p/search/%EA%B0%95%EB%8F%99%20%EB%A3%A8%EB%B2%A8/place/1064180088?c=15.44,0,0,0,dh&placePath=/home" target="_blank" rel="noopener noreferrer" style="color:#8BA48B; text-decoration:none; font-weight:bold; display:flex; align-items:center; gap:4px;">
              네이버 지도에서 보기 <span style="font-size:10px;">▶</span>
            </a>
          </div>
        </div>
      `,
      backgroundColor: "transparent",
      borderWidth: 0,
      disableAnchor: true,
      pixelOffset: new window.naver.maps.Point(0, -45)
    });

    window.naver.maps.Event.addListener(marker, 'click', function() {
      if (infoWindow.getMap()) {
        infoWindow.close();
      } else {
        infoWindow.open(map, marker);
      }
    });
    
    // 초기 로드 시 정보창 열어두기
    infoWindow.open(map, marker);
  };

  useEffect(() => {
    if (window.naver && window.naver.maps) {
      initMap();
    }
  }, []);

  return (
    <div className="w-full h-full relative">
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}`}
        onLoad={initMap}
        strategy="afterInteractive"
      />
      <div id="naver-map" ref={mapRef} className="w-full h-full" />
    </div>
  );
};

export default NaverMap;
