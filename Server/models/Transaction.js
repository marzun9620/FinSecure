const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  transaction_type: { type: String, enum: ['debit', 'credit'], required: true },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, enum: ['approved', 'flagged'], default: 'approved' },
  fraud_flag: { type: Boolean, default: false },
  ip_address: { type: String, required: true },  
});

module.exports = mongoose.model('Transaction', TransactionSchema);
