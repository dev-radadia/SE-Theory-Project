import React from 'react'
import './DesignedForm.css'

const DesignedForm = ({ fields }) => {
  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-md">
      <h1 className="head text-2xl font-semibold mb-4">Designed Form</h1>
      <form className="space-y-4">
        {fields.map((field) => (
          <div key={field.id}>
            <label
              className="block font-medium text-gray-700"
              htmlFor={field.id}
            >
              {field.question}
            </label>
            {field.type === 'text' && (
              <input
                type="text"
                id={field.id}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            )}
            {field.type === 'image' && (
              <input
                type="file"
                id={field.id}
                accept="image/*"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            )}
            {field.type === 'file' && (
              <input
                type="file"
                id={field.id}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            )}
            {field.type === 'radio' && (
              <div>
                {field.options.map((option) => (
                  <div key={option} className="form-check">
                    <input
                      type="radio"
                      id={`option-${option}`}
                      name={`field-${field.id}`}
                      value={option}
                      className="form-check-input"
                    />
                    <label
                      htmlFor={`option-${option}`}
                      className="form-check-label"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            )}
            {field.type === 'checkbox' && (
              <div>
                {field.options.map((option) => (
                  <div key={option} className="form-check">
                    <input
                      type="checkbox"
                      id={`option-${option}`}
                      name={`field-${field.id}`}
                      value={option}
                      className="form-check-input"
                    />
                    <label
                      htmlFor={`option-${option}`}
                      className="form-check-label"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            )}
            {field.type === 'date' && (
              <input
                type="date"
                id={field.id}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-indigo-500 text-white rounded-md px-4 py-2 hover:bg-indigo-600"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default DesignedForm
