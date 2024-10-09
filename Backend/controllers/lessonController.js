const Lesson = require('../model/lessonModel');
const User = require('../model/userModel');
const Code = require('../model/codeModel');
const mongoose = require('mongoose'); // استيراد mongoose

// إضافة درس
exports.addLesson = async (req, res) => {
    const { title, description, videoLink,cover } = req.body;
    try {
        const lesson = new Lesson({ title, description, videoLink ,cover});
        await lesson.save();
        res.status(201).json({ message: 'Lesson added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add lesson' });
    }
};

// حذف درس
exports.deleteLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id);
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }
        await lesson.remove();
        res.status(200).json({ message: 'Lesson deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete lesson' });
    }
};

// عرض الدروس
exports.getLessons = async (req, res) => {
    try {
        const lessons = await Lesson.find({});
        res.status(200).json(lessons);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve lessons' });
    }
};




exports.checkCodeAndUnlockLesson = async (req, res) => {
    const { code, lessonId } = req.body; // الحصول على lessonId من الطلب
    const userId = req.user.id;

    try {
        // التحقق من أن الكود و lessonId تم إرسالهما في الطلب
        if (!code || !lessonId) {
            return res.status(400).json({ message: 'الكود و معرف الدرس مطلوبان' });
        }

        // تحقق من وجود الكود في قاعدة البيانات
        const existingCode = await Code.findOne({ code });
        if (!existingCode) {
            return res.status(404).json({ message: 'الكود غير موجود في قاعدة البيانات' });
        }

        // تحقق من وجود المستخدم
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'المستخدم غير موجود' });
        }

        // تحقق إذا كان المستخدم قد فتح الدرس مسبقاً
        const lessonAlreadyUnlocked = user.lessons.some(
            (lesson) => lesson.lessonId.toString() === lessonId.toString()
        );
        if (lessonAlreadyUnlocked) {
            return res.status(400).json({ message: 'الدرس تم فتحه بالفعل' });
        }

        // محاولة حذف الكود من قاعدة البيانات
        const deleteResult = await Code.deleteOne({ code });
        if (deleteResult.deletedCount === 0) {
            return res.status(500).json({ message: 'فشل في إزالة الكود' });
        }

        // إضافة الدرس إلى المستخدم فقط إذا تم حذف الكود بنجاح
        const currentDate = new Date();
        const expirationDate = new Date(currentDate);
        expirationDate.setDate(expirationDate.getDate() + 7); // إضافة 7 أيام

        user.lessons.push({
            lessonId: lessonId, // استخدم الـ lessonId المدخل بدلاً من أي ID عشوائي
            usageDate: currentDate,
            timeExpired: expirationDate, // حقل جديد لتاريخ الانتهاء
        });

        await user.save();

        res.status(200).json({ message: 'تم فتح الدرس بنجاح' });
    } catch (error) {
        console.error('Error unlocking lesson:', error);
        res.status(500).json({ message: 'فشل في فتح الدرس', error: error.message });
    }
};



exports.getLessonById = async (req, res) => {
    const { id } = req.params;
    const cleanedId = id.trim(); // إزالة المحارف الزائدة

    // التحقق من صحة الـID
    if (!mongoose.Types.ObjectId.isValid(cleanedId)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    try {
        const lesson = await Lesson.findById(cleanedId);
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }
        res.status(200).json(lesson); // إرسال معلومات الدرس
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};