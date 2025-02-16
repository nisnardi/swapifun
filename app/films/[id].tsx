import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { Film } from "@/types/films";
import { SWAPI_URI } from "@/constants/api";
import { COLORS } from "@/constants/colors";
import { FavoriteIcon } from "@/components/FavoriteIcon";
import { getFromStorage, setToStorage } from "@/utils/storage";

const FilmDetails = () => {
  const { id } = useLocalSearchParams();
  const [film, setFilm] = useState<Film | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const fetchFilm = async () => {
    try {
      const response = await fetch(`${SWAPI_URI}films/${id}`);
      const parsedFilm = await response.json();
      setFilm(parsedFilm);
      checkFavoriteStatus(parsedFilm);
    } catch (error) {
      console.log("Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilm();
  }, [id]);

  const checkFavoriteStatus = async (film: Film) => {
    try {
      let favoriteFilms: Film[] = await getFromStorage("favorites");

      if (favoriteFilms) {
        setIsFavorite(
          favoriteFilms.some(
            (favFilm) => favFilm.episode_id === film.episode_id
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleFavorite = async () => {
    if (!film) {
      console.log("no film");
      return;
    }

    try {
      const favorites = await getFromStorage("favorites");
      let favoriteFilms = favorites || [];

      if (isFavorite) {
        favoriteFilms = favoriteFilms.filter(
          (favFilm: Film) => favFilm.episode_id !== film?.episode_id
        );
      } else {
        favoriteFilms.push(film);
      }
      await setToStorage("favorites", favoriteFilms);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <View>
        <Text style={styles.messageText}>Loading...</Text>
      </View>
    );
  }

  if (!film) {
    return (
      <View>
        <Text style={styles.messageText}>Film not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <FavoriteIcon isFavorite={isFavorite} onPress={toggleFavorite} />
          ),
        }}
      />
      <Text style={styles.title}>{film.title}</Text>
      <Text style={styles.details}>Director: {film.director}</Text>
      <Text style={styles.details}>Episode: {film.episode_id}</Text>
      <Text style={styles.details}>Producers: {film.producer}</Text>
      <Text style={styles.details}>
        Release Date: {film.release_date.toString()}
      </Text>
      <Text style={styles.crawl}>{film.opening_crawl}</Text>
    </ScrollView>
  );
};

export default FilmDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.containerBackground,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 16,
  },
  details: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 8,
  },
  crawl: {
    fontSize: 16,
    color: COLORS.text,
    marginTop: 16,
    fontStyle: "italic",
  },
  messageText: {
    color: "#fff",
  },
});
