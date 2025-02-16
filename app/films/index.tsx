import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import { StatusBar } from "expo-status-bar";

import { COLORS } from "@/constants/colors";
import { Film, SwapyResponse } from "@/types/films";
import { SWAPI_URI } from "@/constants/api";
import FilmListItem from "@/components/FilmListItem";
import EmptyList from "@/components/EmptyList";

const Films = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchFilms = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${SWAPI_URI}films`);
      const data: SwapyResponse<Film> = await response.json();
      const sortedFilms = data.results.sort(
        (film1, film2) => film1.episode_id - film2.episode_id
      );
      setFilms(sortedFilms);
    } catch (error) {
      console.log("Error");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFilms();
  }, []);

  const onRefreshHandler = () => {
    setRefreshing(true);
    fetchFilms();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <FlatList
        data={films}
        keyExtractor={(film) => film.episode_id.toString()}
        renderItem={({ item }) => <FilmListItem film={item} />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefreshHandler}
            colors={[COLORS.text]}
            tintColor={COLORS.text}
            progressBackgroundColor="transparent"
          />
        }
        contentContainerStyle={styles.listContentContainer}
        ListEmptyComponent={
          <EmptyList loading={loading} message="No films found" />
        }
      />
    </View>
  );
};

export default Films;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.containerBackground,
  },
  listContentContainer: { flexGrow: 1 },
});
