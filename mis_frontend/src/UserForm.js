import React, { useEffect, useState } from 'react'
import './UserForm.css'

const UserForm = () => {
  const [formData, setFormData] = useState([])
  const [userType, setUserType] = useState('student')

  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem('formFields'))
    if (savedFormData) {
      setFormData(savedFormData)
    }
  }, [])

  const handleInputChange = (e, fieldId) => {
    const updatedFormData = formData.map((field) => {
      if (field.id === fieldId) {
        return { ...field, answer: e.target.value }
      }
      return field
    })
    setFormData(updatedFormData)
  }

  const filteredFields = formData.filter((field) => {
    if (userType === 'student' || userType === 'employee') {
      return field.applicableTo === userType || field.applicableTo === 'both'
    }
    return true
  })

  return (
    <div className="user-form-container">
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
        User Form
      </h1>
      <div className="user-type-select">
        <label>
          <input
            type="radio"
            value="student"
            checked={userType === 'student'}
            onChange={() => setUserType('student')}
          />
          Student
        </label>
        <label>
          <input
            type="radio"
            value="employee"
            checked={userType === 'employee'}
            onChange={() => setUserType('employee')}
          />
          Employee
        </label>
      </div>
      {filteredFields.length > 0 ? (
        <form className="form-table">
          <table>
            <thead>
              <tr>
                <th>Question</th>
                <th>Answer</th>
              </tr>
            </thead>
            <tbody>
              {filteredFields.map((field) => (
                <tr key={field.id}>
                  <td>{field.question}</td>
                  <td>
                    {field.type === 'text' && (
                      <input
                        type="text"
                        className="input-field"
                        onChange={(e) => handleInputChange(e, field.id)}
                      />
                    )}
                    {field.type === 'image' && (
                      <input
                        type="file"
                        accept="image/*"
                        className="input-field"
                        onChange={(e) => handleInputChange(e, field.id)}
                      />
                    )}
                    {field.type === 'file' && (
                      <input
                        type="file"
                        className="input-field"
                        onChange={(e) => handleInputChange(e, field.id)}
                      />
                    )}
                    {field.type === 'radio' && (
                      <div>
                        {field.options.map((option) => (
                          <div key={option}>
                            <input
                              type="radio"
                              id={option}
                              name={field.id}
                              value={option}
                              onChange={(e) => handleInputChange(e, field.id)}
                            />
                            <label htmlFor={option}>{option}</label>
                          </div>
                        ))}
                      </div>
                    )}
                    {field.type === 'checkbox' && (
                      <div>
                        {field.options.map((option) => (
                          <div key={option}>
                            <input
                              type="checkbox"
                              id={option}
                              name={field.id}
                              value={option}
                              onChange={(e) => handleInputChange(e, field.id)}
                            />
                            <label htmlFor={option}>{option}</label>
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="submit"
            className="bg-indigo-500 text-white rounded-md px-4 py-2 hover:bg-indigo-600"
          >
            Submit
          </button>
        </form>
      ) : (
        <p className="empty-form-message">
          No fields available. The form is empty.
        </p>
      )}
    </div>
  )
}

export default UserForm
