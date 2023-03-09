const mongoose = require("mongoose");

const ClientModel = new mongoose.Schema({
    /*clientBusiness: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClientBusiness"
    },
    clientPerson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClientPerson",
        required: true
    },*/
    firstname: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    nip: {
        type: String
    },
    companyName: {
      type: String
    },
    business: {
        type: Boolean,
        required: true
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    phone: {
        type: String,
        required: [true, 'Phone is required']
    },
    /*address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true
    },*/
    city: {
        type: String,
        required: [true, 'City is required']
    },
    country: {
        type: String,
        required: [true, 'Country is required']
    },
    streetWithNumbers: {
        type: String,
        required: true
    },
    postal: {
        type: String,
        required: false
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
