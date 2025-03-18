import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';  // Use HashRouter here
import SignInPage from './SignInPage';
import AdminDashboard from './Dashboard/AdminDashboard';
import UserDashboard from './Dashboard/UserDashboard';
import RegisterPage from './userpages/Register';
import MainDashboard from './Dashboard/MainDashboard';

function App() {
  return (
    <Router>  {/* Use HashRouter */}
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/user/*" element={<UserDashboard />} />
        <Route path="/main/*" element={<MainDashboard />} />
        <Route path="/" element={<SignInPage />} />
      </Routes>
    </Router>
  );
}

export default App;
