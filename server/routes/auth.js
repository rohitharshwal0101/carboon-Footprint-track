import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'server/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `user-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      return cb(new Error('Only image files are allowed!'));
    }
  }
});

// @route   POST /api/auth/register
// @desc    Register a user
// @access  Public
router.post('/register', upload.single('profileImage'), async (req, res, next) => {
  try {
    const { name, email, mobile, country, bio } = req.body;
    
    // Check if user already exists by email or mobile
    const existingUser = await User.findOne({ 
      $or: [{ email }, { mobile }]
    });
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or mobile already exists',
      });
    }
    
    // Create new user
    const user = new User({
      name,
      email,
      mobile,
      country,
      bio,
      profileImage: req.file ? `/uploads/${req.file.filename}` : null,
    });
    
    // Generate OTP and save user
    const otp = user.generateOTP();
    await user.save();
    
    // In a real app, we would send OTP via Twilio SMS
    console.log(`OTP for ${mobile}: ${otp}`);
    
    // Generate token
    const token = user.getSignedJwtToken();
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        country: user.country,
        bio: user.bio,
        profileImage: user.profileImage,
        isAdmin: user.isAdmin,
        totalPoints: user.totalPoints,
      },
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/auth/login
// @desc    Login user / request OTP
// @access  Public
router.post('/login', async (req, res, next) => {
  try {
    const { mobile } = req.body;
    
    // Check if user exists
    const user = await User.findOne({ mobile });
    
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found, please register',
      });
    }
    
    // Generate OTP
    const otp = user.generateOTP();
    await user.save();
    
    // In a real app, we would send OTP via Twilio SMS
    console.log(`OTP for ${mobile}: ${otp}`);
    
    res.status(200).json({
      success: true,
      message: 'OTP sent to your mobile number',
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/auth/verify
// @desc    Verify OTP and login
// @access  Public
router.post('/verify', async (req, res, next) => {
  try {
    const { mobile, otp } = req.body;
    
    // Check if user exists
    const user = await User.findOne({ mobile });
    
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
      });
    }
    
    // Verify OTP
    if (!user.verifyOTP(otp)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP',
      });
    }
    
    // Clear OTP after successful verification
    user.otp = undefined;
    await user.save();
    
    // Generate token
    const token = user.getSignedJwtToken();
    
    res.status(200).json({
      success: true,
      message: 'OTP verified successfully',
      token,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        country: user.country,
        bio: user.bio,
        profileImage: user.profileImage,
        isAdmin: user.isAdmin,
        totalPoints: user.totalPoints,
      },
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/auth/me
// @desc    Get current logged in user
// @access  Private
router.get('/me', protect, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        country: user.country,
        bio: user.bio,
        profileImage: user.profileImage,
        isAdmin: user.isAdmin,
        totalPoints: user.totalPoints,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;