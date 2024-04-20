// App.js
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import FormDesigner from './FormDesigner'
import UserForm from './UserForm' // Import the UserForm component
import SuccessPage from './SuccessPage' // Import the SuccessPage component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormDesigner />} />
        <Route path="/view-designed-form" element={<UserForm />} />{' '}
        {/* Route to UserForm component */}
        <Route path="/success" element={<SuccessPage />} />{' '}
        {/* Route to SuccessPage component */}
      </Routes>
    </Router>
  )
}

export default App
