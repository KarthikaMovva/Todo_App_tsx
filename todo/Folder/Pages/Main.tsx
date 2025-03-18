import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, Alert } from "react-native";
import axios from "axios";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../Navigation/AppNavigation";

const API_URL = "http://localhost:5000/api/todos"; // remove extra tab

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, "Main">;
type MainScreenRouteProp = RouteProp<RootStackParamList, "Main">;

interface MainProps {
  navigation: MainScreenNavigationProp;
  route: MainScreenRouteProp;
}

interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

const Main: React.FC<MainProps> = ({ navigation }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchTodos);
    return unsubscribe;
  }, [navigation]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get<Todo[]>(API_URL);
      setTodos(response.data);
      console.log(response);
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
              alignItems: "center",
            }}
          >
            <View>
              <Text>
                {item.title} {item.completed ? "✅" : "❌"}
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Button
                title="Update"
                onPress={() => navigation.navigate("Updatetask", { todo: item })}
              />
              <Button title="Delete" color="red" onPress={() => deleteTodo(item._id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Main;
