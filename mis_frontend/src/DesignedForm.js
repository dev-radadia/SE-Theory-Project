import React from 'react'

const DesignedForm = ({ fields }) => {
  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Designed Form</h1>
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
            {field.type !== 'text' &&
              field.options.map((option) => (
                <div key={option} className="flex items-center">
                  <label htmlFor={option} className="font-medium text-gray-700">
                    {option}
                  </label>
                </div>
              ))}
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
