import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import db from "../../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import {
  authSignOutUser,
  authStateChangeUser,
} from "../../redux/auth/authOperations";

import Icon from "react-native-vector-icons/Feather";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const { userId, avatar, login } = useSelector((state) => state.auth);
  const [userPosts, setUserPosts] = useState([]);
  // const [image, setImage] = useState(null);

  const getUserPosts = () => {
    const unsub = onSnapshot(
      query(collection(db, "posts"), where("userId", "==", userId)),
      (data) => {
        setUserPosts(data.docs.map((doc) => ({ ...doc.data() })));
      }
    );
    return unsub;
  };
  useEffect(() => {
    getUserPosts();
    dispatch(authStateChangeUser(avatar, login));
  }, []);

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <ImageBackground
      style={styles.imageBG}
      source={require("../../assets/images/bg.jpg")}
    >
      <View style={styles.contain}>
        <TouchableOpacity style={styles.exit} onPress={signOut} color="#212121">
          <Icon name="log-out" size={24} color="#BDBDBD" />
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{ uri: avatar }}
            style={{
              width: 120,
              height: 120,
              borderRadius: 16,
              marginTop: -50,
            }}
          />
          <Text style={styles.nickname}>{login}</Text>
          {/* <TouchableOpacity
            onPress={deleteImage}
            style={{
              ...styles.addPhotoProfile,
              borderColor: "#E8E8E8",
              transform: [{ rotate: "-45deg" }],
              backgroundColor: "#fff",
            }}
          >
            <Icon name="plus" size={18} color="#E8E8E8" />
          </TouchableOpacity> */}
        </View>

        <FlatList
          data={userPosts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 32 }}>
              <Image source={{ uri: item.photo }} style={styles.photo} />
              <Text style={styles.name}>{item.descr.name}</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Коментарі", { postId: item.id })
                  }
                >
                  <Icon name="message-circle" size={24} color="#BDBDBD" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Карта", {
                      location: item.location,
                    })
                  }
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icon name="map-pin" size={24} color="#BDBDBD" />
                    <Text style={styles.local}>{item.descr.local}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBG: {
    flex: 1,
    recizeMode: "cover",
  },
  contain: {
    flex: 1,
    marginTop: 150,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
  },
  exit: {
    position: "absolute",
    top: "3%",
    left: "100%",
  },
  nickname: {
    marginTop: 32,
    marginBottom: 32,
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
  },
  addPhotoProfile: {
    position: "absolute",
    top: 80,
    left: 105,
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: "#FF6C00",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  photo: {
    height: 240,
    borderRadius: 8,
  },
  name: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    marginTop: 8,
    marginBottom: 8,
  },
  local: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
    marginLeft: 5,
  },
});
