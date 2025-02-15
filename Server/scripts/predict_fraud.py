
import sys

import numpy as np

# ✅ Load the trained model and scaler
model = joblib.load("../ml_model/fraud_detection_model.pkl")
scaler = joblib.load("../ml_model/scaler.pkl")

# ✅ Get input data from Node.js
amount = float(sys.argv[1])
transaction_frequency = int(sys.argv[2])  # Fetched from the database
time = int(sys.argv[3])

# ✅ Normalize Input Data
input_data = np.array([[amount, transaction_frequency, time]])
input_data = scaler.transform(input_data)

# ✅ Make a Prediction
prediction = model.predict(input_data)[0]

# ✅ Print Result (1 = Fraud, 0 = Safe)
print(prediction)
