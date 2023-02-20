import { Text, View, StyleSheet } from "react-native";

export default function CommentsScreen() {
  return (
    <View style={styles.contain}>
      <Text>CommentsScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
