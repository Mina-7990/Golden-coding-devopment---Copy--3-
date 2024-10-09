import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Adminpages/cssadmins/seel.css'
const AdminLessonsPage = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')).token;
      const response = await axios.get('http://localhost:5000/api/lessons/lessons', {
        headers: { Authorization: `Bearer ${token}` }, // تصحيح التوكين هنا
      });
      setLessons(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching lessons');
      console.error(err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')).token;
      await axios.delete(`http://localhost:5000/api/lessons/${id}`, { // تصحيح الرابط هنا
        headers: { Authorization: `Bearer ${token}` }, // تصحيح التوكين هنا أيضًا
      });
      fetchLessons(); // تحديث القائمة بعد الحذف
    } catch (err) {
      setError('Error deleting lesson');
      console.error(err);
    }
  };

  return (
    <div className="admin-lessons-page">
      <h1 className="admin-lessons-title">صفحة إدارة الحصص</h1>
      {loading && <p>جاري التحميل...</p>}
      {error && <p className="admin-error-message">{error}</p>}
      <ul className="admin-lessons-list">
        {lessons.map((lesson) => (
          <li key={lesson._id} className="admin-lesson-item">
            <div className="admin-lesson-box">
              <div className="admin-lesson-title-box">
                <h3 className="admin-lesson-title">{lesson.title}</h3>
              </div>
              <div className="admin-lesson-description-box">
                <p className="admin-lesson-description">{lesson.description}</p>
              </div>
              <div className="admin-lesson-url-box">
                <p className="admin-lesson-url">رابط الفيديو: {lesson.videoUrl}</p>
              </div>
            </div>
            <div className="admin-lesson-actions">
              <button onClick={() => handleDelete(lesson._id)} className="admin-delete-button">حذف</button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/add-lesson')} className="admin-add-lesson-button">إضافة درس جديد</button>
    </div>
  );
};

export default AdminLessonsPage;
