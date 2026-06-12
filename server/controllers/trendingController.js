const SalaryBenchmark = require('../models/SalaryBenchmark');

exports.getTrending = async (req, res, next) => {
  try {
    const defaultTrending = [
      { role: 'Software Engineer', totalSearches: 1482, averageSalary: 12.5, topCity: 'Bangalore' },
      { role: 'Data Scientist', totalSearches: 1203, averageSalary: 14.0, topCity: 'Hyderabad' },
      { role: 'Product Manager', totalSearches: 987, averageSalary: 18.5, topCity: 'Bangalore' },
      { role: 'DevOps Engineer', totalSearches: 876, averageSalary: 13.0, topCity: 'Pune' },
      { role: 'React Developer', totalSearches: 754, averageSalary: 9.5, topCity: 'Mumbai' },
      { role: 'Full Stack Developer', totalSearches: 698, averageSalary: 11.0, topCity: 'Noida' },
      { role: 'UI/UX Designer', totalSearches: 543, averageSalary: 8.5, topCity: 'Pune' },
      { role: 'Business Analyst', totalSearches: 432, averageSalary: 10.0, topCity: 'Chennai' }
    ];

    let trending = await SalaryBenchmark.aggregate([
      {
        $group: {
          _id: "$role",
          totalSearches: { $sum: "$totalSearches" },
          averageSalary: { $avg: "$averageSalary" },
          citiesSet: { $push: "$city" }
        }
      },
      { $sort: { totalSearches: -1 } },
      { $limit: 8 },
      {
        $project: {
          _id: 0,
          role: "$_id",
          totalSearches: 1,
          averageSalary: 1,
          topCity: { $arrayElemAt: ["$citiesSet", 0] }
        }
      }
    ]);

    if (!trending || trending.length < 3) {
      // Merge real data with defaults
      const realRoles = trending.map(t => t.role.toLowerCase());
      const filteredDefaults = defaultTrending.filter(d => !realRoles.includes(d.role.toLowerCase()));
      trending = [...trending, ...filteredDefaults].slice(0, 8);
    }

    res.json({ success: true, data: trending });
  } catch (error) {
    next(error);
  }
};

exports.getBenchmark = async (req, res, next) => {
  try {
    const { role, city } = req.query;
    if (!role || !city) {
      return res.status(400).json({ success: false, message: 'Role and city are required' });
    }
    
    const benchmarks = await SalaryBenchmark.find({ role, city }).sort({ experienceRange: 1 });
    
    const formatted = benchmarks.map(b => ({
      experienceRange: b.experienceRange,
      averageSalary: b.averageSalary,
      minSalary: b.minSalary,
      maxSalary: b.maxSalary,
      totalSearches: b.totalSearches
    }));
    
    res.json({ success: true, data: formatted });
  } catch (error) {
    next(error);
  }
};

exports.getCityComparison = async (req, res, next) => {
  try {
    const { role } = req.query;
    if (!role) {
      return res.status(400).json({ success: false, message: 'Role is required' });
    }

    const comparison = await SalaryBenchmark.aggregate([
      { $match: { role } },
      {
        $group: {
          _id: "$city",
          averageSalary: { $avg: "$averageSalary" },
          totalSearches: { $sum: "$totalSearches" }
        }
      },
      { $sort: { averageSalary: -1 } },
      {
        $project: {
          _id: 0,
          city: "$_id",
          averageSalary: 1,
          totalSearches: 1
        }
      }
    ]);

    res.json({ success: true, data: comparison });
  } catch (error) {
    next(error);
  }
};
