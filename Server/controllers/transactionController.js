const Transaction = require('../models/Transaction');
const fraudDetection = require('../middleware/fraudDetection');

const createTransaction = async (req, res) => {
  console.log("✅ Received request to create transaction");
  console.log("📩 Request Body:", req.body);

  const { userId, amount, category, ipAddress } = req.body;

  // Check for missing fields
  if (!userId || !amount || !category || !ipAddress) {
    console.error("❌ Missing required fields:", { userId, amount, category, ipAddress });
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    console.log("🔍 Running fraud detection...");
    const isFraud = await fraudDetection(userId, amount);

    if (isFraud) {
      console.warn("🚨 Fraudulent transaction detected!");
      return res.status(400).json({ msg: "Fraudulent transaction detected" });
    }

    console.log("✅ Fraud check passed. Creating transaction...");

    const newTransaction = new Transaction({
      user_id: userId,
      amount,
      category,
      ip_address: ipAddress,
    });

    const savedTransaction = await newTransaction.save();

    console.log("📝 Transaction saved successfully:", savedTransaction);
    res.status(201).json(savedTransaction);
  } catch (err) {
    console.error("❌ Server Error in createTransaction:", err.message);
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

module.exports = {createTransaction};
