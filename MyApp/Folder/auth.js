import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://localhost:5000/api/auth"; 

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const token = response.data.token;
    await AsyncStorage.setItem("token", token);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const signup = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { email, password });
    const token = response.data.token;
    await AsyncStorage.setItem("token", token);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Signup failed");
  }
};

export const logout = async () => {
  await AsyncStorage.removeItem("token");
};

export const getToken = async () => {
  return await AsyncStorage.getItem("token");
};
