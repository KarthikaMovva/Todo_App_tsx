import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
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
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Addtask" component={Addtask} />
        <Stack.Screen name="Updatetask" component={Updatetask} />
      </Stack.Navigator>
  );
};

export default App;