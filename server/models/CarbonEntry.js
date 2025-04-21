import mongoose from 'mongoose';

const CarbonEntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  activityId: {
    type: String,
    required: true,
  },
  activityType: {
    type: String,
    enum: ['carbon-producing', 'carbon-reducing'],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  activityValue: {
    type: Number,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  photoUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('CarbonEntry', CarbonEntrySchema);