import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, SafeAreaView, View } from "react-native";
import NewsKizi from "../components/NewsKizi";
import Constants from "expo-constants";
import axios from "axios";

const URI = `http://newsapi.org/v2/top-headlines?country=jp&category=entertainment&apikey=10e724a6b3f0404296035823721f97c3`;

export default function NewsScreen({navigation}) {
  const [news, setNews] = useState([]);

  useEffect(() => {
    getNews();
  }, [])

  const getNews = async () => {
    const response = await axios.get(URI);
    setNews(response.data.articles);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
       data={news}
       renderItem={({ item }) => (
        <NewsKizi 
          imageurl={item.urlToImage || "https://via.placeholder.com/100x100?text=No+Image"}
          title={item.title}
          subtext={item.publishedAt}
          onPress={() => navigation.navigate("詳細ページ", { article: item })}
        />
       )}
      keyExtractor = {(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
  
  });
  

