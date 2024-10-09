const Code = require('../model/codeModel');

// إضافة كود جديد
exports.addCode = async (req, res) => {
    const { code } = req.body;

    // التحقق من وجود الكود في الطلب
    if (!code) {
        return res.status(400).json({ message: 'Code is required' });
    }

    try {
        // التحقق إذا كان الكود موجود مسبقاً
        const existingCode = await Code.findOne({ code });
        if (existingCode) {
            return res.status(400).json({ message: 'Code already exists' });
        }

        const newCode = new Code({ code });

        await newCode.save();
        res.status(201).json({ message: 'Code added successfully' });
    } catch (error) {
        console.error('Error adding code:', error); // سجل الأخطاء لمزيد من التحليل
        res.status(500).json({ message: 'Failed to add code', error: error.message });
    }
};