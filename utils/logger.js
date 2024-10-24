const Log = require('../databases/models/Log');

const logAction = async (userId, role, actionType, metadata = {}) => {
  const log = new Log({
    userId,
    actionType,
    role,
    metadata,
  });
  await log.save();
};

module.exports = logAction;
