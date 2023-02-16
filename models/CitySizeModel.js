const mongoose = require("mongoose");

const CitySizeModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "City"
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('CitySize', CitySizeModel);
