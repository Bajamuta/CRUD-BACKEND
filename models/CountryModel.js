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
    ],
    clients: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client"
        }
    ]
    /*TODO correct way to add if country in address inside client*/
}, {
    timestamps: true
});

module.exports = mongoose.model('Country', CountryModel);
