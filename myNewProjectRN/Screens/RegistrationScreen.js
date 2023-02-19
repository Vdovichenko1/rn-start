import { useEffect, useState } from "react";
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  Dimensions,
  Pressable,
} from "react-native";

import { togglePassword } from "../utils/togglePassword";

import * as Font from "expo-font";
import { AppLoading } from "expo";

const loadFonts = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
  });
};

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen() {
  const { passVisibility, handlePassword } = togglePassword();
  const [state, setState] = useState(initialState);
  //   const [isReady, setIsReady] = useState(false);
  //   const [dimensions, setDimensions] = useState(
  //     Dimensions.get("window").width - 20 * 2
  //   );
  //   useEffect(() => {
  //     const onChange = () => {
  //       const width = Dimensions.get("window").width;
  //       console.log(width);
  //     };
  //     Dimensions.addEventListener("change", onChange);
  //     return () => {
  //       Dimensions.removeEventListener("change", onChange);
  //     };
  //   }, []);

  const submitForm = () => {
    console.log(state);
    Keyboard.dismiss();
    setState(initialState);
  };

  //   if (!isReady) {
  //     return (
  //       <AppLoading
  //         startAsync={loadFonts}
  //         onFinish={() => setIsReady(true)}
  //         onError={console.warn}
  //       />
  //     );
  //   }

  return (
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
      <View style={styles.contain}>
        <Text style={styles.signIn}>Вже є акаунт? Увійти</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  signIn: {
    marginBottom: 45,
  },
});
