import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../Navigation/AppNavigation"; // Import stack type

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
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const tokenParts = token.split(".");
          if (tokenParts.length === 3) {
            const decodedToken = JSON.parse(atob(tokenParts[1]));
            setUserId(decodedToken.userId);
          } else {
            console.error("Invalid token format.");
          }
        }
      } catch (error) {
        console.error("Error fetching userId:", error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchTodos();
    }
  }, [userId]);

  const fetchTodos = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("No token found.");
        return;
      }

      const response = await axios.get<Todo[]>(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userTodos = response.data.filter((todo) => todo.userId === userId);
      setTodos(userTodos);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("No token found.");
        return;
      }

      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

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
