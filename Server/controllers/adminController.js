const bcrypt = require('bcryptjs');
const User = require('../models/User');


const createAdmin = async (req, res) => {
  console.log("✅ Received request to create admin");
  const { email, password, username } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: 'Admin already exists' });

    // Create an admin user
    const newAdmin = new User({ email, username, password_hash: password, role: 'admin' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    newAdmin.password_hash = await bcrypt.hash(password, salt);

    await newAdmin.save();
    res.status(201).json({ msg: 'Admin created successfully' });
  } catch (err) {
    console.error("❌ Error creating admin:", err);
    res.status(500).send("Server Error");
  }
};

// ✅ Ensure function is exported correctly
module.exports = { createAdmin };
