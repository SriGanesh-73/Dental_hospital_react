const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const userRoutes = require('./Routers/UserRoute');
const adminRoutes = require('./Routers/AdminRoute');
app.use('/api/users', userRoutes);
app.use('/api/admin',adminRoutes);

mongoose.connect(process.env.MONGODB_URI, {
    useNEWUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB connected');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });