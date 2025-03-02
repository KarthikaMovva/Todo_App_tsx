import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Alert, Switch, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../Navigation/AppNavigation"; // Ensure the correct import

const API_URL = "http://localhost:5000/api/todos";

interface Todo {
  _id: string;
  title: string;
  completed: boolean;
  userId: string;
}

interface UpdateTaskProps {
  route: RouteProp<RootStackParamList, "Updatetask">;
  navigation: StackNavigationProp<RootStackParamList, "Updatetask">;
}

const Updatetask: React.FC<UpdateTaskProps> = ({ route, navigation }) => {
  const todo = route.params?.todo ?? { _id: "", title: "", completed: false, userId: "" };

  const [title, setTitle] = useState<string>(todo.title);
  const [completed, setCompleted] = useState<boolean>(todo.completed);
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

  const updateTodo = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Title is required!");
      return;
    }

    try {
      await axios.put(`${API_URL}/${todo._id}`, {
        title,
        completed,
        userId,
      });

      Alert.alert("Success", "Task updated successfully!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error("Error updating task:", error);
      Alert.alert("Error", "Failed to update task. Try again!");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Edit todo title"
        value={title}
        onChangeText={setTitle}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
        }}
      />
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
        <Switch value={completed} onValueChange={setCompleted} />
        <Text style={{ marginLeft: 10 }}>{completed ? "Completed" : "Not Completed"}</Text>
      </View>

      <Button title="Update Task" onPress={updateTodo} />
    </View>
  );
};

export default Updatetask;
