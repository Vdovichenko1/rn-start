import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function PostsScreen() {
  return (
    <>
      <View style={styles.contain}>
        <Text style={styles.header}>Публікації</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    lineHeight: 22,
    color: "#212121",
  },
});
