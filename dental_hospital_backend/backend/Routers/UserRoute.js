const express = require('express');
const router = express.Router();
const { 
  registerUser,
  loginUser,
  bookAppointment,
  getAppointmentStatus,
  cancelAppointment
} = require('../Controllers/UserControllers');
const authMiddleware = require('../Middleware/authMiddleware');
const { check } = require('express-validator');

// Auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Appointment routes (protected by authMiddleware)
router.post('/bookappointment', authMiddleware, [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('phone', 'Please provide a valid 10-digit phone number').matches(/^[6789]\d{9}$/),
  check('date', 'Please select a valid date').isISO8601(),
  check('time', 'Please select a time').not().isEmpty(),
  check('treatment', 'Please select a treatment').not().isEmpty()
], bookAppointment);

router.get('/appointments/:id',getAppointmentStatus);
router.put('/cancel/appointments/:id',cancelAppointment);

module.exports = router;