import { createStackNavigator } from "@react-navigation/stack";
import DefaultPostsScreen from "../nested/DefaultPostsScreen";
import MapScreen from "../nested/MapScreen";
import CommentsScreen from "../nested/CommentsScreen";

const Nested = createStackNavigator();

export default function PostsScreen() {
  return (
    <Nested.Navigator>
      <Nested.Screen
        name="DefaultScreen"
        component={DefaultPostsScreen}
        options={{ headerShown: false }}
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
