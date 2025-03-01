import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Main from "../Pages/Main";
import Addtask from "../Pages/Addtask";

const Stack = createStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Main} />
        <Stack.Screen name="AddTask" component={Addtask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
