"use client";

import ForecastWeatherComponent from "@/_components/weather/FutureWeather";

const TestPage = () => {
  const campingLocations = [
    { name: "캠핑장 A", latitude: 37.5665, longitude: 126.978 }
  ];

  return (
    <div>
      <h1>날씨 테스트 페이지</h1>
      {campingLocations.map((location, index) => (
        <ForecastWeatherComponent
          key={index}
          latitude={location.latitude}
          longitude={location.longitude}
          campingName={location.name}
        />
      ))}
    </div>
  );
};

export default TestPage;
