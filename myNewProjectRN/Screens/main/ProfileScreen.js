import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import db from "../../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import Icon from "react-native-vector-icons/Feather";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);
  const [userPosts, setUserPosts] = useState([]);

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
  }, []);

  return (
    <View style={styles.contain}>
      <FlatList
        style={{ marginTop: 100 }}
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
