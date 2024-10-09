const User = require('../model/userModel');
const generateToken = require('../utils/generateToken');
// تسجيل مستخدم جديد
exports.register = async (req, res) => {
    const { username, email, password } = req.body; // Include email in registration
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const user = new User({ username, email, password });
        await user.save();

        // إنشاء التوكن بعد التسجيل
        const token = generateToken(user._id, user.isAdmin);

        res.status(201).json({
            message: 'User registered successfully',
            token: token // إرسال التوكن في الرد
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Failed to register user' });
    }
};

// تسجيل الدخول للمستخدم
exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // البحث عن المستخدم من خلال البريد الإلكتروني
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // مقارنة كلمة المرور
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // إنشاء التوكن
        const token = generateToken(user._id, user.isAdmin);

        // إرسال الرسالة مع التوكن
        res.status(200).json({
            message: 'Login successful',
            token: token, // إرسال التوكن
            isAdmin: user.isAdmin // إرسال حالة الـ Admin
        });
    } catch (error) {
        next(error);
    }
};

// استرجاع قائمة الدروس الخاصة بالمستخدم
exports.getUserLessons = async (req, res) => {
    try {
        const userId = req.user.id;

        // استرجاع المستخدم
        const user = await User.findById(userId).populate('lessons.lessonId');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // إرسال قائمة الدروس
        res.status(200).json(user.lessons);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve user lessons' });
    }
};

// استرجاع بيانات البروفايل الخاصة بالمستخدم
exports.getProfile = async (req, res) => {
    try {
        // استدعاء الـ userId من الـ request بعد فك الـ token
        const userId = req.user.id;

        // البحث عن المستخدم بواسطة الـ ID
        const user = await User.findById(userId).select('-password'); // استبعاد كلمة السر من النتيجة

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // إرسال معلومات المستخدم
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user profile' });
    }
};


