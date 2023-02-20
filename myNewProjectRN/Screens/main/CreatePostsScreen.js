import { Text, View, StyleSheet } from "react-native";

export default function CreatePostsScreen() {
  return (
    <View style={styles.contain}>
      <Text>CreatePostsScreen</Text>
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
