function initMap() {
    // 서울을 중심으로 하는 지도 생성
    const seoul = { lat: 37.5665, lng: 126.9780 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: seoul,
    });

    // 명상 공간 위치 데이터
    const locations = [
        {
            position: { lat: 37.5665, lng: 126.9780 },
            title: "서울 명상 센터",
            address: "서울시 강남구 테헤란로 123"
        },
        {
            position: { lat: 35.1796, lng: 129.0756 },
            title: "부산 해운대 명상원",
            address: "부산시 해운대구 해운대로 456"
        },
        {
            position: { lat: 33.4996, lng: 126.5312 },
            title: "제주 명상 공원",
            address: "제주시 애월읍 애월로 789"
        }
    ];

    // 각 위치에 마커 추가
    locations.forEach(location => {
        const marker = new google.maps.Marker({
            position: location.position,
            map: map,
            title: location.title
        });

        // 정보창 생성
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div class="info-window">
                    <h3>${location.title}</h3>
                    <p>${location.address}</p>
                </div>
            `
        });

        // 마커 클릭 시 정보창 표시
        marker.addListener("click", () => {
            infoWindow.open(map, marker);
        });
    });
} 