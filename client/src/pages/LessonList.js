import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './lessl.css';

const LessonsList = () => {
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchLessons = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const token = userInfo?.token;

      if (!token) {
        setError('User is not authenticated. Please login first.');
        setLoading(false);
        return;
      }

      const { data } = await axios.get(
        'http://localhost:5000/api/lessons/lessons',
        {
          headers: {
            Authorization: `Bearer ${token}`, // Fixed: Wrapped in backticks
          },
        }
      );

      setLessons(data);
    } catch (error) {
      console.error('Error fetching lessons:', error);
      setError('Failed to fetch lessons.');
    } finally {
      setLoading(false); // Moved to finally to ensure it runs even if there's an error
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  return (
    <div className="lessons-list-container">
      <h2 className="lessons-l-title">Available Lessons</h2>
      {loading && <p>Loading lessons...</p>}
      {error && <p className="error-l-message">{error}</p>}
      {message && <p className="success-l-message">{message}</p>}

      <ul className="lessons-l-list">
        {lessons.map((lesson) => (
          <li key={lesson._id} className="lesson-l-item">
            <Link to={`/check-code/${lesson._id}`} className="lesson-l-link"> {/* Fixed: Wrapped in backticks */}
              <div className="lesson-l-box">
                <h3 className="lesson-l-title">{lesson.title}</h3>
                <p className="lesson-l-description">{lesson.description}</p>
                {lesson.cover && ( // Check if there is a cover
                  <div className="lesson-cover-l-container">
                    <img 
                      src={lesson.cover} // Using the URL for the cover image
                      alt={lesson.title} 
                      className="lesson-cover-image" 
                    />
                  </div>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LessonsList;
