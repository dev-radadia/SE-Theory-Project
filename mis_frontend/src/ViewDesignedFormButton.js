import React from 'react';
import { useNavigate } from 'react-router-dom';

const ViewDesignedFormButton = () => {
  const navigate = useNavigate();

  const handleViewDesignedForm = () => {
    console.log('View designed form');
    navigate('/view-designed-form');
  };

  return <button onClick={handleViewDesignedForm}>View Designed Form</button>;
};

export default ViewDesignedFormButton;
