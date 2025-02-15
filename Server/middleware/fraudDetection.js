const { spawn } = require("child_process");
const path = require("path");

// ✅ Specify the correct Python path
const pythonExecutable = "G:/Hello/mingw64/bin/python.exe"; // Change this if needed

const mlFraudDetection = async (amount, transaction_frequency, transaction_type, ip_address) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn(pythonExecutable, [
      path.join(__dirname, "../scripts/predict_fraud.py"),
      amount.toString(),
      transaction_frequency.toString(),
      transaction_type,
      ip_address
    ]);

    pythonProcess.stdout.on("data", (data) => {
      const result = data.toString().trim();
      console.log("🔍 ML Fraud Prediction:", result);
      resolve(result === "1"); // Returns true if fraud
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error("❌ Python Error:", data.toString());
      reject(data.toString());
    });
  });
};

module.exports = mlFraudDetection;
