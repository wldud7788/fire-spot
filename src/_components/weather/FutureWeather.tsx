"use client";

import React, { useEffect, useState, useCallback } from "react";

type ForecastData = {
  list: Array<{
    dt: number;
    main: {
      temp: number;
    };
    weather: Array<{
      description: string;
    }>;
  }>;
};

type ForecastWeatherComponentProps = {
  latitude: number;
  longitude: number;
  campingName: string;
  date?: Date;
};

const ForecastWeatherComponent = ({
  latitude,
  longitude,
  campingName
}: ForecastWeatherComponentProps) => {
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const WEATHER_API_KEY = process.env.NEXT_PUBLIC_FUTURE_WEATHER_API_KEY;

  const weatherDescriptionMap: { [key: string]: string } = {
    "clear sky": "맑음",
    "few clouds": "구름 조금",
    "scattered clouds": "구름 흩어짐",
    "broken clouds": "구름 많음",
    "shower rain": "소나기",
    rain: "비",
    thunderstorm: "뇌우",
    snow: "눈",
    mist: "안개",
    "overcast clouds": "흐림"
  };

  const getForecastData = useCallback(async () => {
    try {
      const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`;
      const weatherResponse = await fetch(weatherURL);

      if (!weatherResponse.ok) {
        throw new Error("날씨 데이터를 가져오는데 문제가 있습니다.");
      }

      const weatherData: ForecastData = await weatherResponse.json();
      const dailyData = weatherData.list.filter(
        (_: { dt: number }, index: number) => index % 8 === 0
      );
      setForecastData({ list: dailyData });
    } catch (error) {
      setError(
        "데이터를 가져오는데 문제가 발생했습니다: " + (error as Error).message
      );
      console.error("데이터를 가져오는데 문제가 발생했습니다:", error);
    }
  }, [latitude, longitude, WEATHER_API_KEY]);

  useEffect(() => {
    getForecastData();
  }, [getForecastData]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!forecastData) {
    return <p>날씨 데이터를 불러오는 중...</p>;
  }

  return (
    <div>
      <h2>{campingName}의 5일간 날씨</h2>
      {forecastData.list.map((day, index) => (
        <div key={index}>
          <p>날짜: {new Date(day.dt * 1000).toISOString().split("T")[0]}</p>
          <p>온도: {(day.main.temp - 273.15).toFixed(2)}°C</p>
          <p>
            날씨 상태:{" "}
            {weatherDescriptionMap[day.weather[0].description] ||
              day.weather[0].description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ForecastWeatherComponent;
