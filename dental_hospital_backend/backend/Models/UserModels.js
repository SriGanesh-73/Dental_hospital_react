const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
    minlength: [3, 'Name must be at least 3 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Please provide your phone number'],
    match: [/^[6789]\d{9}$/, 'Please provide a valid Indian phone number']
  },
  date: {
    type: Date,
    required: [true, 'Please select a date']
  },
  time: {
    type: String,
    required: [true, 'Please select a time']
  },
  treatment: {
    type: String,
    required: [true, 'Please select a treatment'],
    enum: [
      'teeth_whitening',
      'root_canal',
      'braces_aligners',
      'extraction',
      'filling',
      'denture_removal',
      'dental_implant',
      'caps_crowns'
    ]
  },
  message: {
    type: String,
    maxlength: [500, 'Message cannot exceed 500 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true }
}, {
  timestamps: true
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  phone: {
    type: String,
    required: true,
    match: [/^[6789]\d{9}$/, 'Please provide a valid Indian phone number'],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, {
  timestamps: true
});

// Password hashing middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = { User, Appointment };