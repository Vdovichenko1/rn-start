import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Text,
  Image,
  Keyboard,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { collection, addDoc, onSnapshot, query } from "firebase/firestore";
import db from "../../firebase/config";

export default function CommentsScreen({ route }) {
  const { postId, avatar, photo } = route.params;
  console.log(postId);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { login } = useSelector((state) => state.auth);

  // const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    getAllPosts();
  }, []);

  const createComment = async () => {
    // setCommentCount(commentCount + 1);
    await addDoc(collection(db, "posts", postId, "comments"), {
      comment,
      login,
      avatar,
    });
    setComment("");
    Keyboard.dismiss();
  };

  const getAllPosts = () => {
    const unsub = onSnapshot(
      query(collection(db, "posts", postId, "comments")),
      (data) => {
        setAllComments(
          data.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }))
            .sort((a, b) => a.date - b.date)
        );
      }
    );
    return unsub;
  };

  return (
    <View style={styles.contain}>
      <Image source={{ uri: photo }} style={styles.photo} />
      <FlatList
        style={{ marginTop: 32 }}
        data={allComments}
        renderItem={({ item }) => (
          <View style={styles.commentContain}>
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <Image source={{ uri: avatar }} style={styles.avatar} />
              <Text
                style={{
                  marginTop: 6,
                  fontSize: 14,
                  fontFamily: "Roboto-Medium",
                }}
              >
                {item.login}
              </Text>
            </View>
            <Text style={styles.commentFriend}>{item.comment}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.commentInput}>
        <TextInput
          placeholder="Коментувати..."
          value={comment}
          onChangeText={(e) => setComment(e)}
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
  photo: {
    height: 240,
    borderRadius: 8,
    marginTop: 32,
  },
  commentContain: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
  },
  commentFriend: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    backgroundColor: "#E5E5E5",
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginLeft: 16,
    width: 250,
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
