const express = require('express');
const router = express.Router();
const {
    getUserAppointments,
    getAllUsers,
    updateAppointmentStatus    
} = require('../Controllers/UserControllers');
const authMiddleware = require('../Middleware/authMiddleware');
const authenticate = require('../Middleware/authenticate');
const isAdmin = require('../Middleware/isAdmin');

router.use(authenticate, isAdmin);
router.get('/appointments', authMiddleware, getUserAppointments);
router.put('/appointments/:id', updateAppointmentStatus);
router.get('/allusers', getAllUsers);

module.exports = router;