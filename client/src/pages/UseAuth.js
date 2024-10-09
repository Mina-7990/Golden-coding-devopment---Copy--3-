import React, { createContext, useContext, useState } from 'react';

// إنشاء السياق
const AuthContext = createContext();

// مكون موفر (Provider) للمصادقة
export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null); // حالة المستخدم

    const login = (user) => {
        setUserInfo(user); // تعيين معلومات المستخدم عند تسجيل الدخول
    };

    const logout = () => {
        setUserInfo(null); // تعيين حالة المستخدم كـ null عند تسجيل الخروج
    };

    return (
        <AuthContext.Provider value={{ userInfo, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// استخدام السياق في المكونات
export const useAuth = () => {
    return useContext(AuthContext);
};