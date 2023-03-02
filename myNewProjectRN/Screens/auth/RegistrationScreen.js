import { useEffect, useState } from "react";
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  Pressable,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/Feather";

import { useDispatch } from "react-redux";

import { authRegistration } from "../../redux/auth/authOperations";

import { togglePassword } from "../../utils/togglePassword";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
  const { passVisibility, handlePassword } = togglePassword();
  const [state, setState] = useState(initialState);
  const [image, setImage] = useState(null);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsShowKeyboard(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsShowKeyboard(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const dispatch = useDispatch();

  const submitForm = () => {
    console.log(state);
    dispatch(authRegistration(state, image));
    Keyboard.dismiss();
    setState(initialState);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const deleteImage = async () => {
    setImage(null);
  };

  return (
    <ImageBackground
      style={styles.imageBG}
      source={require("../../assets/images/bg.jpg")}
    >
      <View style={styles.mainContainer}>
        <View style={styles.contain}>
          <View style={styles.imageContain}>
            {image ? (
              <>
                <Image
                  source={{ uri: image }}
                  style={{ width: 120, height: 120, borderRadius: 16 }}
                />
                <TouchableOpacity
                  onPress={deleteImage}
                  style={{
                    ...styles.addPhotoProfile,
                    borderColor: "#E8E8E8",
                    transform: [{ rotate: "-45deg" }],
                    backgroundColor: "#fff",
                  }}
                >
                  <Icon name="plus" size={18} color="#E8E8E8" />
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                onPress={pickImage}
                style={styles.addPhotoProfile}
              >
                <Icon name="plus" size={18} color="#FF6C00" />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.title}>Реєстрація</Text>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={styles.form}>
            <TextInput
              placeholder="Логін"
              style={styles.input}
              value={state.login}
              onChangeText={(value) =>
                setState((prev) => ({ ...prev, login: value }))
              }
            />
            <TextInput
              placeholder="Адреса електронної пошти"
              style={styles.input}
              value={state.email}
              onChangeText={(value) =>
                setState((prev) => ({ ...prev, email: value }))
              }
            />
            <View>
              <TextInput
                placeholder="Пароль"
                style={styles.input}
                secureTextEntry={passVisibility}
                value={state.password}
                onChangeText={(value) =>
                  setState((prev) => ({ ...prev, password: value }))
                }
              />
              <Pressable onPress={handlePassword}>
                <Text style={styles.hidenPass}>
                  {passVisibility ? "Показати" : "Приховати"}
                </Text>
              </Pressable>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.button}
              onPress={submitForm}
            >
              <Text style={styles.btnText}>Зареєструватися</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>

        <View
          style={{
            ...styles.contain,
            marginBottom: isShowKeyboard ? -100 : 45,
            flexDirection: "row",
          }}
        >
          <Text>Вже є акаунт? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.btnNavigate}>Увійти</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBG: {
    flex: 1,
    recizeMode: "cover",
    justifyContent: "flex-end",
  },
  mainContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  contain: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageContain: {
    marginTop: -65,
    marginBottom: 32,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 16,
    marginBottom: 32,
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
  title: {
    fontFamily: "Roboto-Medium",
    marginBottom: 32,
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
  },
  form: {
    color: "#F6F6F6",
    marginHorizontal: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 7,
    height: 50,
    fontSize: 16,
    backgroundColor: "#F6F6F6",

    marginBottom: 16,
    paddingHorizontal: 16,
  },
  hidenPass: {
    fontFamily: "Roboto-Regular",
    position: "absolute",
    top: -50,
    left: 285,
    color: "#1B4371",
  },
  button: {
    backgroundColor: "#FF6C00",
    height: 50,
    borderRadius: 50,
    marginTop: 27,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontFamily: "Roboto-Regular",
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 19,
  },
  btnNavigate: {
    fontFamily: "Roboto-Regular",
    color: "#1B4371",
  },
});
