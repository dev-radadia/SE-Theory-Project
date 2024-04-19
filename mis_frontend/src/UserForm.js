import React, { useEffect, useState } from 'react'
import './UserForm.css'

// function convertFileToBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = error => reject(error);
//   });
// }

const UserForm = () => {
  const [formData, setFormData] = useState([])
  const [userType, setUserType] = useState('student')

  // useEffect(() => {
  //   const savedFormData = JSON.parse(localStorage.getItem('formFields'))
  //   if (savedFormData) {
  //     setFormData(savedFormData)
  //   }
  // }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/sendCols');
        if (!response.ok) {
          throw new Error('Failed to fetch form data');
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e, fieldId) => {
  
    let updatedFormData;
    const fieldToUpdate = formData.find((field) => field.question === fieldId);
  
    if (fieldToUpdate && fieldToUpdate.type === 'checkbox') {
      const selectedOption = e.target.value;
      const prevSelectedOptions = fieldToUpdate.response || []; 
      let updatedSelectedOptions;
  
      if (e.target.checked) {
        updatedSelectedOptions = [...prevSelectedOptions, selectedOption];
      } else {
        updatedSelectedOptions = prevSelectedOptions.filter((option) => option !== selectedOption);
      }
  
      updatedFormData = formData.map((field) => {
        if (field.question === fieldId) {
          return { ...field, response: updatedSelectedOptions };
        }
        return field;
      });
    }

    else if (fieldToUpdate && fieldToUpdate.type === 'image') {
      // const file = e.target.files[0];
      // const reader = new FileReader();
      // reader.readAsDataURL(file);

      // reader.onload = () => {
      //   updatedFormData = formData.map((field) => {
      //     if (field.question === fieldId) {
      //       console.log(reader.result);
      //       return { ...field, response: reader.result };
      //     }
      //     return field;
      //   });
      // };

      updatedFormData = formData.map((field) => {
        if (field.question === fieldId) {
          return { ...field, response: "image" };
        }
        return field;
      });
    }

    else if (fieldToUpdate && fieldToUpdate.type === 'file') {
      // const file = e.target.files[0];
      // const reader = new FileReader();
      // reader.readAsDataURL(file);

      // reader.onload = () => {
      //   updatedFormData = formData.map((field) => {
      //     if (field.question === fieldId) {
      //       console.log(reader.result);
      //       return { ...field, response: reader.result };
      //     }
      //     return field;
      //   });
      // };

      updatedFormData = formData.map((field) => {
        if (field.question === fieldId) {
          return { ...field, response: "file" };
        }
        return field;
      });
    }
    
    else {
    
      updatedFormData = formData.map((field) => {
        if (field.question === fieldId) {
          return { ...field, response: e.target.value };
        }
        return field;
      });
    }
    //console.log("Updated form data:", updatedFormData); 
    setFormData(updatedFormData);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior  
   // console.log("Original formData:", formData); // Log original formData

    // Filter formData based on userType
    const filteredFormData = formData.filter((field) => {
      return field.applicable_to === userType || field.applicable_to === 'both';
      
    }).filter(Boolean);
  
    //console.log("Filtered formData:", filteredFormData); // Log filtered formData
  
    // Remove the applicable_to field from each question
    const updatedFormData = filteredFormData.map((field) => {
      const { applicableTo, ...rest } = field;
      return rest;
    }).filter(Boolean);
  
    // Add applicable_to field to the beginning of the updatedFormData 
    updatedFormData.unshift({applicable_to:userType});
    try {
      const response = await fetch('http://127.0.0.1:8000/api/receiveData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Form data submitted successfully:', data);
    } catch (error) {
      console.error('There was a problem submitting the form data:', error.message);
    }
  };
  
  
  

// Convert formData to an array of values
const formDataArray = Object.values(formData);

// Filter the array
const filteredFields = formDataArray.filter((field) => {
  if (userType === 'student' || userType === 'employee') {
    return field.applicable_to === userType || field.applicable_to === 'both';
  }
  return true;
});

  
  

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
        <form className="form-table" onSubmit={handleSubmit}>
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
                        onChange={(e) => handleInputChange(e, field.question)}
                      />
                    )}
                    {field.type === 'image' && (
                      <input
                        type="file"
                        accept="image/*"
                        className="input-field"
                        onChange={(e) => handleInputChange(e, field.question)}
                      />
                    )}
                    {field.type === 'file' && (
                      <input
                        type="file"
                        className="input-field"
                        onChange={(e) => handleInputChange(e, field.question)}
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
                              onChange={(e) => handleInputChange(e, field.question)}
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
                              onChange={(e) => handleInputChange(e, field.question)}
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


// [
//   {
//       "id": 0.36036302852212887,
//       "type": "text",
//       "question": "Name",
//       "options": [],
//       "applicableTo": "student"
//   },
//   {
//       "id": 0.5499655378250259,
//       "type": "image",
//       "question": "Photo",
//       "options": [],
//       "applicableTo": "employee"
//   },
//   {
//       "id": 0.7463503403613634,
//       "type": "radio",
//       "question": "graduation year",
//       "options": [
//           "2024",
//           "2025",
//           "2026"
//       ],
//       "applicableTo": "student"
//   },
//   {
//       "id": 0.00011172325515840242,
//       "type": "checkbox",
//       "question": "Level cleared",
//       "options": [
//           "lvl1",
//           "lvl2",
//           "lvl3"
//       ],
//       "applicableTo": "both"
//   }
// ]