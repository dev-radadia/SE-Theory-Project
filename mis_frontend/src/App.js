// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormDesigner from './FormDesigner';
import UserForm from './UserForm'; // Import the UserForm component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormDesigner />} />
        <Route path="/view-designed-form" element={<UserForm />} /> {/* Route to UserForm component */}
      </Routes>
    </Router>
  );
};

export default App;
