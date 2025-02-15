// middleware/fraudDetection.js
const Transaction = require('../models/Transaction');

// Detect fraud based on multiple transactions in a short time or unusual spending
const fraudDetection = async (userId, amount) => {
  const recentTransactions = await Transaction.find({ user_id: userId }).sort({ createdAt: -1 }).limit(5);
  const avgTransaction = recentTransactions.reduce((acc, tx) => acc + tx.amount, 0) / recentTransactions.length;

  if (amount > avgTransaction * 3) { // If the transaction is more than 3 times the average, flag it
    return true;
  }
  return false;
};

module.exports = fraudDetection;
