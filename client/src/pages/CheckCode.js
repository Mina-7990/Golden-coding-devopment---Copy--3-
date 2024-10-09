import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './check.css'; // ربط الـ CSS

const CheckCode = () => {
  const { lessonId } = useParams();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
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
        'http://localhost:5000/api/lessons/check-code',
        { code, lessonId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // تصحيح هنا
          },
        }
      );
      setLoading(false);
      navigate(`/lesson/${lessonId}`); // تصحيح هنا
    } catch (err) {
      setLoading(false);
      setError(`Failed to validate code: ${err.response?.data?.message || err.message}`); // تصحيح هنا
    }
  };

  return (
    <div className="check-code-page">
      <div className="check-code-container">
        <h1 className="check-code-title">Enter Your Code</h1>
        <form className="check-code-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={code}
            onChange={handleInputChange}
            placeholder="Enter code"
            required
            className="check-code-input"
          />
          <button
            type="submit"
            disabled={loading}
            className="check-code-button"
          >
            Submit
          </button>
        </form>
        {loading && <p className="loading-message">Loading...</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default CheckCode;
