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

CitySizeModel.pre('find', function(next) {
    this.populate("cities");
    next();
});

module.exports = mongoose.model('CitySize', CitySizeModel);
