import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Pages/Login";
import Main from "../Pages/Main";
import Addtask from "../Pages/Addtask";
import Updatetask from "../Pages/Updatetask";

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Addtask: undefined;
  Updatetask: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  console.log("AppNavigation is rendering...");

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Addtask" component={Addtask} />
        <Stack.Screen name="Updatetask" component={Updatetask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
