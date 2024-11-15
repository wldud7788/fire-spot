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
    "overcast clouds": "흐림",
    "moderate rain": "비",
    "light rain": "비"
  };

  const weatherImgMap: { [key: string]: string } = {
    "clear sky": "/assets/images/common/img-clear-sky.svg",
    "few clouds": "/assets/images/common/img-few-clouds.svg",
    "scattered clouds": "/assets/images/common/img-scattered-clouds.svg",
    "broken clouds": "/assets/images/common/img-broken-clouds.svg",
    "shower rain": "/assets/images/common/img-shower-rain.svg",
    rain: "/assets/images/common/img-rain.svg",
    "moderate rain": "/assets/images/common/img-rain.svg",
    "light rain": "/assets/images/common/img-rain.svg",
    thunderstorm: "/assets/images/common/img-thunderstorm.svg",
    snow: "/assets/images/common/img-snow.svg",
    mist: "/assets/images/common/img-mist",
    "overcast clouds": "/assets/images/common/img-overcast-clouds.svg"
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

  console.log("forecastData ======>", forecastData);

  return (
    <div className="w-full rounded-[12px] border border-[#A6A6A6] px-[25px] py-[36px]">
      <h2 className="mb-[20px] text-[24px] font-bold">
        {campingName}의 5일간 날씨
      </h2>
      <div className="flex items-center justify-center">
        {forecastData.list.map((day, index) => (
          <div key={index} className="w-[20%] text-center">
            <strong className="text-[18px] font-medium">
              {new Date(day.dt * 1000).toISOString().split("T")[0]}
            </strong>
            <p className="my-[8px] text-[16px] text-[#BFBFBF]">
              {(day.main.temp - 273.15).toFixed(2)}°C
            </p>
            <div className="m-auto mb-[25px] flex h-[47px] w-full max-w-[76px] items-center justify-center">
              <img
                src={
                  weatherImgMap[day.weather[0].description] ||
                  day.weather[0].description
                }
                alt={`${weatherDescriptionMap[day.weather[0].description] || day.weather[0].description}`}
              />
            </div>
            <p className="text-[14px]">
              {weatherDescriptionMap[day.weather[0].description] ||
                day.weather[0].description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastWeatherComponent;
