import express from 'express';
import CarbonEntry from '../models/CarbonEntry.js';
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
    cb(null, `activity-${Date.now()}${path.extname(file.originalname)}`);
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

// Activity title mapping
const activityTitles = {
  'tree-planting': 'Tree Planting',
  'vehicle-usage': 'Vehicle Usage',
  'coal-burning': 'Coal Burning',
  'ac-usage': 'AC Usage',
  'renewable-energy': 'Renewable Energy'
};

// @route   POST /api/carbon-entries
// @desc    Add a new carbon entry
// @access  Private
router.post('/', protect, upload.single('photo'), async (req, res, next) => {
  try {
    const { activityId, activityType, activityValue, points } = req.body;
    
    // Create new entry
    const entry = new CarbonEntry({
      user: req.user.id,
      activityId,
      activityType,
      title: activityTitles[activityId] || 'Custom Activity',
      activityValue: Number(activityValue),
      points: Number(points),
      photoUrl: req.file ? `/uploads/${req.file.filename}` : null,
    });
    
    await entry.save();
    
    // Update user's total points
    await User.findByIdAndUpdate(
      req.user.id,
      { $inc: { totalPoints: Number(points) } }
    );
    
    res.status(201).json({
      success: true,
      message: 'Carbon entry added successfully',
      data: entry,
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/carbon-entries/user
// @desc    Get current user's carbon entries
// @access  Private
router.get('/user', protect, async (req, res, next) => {
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
    
    const entries = await CarbonEntry.find({
      user: req.user.id,
      ...dateFilter,
    }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: entries.length,
      data: entries,
    });
  } catch (error) {
    next(error);
  }
});

export default router;