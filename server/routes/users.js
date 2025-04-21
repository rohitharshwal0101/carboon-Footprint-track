import express from 'express';
import User from '../models/User.js';
import CarbonEntry from '../models/CarbonEntry.js';
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

// @route   GET /api/users/me
// @desc    Get current user profile
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

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, upload.single('profileImage'), async (req, res, next) => {
  try {
    const { name, email, country, bio } = req.body;
    
    const updateData = {
      name,
      email,
      country,
      bio,
    };
    
    if (req.file) {
      updateData.profileImage = `/uploads/${req.file.filename}`;
    }
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
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

// @route   GET /api/users/top-contributors
// @desc    Get top contributors based on points
// @access  Public
router.get('/top-contributors', async (req, res, next) => {
  try {
    const { timeFrame } = req.query;
    
    // Calculate date range based on timeFrame
    let dateFilter = {};
    const now = new Date();
    
    if (timeFrame === 'day') {
      const startOfDay = new Date(now.setHours(0, 0, 0, 0));
      dateFilter = { createdAt: { $gte: startOfDay } };
    } else if (timeFrame === 'week') {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0, 0, 0, 0);
      dateFilter = { createdAt: { $gte: startOfWeek } };
    } else if (timeFrame === 'month') {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      dateFilter = { createdAt: { $gte: startOfMonth } };
    } else if (timeFrame === 'year') {
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      dateFilter = { createdAt: { $gte: startOfYear } };
    }
    
    // Get top contributors
    const users = await User.find({ totalPoints: { $gt: 0 } })
      .sort({ totalPoints: -1 })
      .limit(10)
      .select('name country profileImage totalPoints');
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
});

export default router;