import React, { useState } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import { login } from "../auth";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigation.replace("Home");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <Container>
      <Title>Login</Title>
      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Input placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button onPress={handleLogin}>
        <ButtonText>Sign In</ButtonText>
      </Button>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Input = styled.TextInput`
  width: 80%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.TouchableOpacity`
  width: 80%;
  background-color: #007bff;
  padding: 10px;
  align-items: center;
  border-radius: 5px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;
