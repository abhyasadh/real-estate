const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name: { type: String, required: true },
    country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true },
    state: { type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true }
}, { timestamps: true });

module.exports = mongoose.model('City', citySchema);
