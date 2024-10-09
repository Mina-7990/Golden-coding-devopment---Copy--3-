import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player'; // استيراد React Player
import './Lesson.css'; // استيراد ملف CSS

const Lesson = () => {
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const storedLesson = JSON.parse(localStorage.getItem('selectedLesson'));

        if (storedLesson) {
            setLesson(storedLesson);
        } else {
            setError('No lesson data found.');
        }
        setLoading(false); // تأكد من وضعه بعد معالجة البيانات
    }, []);

    if (loading) return <p className="lesson-loading">Loading...</p>;
    if (error) return <p className="lesson-error">{error}</p>;

    return (
        <div className="lesson-container">
            <h1 className="lesson-title">{lesson?.title || 'Untitled Lesson'}</h1>
            <p className="lesson-description">{lesson?.description || 'No description available.'}</p>
            {lesson?.videoLink ? (
                <div className="video-container">
                    <ReactPlayer
                        url={lesson.videoLink}
                        width="100%"
                        height="500px"
                        controls={true} // إضافة عناصر التحكم
                    />
                </div>
            ) : (
                <p className="lesson-no-video">No video available for this lesson.</p>
            )}
        </div>
    );
};

export default Lesson;
