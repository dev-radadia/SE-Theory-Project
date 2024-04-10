import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormDesigner from './FormDesigner';
import DesignedForm from './DesignedForm';
import UserForm from './UserForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormDesigner />} />
        <Route path="/view-designed-form" element={<UserForm />} />
      </Routes>
    </Router>
  );
};

export default App;
