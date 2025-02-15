const Transaction = require('../models/Transaction');
const User = require('../models/User');
const mlFraudDetection = require('../middleware/fraudDetection');

const createTransaction = async (req, res) => {
  console.log("✅ Received request to create transaction");
  console.log("📩 Request Body:", req.body);

  const { user_id, amount, category, transaction_type, ip_address } = req.body;

  // ✅ Validate Required Fields
  if (!user_id || !amount || !category || !transaction_type || !ip_address) {
    return res.status(400).json({ msg: "All fields are required here" });
  }

  try {
    console.log("🔍 Fetching past transactions to calculate frequency...");

    // ✅ Calculate transactions in the past 24 hours
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const transactionsLast24Hrs = await Transaction.countDocuments({
      user_id: user_id,
      createdAt: { $gte: oneDayAgo }
    });

    console.log(`📊 Transactions in the last 24 hours for user ${user_id}: ${transactionsLast24Hrs}`);

    // ✅ Run ML-based fraud detection
    console.log("🔍 Running ML-based fraud detection...");
    const isFraud = await mlFraudDetection(amount, transactionsLast24Hrs, transaction_type, ip_address);

    if (isFraud) {
      console.warn("🚨 ML Detected Fraudulent Transaction!");
      return res.status(400).json({ msg: "ML has flagged this transaction as fraudulent." });
    }

    console.log("✅ ML Fraud check passed.");

    // ✅ Create & Save Transaction
    const newTransaction = new Transaction({
      user_id,
      amount,
      category,
      transaction_type,
      ip_address,
      transaction_frequency: transactionsLast24Hrs,
      createdAt: new Date()
    });

    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    console.error("❌ Server Error:", err.message);
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

module.exports = { createTransaction };
