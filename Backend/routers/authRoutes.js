const express = require('express');
const { register, login,getUserLessons,getProfile,checkAccess  } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/my-lesson', protect, getUserLessons);

// الحصول على بيانات المستخدم الشخصية (البروفايل)
router.get('/profile', protect,getProfile );


module.exports = router;