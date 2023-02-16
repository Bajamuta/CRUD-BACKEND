const mongoose = require("mongoose");

const ClientModel = new mongoose.Schema({
    clientBusiness: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClientBusiness"
    },
    clientPerson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClientPerson"
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    phone: {
        type: String,
        required: [true, 'Email is required']
    },
    address: {
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
        },
    },
    actions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Action"
        }
    ]
}, {
    timestamps: true
});
module.exports = mongoose.model('Client', ClientModel);
