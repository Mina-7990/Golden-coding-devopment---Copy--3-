import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AdminDashboardPage from './AdminDashboard'; // تأكد من صحة اسم الملف ومساره
import AddCodePage from './AddCode'; // تأكد من صحة اسم الملف ومساره
import AddLessonPage from './AddLesson'; // تأكد من صحة اسم الملف ومساره
import AdminLessonsPage from './Seealllessons'; 
const AdminPage = () => {
  return (
    <div>
      <Routes>
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="add-code" element={<AddCodePage />} />
        <Route path="add-lesson" element={<AddLessonPage />} />
        <Route path="see-all-lesson" element={< AdminLessonsPage />} />
        <Route path="/" element={<Navigate to="dashboard" />} />
      </Routes>
    </div>
  );
};

export default AdminPage;

