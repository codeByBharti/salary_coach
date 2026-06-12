const mongoose = require('mongoose');

const salaryBenchmarkSchema = new mongoose.Schema({
  role: { type: String, required: true },
  city: { type: String, required: true },
  experienceRange: { 
    type: String,
    enum: ['0-1', '1-3', '3-5', '5-8', '8+']
  },
  averageSalary: { type: Number },
  minSalary: { type: Number },
  maxSalary: { type: Number },
  totalSearches: { type: Number, default: 1 },
  lastUpdated: { type: Date, default: Date.now }
});

salaryBenchmarkSchema.index({ role: 1, city: 1, experienceRange: 1 }, { unique: true });

module.exports = mongoose.model('SalaryBenchmark', salaryBenchmarkSchema);
