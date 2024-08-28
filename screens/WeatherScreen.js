import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, SafeAreaView } from "react-native";
import WeatherItem from "../components/WeatherItem";
import Constants from "expo-constants";
import axios from "axios";

// app.jsonからAPIキーを取得
const weatherApiKey = Constants.expoConfig.extra.weatherApiKey;

// 各地域のAPI情報
const Hokkaido = { name: "北海道", uri: `https://api.openweathermap.org/data/2.5/weather?q=Asahikawa&lang=ja&units=metric&appid=${weatherApiKey}` };
const Touhoku = { name: "東北", uri: `https://api.openweathermap.org/data/2.5/weather?q=Yamagata&lang=ja&units=metric&appid=${weatherApiKey}` };
const Kanntou = { name: "関東", uri: `https://api.openweathermap.org/data/2.5/weather?q=Tokyo&lang=ja&units=metric&appid=${weatherApiKey}` };
const Hokuriku = { name: "北陸", uri: `https://api.openweathermap.org/data/2.5/weather?q=Nagano&lang=ja&units=metric&appid=${weatherApiKey}` };
const Toukai = { name: "東海", uri: `https://api.openweathermap.org/data/2.5/weather?q=Nagoya&lang=ja&units=metric&appid=${weatherApiKey}` };
const Kinnki = { name: "近畿", uri: `https://api.openweathermap.org/data/2.5/weather?q=Osaka&lang=ja&units=metric&appid=${weatherApiKey}` };
const Tyugoku = { name: "中国", uri: `https://api.openweathermap.org/data/2.5/weather?q=Hiroshima&lang=ja&units=metric&appid=${weatherApiKey}` };
const Sikoku = { name: "四国", uri: `https://api.openweathermap.org/data/2.5/weather?q=Matsuyama&lang=ja&units=metric&appid=${weatherApiKey}` };
const Kyushu = { name: "九州", uri: `https://api.openweathermap.org/data/2.5/weather?q=Ozu&lang=ja&units=metric&appid=${weatherApiKey}` };
const Okinawa = { name: "沖縄", uri: `https://api.openweathermap.org/data/2.5/weather?q=Okinawa&lang=ja&units=metric&appid=${weatherApiKey}` };

const TotalUri = [
  Hokkaido,
  Touhoku,
  Kanntou,
  Hokuriku,
  Toukai,
  Kinnki,
  Tyugoku,
  Sikoku,
  Kyushu,
  Okinawa,
];

export default function WeatherScreen() {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    getWeathers();
  }, []);

  const getWeathers = async () => {
    try {
      const responses = await Promise.all(
        TotalUri.map((info) => axios.get(info.uri))
      );

      const data = responses.map((response, index) => ({
        ...response.data.weather[0],
        name: TotalUri[index].name,
      }));

      setWeatherData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={weatherData}
        renderItem={({ item }) => (
          <WeatherItem
            description={item.description}
            icon={item.icon}
            name={item.name}
          />
        )}
        keyExtractor={(item, index) => String(index)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
