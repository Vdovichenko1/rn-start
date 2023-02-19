import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.contain}>
        <Text style={styles.headerLogin}>Увійти</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          placeholder="Адреса електронної пошти"
          style={styles.input}
        />
        <TextInput
          placeholder="Пароль"
          style={styles.input}
          secureTextEntry={true}
        />
        <TouchableOpacity activeOpacity={0.5} style={styles.button}>
          <Text style={styles.btnText}>Увійти</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contain}>
        <Text style={styles.signIn}>Немає акаунта? Зареєструватися</Text>
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
  headerLogin: {
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
    marginBottom: 115,
  },
});
