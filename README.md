#To-Do App

A simple To-Do App built with React Native (Expo), Node.js, MongoDB, and JWT authentication. Users can perform basic CRUD operations on tasks and manage their task statuses.

#Features

User authentication (Signup/Login) with JWT

Password hashing with bcrypt

Add, update, delete, and retrieve tasks

Mark tasks as completed or not completed

Persistent authentication using AsyncStorage

RESTful API with Node.js & Express

Database management with MongoDB Atlas

Secure API requests using authentication middleware

##Tech Stack

#Frontend (React Native - Expo)

React Native (Expo)

React Navigation

Axios for API requests

AsyncStorage for local storage

#Backend (Node.js & Express)

Node.js with Express.js

MongoDB Atlas

JWT for authentication

bcrypt for password hashing

#Installation & Setup

1️⃣ Clone the Repository

 git clone https://github.com/yourusername/todo-app.git
 cd todo-app

2️⃣ Install Dependencies

Frontend (React Native - Expo)

 cd frontend
 npm install

Backend (Node.js & Express)

 cd backend
 npm install

3️⃣ Set Up Environment Variables

Create a .env file in the backend directory and add:

 MONGO_URI=your_mongodb_connection_string
 JWT_SECRET=your_jwt_secret

4️⃣ Start the Backend Server

 cd backend
 npm start

5️⃣ Start the React Native App
