require('dotenv').config();
const { User, Appointment } = require('../Models/UserModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Utility function to remove sensitive fields
const sanitizeUser = (user) => {
  const userObj = user.toObject ? user.toObject() : user;
  delete userObj.password;
  delete userObj.__v;
  return userObj;
};

// Register a new user
const registerUser = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone, password } = req.body;

  try {
    // Check for existing user (case-insensitive)
    const existingUser = await User.findOne({ 
      email: { $regex: new RegExp(`^${email}$`, 'i') } 
    });

    if (existingUser) {
      return res.status(409).json({ 
        success: false,
        message: 'Email already registered'
      });
    }

    // Hash password with 12 rounds
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new User({
      name,
      email: email.toLowerCase(),
      phone,
      password: hashedPassword
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: sanitizeUser(newUser),
      token
    });

  } catch (error) {
    console.error('Registration Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// User login - Debugged Version
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide both email and password'
    });
  }

  try {
    console.log(`Login attempt for: ${email}`);

    // Case-insensitive search with email trimming
    const user = await User.findOne({
      email: { $regex: new RegExp(`^${email.trim()}$`, 'i') }
    }).select('+password');

    if (!user) {
      console.log(`User not found: ${email}`);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Debugging logs (remove in production)
    console.log(`User found: ${user._id}`);
    console.log(`Stored hash: ${user.password.substring(0, 15)}...`);
    console.log(`Input password length: ${password.length}`);

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(`Password match: ${isMatch}`);

    if (!isMatch) {
      // Additional debug - compare with known test password
      const testMatch = await bcrypt.compare('testpassword', user.password);
      console.log(`Test password match: ${testMatch}`);
      
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: sanitizeUser(user),
      token
    });

  } catch (error) {
    console.error('Login error:', {
      message: error.message,
      stack: error.stack,
      input: { email, password: password ? '*****' : 'MISSING' }
    });
    
    return res.status(500).json({
      success: false,
      message: 'Authentication failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const bookAppointment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, phone, date, time, treatment, message } = req.body;

    // Check if the user exists
    const user = await User.findById(email);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User with email not found'
      });
    }

    // Check for existing appointment at the same time
    const existingAppointment = await Appointment.findOne({
      date: new Date(date),
      time,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingAppointment) {
      return res.status(409).json({
        success: false,
        message: 'This time slot is already booked'
      });
    }

    // Create new appointment
    const newAppointment = new Appointment({
      name,
      email,
      phone,
      date: new Date(date),
      time,
      treatment,
      message
    });

    await newAppointment.save();

    return res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      appointment: newAppointment
    });

  } catch (error) {
    console.error('Appointment Booking Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to book appointment',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get user appointments
const getUserAppointments = async (req, res) => {
  try {
    const { email } = req.user; // Get email from authenticated user
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email not found in user data'
      });
    }

    const appointments = await Appointment.find({ email })
      .sort({ date: 1, time: 1 });

    return res.status(200).json({
      success: true,
      appointments
    });

  } catch (error) {
    console.error('Get Appointments Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch appointments',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  bookAppointment,
  getUserAppointments
};