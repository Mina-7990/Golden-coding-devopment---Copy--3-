import { useState } from 'react';
import axios from 'axios';
import '../Adminpages/cssadmins/addc.css'; // إضافة ملف CSS

const AddCodes = ({ onCodesAdded }) => {
  const [code, setCode] = useState(''); // حالة لإدخال الأكواد
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddCodes = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo?.token;

    if (!token) {
      setError('User is not authenticated. Please login first.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/codes/add', // نقطة النهاية لإضافة الأكواد
        { code },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // التصحيح هنا
          },
        }
      );

      setMessage(response.data.message || 'Code added successfully!');
      setCode(''); // إعادة تعيين حقل الإدخال بعد الإضافة

      if (onCodesAdded) {
        onCodesAdded();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding the code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-codes-container">
      <h3 className="add-codes-title">Add Code</h3>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter code"
        required
        className="input-field"
      />
      <button
        onClick={handleAddCodes}
        disabled={loading || !code.trim()}
        className="submit-button"
      >
        {loading ? 'Adding...' : 'Add Code'}
      </button>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      <br/>
    </div>
  );
};

export default AddCodes;
