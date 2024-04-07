import React, { useEffect, useState } from 'react';
import './UserForm.css'; // Import the CSS file for styling

const UserForm = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem('formFields'));
    if (savedFormData) {
      setFormData(savedFormData);
    }
  }, []);

  return (
    <div className="user-form-container">
      <h1>User Form</h1>
      {formData.length > 0 ? (
        <table className="form-table">
          <thead>
            <tr>
              <th>Question</th>
              <th>Answer</th>
            </tr>
          </thead>
          <tbody>
            {formData.map(field => (
              <tr key={field.id}>
                <td>{field.question}</td>
                <td>
                  {field.type === 'text' && (
                    <input type="text" className="input-field" />
                  )}
                  {field.type === 'image' && (
                    <input type="file" accept="image/*" className="input-field" />
                  )}
                  {field.type === 'file' && (
                    <input type="file" className="input-field" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <button
          type="submit"
          className="bg-indigo-500 text-white rounded-md px-4 py-2 hover:bg-indigo-600"
        >
          Submit
        </button>
        </table>
      ) : (
        <p className="empty-form-message">No fields available. The form is empty.</p>
      )}
    </div>
  );
};

export default UserForm;
