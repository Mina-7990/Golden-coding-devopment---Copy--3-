import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Courses = () => {
  const [lessons, setLessons] = useState([]); // تخزين الدروس
  const [loading, setLoading] = useState(true); // حالة التحميل
  const [error, setError] = useState(null); // حالة الخطأ
  const location = useLocation();

  // جلب التوكن من الـ localStorage
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const token = userInfo?.token ; // استخدام التوكن من localStorage أو location

  // جلب الدروس من الـ API
  const fetchLessons = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:5000/api/lessons/lessons',
        {
          headers: {
            Authorization: `Bearer ${token}`, // استخدام backticks لتمرير التوكن بشكل صحيح
          },
        }
      );
      setLessons(data); // تخزين الدروس في الـ state
      setLoading(false); // إيقاف التحميل بعد الجلب
    } catch (err) {
      setError('Failed to fetch lessons.'); // تعيين رسالة الخطأ
      setLoading(false); // إيقاف التحميل
    }
  };

  useEffect(() => {
    if (token) {
      fetchLessons(); // جلب الدروس إذا كان التوكن موجودًا
    } else {
      setError('User is not authenticated. Please log in first.');
      setLoading(false);
    }
  }, [token]); // تتبع التغييرات في التوكن

  // استخراج الفئات (categories) الفريدة من الدروس
  const categories = [...new Set(lessons.map((lesson) => lesson.category))];

  // إظهار رسالة التحميل
  if (loading) return <p>Loading...</p>;

  // إظهار رسالة الخطأ
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <Link to={`/category/${category}/lessons`}> {/* استخدام backticks لتمرير الكاتيجوري في الـ URL */}
              {category} {/* عرض اسم الكاتيجوري */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
