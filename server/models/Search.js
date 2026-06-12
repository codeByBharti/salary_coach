const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  role: { type: String, required: true, trim: true },
  skills: [{ type: String, trim: true }],
  experience: { type: Number, min: 0, max: 40 },
  city: { type: String, trim: true },
  companyType: { 
    type: String, 
    enum: ['startup', 'mnc', 'govt', 'unicorn', 'other'] 
  },
  currentSalary: { type: Number, default: 0 },
  education: { type: String },
  suggestedRange: {
    low: Number,
    mid: Number,
    high: Number
  },
  confidence: { 
    type: String, 
    enum: ['Strong', 'Medium', 'Weak'] 
  },
  negotiationScript: {
    firstLine: String,
    counterOffer: String,
    finalAccept: String,
    emailTemplate: String
  },
  beyondSalary: [String],
  marketInsight: String,
  salaryBreakdown: {
    monthly: Number,
    inHand: Number,
    ctcVsInHand: String
  },
  interviewTips: [String],
  createdAt: { type: Date, default: Date.now }
});

searchSchema.index({ userId: 1, role: 1, city: 1, createdAt: -1 });

module.exports = mongoose.model('Search', searchSchema);
