import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, Alert } from "react-native";
import axios from "axios";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../Navigation/AppNavigation";

const API_URL = "http://localhost:5000/api/todos";

// Define navigation and route props
type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, "Main">;
type MainScreenRouteProp = RouteProp<RootStackParamList, "Main">;

interface MainProps {
  navigation: MainScreenNavigationProp;
  route: MainScreenRouteProp;
}

// Define Todo type
interface Todo {
  _id: string;
  title: string;
  completed: boolean;
  userId: string;
}

const Main: React.FC<MainProps> = ({ navigation }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
      fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {

      const response = await axios.get<Todo[]>(API_URL);
     console.log(response)
    //   setTodos(userTodos);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {

      await axios.delete(`${API_URL}/${id}`);

      Alert.alert("Deleted", "Task removed successfully.");
      fetchTodos();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Add Todo" onPress={() => navigation.navigate("Addtask")} />
      <Button title="Update Todo" onPress={() => navigation.navigate("Updatetask")} />
      <FlatList
        data={todos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
              borderBottomWidth: 1,
            }}
          >
            <Text>
              {item.title} {item.completed ? "✅" : "❌"}
            </Text>
            <Button title="Delete" color="red" onPress={() => deleteTodo(item._id)} />
          </View>
        )}
      />
    </View>
  );
};

export default Main;