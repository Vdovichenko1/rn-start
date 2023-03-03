import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from "./Screens/auth/LoginScreen";
import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import PostsScreen from "./Screens/main/PostsScreen";
import CreatePostsScreen from "./Screens/main/CreatePostsScreen";
import ProfileScreen from "./Screens/main/ProfileScreen";

import Icon from "react-native-vector-icons/Feather";
import { StyleSheet, View } from "react-native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
      </Stack.Navigator>
    );
  }
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: { height: 88 },
        headerTitleStyle: styles.header,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 83,
        },
      }}
    >
      <Tab.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Icon
              name="grid"
              size={24}
              style={{ color: focused ? "#FF6C00" : "#212121" }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Створити публікацію"
        component={CreatePostsScreen}
        options={{
          // headerLeft: () => (
          //   <TouchableOpacity
          //     style={{ marginLeft: 16 }}
          //     onPress={() => alert("This is a button!")}
          //     color="#212121"
          //   >
          //     <Icon name="arrow-left" size={24} color="#212121" />
          //   </TouchableOpacity>
          // ),
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={{
                ...styles.bottomTabIcon,
                backgroundColor: focused ? "#F6F6F6" : "#FF6C00",
              }}
            >
              {focused ? (
                <Icon name="trash-2" color="#BDBDBD" size={24} />
              ) : (
                <Icon name="plus" color="#fff" size={24} />
              )}
            </View>
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
          tabBarIcon: ({ focused, size, color }) => (
            <Icon
              name="user"
              size={24}
              style={{ color: focused ? "#FF6C00" : "#212121" }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.408,
    color: "#212121",
  },
  bottomTabIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    borderRadius: 20,
  },
  addPost: {
    // alignItems: "center",
    // justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: "#FF6C00",
    width: 70,
    height: 40,
    borderRadius: 50,
    color: "#fff",
  },
});
