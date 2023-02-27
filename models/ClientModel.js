const mongoose = require("mongoose");

const ClientModel = new mongoose.Schema({
    clientBusiness: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClientBusiness"
    },
    clientPerson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClientPerson",
        required: true
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

ClientModel.pre('find', function(next) {
    // this.populate("clientBusiness").populate("clientPerson").populate("actions").populate('address');
    this.populate("clientBusiness").populate("clientPerson").populate("actions");
    next();
});

module.exports = mongoose.model('Client', ClientModel);
