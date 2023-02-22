import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ route }) {
  return (
    <View style={styles.contain}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 50.4606255,
          longitude: 30.3836286,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      >
        <Marker coordinate={{ latitude: 50.4606255, longitude: 30.3836286 }} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
