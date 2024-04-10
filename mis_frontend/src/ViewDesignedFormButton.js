// ViewDesignedFormButton.js
import React from 'react'
import { Link } from 'react-router-dom' // Import Link from react-router-dom


const ViewDesignedFormButton = () => {
  return (
    <Link
      to="/view-designed-form"
      className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition-colors duration-300"
    >
      View Designed Form
    </Link>
  )
}

export default ViewDesignedFormButton
