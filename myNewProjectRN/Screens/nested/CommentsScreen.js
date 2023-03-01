import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Text,
  Image,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { collection, addDoc, onSnapshot, query } from "firebase/firestore";
import db from "../../firebase/config";

export default function CommentsScreen({ route }) {
  const { postId } = route.params;
  console.log(postId);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { login } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllPosts();
  }, []);

  const createComment = async () => {
    await addDoc(collection(db, "posts", postId, "comments"), {
      comment,
      login,
    });
    setComment("");
  };

  const getAllPosts = () => {
    const unsub = onSnapshot(
      query(collection(db, "posts", postId, "comments")),
      (data) => {
        setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    );
    return unsub;
  };

  return (
    <View style={styles.contain}>
      <SafeAreaView>
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View style={styles.commentContain}>
              {/* <Image source={{ uri: item.photo }} style={styles.photo} /> */}
              <Text>{item.login}</Text>
              <Text style={styles.commentFriend}>{item.comment}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <View style={styles.commentInput}>
        <TextInput
          placeholder="Коментувати..."
          onChangeText={setComment}
          style={styles.comment}
        />
        <TouchableOpacity onPress={createComment} style={styles.arrow}>
          <AntDesign name="arrowup" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
  },
  commentContain: {
    flexDirection: "row",
    marginBottom: 30,
  },
  commentFriend: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    backgroundColor: "#E5E5E5",
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 16,
    width: 300,
    marginLeft: 16,
  },
  commentInput: {
    justifyContent: "center",
    position: "relative",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 50,
    height: 50,
    fontSize: 16,
    paddingLeft: 5,
    marginBottom: 16,
  },
  comment: {
    paddingLeft: 16,
    fontSize: 16,
    lineHeight: 19,
  },
  arrow: {
    position: "absolute",
    top: "13%",
    left: "90%",
    borderRadius: 50,
    backgroundColor: "#FF6C00",
    height: 34,
    width: 34,
    justifyContent: "center",
    alignItems: "center",
  },
});
