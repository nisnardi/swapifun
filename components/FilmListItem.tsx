import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Film } from "@/types/films";
import { COLORS } from "@/constants/colors";
import { Link } from "expo-router";

export default function FilmListItem({ film }: { film: Film }) {
  const filmID = film.url.split("/").filter(Boolean).pop();

  return (
    <Link href={`/films/${filmID}`} asChild>
      <TouchableOpacity>
        <View style={styles.container}>
          <Text style={styles.filmTitle}>{film.title}</Text>
          <Text style={styles.filmDetails}>Episode: {film.episode_id}</Text>
          <Text style={styles.filmDetails}>
            Released: {new Date(film.release_date).toLocaleDateString()}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  filmTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 8,
  },
  filmDetails: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
});
