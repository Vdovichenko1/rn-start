import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

import { onSnapshot, collection, query } from "firebase/firestore";
import db from "../../firebase/config";

import Icon from "react-native-vector-icons/Feather";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { authStateChangeUser } from "../../redux/auth/authOperations";

export default function DefaultPostsScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  // const [userData, setUserData] = useState({});
  const dispatch = useDispatch();

  const { avatar, login, email } = useSelector((state) => state.auth);

  const getAllPost = () => {
    const unsub = onSnapshot(query(collection(db, "posts")), (data) => {
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsub;
  };

  // const userInfo = () => {
  //   const auth = getAuth();
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const userInfo = {
  //         userName: user.displayName,
  //         avatar: user.photoURL,
  //         email: user.email,
  //       };
  //       setUserData(userInfo);
  //     } else {
  //       // setUserData(null);
  //     }
  //   });
  // };

  useEffect(() => {
    // userInfo();
    dispatch(authStateChangeUser(avatar, login));
    getAllPost();
  }, []);

  // console.log(posts);

  return (
    <View style={styles.contain}>
      <View style={styles.userInfo}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <View>
          <Text style={styles.userName}>{login}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
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
                style={styles.comment}
                onPress={() =>
                  navigation.navigate("Коментарі", {
                    postId: item.id,
                    avatar: avatar,
                    photo: item.photo,
                  })
                }
              >
                <Icon name="message-circle" size={24} color="#BDBDBD" />
                <Text style={styles.countComment}>0</Text>
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
  );
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  userInfo: {
    marginTop: 32,
    marginBottom: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 15,
  },
  email: {
    fontFamily: "Roboto-Regular",
    color: "rgba(33, 33, 33, 0.8)",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
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
  comment: {
    flexDirection: "row",
    alignItems: "center",
  },
  countComment: {
    fontFamily: "Roboto-Regular",
    marginLeft: 6,
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  local: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
    marginLeft: 5,
  },
});
