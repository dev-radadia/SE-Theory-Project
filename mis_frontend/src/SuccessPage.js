import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const SuccessPage = () => {
  const [showKeyPrompt, setShowKeyPrompt] = useState(false)
  const [enteredKey, setEnteredKey] = useState('')
  const expectedKey = '12345' // Define the expected key

  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault() // Prevent default back navigation
      event.stopPropagation() // Stop the event from propagating further
    }

    window.history.pushState(null, null, window.location.pathname) // Replace current history entry
    window.addEventListener('popstate', handleBackButton) // Listen for back button presses

    return () => {
      window.removeEventListener('popstate', handleBackButton) // Clean up event listener
    }
  }, []) // Run only on component mount

  const handleAdminAccessClick = () => {
    setShowKeyPrompt(true) // Show the key prompt when Admin Access button is clicked
  }

  const handleKeySubmit = () => {
    if (enteredKey === expectedKey) {
      window.location.href = '/' // Redirect to the home page if key matches
    } else {
      alert('Incorrect key! Please try again.') // Show alert for incorrect key
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h2 style={styles.heading}>Data submitted successfully!</h2>
        <p style={styles.message}>Thank you for submitting the form.</p>
        {showKeyPrompt && (
          <div>
            <input
              type="text"
              placeholder="Enter key"
              value={enteredKey}
              onChange={(e) => setEnteredKey(e.target.value)}
            />
            <button onClick={handleKeySubmit} style={styles.keySubmitButton}>
              Submit Key
            </button>
          </div>
        )}
        {!showKeyPrompt && (
          <div>
            <Link to="/view-designed-form" style={styles.button}>
              Fill Another Form
            </Link>
            <button onClick={handleAdminAccessClick} style={styles.button}>
              Admin Access
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  content: {
    textAlign: 'center',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#800080', // Change color to fit your design
  },
  message: {
    fontSize: '18px',
    marginBottom: '20px',
    color: '#666', // Change color to fit your design
  },
  button: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#007bff', // Change color to fit your design
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    marginLeft: '10px', // Added margin to separate the buttons
  },
  keySubmitButton: {
    padding: '12px 24px', // Increased padding for the key submit button
    backgroundColor: '#28a745', // Green color for the key submit button
    color: '#fff',
    borderRadius: '5px',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
    marginLeft: '10px', // Added margin to separate the key submit button from the input
  },
}

export default SuccessPage
