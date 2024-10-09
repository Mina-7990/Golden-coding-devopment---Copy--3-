import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './mylesson.css'; // ربط الـ CSS

const MyLessonList = () => {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));

                if (!userInfo || !userInfo.token) {
                    setError('User is not authenticated. Please login first.');
                    setLoading(false);
                    return;
                }

                const { data } = await axios.get('http://localhost:5000/api/auth/my-lesson', {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`, // تصحيح هنا
                    },
                });

                if (data && Array.isArray(data)) {
                    setLessons(data);
                } else {
                    setLessons([]);
                }

                setLoading(false);
            } catch (error) {
                setError(error.response?.data?.message || 'Failed to fetch lessons.');
                setLessons([]); // Resetting lessons state on error
                setLoading(false);
            }
        };

        fetchLessons();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const handleLessonClick = (lesson) => {
        if (lesson) {
            localStorage.setItem('selectedLesson', JSON.stringify(lesson)); // تخزين بيانات الدرس
            navigate('/lesson'); // التوجيه إلى صفحة Lesson
        }
    };

    return (
        <div className="my-lesson-list-page">
            <h1>My Lessons</h1>
            {lessons.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                    {lessons.map((lesson) => (
                        <div
                            key={lesson.lessonId?._id}
                            onClick={() => handleLessonClick(lesson.lessonId)}
                            className="lesson-box"
                        >
                            <h2 className="lesson-k-title">{lesson.lessonId?.title || 'No Title'}</h2>
                            <p className="lesson-k-description">{lesson.lessonId?.description || 'No Description'}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No lessons found.</p>
            )}
        </div>
    );
};

export default MyLessonList;
