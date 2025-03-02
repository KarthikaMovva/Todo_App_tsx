import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../Navigation/AppNavigation"; 

const API_URL = "http://localhost:5000/api/auth";

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">;
type LoginScreenRouteProp = RouteProp<RootStackParamList, "Login">;

interface LoginProps {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
}

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    console.log("Login screen mounted");
  }, []);

  const handleAuth = async (type: "login" | "signup") => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Email and password are required");
      return;
    }

    try {
      console.log(`Attempting ${type} with`, { email, password });

      const response = await axios.post(`${API_URL}/${type}`, { email, password });

      if (response.status === 200) {
        await AsyncStorage.setItem("token", response.data.token);
        console.log("Login successful, navigating to Main");
        navigation.navigate("Main");
      } else {
        throw new Error("Unexpected response");
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 15 }}>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
        }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
        }}
      />

      <Button title="Login" onPress={() => handleAuth("login")} />
      <Button title="Signup" onPress={() => handleAuth("signup")} />

      {error ? <Text style={{ color: "red", marginTop: 10 }}>{error}</Text> : null}
    </View>
  );
};

export default Login;
