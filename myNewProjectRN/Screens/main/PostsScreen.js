import { createStackNavigator } from "@react-navigation/stack";
import DefaultPostsScreen from "../nested/DefaultPostsScreen";
import MapScreen from "../nested/MapScreen";
import CommentsScreen from "../nested/CommentsScreen";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";

const Nested = createStackNavigator();

export default function PostsScreen() {
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOutUser());
  };
  return (
    <Nested.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: { height: 88 },
        headerTitleStyle: {
          fontFamily: "Roboto-Medium",
          fontSize: 17,
          lineHeight: 22,
          letterSpacing: -0.408,
          color: "#212121",
        },
        tabBarShowLabel: false,
      }}
    >
      <Nested.Screen
        name="Публікації"
        component={DefaultPostsScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={signOut}
              color="#212121"
            >
              <Icon name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          tabBarShowLabel: false,
        }}
      />
      <Nested.Screen
        name="Коментарі"
        component={CommentsScreen}
        options={{
          headerTitleStyle: {
            marginHorizontal: 70,
          },
        }}
      />
      <Nested.Screen
        name="Карта"
        component={MapScreen}
        options={{
          headerTitleStyle: {
            marginHorizontal: 100,
          },
        }}
      />
    </Nested.Navigator>
  );
}
