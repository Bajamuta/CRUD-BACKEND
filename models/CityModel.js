const mongoose = require("mongoose");

const CityModel = new mongoose.Schema({
    size: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CitySize",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    countries: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Country"
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('City', CityModel);
