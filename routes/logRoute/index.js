const express = require('express');
const { getLogs, softDeleteLog } = require('../../controllers/logController');
const { protect, admin } = require('../../middlewares/authMiddleware');
const router = express.Router();

router.get('/', protect, getLogs); // Get logs (admin sees all, users see their own)
router.delete('/:logId', protect, admin, softDeleteLog); // Admin only: Soft delete a log

module.exports = router;
