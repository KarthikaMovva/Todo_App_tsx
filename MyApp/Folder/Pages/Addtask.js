import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import styled from "styled-components/native";
import { addTask } from "../services/api";

export default function Addtask({ navigation }) {
  const [taskText, setTaskText] = useState("");

  const handleAddTask = async () => {
    if (!taskText.trim()) {
      Alert.alert("Error", "Task cannot be empty!");
      return;
    }

    await addTask(taskText);
    Alert.alert("Success", "Task added successfully!");
    navigation.goBack();
  };

  return (
    <Container>
      <Title>Add New Task</Title>
      <Input placeholder="Enter task..." value={taskText} onChangeText={setTaskText} />
      <AddButton onPress={handleAddTask}>
        <ButtonText>Add Task</ButtonText>
      </AddButton>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px;
  background-color: #f8f9fa;
`;

const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const Input = styled.TextInput`
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  font-size: 16px;
`;

const AddButton = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 12px;
  border-radius: 5px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;
