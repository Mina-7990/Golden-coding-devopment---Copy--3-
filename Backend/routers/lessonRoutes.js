const express = require('express');
const {
    addLesson,
    deleteLesson,
    getLessons,
    checkCodeAndUnlockLesson,
    getLessonById,
    
} = require('../controllers/lessonController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', protect, admin, addLesson);
router.delete('/:id', protect, admin, deleteLesson);
router.get('/lessons', protect, getLessons);
router.post('/check-code',protect, checkCodeAndUnlockLesson);
router.get('/:id',protect, getLessonById); // روت لاسترجاع الدرس بالـID


module.exports = router;