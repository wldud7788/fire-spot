"use client";

import React, { useEffect, useState } from "react";
type WeatherComponentProps = {
  city: string;
  date: Date;
};
// 날짜하나 만들기 props 기본값 주기/ ui
const WeatherComponent = ({
  city,
  date = new Date()
}: WeatherComponentProps) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  const URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  const getWeatherData = async () => {
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error("네트워크 응답에 문제가 있습니다.");
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setError("날씨 데이터를 가져오는데 문제가 발생했습니다.");
      console.error("날씨 데이터를 가져오는데 문제가 발생했습니다:", error);
    }
  };

  useEffect(() => {
    getWeatherData();
  }, []);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : weatherData ? (
        <div>
          <p>현재 날씨는</p>
          <p>온도: {weatherData.main.temp}°</p>
          <p>풍속: {weatherData.wind.speed}m/s</p>
          <p>습도: {weatherData.main.humidity}%</p>
          <p>오늘의 최고기온: {weatherData.main.temp_max}°</p>
          <p>오늘의 최저기온: {weatherData.main.temp_min}°</p>
          <div>
            <p>날씨 상태: {weatherData.weather[0].description}</p>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
            />
          </div>
        </div>
      ) : (
        <p>날씨 데이터를 불러오는 중...</p>
      )}
    </div>
  );
};

export default WeatherComponent;
