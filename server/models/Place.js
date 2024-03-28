const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    adress: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: { type: String }, // Change checkIn and checkOut to String type
    checkOut: { type: String },
    maxGuests: Number,
});

const PlaceModel = mongoose.model('Place', placeSchema);

module.exports = PlaceModel; // Only export the Place model
