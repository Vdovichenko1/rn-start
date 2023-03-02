import { useEffect, useState } from "react";
import {
  ImageBackground,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { authLogin } from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";

import { togglePassword } from "../../utils/togglePassword";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const { passVisibility, handlePassword } = togglePassword();
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const dispatch = useDispatch();

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

  const submitForm = () => {
    dispatch(authLogin(state));
    Keyboard.dismiss();
    setState(initialState);
  };

  return (
    <ImageBackground
      style={styles.imageBG}
      source={require("../../assets/images/bg.jpg")}
    >
      <View style={styles.mainContainer}>
        <View style={styles.contain}>
          <Text style={styles.headerLogin}>Увійти</Text>
        </View>
        <View style={styles.form}>
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
            <Text style={styles.btnText}>Увійти</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            ...styles.contain,
            marginBottom: isShowKeyboard ? -100 : 115,
            flexDirection: "row",
          }}
        >
          <Text>Немає акаунта? </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("Registration")}
          >
            <Text style={styles.btnNavigate}>Зареєструватися</Text>
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
  headerLogin: {
    fontFamily: "Roboto-Medium",
    marginTop: 32,
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
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 19,
  },
  btnNavigate: {
    fontFamily: "Roboto-Regular",
    color: "#1B4371",
  },
});
