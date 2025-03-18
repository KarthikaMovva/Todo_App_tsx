import React, { useState, useEffect } from "react";
import { 
  View, 
  TextInput, 
  Button, 
  Alert, 
  Switch, 
  Text 
} from "react-native";
import axios from "axios";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../Navigation/AppNavigation"; 

const API_URL = "	http://localhost:5000/api/todos"; 

type AddTaskScreenNavigationProp = StackNavigationProp<RootStackParamList, "Addtask">;
type AddTaskScreenRouteProp = RouteProp<RootStackParamList, "Addtask">;

interface AddTaskProps {
  navigation: AddTaskScreenNavigationProp;
  route: AddTaskScreenRouteProp;
}

const Addtask: React.FC<AddTaskProps> = ({ navigation }) => {
  const [title, setTitle] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);

  const addTodo = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Title is required!");
      return;
    }

    try {
      await axios.post(API_URL, {
        title,
        completed, 
      });

      Alert.alert("Success", "Task added successfully!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);

      setTitle(""); 
      setCompleted(false); 
    } catch (error) {
      console.error("Error adding task:", error);
      Alert.alert("Error", "Failed to add task. Try again!");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Enter todo title"
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

      <Button title="Add Task" onPress={addTodo} />
    </View>
  );
};

export default Addtask;