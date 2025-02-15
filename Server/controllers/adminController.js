// controllers/adminController.js
const AdminLog = require('../models/AdminLog');

const createAdminLog = async (adminId, action, targetUserId) => {
  const adminLog = new AdminLog({
    admin_id: adminId,
    action,
    target_user_id: targetUserId,
  });
  await adminLog.save();
};

module.exports = { createAdminLog };
