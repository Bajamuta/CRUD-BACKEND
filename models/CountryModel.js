const mongoose = require("mongoose");

const CountryModel = new mongoose.Schema({
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

module.exports = mongoose.model('Country', CountryModel);
