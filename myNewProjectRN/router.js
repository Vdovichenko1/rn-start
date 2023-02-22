import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from "./Screens/auth/LoginScreen";
import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import PostsScreen from "./Screens/main/PostsScreen";
import CreatePostsScreen from "./Screens/main/CreatePostsScreen";
import ProfileScreen from "./Screens/main/ProfileScreen";

import Icon from "react-native-vector-icons/Feather";
import { StyleSheet, TouchableOpacity } from "react-native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
      </Stack.Navigator>
    );
  }
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Публікації"
        component={PostsScreen}
        options={{
          headerTitleStyle: {
            marginLeft: 120,
          },
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => alert("This is a button!")}
              color="#212121"
            >
              <Icon name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          tabBarShowLabel: false,
          tabBarIcon: (focused, size, color) => (
            <Icon name="grid" size={24} color="#212121" />
          ),
        }}
      />
      <Tab.Screen
        name="Створити публікацію"
        component={CreatePostsScreen}
        options={{
          headerTitleStyle: {
            marginHorizontal: 40,
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              onPress={() => alert("This is a button!")}
              color="#212121"
            >
              <Icon name="arrow-left" size={24} color="#212121" />
            </TouchableOpacity>
          ),
          tabBarShowLabel: false,
          tabBarIcon: (focused, size, color) => (
            <Icon name="plus" size={24} color="#212121" />
            // <TouchableOpacity
            //   onPress={null}
            //   activeOpacity={0.5}
            //   style={styles.addPost}
            // >

            // </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: (focused, size, color) => (
            <Icon name="user" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  addPost: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6C00",
    width: 70,
    height: 40,
    borderRadius: 50,
  },
});
