// src/pages/AdminPage/AdminDashboardPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../Adminpages/cssadmins/admindash.css'; // ربط ملف CSS

const AdminDashboardPage = () => {
  return (
    <div className="admin-dashboard-container">
      <h1 className="admin-dashboard-title">Admin Dashboard</h1>
      <div className="button-container">
        <Link to="/admin/add-code" className="button">
          Add Code
        </Link>
        <Link to="/admin/add-lesson" className="button">
          Add Lesson
        </Link>
        <Link to="/admin/see-all-lesson" className="button">
          See All Lessons
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboardPage;