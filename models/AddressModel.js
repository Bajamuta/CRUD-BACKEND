const mongoose = require("mongoose");

const AddressModel = new mongoose.Schema({
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "City",
        required: true
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Country",
        required: true
    },
    streetWithNumbers: {
        type: String,
        required: true
    },
    postal: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

AddressModel.pre('find', function(next) {
    this.populate("city").populate("country");
    next();
});

module.exports = mongoose.model('Address', AddressModel);
