import { useState } from "react";
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
} from "react-native";

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

  const dispatch = useDispatch();

  const submitForm = () => {
    console.log(state);
    dispatch(authRegistration(state));
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
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWoUdemBWFvsitKN9WctSzNeibkz-K2TnDdg&usqp=CAU",
            }}
            style={styles.image}
          />
          <Text style={styles.title}>Реєстрація</Text>
        </View>
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
        <View
          style={{
            ...styles.contain,
            marginBottom: 45,
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
  image: {
    width: 50,
    height: 50,
    borderRadius: 16,
    marginBottom: 32,
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
