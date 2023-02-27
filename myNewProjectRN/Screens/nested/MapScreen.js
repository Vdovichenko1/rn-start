import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ route }) {
  const { latitude, longitude } = route.params.location.coords;
  console.log(route.params.location.coords);
  return (
    <View style={styles.contain}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude.toString(),
          longitude: longitude.toString(),
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      >
        <Marker
          coordinate={{
            latitude: longitude.toString(),
            longitude: longitude.toString(),
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
