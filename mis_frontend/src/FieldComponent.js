import React from 'react'
import ViewDesignedFormButton from './ViewDesignedFormButton'

const FieldComponent = ({ field, onDelete }) => {
  return (
    <div className="field-component shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center">
        <div>
          <p className="mb-2">
            <strong className="text-indigo-600">Question:</strong>{' '}
            {field.question}
          </p>
          {field.type != 'date' && field.type !== 'text' && (
            <p className="mb-2">
              <strong className="text-indigo-600">Options:</strong>{' '}
              {field.options.join(', ')}
            </p>
          )}
          <p className="mb-2">
            <strong className="text-indigo-600">Applicable To:</strong>{' '}
            {field.applicable_to}
          </p>
        </div>
        <div>
          <button
            onClick={() => onDelete(field.id)}
            className="bg-red-500 text-white rounded-md px-3 py-1 hover:bg-red-600"
          >
            Delete Field
          </button>
        </div>
      </div>
    </div>
  )
}

export default FieldComponent
