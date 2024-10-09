import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// تحقق من حالة تسجيل الدخول وتوجيه المستخدم
const AuthControl = ({ component: Component, ...rest }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default AuthControl;