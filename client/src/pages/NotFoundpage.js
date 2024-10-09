import React from 'react';
import notFoundImage from '../imges/404-landing-page-free-vector.jpg'; // تأكد من المسار الصحيح للصورة

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <img 
        src={notFoundImage} 
        alt="Page Not Found" 
        style={{ width: '600px', height: 'auto', marginBottom: '20px' }}
      />
      <h3 className='sdl'>404 - Page Not Found</h3>
      <p>Sorry, the page you are looking for does not exist.</p>
      <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>Go back to Home</a>
    </div>
  );
};

export default NotFoundPage;

