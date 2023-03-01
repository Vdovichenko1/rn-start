import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ route }) {
  console.log(route.params.location.coords);
  const { latitude, longitude } = route.params.location.coords;

  return (
    <View style={styles.contain}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      >
        <Marker
          coordinate={{
            latitude,
            longitude,
          }}
        />
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
