// models/GlobalSettings.js
const mongoose = require('mongoose');

const globalSettingsSchema = new mongoose.Schema({
  key: { type: String, unique: true }, // e.g., 'user_time_window'
  startTime: { type: String, required: true, default:"9:00" },
  endTime: { type: String, required: true, default:"17:00"}
});

const GlobalSettings = mongoose.model('GlobalSettings', globalSettingsSchema);

module.exports = { GlobalSettings };
