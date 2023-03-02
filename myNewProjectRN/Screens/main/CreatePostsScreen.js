import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

import { Camera } from "expo-camera";
import Icon from "react-native-vector-icons/Feather";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import db from "../../firebase/config";

const initialState = {
  name: "",
  local: "",
};

export default function CreatePostsScreen({ navigation }) {
  const [camera, setCamera] = useState("");
  const [photo, setPhoto] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [descr, setDescr] = useState(initialState);
  const [errorMsg, setErrorMsg] = useState(null);
  const [location, setLocation] = useState(null);
  const isFocused = useIsFocused();

  const { userId, login } = useSelector((state) => state.auth);
  const buttonDisable = photo && descr;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      setLocation(location);
    })();
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  const takePhoto = async () => {
    // console.log("comment", descr.name);
    // console.log("location", location);
    const photo = await camera.takePictureAsync();
    await MediaLibrary.createAssetAsync(photo.uri);
    setPhoto(photo.uri);
  };
  // console.log(location);

  const uploadPhotoToServer = async () => {
    const storage = await getStorage();
    const res = await fetch(photo);
    const file = await res.blob();
    const uniquePostId = Date.now().toString();
    const pathReference = ref(storage, `postImage/${uniquePostId}`);
    await uploadBytes(pathReference, file);
    const photoURL = await getDownloadURL(pathReference);
    return photoURL;
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    const createPost = await addDoc(collection(db, "posts"), {
      photo,
      descr,
      location,
      userId,
      login,
    });
    console.log(createPost);
  };

  const sendPost = async () => {
    uploadPostToServer();
    navigation.navigate("Публікації");
    setDescr(initialState);
    setPhoto("");
  };

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  if (hasPermission === null) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator
          size="large"
          color="#FF6C00
"
        />
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <Text>
        Permission for camera not grated. Please change this is settings
      </Text>
    );
  }

  return (
    <View style={styles.contain}>
      {isFocused && (
        <Camera style={styles.camera} ref={setCamera}>
          {photo && (
            <View style={styles.takePhotoContainer}>
              <Image
                source={{ uri: photo }}
                style={{ width: 360, height: 240 }}
              />
            </View>
          )}
          <TouchableOpacity
            style={{
              ...styles.btnContain,
              backgroundColor: photo ? "rgba(255, 255, 255, 0.3)" : "#fff",
              borderWidth: photo ? 0 : 1,
            }}
            onPress={takePhoto}
          >
            <Image
              style={styles.openCamera}
              source={require("../../assets/images/camera.png")}
            />
          </TouchableOpacity>
        </Camera>
      )}
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
          <TouchableOpacity
            onPress={null}
            style={{ position: "absolute", top: 13 }}
          >
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
        <TouchableOpacity
          style={{
            ...styles.btnPublich,
            backgroundColor: buttonDisable ? "#FF6C00" : "#F6F6F6",
          }}
          onPress={sendPost}
        >
          <Text
            style={{
              ...styles.btnPublichText,
              color: buttonDisable ? "#fff" : "#BDBDBD",
            }}
          >
            Опублікувати
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
  },
  camera: {
    height: 240,
    marginTop: 32,
    backgroundColor: "#E8E8E8",
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
    // flexDirection: "row",
    // alignItems: "center",
    // borderBottomWidth: 1,
    // borderBottomColor: "#E8E8E8",
  },
  local: {
    height: 50,
    fontSize: 16,
    paddingLeft: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
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
