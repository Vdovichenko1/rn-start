import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Camera } from "expo-camera";
import { useEffect, useState } from "react";

import Icon from "react-native-vector-icons/Feather";
import * as Location from "expo-location";

const initialState = {
  name: "",
  local: "",
};

export default function CreatePostsScreen({ navigation }) {
  const [camera, setCamera] = useState("");
  const [photo, setPhoto] = useState("");
  const [descr, setDescr] = useState(initialState);
  const [errorMsg, setErrorMsg] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setLocation(coords);
    setPhoto(photo.uri);
  };

  const sendPost = () => {
    navigation.navigate("DefaultScreen", { photo, descr, location });
    setDescr(initialState);
    setPhoto("");
  };

  const openMap = () => {
    navigation.navigate("Map");
  };

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.contain}>
        <Camera style={styles.camera} ref={setCamera}>
          {photo && (
            <View style={styles.takePhotoContainer}>
              <Image
                source={{ uri: photo }}
                style={{ width: 360, height: 240 }}
              ></Image>
            </View>
          )}
          <TouchableOpacity style={styles.btnContain} onPress={takePhoto}>
            <Image
              style={styles.openCamera}
              source={require("../../assets/images/camera.png")}
            ></Image>
          </TouchableOpacity>
        </Camera>
        <Text style={styles.textCamera}>Завантажте фото</Text>
        <View>
          <View>
            <TextInput
              value={descr.name}
              style={styles.name}
              placeholder="Назва..."
              onChangeText={(value) =>
                setDescr((prev) => ({ ...prev, name: value }))
              }
            />
          </View>
          <View style={styles.localContain}>
            <TouchableOpacity onPress={openMap}>
              <Icon name="map-pin" size={24} color="#BDBDBD" />
            </TouchableOpacity>

            <TextInput
              value={descr.local}
              style={styles.local}
              placeholder="Місцевість..."
              onChangeText={(value) =>
                setDescr((prev) => ({ ...prev, local: value }))
              }
            />
          </View>
          <TouchableOpacity style={styles.btnPublich} onPress={sendPost}>
            <Text style={styles.btnPublichText}>Опублікувати</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    // justifyContent: "center",
    // alignItems: "center",
  },
  camera: {
    height: 240,
    marginTop: 32,
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    alignItems: "center",
  },
  takePhotoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    color: "#fff",
    borderColor: "#E5E5E5",
    borderWidth: 1,
  },
  btnContain: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  openCamera: {},
  textCamera: {
    color: "#BDBDBD",
    marginTop: 8,
    marginBottom: 32,
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
  name: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    height: 50,
    fontSize: 16,
    paddingLeft: 5,
  },
  localContain: {
    marginBottom: 32,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  local: {
    // borderBottomWidth: 1,
    // borderBottomColor: "#E8E8E8",
    height: 50,
    fontSize: 16,
    marginLeft: 5,
  },
  btnPublich: {
    backgroundColor: "#FF6C00",
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  btnPublichText: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
});
