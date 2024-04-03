import React, { useState } from 'react'
import FieldComponent from './FieldComponent'
import ViewDesignedFormButton from './ViewDesignedFormButton'
import DesignedForm from './DesignedForm'

const FormDesigner = () => {
  const [fields, setFields] = useState([])
  const [newFieldType, setNewFieldType] = useState('text')
  const [newQuestion, setNewQuestion] = useState('')
  const [newOptions, setNewOptions] = useState('')
  const [newApplicableTo, setNewApplicableTo] = useState('student')

  const handleAddField = () => {
    const newField = {
      id: Math.random(),
      type: newFieldType,
      question: newQuestion,
      options: newOptions.split(',').map((option) => option.trim()),
      applicableTo: newApplicableTo,
    }
    setFields([...fields, newField])
  }

  const handleDeleteField = (id) => {
    const updatedFields = fields.filter((field) => field.id !== id)
    setFields(updatedFields)
  }

  const handleApplyChanges = async () => {
    try {
      const response = await fetch('./api/form-fields', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fields), // Send the fields data to the backend
      })
      const data = await response.json()
      console.log('Response from backend:', data)
      // Optionally, you can handle success or error responses here
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-semibold mb-8 text-center">
          Form Designer
        </h1>
        <div className="mb-4">
          <label
            htmlFor="fieldType"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Field Type:
          </label>
          <select
            id="fieldType"
            value={newFieldType}
            onChange={(e) => setNewFieldType(e.target.value)}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="text">Text</option>
            <option value="image">Image</option>
            <option value="file">File Upload</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="question"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Question:
          </label>
          <input
            type="text"
            id="question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="applicableTo"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Applicable To:
          </label>
          <select
            id="applicableTo"
            value={newApplicableTo}
            onChange={(e) => setNewApplicableTo(e.target.value)}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="student">Student</option>
            <option value="employee">Employee</option>
            <option value="both">Both</option>
          </select>
        </div>
        <div className="flex justify-end mb-6">
          <button
            onClick={handleAddField}
            className="bg-indigo-600 text-white rounded-md px-4 py-2 hover:bg-indigo-700"
          >
            Add Field
          </button>
        </div>
        <div>
          {fields.map((field) => (
            <FieldComponent
              key={field.id}
              field={field}
              onDelete={handleDeleteField}
            />
          ))}
        </div>
        <div className="flex justify-between mt-8">
          <button
            onClick={handleApplyChanges}
            className="bg-indigo-600 text-white rounded-md px-4 py-2 hover:bg-indigo-700"
          >
            Apply Changes
          </button>
          <ViewDesignedFormButton />
        </div>
      </div>
      <DesignedForm fields={fields} className="mt-8" />
    </div>
  )
}

export default FormDesigner
