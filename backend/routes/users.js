const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

const {
  registerUser,
  loginUser,
  getMe,
  getUserPredictions
} = require('../controllers/userController');

// Add this handler here:
const nodemailer = require('nodemailer');

router.post('/send-code', async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ success: false, error: 'Email is required' });

  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Verification Code',
    text: `Your verification code is ${verificationCode}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, verificationCode });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: 'your email id is wrong' });
  }
});

// other routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me',protect, getMe);
router.get('/predictions',protect, getUserPredictions);

module.exports = router;

