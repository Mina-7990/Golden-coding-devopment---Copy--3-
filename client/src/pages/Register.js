import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.css'

const Register = ({ setUserInfo }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState(''); // تغيير هنا
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const signUpHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/register', {
        email,
        password,
        username,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setUserInfo(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/');
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Something went wrong.');
    }
  };

  return (
    <div className='mo'>
    <form className="form" onSubmit={signUpHandler}>
      <p className="title">Register</p>
      <p className="message">Signup now and get full access to our app.</p>
      <label>
        <input
          required
          type="email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder=""
        />
        <span>Email</span>
      </label>
      <label>
        <input
          required
          type="text" // تغيير نوع الحقل إلى text
          className="input"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // استخدام الدالة الصحيحة هنا
          placeholder=""
        />
        <span>Username</span> {/* تعديل النص هنا */}
      </label>
      <label>
        <input
          required
          type="password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder=""
        />
        <span>Password</span>
      </label>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" className="submit">Submit</button>
      
    </form>
    </div>
  );
};

export default Register;
