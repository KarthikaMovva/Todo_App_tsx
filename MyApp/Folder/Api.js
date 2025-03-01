import axios from "axios";

const API_URL = "http://localhost:5000/api/todos"; 

export const getTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

export const addTask = async (taskText) => {
  try {
    const response = await axios.post(API_URL, { title: taskText });
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
  }
};

export const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};
