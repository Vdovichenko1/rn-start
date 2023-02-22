import { Text, View, StyleSheet } from "react-native";
import MapView from "react-native-maps";

export default function MapScreen() {
  return (
    <View style={styles.contain}>
      <Text>MapScreen</Text>
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
