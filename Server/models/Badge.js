const mongoose = require('mongoose');

const BadgeSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  badge_type: { type: String, required: true },
  earned_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Badge', BadgeSchema);
