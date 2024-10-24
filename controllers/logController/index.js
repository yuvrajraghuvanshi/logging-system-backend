const Log = require('../../databases/models/Log');

// Get logs with pagination and role-based access
exports.getLogs = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  console.log(req.user)
  const userRole = req.user.role; // Get user role from JWT
  const userId = req.user.id;

  const query = { deleted: false };

  if (userRole !== 'admin') {
    // If user is not admin, show only their own logs
    query.userId = userId;
  }

  try {
    const logs = await Log.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ timestamp: -1 });

    const totalLogs = await Log.countDocuments(query);
    const totalPages = Math.ceil(totalLogs / limit);

    res.json({
      logs,
      page: parseInt(page),
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving logs' });
  }
};

// Soft delete a log by ID
exports.softDeleteLog = async (req, res) => {
  const { logId } = req.params;
  try {
    const log = await Log.findById(logId);
    if (!log) {
      return res.status(404).json({ message: 'Log not found' });
    }
    log.deleted = true;
    await log.save();
    res.json({ message: 'Log deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting log' });
  }
};
