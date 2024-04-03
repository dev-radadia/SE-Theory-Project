import React from 'react'

const FieldComponent = ({ field, onDelete }) => {
  return (
    <div className="field-component bg-white shadow-md rounded-lg p-4 mb-4">
      <p className="mb-2">
        <strong className="text-indigo-600">Question:</strong> {field.question}
      </p>
      {field.type !== 'text' && (
        <p className="mb-2">
          <strong className="text-indigo-600">Options:</strong>{' '}
          {field.options.join(', ')}
        </p>
      )}
      <p className="mb-2">
        <strong className="text-indigo-600">Applicable To:</strong>{' '}
        {field.applicableTo}
      </p>
      <button
        onClick={() => onDelete(field.id)}
        className="bg-red-500 text-white rounded-md px-3 py-1 hover:bg-red-600"
      >
        Delete Field
      </button>
    </div>
  )
}

export default FieldComponent
