const mongoose = require('mongoose');

// إنشاء سكيمة (Schema) خاصة بالدرس
const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // العنوان مطلوب
  },
  description: {
    type: String,
    required: true, // الوصف مطلوب
  },
  videoLink: {
    type: String,
    required: true, // رابط الفيديو مطلوب
  },
  cover:{type: String,
    required: true, },
  createdAt: {
    type: Date,
    default: Date.now, // تاريخ الإنشاء، يتم تحديده تلقائيًا عند الإضافة
  },
});

// إنشاء الموديل بناءً على السكيمة
const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;