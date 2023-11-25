const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({}, { timestamps: true });

const ConnectionModel = mongoose.model('Connection', connectionSchema);

module.exports = ConnectionModel;
