// FormDesigner.js
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import FieldComponent from './FieldComponent'
import DesignedForm from './DesignedForm'
import './FormDesigner.css'
import ViewDesignedFormButton from './ViewDesignedFormButton' // Import ViewDesignedFormButton

const FormDesigner = () => {
  const [fields, setFields] = useState([])
  const [showDesignedForm, setShowDesignedForm] = useState(false)
  const [newFieldType, setNewFieldType] = useState('text')
  const [newQuestion, setNewQuestion] = useState('')
  const [newOptions, setNewOptions] = useState('')
  const [newApplicableTo, setNewApplicableTo] = useState('student')
  const [additionalOptions, setAdditionalOptions] = useState('')

  const handleApplyChanges = async () => {
    try {
      localStorage.setItem('formFields', JSON.stringify(fields))
      setShowDesignedForm(true)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleAddField = () => {
    const newField = {
      id: Math.random(),
      type: newFieldType,
      question: newQuestion,
      options:
        newFieldType === 'radio' || newFieldType === 'checkbox'
          ? additionalOptions.split(',').map((option) => option.trim())
          : [],
      applicableTo: newApplicableTo,
    }
    setFields([...fields, newField])
  }

  const handleDeleteField = (id) => {
    const updatedFields = fields.filter((field) => field.id !== id)
    setFields(updatedFields)
  }

  const handleAdditionalOptionsChange = (e) => {
    setAdditionalOptions(e.target.value)
  }

  return (
    <div className="main-container bg-gray-50 min-h-screen flex flex-col">
      <div className="flex-grow flex">
        <div className=" left flex-1 flex justify-center items-center px-4">
          <div className="left-outer1  shadow-md rounded-lg p-2 w-full max-w-3xl">
            <div className="left-outer2  shadow-md rounded-lg p-8 w-full max-w-3xl">
              <h1 className="text-3xl font-semibold mb-8 text-center">
                Form Designer
              </h1>
              <div className="input-group mb-3">
                <label
                  className="input-group-text"
                  htmlFor="inputGroupSelect01"
                >
                  Field Type
                </label>
                <select
                  className="form-select"
                  value={newFieldType}
                  onChange={(e) => setNewFieldType(e.target.value)}
                  id="inputGroupSelect01"
                >
                  <option value="text">Text</option>
                  <option value="image">Image</option>
                  <option value="file">File Upload</option>
                  <option value="radio">Radio Button</option>
                  <option value="checkbox">Checkbox</option>
                </select>
              </div>
              <div className="input-group mb-4">
                <span className="input-group-text">Question</span>
                <textarea
                  className="form-control"
                  id="question"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  aria-label="With textarea"
                  required
                ></textarea>
              </div>
              {(newFieldType === 'radio' || newFieldType === 'checkbox') && (
                <div className="input-group mb-4">
                  <span className="input-group-text">Options</span>
                  <textarea
                    className="form-control"
                    id="options"
                    value={additionalOptions}
                    onChange={handleAdditionalOptionsChange}
                    aria-label="With textarea"
                    required
                  ></textarea>
                </div>
              )}
              <div className="input-group mb-3">
                <label
                  className="input-group-text"
                  htmlFor="inputGroupSelect02"
                >
                  Applicable To:
                </label>
                <select
                  className="form-select"
                  value={newApplicableTo}
                  onChange={(e) => setNewApplicableTo(e.target.value)}
                  id="inputGroupSelect02"
                >
                  <option value="student">Student</option>
                  <option value="employee">Employee</option>
                  <option value="both">Both</option>
                </select>
              </div>
              <div className="d-grid gap-2 mb-7">
                <button
                  onClick={handleAddField}
                  className="btn btn-outline-success"
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
                  className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition-colors duration-300"
                >
                  Apply Changes
                </button>
                <ViewDesignedFormButton />{' '}
                {/* Render ViewDesignedFormButton component */}
              </div>
            </div>
          </div>
        </div>
        {showDesignedForm && (
          <div className="flex-1 flex justify-center px-4">
            <div className="right shadow-md rounded-lg p-8 w-full max-w-3xl">
              <DesignedForm fields={fields} className="mt-8" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FormDesigner
