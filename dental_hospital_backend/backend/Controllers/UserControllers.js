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

  const { name, email, phone, password,role } = req.body;

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

    // Create new user
    const newUser = new User({
      name,
      email: email.toLowerCase(),
      phone,
      password,
      role
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
  const { email, password, isAdmin } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide both email and password'
    });
  }

  try {
    console.log(`Login attempt for: ${email}`);
    const role = isAdmin?'admin':'user';
    // Case-insensitive search with email trimming
    const user = await User.findOne({
      email: { $regex: new RegExp(`^${email.trim()}$`, 'i') },role:role
    }).select('+password');

    if (!user) {
      console.log(`${role} not found: ${email}`);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    // Debugging logs (remove in production)
    console.log(`${role} found: ${user._id}`);
    console.log(`Stored hash: ${user.password.substring(0, 15)}...`);
    console.log(`Input password length: ${password.length}`);
    console.log(`Raw Input password: ${password}`);
    console.log("Hashed password stored:", user.password);

    // Compare passwords
    const isMatch = await user.comparePassword(password.trim());
    console.log(`Password match: ${isMatch}`);

    if (!isMatch) {
      // Additional debug - compare with known test password
      const testMatch = await bcrypt.compare('test-password', user.password);
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

const slotAvailability = async (req, res) => {
  try {
    const { date } = req.query;
    console.log("Received date:", date);
  
    const jsDate = new Date(date);
    if (isNaN(jsDate)) {
      return res.status(400).json({ success: false, message: 'Invalid date format' });
    }
    const bookedSlots = await Appointment.find({
      date: new Date(date),
      status: { $in: ['pending', 'confirmed'] }
    }).select('time');

    if (bookedSlots.length > 0) {
      return res.status(200).json({
        success: true,
        message: 'Already booked slots',
        bookedSlots
      });
    } else {
      return res.status(200).json({
        success: true,
        message: 'No slots booked yet',
        bookedSlots: []
      });
    }
  }
  catch (error){
    console.error("Error checking the slot availability:",error);
    res.status(500).json({
      success:false,
      message:'Internal Server Error'
    });
  }
};

const bookAppointment = async (req, res) => {
  const errors = validationResult(req);
  const userId = req.user._id;
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, phone, date, time, treatment, message } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User with email not found'
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
      message,
      userId
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
    const user_id  = req.params.user_id; // Get _id from authenticated user
    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: 'User not found in user data'
      });
    }
    console.log("Searching for appointments linked to the user with id :",user_id);
    const appointments = await Appointment.find({ userId:user_id,status: { $ne:'cancelled'} })
      .sort({ date: 1, time: 1 });
    console.log("Appointment Details:",appointments);
    return res.status(200).json({
      success: true,
      appointments:appointments
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
const getAllAppointments = async (req, res) => {
  try{
    console.log("Searching for all available appointments...");
    const appointments = await Appointment.find({ status: { $ne:'cancelled' }}).sort({ date:1,time:1 });
    if(!appointments){
      return res.status(404).json({
        success: false,
        message: "Currently no appointments available!"
      });
    }
    console.log("Appointments:",appointments.at(0)||"No appointments available","...");
    res.status(200).json({
      success:true,
      message:"Appointments found!",
      appointments:appointments||[]
    });
  }
  catch (error){
    console.error('Get Appointmets Error', error);
    res.status(500).json({
      success:false,
      message:"Internal Server Error"
    });
  }
};

const updateAppointmentStatus = async (req, res) => {
  const { status } = req.body;
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  res.json(appointment);
};

const getAllUsers = async (req, res) => {
  const users = await User.find({ role:'user' });
  res.json(users);
};

const getAppointmentStatus = async (req, res) => {
  const { app_id } = req.params.app_id;
  const app_status = await Appointment.find({ _id: app_id });
  if(!app_status) {
    return res.status(404).json({ 
      success:false,
      message:"Appointment with Id not found!"
    });
  }
  res.status(200).json({
    success:true,
    message:"Appointment with Id found",
    content:app_status
  });
};

const cancelAppointment = async (req, res) => {
  try {
    const app_id  = req.params.id;
    const appointment = await Appointment.findByIdAndUpdate({ _id:app_id },{ status:'cancelled'},{new:true});
    if(!appointment){
      return res.status(404).json({
        success:false,
        message:"Appointment not found try booking a new appointment"
      });
    }
    res.status(200).json({
      success:true,
      message:"Appointment was cancelled successfully"
    });
  }
  catch (error){
    console.error("Error cancelling the appointment:",error);
    res.status(500).json({
      success:false,
      message:"Internal Server Error"
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  bookAppointment,
  getUserAppointments,
  getAllAppointments,
  updateAppointmentStatus,
  getAllUsers,
  getAppointmentStatus,
  cancelAppointment,
  slotAvailability
};