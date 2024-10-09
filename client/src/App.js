import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import Register from './pages/Register';
import AdminPage from './pages/Adminpages/AdminPage';
import NotFoundPage from './pages/NotFoundpage';  // تأكد من أنك قمت باستيراد صفحة NotFound
import LessonList from './pages/LessonList';
import MyLessonList from './pages/MyLessonList';
import CheckCode from './pages/CheckCode';
import Lesson from './pages/Lesson';
import AboutUs from './pages/Aboutus';

const App = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const userInfoFromStorage = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfoFromStorage) {
      setUserInfo(userInfoFromStorage);
    }
  }, []);

  const logoutHandler = () => {
    setUserInfo(null);
    localStorage.removeItem('userInfo');
  };

  return (
    <Router>
      <Header userInfo={userInfo} logoutHandler={logoutHandler} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/login" 
            element={userInfo ? <Navigate to="/" /> : <LoginPage setUserInfo={setUserInfo} />} 
          />
          <Route 
            path="/register" 
            element={userInfo ? <Navigate to="/" /> : <Register setUserInfo={setUserInfo} />} 
          />
          {userInfo?.isAdmin && (
            <Route path="/admin/*" element={<AdminPage />} />
          )}
          <Route path="/about" element={<AboutUs />} />   
          <Route path="/lessons-list" element={<LessonList />} />
          <Route path="/my-lessons" element={<MyLessonList />} />
          <Route path="/check-code/:lessonId" element={<CheckCode />} />
          <Route path="/lesson" element={<Lesson />} /> {/* بدون الـ ID */}
          
          {/* Redirect to NotFoundPage for non-existing routes */}
          <Route path="*" element={<Navigate to="/NotFoundPage" />} />
          
          {/* مسار صريح لصفحة NotFoundPage */}
          <Route path="/NotFoundPage" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
