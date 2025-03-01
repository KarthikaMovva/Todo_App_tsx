import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { getTasks, deleteTask } from "../services/api";

export default function Main({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    const data = await getTasks();
    setTasks(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  return (
    <Container>
      <Title>Todo List</Title>
      {loading ? <ActivityIndicator size="large" color="#007bff" /> : null}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TaskItem>
            <TaskText>{item.title}</TaskText>
            <DeleteButton onPress={() => handleDelete(item._id)}>
              <ButtonText>Delete</ButtonText>
            </DeleteButton>
          </TaskItem>
        )}
      />
      <AddButton onPress={() => navigation.navigate("AddTask")}>
        <ButtonText>Add Task</ButtonText>
      </AddButton>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #f8f9fa;
`;

const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const TaskItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: #fff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  elevation: 3;
`;

const TaskText = styled.Text`
  font-size: 18px;
`;

const DeleteButton = styled.TouchableOpacity`
  background-color: #dc3545;
  padding: 8px 12px;
  border-radius: 5px;
`;

const AddButton = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 12px;
  border-radius: 5px;
  align-items: center;
  margin-top: 10px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;
