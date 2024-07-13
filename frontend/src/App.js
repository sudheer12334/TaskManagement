import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Header from './components/Header/Header';
import TaskList from './components/TaskList/TaskList';
import TaskForm from './components/TaskForm/TaskForm';
import Login from './components/Login-Signup/Login';
import Register from './components/Login-Signup/Register';
import Profile from './components/Profile/Profile';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="App-main">
            <Routes>
              <Route path="/" element={<PrivateRoute component={<TaskList />} />} />
              <Route path="/create" element={<PrivateRoute component={<TaskForm />} />} />
              <Route path="/edit/:id" element={<PrivateRoute component={<TaskForm />} />} />
              <Route path="/profile" element={<PrivateRoute component={<Profile />} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
