import React, { useEffect, useState } from "react";

type ForecastWeatherComponentProps = {
  latitude: number;
  longitude: number;
};

const ForecastWeatherComponent = ({
  latitude,
  longitude
}: ForecastWeatherComponentProps) => {
  const [forecastData, setForecastData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = process.env.NEXT_PUBLIC_FUTUREWEATHER_API_KEY;
  const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

  const getForecastData = async () => {
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error("네트워크 응답에 문제가 있습니다.");
      }

      const data = await response.json();
      setForecastData(data.daily);
    } catch (error) {
      setError("날씨 데이터를 가져오는데 문제가 발생했습니다.");
      console.error("날씨 데이터를 가져오는데 문제가 발생했습니다:", error);
    }
  };

  useEffect(() => {
    getForecastData();
  }, [latitude, longitude]); // 위도와 경도가 바뀔 때마다 데이터 호출

  if (error) {
    return <p>{error}</p>;
  }

  if (!forecastData) {
    return <p>날씨 데이터를 불러오는 중...</p>;
  }

  return (
    <div>
      {forecastData.map((day: any, index: number) => (
        <div key={index}>
          <p>날짜: {new Date(day.dt * 1000).toISOString().split("T")[0]}</p>
          <p>온도: {day.temp.day}°</p>
          <p>날씨 상태: {day.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
};

export default ForecastWeatherComponent;
