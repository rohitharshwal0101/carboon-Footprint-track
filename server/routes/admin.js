import express from 'express';
import User from '../models/User.js';
import CarbonEntry from '../models/CarbonEntry.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/admin/users
// @desc    Get all users with filtering
// @access  Private/Admin
router.get('/users', protect, admin, async (req, res, next) => {
  try {
    const { 
      search, 
      country, 
      gender, 
      ageRange, 
      pointsRange,
      page = 1,
      limit = 10
    } = req.query;
    
    const queryFilters = {};
    
    // Apply filters
    if (search) {
      queryFilters.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }
    
    if (country) {
      queryFilters.country = country;
    }
    
    if (gender) {
      queryFilters.gender = gender;
    }
    
    if (ageRange) {
      const [min, max] = ageRange.split('-').map(Number);
      queryFilters.age = { $gte: min || 0, $lte: max || 100 };
    }
    
    if (pointsRange) {
      switch (pointsRange) {
        case 'high':
          queryFilters.totalPoints = { $gte: 300 };
          break;
        case 'medium':
          queryFilters.totalPoints = { $gte: 100, $lt: 300 };
          break;
        case 'low':
          queryFilters.totalPoints = { $gte: 0, $lt: 100 };
          break;
        case 'negative':
          queryFilters.totalPoints = { $lt: 0 };
          break;
      }
    }
    
    // Pagination
    const skip = (page - 1) * limit;
    
    // Get users with pagination
    const users = await User.find(queryFilters)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .select('-otp');
    
    // Get total count for pagination
    const total = await User.countDocuments(queryFilters);
    
    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/admin/dashboard
// @desc    Get dashboard statistics
// @access  Private/Admin
router.get('/dashboard', protect, admin, async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    
    const totalEntries = await CarbonEntry.countDocuments();
    
    const treesPlanted = await CarbonEntry.aggregate([
      {
        $match: { 
          activityId: 'tree-planting',
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$activityValue' }
        }
      }
    ]);
    
    const totalTreesPlanted = treesPlanted.length > 0 ? treesPlanted[0].total : 0;
    
    const stats = {
      totalUsers,
      totalEntries,
      treesPlanted: totalTreesPlanted,
    };
    
    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
});

export default router;