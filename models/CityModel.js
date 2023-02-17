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
    ],
    clients: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client"
        }
    ]
}, {
    timestamps: true
});

CityModel.pre('find', function(next) {
    this.populate("size").populate("countries").populate("clients");
    next();
});

module.exports = mongoose.model('City', CityModel);
