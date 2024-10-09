import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Adminpages/cssadmins/addl.css'; // Import the custom CSS file for this page

const AddLessonPage = ({ setUserInfo }) => {
  const [title, setLessonTitle] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [description, setDescription] = useState('');
  const [cover, setCover] = useState(''); // Corrected the name to cover

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setLessonTitle(event.target.value);
  };

  const handleUrlChange = (event) => {
    setVideoLink(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCoverChange = (event) => {
    setCover(event.target.value);
  };

 

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo?.token;

    if (!token) {
      setError('User is not authenticated. Please login first.');
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/lessons/add',
        {
          title,
          videoLink,
          description,
          cover, // Corrected the variable usage to cover
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Correct token usage
          },
        }
      );

      setSuccess('Lesson added successfully!');
      setLessonTitle('');
      setVideoLink('');
      setDescription('');
      setCover(''); // Reset cover field
      
      setUserInfo(data);
      navigate('/lessons');
    } catch (err) {
      setError('Error adding lesson. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-lesson-container">
      <h3 className="add-lesson-title">Add Lesson</h3>
      {error && <p className="add-lesson-error">{error}</p>}
      {success && <p className="add-lesson-success">{success}</p>}
      <form onSubmit={handleSubmit} className="add-lesson-form">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter lesson title"
          required
          className="add-lesson-input"
        />
        <input
          type="text"
          value={videoLink}
          onChange={handleUrlChange}
          placeholder="Enter lesson URL"
          required
          className="add-lesson-input"
        />
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Enter description"
          required
          className="add-lesson-input"
        />
        <input
          type="text"
          value={cover} // Corrected variable to cover
          onChange={handleCoverChange}
          placeholder="Enter cover"
          required
          className="add-lesson-input"
        />
        
        <button type="submit" className="add-lesson-button" disabled={loading}>
          {loading ? 'Adding Lesson...' : 'Add Lesson'}
        </button>
      </form>
    </div>
  );
};

export default AddLessonPage;
