const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routers/authRoutes');
const lessonRoutes = require('./routers/lessonRoutes');
const codeRoutes = require('./routers/codeRoutes');
const connectDB = require('./config/configDB');
const cron = require('node-cron');

dotenv.config();


// remove lessons
cron.schedule('0 0 * * *', async () => {
    try {
        const users = await User.find();

        users.forEach(async (user) => {
            const updatedLessons = user.lessons.filter((lesson) => {
                const expiryDate = new Date(lesson.expiryDate);
                const today = new Date();

                // احتفظ فقط بالدروس التي لم تنته بعد
                return expiryDate > today;
            });

            user.lessons = updatedLessons;
            await user.save();
        });

        console.log('Checked lessons and removed expired ones');
    } catch (error) {
        console.error('Error in cron job:', error);
    }
});



// إنشاء تطبيق Express
const app = express();
const cors = require('cors');
app.use(cors());
// تفعيل قراءة البيانات بصيغة JSON
app.use(express.json());

// توصيل بقاعدة البيانات

dotenv.config();
connectDB();

// استخدام الروابط المختلفة
app.use('/api/auth', authRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/codes', codeRoutes);

// تشغيل السيرفر على المنفذ المحدد
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
