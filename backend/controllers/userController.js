const nodemailer = require('nodemailer');
const User = require('../models/User');
const Prediction = require('../models/Prediction');


// @desc    Register user
// @route   POST /api/users/register
// @access  Public

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password} = req.body;

    const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&]).{8,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: 'Enter valid Gmail' });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        error: 'Password must contain uppercase, lowercase, number, and special char'
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'Email already registered' });
    }

    const user = await User.create({ name, email, password });
    sendTokenResponse(user, 201, res);

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};


// @desc    Login user
// @route   POST /api/users/login
// @access  Public
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide an email and password'
      });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid Email'
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid Password'
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/users/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'predictions',
      options: { sort: { createdAt: -1 } }
    });

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.log("pp",error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get user's prediction history
// @route   GET /api/users/predictions
// @access  Private
exports.getUserPredictions = async (req, res) => {
  try {
    // console.log(req); 
    const predictions = await Prediction.find({ user: req.user._id.toString() })
      .sort({ createdAt: -1 });
    console.log(predictions);
    
    res.status(200).json({
      success: true,
      count: predictions.length,
      data: predictions
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Helper function to get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    success: true,
    token,
    user
  });
};