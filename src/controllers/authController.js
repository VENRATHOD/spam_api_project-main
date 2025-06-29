const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const authController = {
  
  async register(req, res) {
    const { name, phone, email, password } = req.body;

    try {
      
      const existingUser = await User.findOne({ where: { phone } });
      if (existingUser) {
        return res.status(400).json({ message: 'Phone number already registered' });
      }

      
      const hashedPassword = await bcrypt.hash(password, 10);

    
      const user = await User.create({
        name,
        phone,
        email,
        password: hashedPassword,
      });

      return res.status(201).json({ message: 'User registered successfully', userId: user.id });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  },


  async login(req, res) {
    const { phone, password } = req.body;

    try {
      const user = await User.findOne({ where: { phone } });
      if (!user) return res.status(404).json({ message: 'User not found' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' });

      return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  },
};

module.exports = authController;
