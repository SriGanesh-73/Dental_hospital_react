const express = require('express');
const router = express.Router();
const {
    getAllAppointments,
    getAllUsers,
    updateAppointmentStatus,
    updateWorkingHours,
    getWorkingHours    
} = require('../Controllers/UserControllers');
const authenticate = require('../Middleware/authenticate');
const isAdmin = require('../Middleware/isAdmin');
router.use(authenticate,isAdmin);

router.get('/appointments', getAllAppointments);
router.put('/appointments/:id', updateAppointmentStatus);
router.get('/allusers', getAllUsers);
router.get('/settings/time',getWorkingHours);
router.put('/settings/updatetime', updateWorkingHours);

module.exports = router;